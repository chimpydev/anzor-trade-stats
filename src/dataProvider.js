import { useMemo, useState, useEffect } from "react";
import { ApolloClient, InMemoryCache, gql, HttpLink } from "@apollo/client";
import { chain, sumBy, sortBy, maxBy, minBy } from "lodash";
import fetch from "cross-fetch";
import * as ethers from "ethers";

import { getAddress, AVALANCHE } from "./addresses";

const { JsonRpcProvider } = ethers.providers;

import RewardReader from "../abis/RewardReader.json";
import MjlpManager from "../abis/MjlpManager.json";
import Token from "../abis/v1/Token.json";

const providers = {
  avalanche: new JsonRpcProvider("https://api.avax.network/ext/bc/C/rpc"),
};

function getProvider(chainName) {
  if (!(chainName in providers)) {
    throw new Error(`Unknown chain ${chainName}`);
  }
  return providers["avalanche"];
}

function getChainId(chainName) {
  const chainId = {
    avalanche: AVALANCHE,
  }[chainName];
  if (!chainId) {
    throw new Error(`Unknown chain ${chainName}`);
  }
  return chainId;
}

const DEFAULT_GROUP_PERIOD = 86400;
const NOW_TS = parseInt(Date.now() / 1000);
const FIRST_DATE_TS = parseInt(+new Date(2022, 5, 1) / 1000);

function fillNa(arr, keys) {
  const prevValues = {};
  if (!keys && arr.length > 0) {
    keys = Object.keys(arr[0]);
    delete keys.timestamp;
    delete keys.id;
  }
  for (const el of arr) {
    for (const key of keys) {
      if (!el[key]) {
        if (prevValues[key]) {
          el[key] = prevValues[key];
        }
      } else {
        prevValues[key] = el[key];
      }
    }
  }
  return arr;
}

export async function queryEarnData(chainName, account) {
  const provider = getProvider(chainName);
  const chainId = getChainId(chainName);
  const rewardReader = new ethers.Contract(
    getAddress(chainId, "RewardReader"),
    RewardReader.abi,
    provider
  );
  const mjlpContract = new ethers.Contract(
    getAddress(chainId, "MJLP"),
    Token.abi,
    provider
  );
  const mjlpManager = new ethers.Contract(
    getAddress(chainId, "MjlpManager"),
    MjlpManager.abi,
    provider
  );

  let depositTokens;
  let rewardTrackersForDepositBalances;
  let rewardTrackersForStakingInfo;

  if (chainId === AVALANCHE) {
    depositTokens = [
      getAddress(AVALANCHE, "MJAR"),
      getAddress(AVALANCHE, "ES_MJAR"),
      getAddress(AVALANCHE, "STAKED_MJAR_TRACKER"),
      getAddress(AVALANCHE, "BONUS_MJAR_TRACKER"),
      getAddress(AVALANCHE, "BN_MJAR"),
      getAddress(AVALANCHE, "MJLP"),
    ];
    rewardTrackersForDepositBalances = [
      getAddress(AVALANCHE, "STAKED_MJAR_TRACKER"),
      getAddress(AVALANCHE, "STAKED_MJAR_TRACKER"),
      getAddress(AVALANCHE, "BONUS_MJAR_TRACKER"),
      getAddress(AVALANCHE, "FEE_MJAR_TRACKER"),
      getAddress(AVALANCHE, "FEE_MJAR_TRACKER"),
      getAddress(AVALANCHE, "FEE_MJLP_TRACKER"),
    ];
    rewardTrackersForStakingInfo = [
      getAddress(AVALANCHE, "STAKED_MJAR_TRACKER"),
      getAddress(AVALANCHE, "BONUS_MJAR_TRACKER"),
      getAddress(AVALANCHE, "FEE_MJAR_TRACKER"),
      getAddress(AVALANCHE, "STAKED_MJLP_TRACKER"),
      getAddress(AVALANCHE, "FEE_MJLP_TRACKER"),
    ];
  }

  const [balances, stakingInfo, mjlpTotalSupply, mjlpAum, mjarPrice] =
    await Promise.all([
      rewardReader.getDepositBalances(
        account,
        depositTokens,
        rewardTrackersForDepositBalances
      ),
      rewardReader
        .getStakingInfo(account, rewardTrackersForStakingInfo)
        .then((info) => {
          return rewardTrackersForStakingInfo.map((_, i) => {
            return info.slice(i * 5, (i + 1) * 5);
          });
        }),
      mjlpContract.totalSupply(),
      mjlpManager.getAumInUsdm(true),
      fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=metavault-trade&vs_currencies=usd"
      ).then(async (res) => {
        const j = await res.json();
        return j["metavault-trade"]["usd"];
      }),
    ]);

  const mjlpPrice = mjlpAum / 1e18 / (mjlpTotalSupply / 1e18);
  const now = new Date();

  return {
    MJLP: {
      stakedMJLP: balances[5] / 1e18,
      pendingETH: stakingInfo[4][0] / 1e18,
      pendingEsMJAR: stakingInfo[3][0] / 1e18,
      mjlpPrice,
    },
    MJAR: {
      stakedMJAR: balances[0] / 1e18,
      stakedEsMJAR: balances[1] / 1e18,
      pendingETH: stakingInfo[2][0] / 1e18,
      pendingEsMJAR: stakingInfo[0][0] / 1e18,
      mjarPrice,
    },
    timestamp: parseInt(now / 1000),
    datetime: now.toISOString(),
  };
}

export const tokenDecimals = {
  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": 18, // WOP
  "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB": 18, // WETH
  "0x50b7545627a5162F82A992c33b87aDc75187B218": 8, // BTC
  "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75": 6, // USDC
  "0x049d68029688eAbF473097a2fC38ef61633A3C7A": 6, // USDT
  "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E": 18, // DAI
};

export const tokenSymbols = {
  // Avalanche
  "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7": "WOP",
  "0x49D5c2BdFfac6CE2BFdB6640F4F80f226bc10bAB": "WETH",
  "0x50b7545627a5162F82A992c33b87aDc75187B218": "WBTC",
  "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75": "USDC",
  "0x049d68029688eAbF473097a2fC38ef61633A3C7A": "USDT",
  "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E": "DAI",
};

function getTokenDecimals(token) {
  return tokenDecimals[token] || 18;
}

const knownSwapSources = {
  avalanche: {
    [getAddress(AVALANCHE, "Router")]: "MJAR",
    [getAddress(AVALANCHE, "OrderBook")]: "MJAR",
    [getAddress(AVALANCHE, "PositionManager")]: "MJAR",
    // [getAddress(AVALANCHE, "OrderExecutor")]: "MJAR",
    [getAddress(AVALANCHE, "FastPriceFeed")]: "MJAR",
    [getAddress(AVALANCHE, "PositionExecutorUpKeep")]: "MJAR",
    [getAddress(AVALANCHE, "PositionRouter")]: "MJAR",
  },
};

const defaultFetcher = (url) => fetch(url).then((res) => res.json());
export function useRequest(url, defaultValue, fetcher = defaultFetcher) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState(defaultValue);

  useEffect(async () => {
    try {
      setLoading(true);
      const data = await fetcher(url);
      setData(data);
    } catch (ex) {
      console.error(ex);
      setError(ex);
    }
    setLoading(false);
  }, [url]);

  return [data, loading, error];
}

export function useCoingeckoPrices(symbol, { from = FIRST_DATE_TS } = {}) {
  // token ids https://api.coingecko.com/api/v3/coins
  const _symbol = {
    BTC: "bitcoin",
    ETH: "ethereum",
    AVAX: "avalanche",
    MATIC: "matic-network",
    WBTC: "wrapped-bitcoin",
    USDC: "usd-coin",
    USDT: "tether",
    DAI: "dai",
  }[symbol];

  const now = Date.now() / 1000;
  const days = Math.ceil(now / 86400) - Math.ceil(from / 86400) - 1;

  const url = `https://api.coingecko.com/api/v3/coins/${_symbol}/market_chart?vs_currency=usd&days=${days}&interval=daily`;

  const [res, loading, error] = useRequest(url);

  const data = useMemo(() => {
    if (!res || res.length === 0) {
      return null;
    }

    const ret = res.prices.map((item) => {
      // -1 is for shifting to previous day
      // because CG uses first price of the day, but for MJLP we store last price of the day
      const timestamp = item[0] - 1;
      const groupTs = parseInt(timestamp / 1000 / 86400) * 86400;
      return {
        timestamp: groupTs,
        value: item[1],
      };
    });
    return ret;
  }, [res]);

  return [data, loading, error];
}

function getImpermanentLoss(change) {
  return (2 * Math.sqrt(change)) / (1 + change) - 1;
}

function getChainSubgraph(chainName) {
  // return "chimpydev/stats";
  return "chimpydev/core";
}

export function useGraph(
  querySource,
  { subgraph = null, subgraphUrl = null, chainName = "avalanche" } = {}
) {
  const query = gql(querySource);

  if (!subgraphUrl) {
    if (!subgraph) {
      subgraph = getChainSubgraph(chainName);
    }
    subgraphUrl = `https://api.thegraph.com/subgraphs/name/${subgraph}`;
  }

  const client = new ApolloClient({
    link: new HttpLink({ uri: subgraphUrl, fetch }),
    cache: new InMemoryCache(),
  });
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
  }, [querySource, setLoading]);

  useEffect(() => {
    client
      .query({ query })
      .then((res) => {
        setData(res.data);
        setLoading(false);
      })
      .catch((ex) => {
        console.warn(
          "Subgraph request failed error: %s subgraphUrl: %s",
          ex.message,
          subgraphUrl
        );
        setError(ex);
        setLoading(false);
      });
  }, [querySource, setData, setError, setLoading]);

  return [data, loading, error];
}

export function useLastBlock(chainName = "avalanche") {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    providers[chainName]
      .getBlock()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, []);

  return [data, loading, error];
}

export function useLastSubgraphBlock(chainName = "avalanche") {
  const [data, loading, error] = useGraph(
    `{
    _meta {
      block {
        number
      }
    } 
  }`,
    {
      chainName,
    }
  );
  const [block, setBlock] = useState(null);

  useEffect(() => {
    if (!data) {
      return;
    }

    providers[chainName].getBlock(data._meta.block.number).then((block) => {
      setBlock(block);
    });
  }, [data, setBlock]);

  return [block, loading, error];
}

export function useTradersData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const [closedPositionsData, loading, error] = useGraph(
    `{
    tradingStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { period: "daily", timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      timestamp
      profit
      loss
      profitCumulative
      lossCumulative
      longOpenInterest
      shortOpenInterest
    }
  }`,
    { chainName }
  );
  const [feesData] = useFeesData({ from, to, chainName });
  const marginFeesByTs = useMemo(() => {
    if (
      !feesData ||
      !closedPositionsData ||
      (closedPositionsData && !closedPositionsData.tradingStats.length)
    ) {
      return {};
    }

    let feesCumulative = 0;
    return feesData.reduce((memo, { timestamp, margin: fees }) => {
      feesCumulative += fees;
      memo[timestamp] = {
        fees,
        feesCumulative,
      };
      return memo;
    }, {});
  }, [feesData]);

  let ret = null;
  const data =
    closedPositionsData && closedPositionsData.tradingStats.length > 0
      ? sortBy(closedPositionsData.tradingStats, (i) => i.timestamp).map(
          (dataItem) => {
            const longOpenInterest = dataItem.longOpenInterest / 1e30;
            const shortOpenInterest = dataItem.shortOpenInterest / 1e30;
            const openInterest = longOpenInterest + shortOpenInterest;

            const fees = marginFeesByTs[dataItem.timestamp]?.fees || 0;
            const feesCumulative =
              marginFeesByTs[dataItem.timestamp]?.feesCumulative || 0;

            const profit = dataItem.profit / 1e30;
            const loss = dataItem.loss / 1e30;
            const profitCumulative = dataItem.profitCumulative / 1e30;
            const lossCumulative = dataItem.lossCumulative / 1e30;
            const pnlCumulative = profitCumulative - lossCumulative;
            const pnl = profit - loss;
            return {
              longOpenInterest,
              shortOpenInterest,
              openInterest,
              profit,
              loss: -loss,
              profitCumulative,
              lossCumulative: -lossCumulative,
              pnl,
              pnlCumulative,
              timestamp: dataItem.timestamp,
            };
          }
        )
      : null;

  if (data) {
    const maxProfit = maxBy(data, (item) => item.profit).profit;
    const maxLoss = minBy(data, (item) => item.loss).loss;
    const maxProfitLoss = Math.max(maxProfit, -maxLoss);

    const maxPnl = maxBy(data, (item) => item.pnl).pnl;
    const minPnl = minBy(data, (item) => item.pnl).pnl;
    const maxCumulativePnl = maxBy(
      data,
      (item) => item.pnlCumulative
    ).pnlCumulative;
    const minCumulativePnl = minBy(
      data,
      (item) => item.pnlCumulative
    ).pnlCumulative;

    const profitCumulative = data[data.length - 1].profitCumulative;
    const lossCumulative = data[data.length - 1].lossCumulative;
    const stats = {
      maxProfit,
      maxLoss,
      maxProfitLoss,
      profitCumulative,
      lossCumulative,
      maxCumulativeProfitLoss: Math.max(profitCumulative, -lossCumulative),

      maxAbsOfPnlAndCumulativePnl: Math.max(
        Math.abs(maxPnl),
        Math.abs(maxCumulativePnl),
        Math.abs(minPnl),
        Math.abs(minCumulativePnl)
      ),
    };

    ret = {
      data,
      stats,
    };
  }

  return [ret, loading];
}

function getSwapSourcesFragment(skip = 0, from, to) {
  return `
    hourlyVolumeBySources(
      first: 1000
      skip: ${skip}
      orderBy: timestamp
      orderDirection: desc
      where: { timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      timestamp
      source
      swap
    }
  `;
}
export function useSwapSources({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const query = `{
    a: ${getSwapSourcesFragment(0, from, to)}
    b: ${getSwapSourcesFragment(1000, from, to)}
    c: ${getSwapSourcesFragment(2000, from, to)}
    d: ${getSwapSourcesFragment(3000, from, to)}
    e: ${getSwapSourcesFragment(4000, from, to)}
  }`;
  const [graphData, loading, error] = useGraph(query, { chainName });

  let total = 0;
  let data = useMemo(() => {
    if (!graphData) {
      return null;
    }

    const { a, b, c, d, e } = graphData;
    const all = [...a, ...b, ...c, ...d, ...e];

    const totalVolumeBySource = a.reduce((acc, item) => {
      const source = knownSwapSources[chainName][item.source] || item.source;
      if (!acc[source]) {
        acc[source] = 0;
      }
      acc[source] += item.swap / 1e30;
      return acc;
    }, {});
    const topVolumeSources = new Set(
      Object.entries(totalVolumeBySource)
        .sort((a, b) => b[1] - a[1])
        .map((item) => item[0])
        .slice(0, 30)
    );

    let ret = chain(all)
      .groupBy((item) => parseInt(item.timestamp / 86400) * 86400)
      .map((values, timestamp) => {
        let all = 0;
        const retItem = {
          timestamp: Number(timestamp),
          ...values.reduce((memo, item) => {
            let source =
              knownSwapSources[chainName][item.source] || item.source;
            if (!topVolumeSources.has(source)) {
              source = "Other";
            }
            if (item.swap != 0) {
              const volume = item.swap / 1e30;
              memo[source] = memo[source] || 0;
              memo[source] += volume;
              all += volume;
            }
            return memo;
          }, {}),
        };

        retItem.all = all;

        return retItem;
      })
      .sortBy((item) => item.timestamp)
      .value();

    return ret;
  }, [graphData]);

  return [data, loading, error];
}

function getServerHostname(chainName) {
  return process.env.RAZZLE_MJAR_API_URL;
}

export function useTotalVolumeFromServer() {
  const [data, loading] = useRequest(getServerHostname() + "/total_volume");

  return useMemo(() => {
    if (!data) {
      return [data, loading];
    }

    const total = data.reduce((memo, item) => {
      return memo + parseInt(item.data.volume) / 1e30;
    }, 0);
    return [total, loading];
  }, [data, loading]);
}

export async function getStatsFromSubgraph(graphClient, chainName="avalanche"){
  const queryString = `{
    totalVolumes: volumeStats(where: {period: "total"}) {
      swap
      mint
      burn
      margin
      liquidation
    }
    deltaVolumes: volumeStats(
      first:1
      orderBy: timestamp
      orderDirection: desc
      where: {period: "daily"}
    ) {
      swap
      mint
      burn
      margin
      liquidation
    }
  	totalFees: feeStats(where: {period: "total"}) {
      swap
      mint
      burn
      margin
      liquidation
		}
    deltaFees: feeStats(
      first:1
      orderBy: timestamp
      orderDirection: desc
      where: {period: "daily"}
    ) {
      swap
      mint
      burn
      margin
      liquidation
    }
  }`;

  const query = gql(queryString);
  const { data } = await graphClient.query({query})
  const statsProps = ["totalVolumes", "deltaVolumes", "totalFees", "deltaFees"]
  const methodProps = ["swap", "mint", "burn", "margin", "liquidation"]
  const result = {}
  console.log(data);
  statsProps.forEach((statsProp)=>{
    result[statsProp] = {}
    let total = 0;
    methodProps.forEach((methodProp)=>{
      const statValue = parseInt(data[statsProp][0][methodProp]) / 1e30;
      console.log(statValue);
      result[statsProp][methodProp] = statValue
      total += statValue
    })
    result[statsProp].total = total;
  })
  console.log(result);
  return result;
}

export function useVolumeDataFromServer({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const PROPS = "margin liquidation swap mint burn".split(" ");
  const [data, loading] = useRequest(
    `${getServerHostname(chainName)}/daily_volume`,
    null,
    async (url) => {
      let after;
      const ret = [];
      while (true) {
        const res = await (
          await fetch(url + (after ? `?after=${after}` : ""))
        ).json();
        if (res.length === 0) return ret;
        for (const item of res) {
          if (item.data.timestamp < from) {
            return ret;
          }
          ret.push(item);
        }
        after = res[res.length - 1].id;
      }
    }
  );

  const ret = useMemo(() => {
    if (!data) {
      return null;
    }

    const tmp = data.reduce((memo, item) => {
      const timestamp = item.data.timestamp;
      if (timestamp < from || timestamp > to) {
        return memo;
      }

      let type;
      if (item.data.action === "Swap") {
        type = "swap";
      } else if (item.data.action === "SellUSDM") {
        type = "burn";
      } else if (item.data.action === "BuyUSDM") {
        type = "mint";
      } else if (item.data.action.includes("LiquidatePosition")) {
        type = "liquidation";
      } else {
        type = "margin";
      }
      const volume = Number(item.data.volume) / 1e30;
      memo[timestamp] = memo[timestamp] || {};
      memo[timestamp][type] = memo[timestamp][type] || 0;
      memo[timestamp][type] += volume;
      return memo;
    }, {});

    let cumulative = 0;
    const cumulativeByTs = {};
    return Object.keys(tmp)
      .sort()
      .map((timestamp) => {
        const item = tmp[timestamp];
        let all = 0;

        let movingAverageAll;
        const movingAverageTs = timestamp - MOVING_AVERAGE_PERIOD;
        if (movingAverageTs in cumulativeByTs) {
          movingAverageAll =
            (cumulative - cumulativeByTs[movingAverageTs]) /
            MOVING_AVERAGE_DAYS;
        }

        PROPS.forEach((prop) => {
          if (item[prop]) all += item[prop];
        });
        cumulative += all;
        cumulativeByTs[timestamp] = cumulative;
        return {
          timestamp,
          all,
          cumulative,
          movingAverageAll,
          ...item,
        };
      });
  }, [data, from, to]);

  return [ret, loading];
}

export function useUsersData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const query = `{
    userStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { period: "daily", timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      uniqueCount
      uniqueSwapCount
      uniqueMarginCount
      uniqueMintBurnCount
      uniqueCountCumulative
      uniqueSwapCountCumulative
      uniqueMarginCountCumulative
      uniqueMintBurnCountCumulative
      actionCount
      actionSwapCount
      actionMarginCount
      actionMintBurnCount
      timestamp
    }
  }`;
  const [graphData, loading, error] = useGraph(query, { chainName });

  const prevUniqueCountCumulative = {};
  const data = graphData
    ? sortBy(graphData.userStats, "timestamp").map((item) => {
        const newCountData = ["", "Swap", "Margin", "MintBurn"].reduce(
          (memo, type) => {
            memo[`new${type}Count`] = prevUniqueCountCumulative[type]
              ? item[`unique${type}CountCumulative`] -
                prevUniqueCountCumulative[type]
              : item[`unique${type}Count`];
            prevUniqueCountCumulative[type] =
              item[`unique${type}CountCumulative`];
            return memo;
          },
          {}
        );
        const oldCount = item.uniqueCount - newCountData.newCount;
        const oldPercent = ((oldCount / item.uniqueCount) * 100).toFixed(1);
        return {
          all: item.uniqueCount,
          uniqueSum:
            item.uniqueSwapCount +
            item.uniqueMarginCount +
            item.uniqueMintBurnCount,
          oldCount,
          oldPercent,
          ...newCountData,
          ...item,
        };
      })
    : null;

  return [data, loading, error];
}

export function useFundingRateData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const query = `{
    fundingRates(
      first: 1000,
      orderBy: timestamp,
      orderDirection: desc,
      where: { period: "daily", id_gte: ${from}, id_lte: ${to} }
    ) {
      id,
      token,
      timestamp,
      startFundingRate,
      startTimestamp,
      endFundingRate,
      endTimestamp
    }
  }`;
  const [graphData, loading, error] = useGraph(query, { chainName });

  const data = useMemo(() => {
    if (!graphData) {
      return null;
    }

    const groups = graphData.fundingRates.reduce((memo, item) => {
      const symbol = tokenSymbols[item.token];
      memo[item.timestamp] = memo[item.timestamp] || {
        timestamp: item.timestamp,
      };
      const group = memo[item.timestamp];
      const timeDelta =
        parseInt((item.endTimestamp - item.startTimestamp) / 3600) * 3600;

      let fundingRate = 0;
      if (item.endFundingRate && item.startFundingRate) {
        const fundingDelta = item.endFundingRate - item.startFundingRate;
        const divisor = timeDelta / 86400;
        fundingRate = (fundingDelta / divisor / 10000) * 365;
      }
      group[symbol] = fundingRate;
      return memo;
    }, {});

    return fillNa(sortBy(Object.values(groups), "timestamp"), [
      "AVAX",
      "ETH",
      "USDC",
      "USDT",
      "BTC",
      "DAI",
    ]);
  }, [graphData]);

  return [data, loading, error];
}

const MOVING_AVERAGE_DAYS = 7;
const MOVING_AVERAGE_PERIOD = 86400 * MOVING_AVERAGE_DAYS;

export function useVolumeData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const PROPS = "margin liquidation swap mint burn".split(" ");
  const timestampProp = "timestamp";
  const query = `{
    volumeStats(
      first: 1000,
      orderBy: timestamp,
      orderDirection: desc
      where: { period: daily, timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      timestamp
      ${PROPS.join("\n")}
    }
  }`;
  const [graphData, loading, error] = useGraph(query, { chainName });

  const data = useMemo(() => {
    if (!graphData) {
      return null;
    }

    let ret = sortBy(graphData.volumeStats, timestampProp).map((item) => {
      const ret = { timestamp: item[timestampProp] };
      let all = 0;
      PROPS.forEach((prop) => {
        ret[prop] = item[prop] / 1e30;
        all += ret[prop];
      });
      ret.all = all;
      return ret;
    });

    let cumulative = 0;
    const cumulativeByTs = {};
    return ret.map((item) => {
      cumulative += item.all;

      let movingAverageAll;
      const movingAverageTs = item.timestamp - MOVING_AVERAGE_PERIOD;
      if (movingAverageTs in cumulativeByTs) {
        movingAverageAll =
          (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS;
      }

      return {
        movingAverageAll,
        cumulative,
        ...item,
      };
    });
  }, [graphData]);

  let total;

  if(data&&data.length)
    total = data[data.length-1].cumulative;



  return [data,total, loading, error];
}

export function useFeesData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const PROPS = "margin liquidation swap mint burn".split(" ");
  const feesQuery = `{
    feeStats(
      first: 1000
      orderBy: id
      orderDirection: desc
      where: { period: daily, timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      id
      margin
      marginAndLiquidation
      swap
      mint
      burn
      timestamp
    }
  }`;

  let [feesData, loading, error] = useGraph(feesQuery, { chainName });

  const feesChartData = useMemo(() => {
    if (!feesData || (feesData && feesData.feeStats.length === 0)) {
      return null;
    }

    let chartData = sortBy(feesData.feeStats, "id").map((item) => {
      const ret = { timestamp: item.timestamp || item.id };

      PROPS.forEach((prop) => {
        if (item[prop]) {
          ret[prop] = item[prop] / 1e30;
        }
      });

      ret.liquidation = item.marginAndLiquidation / 1e30 - item.margin / 1e30;
      ret.all = PROPS.reduce((memo, prop) => memo + ret[prop], 0);
      return ret;
    });

    let cumulative = 0;
    const cumulativeByTs = {};
    return chain(chartData)
      .groupBy((item) => item.timestamp)
      .map((values, timestamp) => {
        const all = sumBy(values, "all");
        cumulative += all;

        let movingAverageAll;
        const movingAverageTs = timestamp - MOVING_AVERAGE_PERIOD;
        if (movingAverageTs in cumulativeByTs) {
          movingAverageAll =
            (cumulative - cumulativeByTs[movingAverageTs]) /
            MOVING_AVERAGE_DAYS;
        }

        const ret = {
          timestamp: Number(timestamp),
          all,
          cumulative,
          movingAverageAll,
        };
        PROPS.forEach((prop) => {
          ret[prop] = sumBy(values, prop);
        });
        cumulativeByTs[timestamp] = cumulative;
        return ret;
      })
      .value()
      .filter((item) => item.timestamp >= from);
  }, [feesData]);

  return [feesChartData, loading, error];
}

export function useAumPerformanceData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  groupPeriod,
}) {
  const [feesData, feesLoading] = useFeesData({ from, to, groupPeriod });
  const [mjlpData, mjlpLoading] = useMjlpData({ from, to, groupPeriod });
  const [volumeData, volumeLoading] = useVolumeData({ from, to, groupPeriod });

  const dailyCoef = 86400 / groupPeriod;

  const data = useMemo(() => {
    if (!feesData || !mjlpData || !volumeData) {
      return null;
    }

    const ret = feesData.map((feeItem, i) => {
      const mjlpItem = mjlpData[i];
      const volumeItem = volumeData[i];
      let apr =
        feeItem?.all && mjlpItem?.aum
          ? (feeItem.all / mjlpItem.aum) * 100 * 365 * dailyCoef
          : null;
      if (apr > 10000) {
        apr = null;
      }
      let usage =
        volumeItem?.all && mjlpItem?.aum
          ? (volumeItem.all / mjlpItem.aum) * 100 * dailyCoef
          : null;
      if (usage > 10000) {
        usage = null;
      }

      return {
        timestamp: feeItem.timestamp,
        apr,
        usage,
      };
    });
    const averageApr =
      ret.reduce((memo, item) => item.apr + memo, 0) / ret.length;
    ret.forEach((item) => (item.averageApr = averageApr));
    const averageUsage =
      ret.reduce((memo, item) => item.usage + memo, 0) / ret.length;
    ret.forEach((item) => (item.averageUsage = averageUsage));
    return ret;
  }, [feesData, mjlpData, volumeData]);

  return [data, feesLoading || mjlpLoading || volumeLoading];
}

export function useMjlpData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const query = `{
    mjlpStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: {period: daily, timestamp_gte: ${from}, timestamp_lte: ${to}}
    ) {
      timestamp
      aumInUsdm
      mjlpSupply
      distributedUsd
      distributedEth
    }
  }`;
  let [data, loading, error] = useGraph(query, { chainName });

  let cumulativeDistributedUsdPerMjlp = 0;
  let cumulativeDistributedEthPerMjlp = 0;
  const mjlpChartData = useMemo(() => {
    if (!data || (data && data.mjlpStats.length === 0)) {
      return null;
    }

    const getTimestamp = (item) => item.timestamp;

    let prevMjlpSupply;
    let prevAum;

    let ret = sortBy(data.mjlpStats, (item) => item.timestamp)
      .filter((item) => item.timestamp % 86400 === 0)
      .reduce((memo, item) => {
        const last = memo[memo.length - 1];

        const aum = Number(item.aumInUsdm) / 1e18;
        const mjlpSupply = Number(item.mjlpSupply) / 1e18;

        const distributedUsd = Number(item.distributedUsd) / 1e30;
        const distributedUsdPerMjlp = distributedUsd / mjlpSupply || 0;
        cumulativeDistributedUsdPerMjlp += distributedUsdPerMjlp;

        const distributedEth = Number(item.distributedEth) / 1e18;
        const distributedEthPerMjlp = distributedEth / mjlpSupply || 0;
        cumulativeDistributedEthPerMjlp += distributedEthPerMjlp;

        const mjlpPrice = aum / mjlpSupply;
        const timestamp = parseInt(item.timestamp);

        const newItem = {
          timestamp,
          aum,
          mjlpSupply,
          mjlpPrice,
          cumulativeDistributedEthPerMjlp,
          cumulativeDistributedUsdPerMjlp,
          distributedUsdPerMjlp,
          distributedEthPerMjlp,
        };

        if (last && last.timestamp === timestamp) {
          memo[memo.length - 1] = newItem;
        } else {
          memo.push(newItem);
        }

        return memo;
      }, [])
      .map((item) => {
        let { mjlpSupply, aum } = item;
        if (!mjlpSupply) {
          mjlpSupply = prevMjlpSupply;
        }
        if (!aum) {
          aum = prevAum;
        }
        item.mjlpSupplyChange = prevMjlpSupply
          ? ((mjlpSupply - prevMjlpSupply) / prevMjlpSupply) * 100
          : 0;
        if (item.mjlpSupplyChange > 1000) item.mjlpSupplyChange = 0;
        item.aumChange = prevAum ? ((aum - prevAum) / prevAum) * 100 : 0;
        if (item.aumChange > 1000) item.aumChange = 0;
        prevMjlpSupply = mjlpSupply;
        prevAum = aum;
        return item;
      });

    ret = fillNa(ret);
    return ret;
  }, [data]);

  return [mjlpChartData, loading, error];
}

export function useMjlpPerformanceData(
  mjlpData,
  feesData,
  { from = FIRST_DATE_TS, chainName = "avalanche" } = {}
) {
  const [btcPrices] = useCoingeckoPrices("BTC", { from });
  const [ethPrices] = useCoingeckoPrices("ETH", { from });
  const [maticPrices] = useCoingeckoPrices("AVAX", { from });

  const mjlpPerformanceChartData = useMemo(() => {
    if (!btcPrices || !ethPrices || !mjlpData || !feesData) {
      return null;
    }

    const mjlpDataById = mjlpData.reduce((memo, item) => {
      memo[item.timestamp] = item;
      return memo;
    }, {});

    const feesDataById = feesData.reduce((memo, item) => {
      memo[item.timestamp] = item;
      return memo;
    });

    let BTC_WEIGHT = 0.15;
    let ETH_WEIGHT = 0.2;
    let AVAX_WEIGHT = 0.1;


    let prevEthPrice = 1200;
    let prevMaticPrice = 0.4;

    const STABLE_WEIGHT = 0.5;
    const MJLP_START_PRICE =
      mjlpDataById[btcPrices[0].timestamp]?.mjlpPrice || 1.19;

    const btcFirstPrice = btcPrices[0]?.value;
    const ethFirstPrice = ethPrices[0]?.value;
    const maticFirstPrice = ( maticPrices && maticPrices[0] && maticPrices[0].value ) || prevMaticPrice;

    const indexBtcCount = (MJLP_START_PRICE * BTC_WEIGHT) / btcFirstPrice;
    const indexEthCount = (MJLP_START_PRICE * ETH_WEIGHT) / ethFirstPrice;
    const indexMaticCount = (MJLP_START_PRICE * AVAX_WEIGHT) / maticFirstPrice;

    const lpBtcCount = (MJLP_START_PRICE * 0.5) / btcFirstPrice;
    const lpEthCount = (MJLP_START_PRICE * 0.5) / ethFirstPrice;
    const lpMaticCount = (MJLP_START_PRICE * 0.5) / maticFirstPrice;

    const ret = [];
    let cumulativeFeesPerMjlp = 0;
    let cumulativeEsmjarRewardsPerMjlp = 0;
    let lastMjlpPrice = 0;

    for (let i = 0; i < btcPrices.length; i++) {
      const btcPrice = btcPrices[i].value;
      const ethPrice = ethPrices[i]?.value || prevEthPrice;
      const maticPrice = ( maticPrices && maticPrices[i] && maticPrices[i].value ) || prevMaticPrice;
      prevMaticPrice = maticPrice;
      prevEthPrice = ethPrice;

      const timestampGroup = parseInt(btcPrices[i].timestamp / 86400) * 86400;
      const mjlpItem = mjlpDataById[timestampGroup];
      const mjlpPrice = mjlpItem?.mjlpPrice ?? lastMjlpPrice;
      lastMjlpPrice = mjlpPrice;
      const mjlpSupply = mjlpDataById[timestampGroup]?.mjlpSupply;
      const dailyFees = feesDataById[timestampGroup]?.all;

      const syntheticPrice =
        indexBtcCount * btcPrice +
        indexEthCount * ethPrice +
        indexMaticCount * maticPrice +
        MJLP_START_PRICE * STABLE_WEIGHT;

      const lpBtcPrice =
        (lpBtcCount * btcPrice + MJLP_START_PRICE / 2) *
        (1 + getImpermanentLoss(btcPrice / btcFirstPrice));
      const lpEthPrice =
        (lpEthCount * ethPrice + MJLP_START_PRICE / 2) *
        (1 + getImpermanentLoss(ethPrice / ethFirstPrice));
      const lpMaticPrice =
        (lpMaticCount * maticPrice + MJLP_START_PRICE / 2) *
        (1 + getImpermanentLoss(maticPrice / maticFirstPrice));

      if (dailyFees && mjlpSupply) {
        const INCREASED_MJLP_REWARDS_TIMESTAMP = 1635714000;
        const MJLP_REWARDS_SHARE =
          timestampGroup >= INCREASED_MJLP_REWARDS_TIMESTAMP ? 0.7 : 0.5;
        const collectedFeesPerMjlp =
          (dailyFees / mjlpSupply) * MJLP_REWARDS_SHARE;
        cumulativeFeesPerMjlp += collectedFeesPerMjlp;

        cumulativeEsmjarRewardsPerMjlp += (mjlpPrice * 0.8) / 365;
      }

      let mjlpPlusFees = mjlpPrice;
      if (mjlpPrice && mjlpSupply && cumulativeFeesPerMjlp) {
        mjlpPlusFees = mjlpPrice + cumulativeFeesPerMjlp;
      }

      let mjlpApr;
      let mjlpPlusDistributedUsd;
      let mjlpPlusDistributedEth;
      if (mjlpItem) {
        if (mjlpItem.cumulativeDistributedUsdPerMjlp) {
          mjlpPlusDistributedUsd =
            mjlpPrice + mjlpItem.cumulativeDistributedUsdPerMjlp;
          // mjlpApr = mjlpItem.distributedUsdPerMjlp / mjlpPrice * 365 * 100 // incorrect?
        }
        if (mjlpItem.cumulativeDistributedEthPerMjlp) {
          mjlpPlusDistributedEth =
            mjlpPrice + mjlpItem.cumulativeDistributedEthPerMjlp * ethPrice;
        }
      }

      ret.push({
        timestamp: btcPrices[i].timestamp,
        syntheticPrice,
        lpBtcPrice,
        lpEthPrice,
        lpMaticPrice,
        mjlpPrice,
        btcPrice,
        ethPrice,
        mjlpPlusFees,
        mjlpPlusDistributedUsd,
        mjlpPlusDistributedEth,

        performanceLpEth: ((mjlpPrice / lpEthPrice) * 100).toFixed(1),
        performanceLpEthCollectedFees: (
          (mjlpPlusFees / lpEthPrice) *
          100
        ).toFixed(1),
        performanceLpEthDistributedUsd: (
          (mjlpPlusDistributedUsd / lpEthPrice) *
          100
        ).toFixed(1),
        performanceLpEthDistributedEth: (
          (mjlpPlusDistributedEth / lpEthPrice) *
          100
        ).toFixed(1),

        performanceLpBtcCollectedFees: (
          (mjlpPlusFees / lpBtcPrice) *
          100
        ).toFixed(1),

        performanceSynthetic: ((mjlpPrice / syntheticPrice) * 100).toFixed(1),
        performanceSyntheticCollectedFees: (
          (mjlpPlusFees / syntheticPrice) *
          100
        ).toFixed(1),
        performanceSyntheticDistributedUsd: (
          (mjlpPlusDistributedUsd / syntheticPrice) *
          100
        ).toFixed(1),
        performanceSyntheticDistributedEth: (
          (mjlpPlusDistributedEth / syntheticPrice) *
          100
        ).toFixed(1),

        mjlpApr,
      });
    }

    return ret;
  }, [btcPrices, ethPrices, mjlpData, feesData]);

  return [mjlpPerformanceChartData];
}

export function useReferralsData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "avalanche",
} = {}) {
  const query = `{
    globalStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: { period: "daily", timestamp_gte: ${from}, timestamp_lte: ${to} }
    ) {
      volume
      volumeCumulative
      totalRebateUsd
      totalRebateUsdCumulative
      discountUsd
      discountUsdCumulative
      referrersCount
      referrersCountCumulative
      referralCodesCount
      referralCodesCountCumulative
      referralsCount
      referralsCountCumulative
      timestamp
    }
  }`;

  const subgraph = process.env.RAZZLE_REFERRAL_SUBGRAPH_URL;
  const [graphData, loading, error] = useGraph(query, { subgraph });

  const data = graphData
    ? sortBy(graphData.globalStats, "timestamp").map((item) => {
        const totalRebateUsd = item.totalRebateUsd / 1e30;
        const discountUsd = item.discountUsd / 1e30;
        return {
          ...item,
          volume: item.volume / 1e30,
          volumeCumulative: item.volumeCumulative / 1e30,
          totalRebateUsd,
          totalRebateUsdCumulative: item.totalRebateUsdCumulative / 1e30,
          discountUsd,
          referrerRebateUsd: totalRebateUsd - discountUsd,
          discountUsdCumulative: item.discountUsdCumulative / 1e30,
          referralCodesCount: parseInt(item.referralCodesCount),
          referralCodesCountCumulative: parseInt(
            item.referralCodesCountCumulative
          ),
          referrersCount: parseInt(item.referrersCount),
          referrersCountCumulative: parseInt(item.referrersCountCumulative),
          referralsCount: parseInt(item.referralsCount),
          referralsCountCumulative: parseInt(item.referralsCountCumulative),
        };
      })
    : null;

  return [data, loading, error];
}
