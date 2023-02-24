import React, { useEffect, useState, useCallback, useMemo } from "react";
import * as ethers from "ethers";
import moment from "moment";
import { RiLoader5Fill } from "react-icons/ri";
import cx from "classnames";

import {
  yaxisFormatterNumber,
  yaxisFormatterPercent,
  yaxisFormatter,
  tooltipLabelFormatter,
  tooltipLabelFormatterUnits,
  tooltipFormatter,
  tooltipFormatterNumber,
  tooltipFormatterPercent,
  formatNumber,
  CHART_HEIGHT,
  YAXIS_WIDTH,
  COLORS
} from "../helpers";

import {
  LineChart,
  BarChart,
  Line,
  Bar,
  Label,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  ReferenceLine,
  Area,
  AreaChart,
  ComposedChart,
  Cell,
  PieChart,
  Pie,
} from "recharts";

import ChartWrapper from "../components/ChartWrapper";
import VolumeChart from "../components/VolumeChart";
import FeesChart from "../components/FeesChart";
import GenericChart from "../components/GenericChart";

import {
  useVolumeData,
  useTotalVolumeFromServer,
  useVolumeDataFromServer,
  useFeesData,
  useSlpData,
  useAumPerformanceData,
  useCoingeckoPrices,
  useSlpPerformanceData,
  useTradersData,
  useSwapSources,
  useFundingRateData,
  useUsersData,
  useLastSubgraphBlock,
  useLastBlock,
} from "../dataProvider";

const { BigNumber } = ethers;
const { formatUnits } = ethers.utils;
const NOW = Math.floor(Date.now() / 1000);

function Fantom(props) {
  const DEFAULT_GROUP_PERIOD = 86400;
  const [groupPeriod, setGroupPeriod] = useState(DEFAULT_GROUP_PERIOD);

  const [fromValue, setFromValue] = useState();
  const [toValue, setToValue] = useState();

  const { mode } = props;

  const setDateRange = useCallback(
    (range) => {
      setFromValue(
        new Date(Date.now() - range * 1000).toISOString().slice(0, 10)
      );
      setToValue(undefined);
    },
    [setFromValue, setToValue]
  );

  const from = fromValue ? +new Date(fromValue) / 1000 : undefined;
  const to = toValue ? +new Date(toValue) / 1000 : NOW;

  const params = { from, to, groupPeriod };

  const [fundingRateData, fundingRateLoading] = useFundingRateData(params);
  // const [volumeData, volumeLoading] = useVolumeDataFromServer(params);
  const [volumeData, totalVolume, volumeLoading] = useVolumeData(params);
  //const [totalVolume] = useTotalVolumeFromServer();
  const totalVolumeDelta = useMemo(() => {
    if (!volumeData || volumeData.length == 0) {
      return null;
    }
    return volumeData[volumeData.length - 1].all;
  }, [volumeData]);

  const [feesData, feesLoading] = useFeesData(params);
  const [totalFees, totalFeesDelta] = useMemo(() => {
    if (!feesData) {
      return [];
    }
    const total = feesData[feesData.length - 1]?.cumulative;
    const delta = total - feesData[feesData.length - 2]?.cumulative;
    return [total, delta];
  }, [feesData]);

  const [slpData, slpLoading] = useSlpData(params);
  const [totalAum, totalAumDelta] = useMemo(() => {
    if (!slpData) {
      return [];
    }
    const total = slpData[slpData.length - 1]?.aum;
    const delta = total - slpData[slpData.length - 2]?.aum;
    return [total, delta];
  }, [slpData]);

  const [aumPerformanceData, aumPerformanceLoading] =
    useAumPerformanceData(params);

  const [slpPerformanceData, slpPerformanceLoading] = useSlpPerformanceData(
    slpData,
    feesData,
    params
  );

  const [tradersData, tradersLoading] = useTradersData(params);
  const [openInterest, openInterestDelta] = useMemo(() => {
    if (!tradersData) {
      return [];
    }
    const total = tradersData.data[tradersData.data.length - 1]?.openInterest;
    const delta =
      total - tradersData.data[tradersData.data.length - 2]?.openInterest;
    return [total, delta];
  }, [tradersData]);
  const [swapSources, swapSourcesLoading] = useSwapSources(params);
  const swapSourcesKeys = Object.keys(
    (swapSources || []).reduce((memo, el) => {
      Object.keys(el).forEach((key) => {
        if (key === "all" || key === "timestamp") return;
        memo[key] = true;
      });
      return memo;
    }, {})
  );

  const [usersData, usersLoading] = useUsersData(params);
  const [totalUsers, totalUsersDelta] = useMemo(() => {
    if (!usersData) {
      return [null, null];
    }
    const total = usersData[usersData.length - 1]?.uniqueCountCumulative;
    const prevTotal = usersData[usersData.length - 2]?.uniqueCountCumulative;
    const delta = total && prevTotal ? total - prevTotal : null;
    return [total, delta];
  }, [usersData]);

  const [lastSubgraphBlock] = useLastSubgraphBlock();
  const [lastBlock] = useLastBlock();

  const isObsolete =
    lastSubgraphBlock &&
    lastBlock &&
    lastBlock.timestamp - lastSubgraphBlock.timestamp > 3600;

  const [isExperiment, setIsExperiment] = useState(false);
  useEffect(() => {
    setIsExperiment(window.localStorage.getItem("experiment"));
  }, [setIsExperiment]);

  const showForm = false;

  return (
    <div className="Home">
      <h1>Analytics / Fantom</h1>
      {lastSubgraphBlock && lastBlock && (
        <p
          className={cx("page-description", { warning: isObsolete })}
          style={{ marginTop: "-1rem" }}
        >
          {isObsolete && "Data is obsolete. "}
          Updated {moment(lastSubgraphBlock.timestamp * 1000).fromNow()}
          &nbsp;at block{" "}
          <a
            target="_blank"
            href={`https://ftmscan.com/block/${lastSubgraphBlock.number}`}
          >
            {lastSubgraphBlock.number}
          </a>
        </p>
      )}
      {showForm && (
        <div className="form">
          <p>
            <label>Period</label>
            <input
              type="date"
              value={fromValue}
              onChange={(evt) => setFromValue(evt.target.value)}
            />
            &nbsp;—&nbsp;
            <input
              type="date"
              value={toValue}
              onChange={(evt) => setToValue(evt.target.value)}
            />
            <button onClick={(evt) => setDateRange(86400 * 29)}>30 days</button>
            <button onClick={(evt) => setDateRange(86400 * 6)}>7 days</button>
          </p>
        </div>
      )}
      <div className="chart-grid">
        <div className="chart-cell stats">
          {totalVolume ? (
            <>
              <div className="total-stat-label">Total Volume</div>
              <div className="total-stat-value">
                {formatNumber(totalVolume, { currency: true })}
                {totalVolumeDelta && (
                  <span
                    className="total-stat-delta plus"
                    title="Change since previous day"
                  >
                    +
                    {formatNumber(totalVolumeDelta, {
                      currency: true,
                      compact: true,
                    })}
                  </span>
                )}
              </div>
            </>
          ) : volumeLoading ? (
            <RiLoader5Fill size="3em" className="loader" />
          ) : (
            <>
              <div className="total-stat-label">Total Volume</div>
              <div className="total-stat-value">
                {formatNumber(0, { currency: true })}
              </div>
            </>
          )}
        </div>
        <div className="chart-cell stats">
          {totalFees ? (
            <>
              <div className="total-stat-label">Total Fees</div>
              <div className="total-stat-value">
                {formatNumber(totalFees, { currency: true })}
                <span
                  className="total-stat-delta plus"
                  title="Change since previous day"
                >
                  +
                  {formatNumber(totalFeesDelta, {
                    currency: true,
                    compact: true,
                  })}
                </span>
              </div>
            </>
          ) : feesLoading ? (
            <RiLoader5Fill size="3em" className="loader" />
          ) : (
            <>
              <div className="total-stat-label">Total Fees</div>
              <div className="total-stat-value">
                {formatNumber(0, { currency: true })}
              </div>
            </>
          )}
        </div>
        <div className="chart-cell stats">
          {totalAum ? (
            <>
              <div className="total-stat-label">SLP Pool</div>
              <div className="total-stat-value">
                {formatNumber(totalAum, { currency: true })}
                <span
                  className={cx(
                    "total-stat-delta",
                    totalAumDelta > 0 ? "plus" : "minus"
                  )}
                  title="Change since previous day"
                >
                  {totalAumDelta > 0 ? "+" : ""}
                  {formatNumber(totalAumDelta, {
                    currency: true,
                    compact: true,
                  })}
                </span>
              </div>
            </>
          ) : (
            <RiLoader5Fill size="3em" className="loader" />
          )}
        </div>
        <div className="chart-cell stats">
          {totalUsers ? (
            <>
              <div className="total-stat-label">Total Users</div>
              <div className="total-stat-value">
                {formatNumber(totalUsers)}
                <span
                  className="total-stat-delta plus"
                  title="Change since previous day"
                >
                  +{formatNumber(totalUsersDelta)}
                </span>
              </div>
            </>
          ) : usersLoading ? (
            <RiLoader5Fill size="3em" className="loader" />
          ) : (
            <>
              <div className="total-stat-label">Total Users</div>
              <div className="total-stat-value">{formatNumber(0)}</div>
            </>
          )}
        </div>
        <div className="chart-cell stats">
          {openInterest ? (
            <>
              <div className="total-stat-label">Open Interest</div>
              <div className="total-stat-value">
                {formatNumber(openInterest, { currency: true })}
                <span
                  className={cx(
                    "total-stat-delta",
                    openInterestDelta > 0 ? "plus" : "minus"
                  )}
                  title="Change since previous day"
                >
                  {openInterestDelta > 0 ? "+" : ""}
                  {formatNumber(openInterestDelta, {
                    currency: true,
                    compact: true,
                  })}
                </span>
              </div>
            </>
          ) : tradersLoading ? (
            <RiLoader5Fill size="3em" className="loader" />
          ) : (
            <>
              <div className="total-stat-label">Open Interest</div>
              <div className="total-stat-value">
                {formatNumber(0, { currency: true })}
              </div>
            </>
          )}
        </div>
        <div className="chart-cell">
          <VolumeChart
            data={volumeData}
            loading={volumeLoading}
            chartHeight={CHART_HEIGHT}
            yaxisWidth={YAXIS_WIDTH}
            xaxisTickFormatter={tooltipLabelFormatter}
            yaxisTickFormatter={yaxisFormatter}
            tooltipLabelFormatter={tooltipLabelFormatter}
            tooltipFormatter={tooltipFormatter}
          />
        </div>
        <div className="chart-cell">
          <FeesChart
            data={feesData}
            loading={feesLoading}
            chartHeight={CHART_HEIGHT}
            yaxisWidth={YAXIS_WIDTH}
            xaxisTickFormatter={tooltipLabelFormatter}
            yaxisTickFormatter={yaxisFormatter}
            tooltipLabelFormatter={tooltipLabelFormatter}
            tooltipFormatter={tooltipFormatter}
          />
        </div>
        <div className="chart-cell">
          <ChartWrapper
            title="SLP & Slp Supply"
            loading={slpLoading}
            data={slpData}
            csvFields={[{ key: "aum" }, { key: "slpSupply" }]}
          >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
              <LineChart data={slpData} syncId="syncSlp">
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={tooltipLabelFormatter}
                  minTickGap={30}
                />
                <YAxis
                  dataKey="aum"
                  tickFormatter={yaxisFormatter}
                  width={YAXIS_WIDTH}
                />
                <Tooltip
                  formatter={tooltipFormatterNumber}
                  labelFormatter={tooltipLabelFormatter}
                  contentStyle={{ textAlign: "left" }}
                />
                <Legend />
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  strokeWidth={2}
                  unit="$"
                  dot={false}
                  dataKey="aum"
                  stackId="a"
                  name="SLP"
                  stroke={COLORS[0]}
                />
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  strokeWidth={2}
                  dot={false}
                  dataKey="slpSupply"
                  stackId="a"
                  name="SLP Supply"
                  stroke={COLORS[1]}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </div>

        <div className="chart-cell">
          <ChartWrapper
            title="Slp Performance"
            loading={slpLoading}
            data={slpPerformanceData}
            csvFields={[
              { key: "syntheticPrice" },
              { key: "slpPrice" },
              { key: "slpPlusFees" },
              { key: "lpBtcPrice" },
              { key: "lpEthPrice" },
              { key: "performanceSyntheticCollectedFees" },
              { key: "indexBtcCount" },
              { key: "indexEthCount" },
              { key: "indexAvaxCount" },
              { key: "indexStableCount" },
              { key: "BTC_WEIGHT" },
              { key: "ETH_WEIGHT" },
              { key: "FTM_WEIGHT" },
              { key: "STABLE_WEIGHT" },
            ]}
          >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
              <LineChart data={slpPerformanceData} syncId="syncSlp">
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={tooltipLabelFormatter}
                  minTickGap={30}
                />
                <YAxis
                  dataKey="performanceSyntheticCollectedFees"
                  domain={[80, 180]}
                  unit="%"
                  tickFormatter={yaxisFormatterNumber}
                  width={YAXIS_WIDTH}
                />
                <Tooltip
                  formatter={tooltipFormatterNumber}
                  labelFormatter={tooltipLabelFormatter}
                  contentStyle={{ textAlign: "left" }}
                />
                <Legend />
                <Line
                  dot={false}
                  isAnimationActive={false}
                  type="monotone"
                  unit="%"
                  dataKey="performanceLpBtcCollectedFees"
                  name="% LP BTC-USDC (w/ fees)"
                  stroke={COLORS[2]}
                />
                <Line
                  dot={false}
                  isAnimationActive={false}
                  type="monotone"
                  unit="%"
                  dataKey="performanceLpEthCollectedFees"
                  name="% LP ETH-USDC (w/ fees)"
                  stroke={COLORS[4]}
                />
                <Line
                  dot={false}
                  isAnimationActive={false}
                  type="monotone"
                  unit="%"
                  dataKey="performanceSyntheticCollectedFees"
                  name="% Index (w/ fees)"
                  stroke={COLORS[0]}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="chart-description">
              <p>
                <span style={{ color: COLORS[0] }}>% of Index (with fees)</span>{" "}
                is SLP with fees / Index Price * 100. Index is a basket of 25%
                BTC, 25% ETH, 50% USDC rebalanced once&nbsp;a&nbsp;day
                <br />
                <span style={{ color: COLORS[4] }}>
                  % of LP ETH-USDC (with fees)
                </span>{" "}
                is SLP Price with fees / LP ETH-USDC * 100
                <br />
              </p>
            </div>
          </ChartWrapper>
        </div>

        <div className="chart-cell">
          <ChartWrapper
            title="Slp Price Comparison"
            loading={slpLoading}
            data={slpPerformanceData}
            csvFields={[
              { key: "syntheticPrice" },
              { key: "slpPrice" },
              { key: "slpPlusFees" },
              { key: "lpBtcPrice" },
              { key: "lpEthPrice" },
              { key: "performanceSyntheticCollectedFees" },
            ]}
          >
            <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
              <LineChart data={slpPerformanceData} syncId="syncSlp">
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={tooltipLabelFormatter}
                  minTickGap={30}
                />
                <YAxis
                  dataKey="performanceSyntheticCollectedFees"
                  domain={[60, 210]}
                  unit="%"
                  tickFormatter={yaxisFormatterNumber}
                  width={YAXIS_WIDTH}
                />
                <YAxis
                  dataKey="slpPrice"
                  domain={[0.4, 1.7]}
                  orientation="right"
                  yAxisId="right"
                  tickFormatter={yaxisFormatterNumber}
                  width={YAXIS_WIDTH}
                />
                <Tooltip
                  formatter={tooltipFormatterNumber}
                  labelFormatter={tooltipLabelFormatter}
                  contentStyle={{ textAlign: "left" }}
                />
                <Legend />
                <Line
                  dot={false}
                  isAnimationActive={false}
                  type="monotone"
                  unit="%"
                  strokeWidth={2}
                  dataKey="performanceLpBtcCollectedFees"
                  name="% LP BTC-USDC (w/ fees)"
                  stroke={COLORS[2]}
                />
                <Line
                  dot={false}
                  isAnimationActive={false}
                  type="monotone"
                  unit="%"
                  strokeWidth={2}
                  dataKey="performanceLpEthCollectedFees"
                  name="% LP ETH-USDC (w/ fees)"
                  stroke={COLORS[4]}
                />
                <Line
                  dot={false}
                  isAnimationActive={false}
                  type="monotone"
                  unit="%"
                  strokeWidth={2}
                  dataKey="performanceSyntheticCollectedFees"
                  name="% Index (w/ fees)"
                  stroke={COLORS[0]}
                />

                <Line
                  isAnimationActive={false}
                  type="monotone"
                  unit="$"
                  strokeWidth={1}
                  yAxisId="right"
                  dot={false}
                  dataKey="syntheticPrice"
                  name="Index Price"
                  stroke={COLORS[2]}
                />
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  unit="$"
                  strokeWidth={1}
                  yAxisId="right"
                  dot={false}
                  dataKey="slpPrice"
                  name="Slp Price"
                  stroke={COLORS[1]}
                />
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  unit="$"
                  strokeWidth={1}
                  yAxisId="right"
                  dot={false}
                  dataKey="slpPlusFees"
                  name="Slp w/ fees"
                  stroke={COLORS[3]}
                />
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  unit="$"
                  strokeWidth={1}
                  yAxisId="right"
                  dot={false}
                  dataKey="lpBtcPrice"
                  name="LP BTC-USDC"
                  stroke={COLORS[2]}
                />
                <Line
                  isAnimationActive={false}
                  type="monotone"
                  unit="$"
                  strokeWidth={1}
                  yAxisId="right"
                  dot={false}
                  dataKey="lpEthPrice"
                  name="LP ETH-USDC"
                  stroke={COLORS[4]}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="chart-description">
              <p>
                <span style={{ color: COLORS[3] }}>Slp with fees</span> is
                based on SLP share of fees received
                {/* based on SLP share of fees received and excluding esSKULL rewards */}
                <br />
                <span style={{ color: COLORS[0] }}>
                  % of Index (with fees)
                </span>{" "}
                is Slp with fees / Index Price * 100
                <br />
                <span style={{ color: COLORS[4] }}>
                  % of LP ETH-USDC (with fees)
                </span>{" "}
                is Slp Price with fees / LP ETH-USDC * 100
                <br />
                <span style={{ color: COLORS[2] }}>Index Price</span> is 25%
                BTC, 25% ETH, 50% USDC
              </p>
            </div>
          </ChartWrapper>
        </div>
        {isExperiment && (
          <div className="chart-cell experiment">
            <ChartWrapper title="Performance vs. Index" loading={slpLoading}>
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <LineChart data={slpPerformanceData} syncId="syncSlp">
                  <CartesianGrid strokeDasharray="10 10" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={tooltipLabelFormatter}
                    minTickGap={30}
                  />
                  <YAxis
                    dataKey="performanceSyntheticCollectedFees"
                    domain={[80, 120]}
                    unit="%"
                    tickFormatter={yaxisFormatterNumber}
                    width={YAXIS_WIDTH}
                  />
                  <Tooltip
                    formatter={tooltipFormatterNumber}
                    labelFormatter={tooltipLabelFormatter}
                    contentStyle={{ textAlign: "left" }}
                  />
                  <Legend />
                  <Line
                    isAnimationActive={false}
                    dot={false}
                    type="monotone"
                    unit="%"
                    strokeWidth={2}
                    dataKey="performanceSyntheticCollectedFees"
                    name="Collected Fees"
                    stroke={COLORS[0]}
                  />
                  <Line
                    isAnimationActive={false}
                    dot={false}
                    type="monotone"
                    unit="%"
                    strokeWidth={2}
                    dataKey="performanceSyntheticDistributedUsd"
                    name="Distributed Usd"
                    stroke={COLORS[1]}
                  />
                  <Line
                    isAnimationActive={false}
                    dot={false}
                    type="monotone"
                    unit="%"
                    strokeWidth={2}
                    dataKey="performanceSyntheticDistributedEth"
                    name="Distributed Eth"
                    stroke={COLORS[2]}
                  />
                  <Line
                    isAnimationActive={false}
                    dot={false}
                    type="monotone"
                    unit="%"
                    strokeWidth={2}
                    dataKey="performanceSynthetic"
                    name="No Fees"
                    stroke={COLORS[3]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>
        )}
        {isExperiment && (
          <div className="chart-cell experiment">
            <ChartWrapper title="Performance vs. ETH LP" loading={slpLoading}>
              <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
                <LineChart data={slpPerformanceData} syncId="syncSlp">
                  <CartesianGrid strokeDasharray="10 10" />
                  <XAxis
                    dataKey="timestamp"
                    tickFormatter={tooltipLabelFormatter}
                    minTickGap={30}
                  />
                  <YAxis
                    dataKey="performanceLpEthCollectedFees"
                    domain={[80, 120]}
                    unit="%"
                    tickFormatter={yaxisFormatterNumber}
                    width={YAXIS_WIDTH}
                  />
                  <Tooltip
                    formatter={tooltipFormatterNumber}
                    labelFormatter={tooltipLabelFormatter}
                    contentStyle={{ textAlign: "left" }}
                  />
                  <Legend />
                  <Line
                    isAnimationActive={false}
                    dot={false}
                    type="monotone"
                    unit="%"
                    strokeWidth={2}
                    dataKey="performanceLpEthCollectedFees"
                    name="Collected Fees"
                    stroke={COLORS[0]}
                  />
                  <Line
                    isAnimationActive={false}
                    dot={false}
                    type="monotone"
                    unit="%"
                    strokeWidth={2}
                    dataKey="performanceLpEthDistributedUsd"
                    name="Distributed Usd"
                    stroke={COLORS[1]}
                  />
                  <Line
                    isAnimationActive={false}
                    dot={false}
                    type="monotone"
                    unit="%"
                    strokeWidth={2}
                    dataKey="performanceLpEthDistributedEth"
                    name="Distributed Eth"
                    stroke={COLORS[2]}
                  />
                  <Line
                    isAnimationActive={false}
                    dot={false}
                    type="monotone"
                    unit="%"
                    strokeWidth={2}
                    dataKey="performanceLpEth"
                    name="No Fees"
                    stroke={COLORS[3]}
                  />
                </LineChart>
              </ResponsiveContainer>
            </ChartWrapper>
          </div>
        )}
        <div className="chart-cell">
          <ChartWrapper
            title="Traders Net PnL"
            loading={tradersLoading}
            data={tradersData?.data}
            csvFields={[
              { key: "pnl", name: "Net PnL" },
              { key: "pnlCumulative", name: "Cumulative PnL" },
            ]}
          >
            <ResponsiveContainer
              width="100%"
              syncId="tradersId"
              height={CHART_HEIGHT}
            >
              <ComposedChart data={tradersData?.data}>
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={tooltipLabelFormatter}
                  minTickGap={30}
                />
                <YAxis
                  domain={[
                    -tradersData?.stats.maxAbsOfPnlAndCumulativePnl * 1.05,
                    tradersData?.stats.maxAbsOfPnlAndCumulativePnl * 1.05,
                  ]}
                  tickFormatter={yaxisFormatter}
                  width={YAXIS_WIDTH}
                />
                <Tooltip
                  formatter={tooltipFormatter}
                  labelFormatter={tooltipLabelFormatter}
                  contentStyle={{ textAlign: "left" }}
                />
                <Legend />
                <Bar
                  type="monotone"
                  fill={mode == "dark" ? "#FFFFFF" : "#000000"}
                  dot={false}
                  dataKey="pnl"
                  name="Net PnL"
                >
                  {(tradersData?.data || []).map((item, i) => {
                    return (
                      <Cell
                        key={`cell-${i}`}
                        fill={item.pnl > 0 ? "#22c761" : "#f93333"}
                      />
                    );
                  })}
                </Bar>
                <Line
                  type="monotone"
                  strokeWidth={2}
                  stroke={COLORS[4]}
                  dataKey="pnlCumulative"
                  name="Cumulative PnL"
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="chart-description">
              <p>Considers settled (closed) positions</p>
              <p>Fees are not factored into PnL</p>
            </div>
          </ChartWrapper>
        </div>
        <div className="chart-cell">
          <ChartWrapper
            title="Traders Profit vs. Loss"
            loading={tradersLoading}
            data={tradersData?.data}
            csvFields={[
              { key: "profit" },
              { key: "loss" },
              { key: "profitCumulative" },
              { key: "lossCumulative" },
            ]}
          >
            <ResponsiveContainer
              width="100%"
              syncId="tradersId"
              height={CHART_HEIGHT}
            >
              <ComposedChart data={tradersData?.data} barGap={0}>
                <CartesianGrid strokeDasharray="10 10" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={tooltipLabelFormatter}
                  minTickGap={30}
                />
                <YAxis
                  domain={[
                    -tradersData?.stats.maxProfitLoss * 1.05,
                    tradersData?.stats.maxProfitLoss * 1.05,
                  ]}
                  tickFormatter={yaxisFormatter}
                  width={YAXIS_WIDTH}
                />
                <YAxis
                  domain={[
                    -tradersData?.stats.maxCumulativeProfitLoss * 1.1,
                    tradersData?.stats.maxCumulativeProfitLoss * 1.1,
                  ]}
                  orientation="right"
                  yAxisId="right"
                  tickFormatter={yaxisFormatter}
                  width={YAXIS_WIDTH}
                />
                <Tooltip
                  formatter={tooltipFormatter}
                  labelFormatter={tooltipLabelFormatter}
                  contentStyle={{ textAlign: "left" }}
                />
                <Legend />
                <Area
                  yAxisId="right"
                  type="monotone"
                  stroke={0}
                  fill="#22c761"
                  fillOpacity="0.4"
                  dataKey="profitCumulative"
                  name="Cumulative Profit"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  stroke={0}
                  fill="#f93333"
                  fillOpacity="0.4"
                  dataKey="lossCumulative"
                  name="Cumulative Loss"
                />
                <Bar
                  type="monotone"
                  fill="#22c761"
                  dot={false}
                  dataKey="profit"
                  name="Profit"
                />
                <Bar
                  type="monotone"
                  fill="#f93333"
                  dot={false}
                  dataKey="loss"
                  name="Loss"
                />
              </ComposedChart>
            </ResponsiveContainer>
            <div className="chart-description">
              <p>Considers settled (closed) positions</p>
              <p>Fees are not factored into PnL</p>
            </div>
          </ChartWrapper>
        </div>
        <div className="chart-cell">
          <GenericChart
            loading={fundingRateLoading}
            title="Borrowing Rate Annualized"
            data={fundingRateData}
            yaxisDataKey="ETH"
            yaxisTickFormatter={yaxisFormatterPercent}
            tooltipFormatter={tooltipFormatterPercent}
            items={[
              { key: "FTM", color: "#7C43DA" },
              { key: "ETH", color: "#6185F5" },
              { key: "BTC", color: "#F7931A" },
              { key: "USDC", color: "#2775CA" },
              { key: "USDT", color: "#67B18A" },
              { key: "DAI", color: "#FAC044" },
            ]}
            type="Line"
            yaxisDomain={[0, 90 /* ~87% is a maximum yearly borrow rate */]}
            isCoinChart={true}
          />
        </div>
        <div className="chart-cell">
          <GenericChart
            loading={tradersLoading}
            title="Open Interest"
            data={tradersData?.data.map((item) => ({
              all: item.openInterest,
              ...item,
            }))}
            yaxisDataKey="openInterest"
            items={[
              { key: "shortOpenInterest", name: "Short", color: "#f93333" },
              { key: "longOpenInterest", name: "Long", color: "#22c761" },
            ]}
            type="Bar"
          />
        </div>
        <div className="chart-cell">
          <GenericChart
            syncId="syncSlp"
            loading={aumPerformanceLoading}
            title="SKULL Performance Annualized"
            data={aumPerformanceData}
            yaxisDataKey="apr"
            yaxisTickFormatter={yaxisFormatterPercent}
            tooltipFormatter={tooltipFormatterPercent}
            items={[{ key: "apr", name: "APR", color: COLORS[0] }]}
            description="Formula = Daily Fees / SLP Pool * 365 days * 100"
            type="Composed"
          />
        </div>
        <div className="chart-cell">
          <GenericChart
            syncId="syncSlp"
            loading={aumPerformanceLoading}
            title="SKULL Daily Usage"
            data={aumPerformanceData}
            yaxisDataKey="usage"
            yaxisTickFormatter={yaxisFormatterPercent}
            tooltipFormatter={tooltipFormatterPercent}
            items={[{ key: "usage", name: "Daily Usage", color: COLORS[4] }]}
            description="Formula = Daily Volume / SLP Pool * 100"
            type="Composed"
          />
        </div>
        <div className="chart-cell">
          <GenericChart
            syncId="syncSlp"
            loading={usersLoading}
            title="Unique Users"
            data={usersData}
            yaxisDataKey="uniqueSum"
            yaxisTickFormatter={yaxisFormatterNumber}
            tooltipFormatter={tooltipFormatterNumber}
            tooltipLabelFormatter={tooltipLabelFormatterUnits}
            items={[
              { key: "uniqueSwapCount", name: "Swaps" },
              { key: "uniqueMarginCount", name: "Margin trading" },
              { key: "uniqueMintBurnCount", name: "Mint & Burn SLP" },
            ]}
            type="Composed"
          />
        </div>
        <div className="chart-cell">
          <GenericChart
            syncId="syncSlp"
            loading={usersLoading}
            title="New Users"
            data={usersData?.map((item) => ({ ...item, all: item.newCount }))}
            yaxisDataKey="newCount"
            rightYaxisDataKey="uniqueCountCumulative"
            yaxisTickFormatter={yaxisFormatterNumber}
            tooltipFormatter={tooltipFormatterNumber}
            tooltipLabelFormatter={tooltipLabelFormatterUnits}
            items={[
              { key: "newSwapCount", name: "Swap" },
              { key: "newMarginCount", name: "Margin trading" },
              { key: "newMintBurnCount", name: "Mint & Burn" },
              {
                key: "uniqueCountCumulative",
                name: "Cumulative",
                type: "Line",
                yAxisId: "right",
                strokeWidth: 2,
                color: COLORS[4],
              },
            ]}
            type="Composed"
          />
        </div>
        <div className="chart-cell">
          <GenericChart
            syncId="syncSlp"
            loading={usersLoading}
            title="New vs. Existing Users"
            data={usersData?.map((item) => ({
              ...item,
              all: item.uniqueCount,
            }))}
            yaxisDataKey="uniqueCount"
            rightYaxisDataKey="oldPercent"
            yaxisTickFormatter={yaxisFormatterNumber}
            tooltipFormatter={tooltipFormatterNumber}
            tooltipLabelFormatter={tooltipLabelFormatterUnits}
            items={[
              { key: "newCount", name: "New" },
              { key: "oldCount", name: "Existing" },
              {
                key: "oldPercent",
                name: "Existing %",
                yAxisId: "right",
                type: "Line",
                strokeWidth: 2,
                color: COLORS[4],
                unit: "%",
              },
            ]}
            type="Composed"
          />
        </div>
        <div className="chart-cell">
          <GenericChart
            syncId="syncSlp"
            loading={usersLoading}
            title="User Actions"
            data={(usersData || []).map((item) => ({
              ...item,
              all: item.actionCount,
            }))}
            yaxisDataKey="actionCount"
            yaxisTickFormatter={yaxisFormatterNumber}
            tooltipFormatter={tooltipFormatterNumber}
            tooltipLabelFormatter={tooltipLabelFormatterUnits}
            items={[
              { key: "actionSwapCount", name: "Swaps" },
              { key: "actionMarginCount", name: "Margin trading" },
              { key: "actionMintBurnCount", name: "Mint & Burn SLP" },
            ]}
            type="Composed"
          />
        </div>
        <div className="chart-cell">
          <GenericChart
            loading={swapSourcesLoading}
            title="Swap Sources"
            data={swapSources}
            items={swapSourcesKeys.map((key) => ({ key }))}
          />
        </div>
      </div>
    </div>
  );
}

export default Fantom;
