exports.id = "server";
exports.modules = {

/***/ "./src/views/Optimism.js":
/*!*******************************!*\
  !*** ./src/views/Optimism.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! moment */ "moment");
/* harmony import */ var moment__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(moment__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-icons/ri */ "react-icons/ri");
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! recharts */ "recharts");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ChartWrapper */ "./src/components/ChartWrapper.js");
/* harmony import */ var _components_VolumeChart__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/VolumeChart */ "./src/components/VolumeChart.js");
/* harmony import */ var _components_FeesChart__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/FeesChart */ "./src/components/FeesChart.js");
/* harmony import */ var _components_GenericChart__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../components/GenericChart */ "./src/components/GenericChart.js");
/* harmony import */ var _dataProvider__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../dataProvider */ "./src/dataProvider.js");
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\views\\Optimism.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }












const {
  BigNumber
} = ethers__WEBPACK_IMPORTED_MODULE_1__;
const {
  formatUnits
} = ethers__WEBPACK_IMPORTED_MODULE_1__["utils"];
const NOW = Math.floor(Date.now() / 1000);
function Optimism(props) {
  const DEFAULT_GROUP_PERIOD = 86400;
  const {
    0: groupPeriod,
    1: setGroupPeriod
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(DEFAULT_GROUP_PERIOD);
  const {
    0: fromValue,
    1: setFromValue
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: toValue,
    1: setToValue
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    mode
  } = props;
  const setDateRange = Object(react__WEBPACK_IMPORTED_MODULE_0__["useCallback"])(range => {
    setFromValue(new Date(Date.now() - range * 1000).toISOString().slice(0, 10));
    setToValue(undefined);
  }, [setFromValue, setToValue]);
  const from = fromValue ? +new Date(fromValue) / 1000 : undefined;
  const to = toValue ? +new Date(toValue) / 1000 : NOW;
  const params = {
    from,
    to,
    groupPeriod
  };
  const [fundingRateData, fundingRateLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useFundingRateData"])(params);
  // const [volumeData, volumeLoading] = useVolumeDataFromServer(params);
  const [volumeData, totalVolume, volumeLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useVolumeData"])(params);
  //const [totalVolume] = useTotalVolumeFromServer();
  const totalVolumeDelta = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!volumeData || volumeData.length == 0) {
      return null;
    }
    return volumeData[volumeData.length - 1].all;
  }, [volumeData]);
  const [feesData, feesLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useFeesData"])(params);
  const {
    0: totalFees,
    1: totalFeesDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _feesData, _feesData2;
    if (!feesData) {
      return [];
    }
    const total = (_feesData = feesData[feesData.length - 1]) === null || _feesData === void 0 ? void 0 : _feesData.cumulative;
    const delta = total - ((_feesData2 = feesData[feesData.length - 2]) === null || _feesData2 === void 0 ? void 0 : _feesData2.cumulative);
    return [total, delta];
  }, [feesData]);
  const [mjlpData, mjlpLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useMjlpData"])(params);
  const {
    0: totalAum,
    1: totalAumDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _mjlpData, _mjlpData2;
    if (!mjlpData) {
      return [];
    }
    const total = (_mjlpData = mjlpData[mjlpData.length - 1]) === null || _mjlpData === void 0 ? void 0 : _mjlpData.aum;
    const delta = total - ((_mjlpData2 = mjlpData[mjlpData.length - 2]) === null || _mjlpData2 === void 0 ? void 0 : _mjlpData2.aum);
    return [total, delta];
  }, [mjlpData]);
  const [aumPerformanceData, aumPerformanceLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useAumPerformanceData"])(params);
  const [mjlpPerformanceData, mjlpPerformanceLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useMjlpPerformanceData"])(mjlpData, feesData, params);
  const [tradersData, tradersLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useTradersData"])(params);
  const {
    0: openInterest,
    1: openInterestDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _tradersData$data, _tradersData$data2;
    if (!tradersData) {
      return [];
    }
    const total = (_tradersData$data = tradersData.data[tradersData.data.length - 1]) === null || _tradersData$data === void 0 ? void 0 : _tradersData$data.openInterest;
    const delta = total - ((_tradersData$data2 = tradersData.data[tradersData.data.length - 2]) === null || _tradersData$data2 === void 0 ? void 0 : _tradersData$data2.openInterest);
    return [total, delta];
  }, [tradersData]);
  const [swapSources, swapSourcesLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useSwapSources"])(params);
  const swapSourcesKeys = Object.keys((swapSources || []).reduce((memo, el) => {
    Object.keys(el).forEach(key => {
      if (key === "all" || key === "timestamp") return;
      memo[key] = true;
    });
    return memo;
  }, {}));
  const [usersData, usersLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useUsersData"])(params);
  const {
    0: totalUsers,
    1: totalUsersDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _usersData, _usersData2;
    if (!usersData) {
      return [null, null];
    }
    const total = (_usersData = usersData[usersData.length - 1]) === null || _usersData === void 0 ? void 0 : _usersData.uniqueCountCumulative;
    const prevTotal = (_usersData2 = usersData[usersData.length - 2]) === null || _usersData2 === void 0 ? void 0 : _usersData2.uniqueCountCumulative;
    const delta = total && prevTotal ? total - prevTotal : null;
    return [total, delta];
  }, [usersData]);
  const [lastSubgraphBlock] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useLastSubgraphBlock"])();
  const [lastBlock] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useLastBlock"])();
  const isObsolete = lastSubgraphBlock && lastBlock && lastBlock.timestamp - lastSubgraphBlock.timestamp > 3600;
  const {
    0: isExperiment,
    1: setIsExperiment
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(false);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setIsExperiment(window.localStorage.getItem("experiment"));
  }, [setIsExperiment]);
  const showForm = false;
  return __jsx("div", {
    className: "Home",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 5
    }
  }, __jsx("h1", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 7
    }
  }, "Analytics / Optimism"), lastSubgraphBlock && lastBlock && __jsx("p", {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("page-description", {
      warning: isObsolete
    }),
    style: {
      marginTop: "-1rem"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 9
    }
  }, isObsolete && "Data is obsolete. ", "Updated ", moment__WEBPACK_IMPORTED_MODULE_2___default()(lastSubgraphBlock.timestamp * 1000).fromNow(), "\xA0at block", " ", __jsx("a", {
    target: "_blank",
    href: `https://optimistic.etherscan.io/block/${lastSubgraphBlock.number}`,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 192,
      columnNumber: 11
    }
  }, lastSubgraphBlock.number)), showForm && __jsx("div", {
    className: "form",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 201,
      columnNumber: 9
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 202,
      columnNumber: 11
    }
  }, __jsx("label", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 203,
      columnNumber: 13
    }
  }, "Period"), __jsx("input", {
    type: "date",
    value: fromValue,
    onChange: evt => setFromValue(evt.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 204,
      columnNumber: 13
    }
  }), "\xA0\u2014\xA0", __jsx("input", {
    type: "date",
    value: toValue,
    onChange: evt => setToValue(evt.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 210,
      columnNumber: 13
    }
  }), __jsx("button", {
    onClick: evt => setDateRange(86400 * 29),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 13
    }
  }, "30 days"), __jsx("button", {
    onClick: evt => setDateRange(86400 * 6),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 13
    }
  }, "7 days"))), __jsx("div", {
    className: "chart-grid",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 7
    }
  }, __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 9
    }
  }, totalVolume ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 15
    }
  }, "Total Volume"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalVolume, {
    currency: true
  }), totalVolumeDelta && __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 228,
      columnNumber: 19
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalVolumeDelta, {
    currency: true,
    compact: true
  })))) : volumeLoading ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 13
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 245,
      columnNumber: 15
    }
  }, "Total Volume"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 246,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(0, {
    currency: true
  })))), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 9
    }
  }, totalFees ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 15
    }
  }, "Total Fees"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalFees, {
    currency: true
  }), __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 17
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalFeesDelta, {
    currency: true,
    compact: true
  })))) : feesLoading ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 13
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 274,
      columnNumber: 15
    }
  }, "Total Fees"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 275,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(0, {
    currency: true
  })))), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 281,
      columnNumber: 9
    }
  }, totalAum ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 284,
      columnNumber: 15
    }
  }, "MJLP Pool"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 285,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalAum, {
    currency: true
  }), __jsx("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("total-stat-delta", totalAumDelta > 0 ? "plus" : "minus"),
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 287,
      columnNumber: 17
    }
  }, totalAumDelta > 0 ? "+" : "", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalAumDelta, {
    currency: true,
    compact: true
  })))) : __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 303,
      columnNumber: 13
    }
  })), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 306,
      columnNumber: 9
    }
  }, totalUsers ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 309,
      columnNumber: 15
    }
  }, "Total Users"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 310,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalUsers), __jsx("span", {
    className: "total-stat-delta plus",
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 312,
      columnNumber: 17
    }
  }, "+", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(totalUsersDelta)))) : usersLoading ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 321,
      columnNumber: 13
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 324,
      columnNumber: 15
    }
  }, "Total Users"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 325,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(0)))), __jsx("div", {
    className: "chart-cell stats",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 329,
      columnNumber: 9
    }
  }, openInterest ? __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 332,
      columnNumber: 15
    }
  }, "Open Interest"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 333,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(openInterest, {
    currency: true
  }), __jsx("span", {
    className: classnames__WEBPACK_IMPORTED_MODULE_4___default()("total-stat-delta", openInterestDelta > 0 ? "plus" : "minus"),
    title: "Change since previous day",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 335,
      columnNumber: 17
    }
  }, openInterestDelta > 0 ? "+" : "", Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(openInterestDelta, {
    currency: true,
    compact: true
  })))) : tradersLoading ? __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_3__["RiLoader5Fill"], {
    size: "3em",
    className: "loader",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 351,
      columnNumber: 13
    }
  }) : __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    className: "total-stat-label",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 354,
      columnNumber: 15
    }
  }, "Open Interest"), __jsx("div", {
    className: "total-stat-value",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 355,
      columnNumber: 15
    }
  }, Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["formatNumber"])(0, {
    currency: true
  })))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 361,
      columnNumber: 9
    }
  }, __jsx(_components_VolumeChart__WEBPACK_IMPORTED_MODULE_8__["default"], {
    data: volumeData,
    loading: volumeLoading,
    chartHeight: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    yaxisWidth: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    xaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatter"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 362,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 373,
      columnNumber: 9
    }
  }, __jsx(_components_FeesChart__WEBPACK_IMPORTED_MODULE_9__["default"], {
    data: feesData,
    loading: feesLoading,
    chartHeight: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    yaxisWidth: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    xaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatter"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 374,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 385,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "MJAR & Mjlp Supply",
    loading: mjlpLoading,
    data: mjlpData,
    csvFields: [{
      key: "aum"
    }, {
      key: "mjlpSupply"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 386,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 392,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 393,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 394,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 395,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "aum",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 400,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 405,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 410,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    strokeWidth: 2,
    unit: "$",
    dot: false,
    dataKey: "aum",
    stackId: "a",
    name: "MJAR",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 411,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    strokeWidth: 2,
    dot: false,
    dataKey: "mjlpSupply",
    stackId: "a",
    name: "MJLP Supply",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 422,
      columnNumber: 17
    }
  }))))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 437,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Mjlp Performance",
    loading: mjlpLoading,
    data: mjlpPerformanceData,
    csvFields: [{
      key: "syntheticPrice"
    }, {
      key: "mjlpPrice"
    }, {
      key: "mjlpPlusFees"
    }, {
      key: "lpBtcPrice"
    }, {
      key: "lpEthPrice"
    }, {
      key: "performanceSyntheticCollectedFees"
    }, {
      key: "indexBtcCount"
    }, {
      key: "indexEthCount"
    }, {
      key: "indexAvaxCount"
    }, {
      key: "indexStableCount"
    }, {
      key: "BTC_WEIGHT"
    }, {
      key: "ETH_WEIGHT"
    }, {
      key: "OP_WEIGHT"
    }, {
      key: "STABLE_WEIGHT"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 438,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 459,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpPerformanceData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 460,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 461,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 462,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "performanceSyntheticCollectedFees",
    domain: [80, 180],
    unit: "%",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 467,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 474,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 479,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    dataKey: "performanceLpBtcCollectedFees",
    name: "% LP BTC-USDC (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 480,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    dataKey: "performanceLpEthCollectedFees",
    name: "% LP ETH-USDC (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 489,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    dataKey: "performanceSyntheticCollectedFees",
    name: "% Index (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 498,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 509,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 510,
      columnNumber: 15
    }
  }, __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 511,
      columnNumber: 17
    }
  }, "% of Index (with fees)"), " ", "is MJLP with fees / Index Price * 100. Index is a basket of 25% BTC, 25% ETH, 50% USDC rebalanced once\xA0a\xA0day", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 514,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 515,
      columnNumber: 17
    }
  }, "% of LP ETH-USDC (with fees)"), " ", "is MJLP Price with fees / LP ETH-USDC * 100", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 519,
      columnNumber: 17
    }
  }))))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 525,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Mjlp Price Comparison",
    loading: mjlpLoading,
    data: mjlpPerformanceData,
    csvFields: [{
      key: "syntheticPrice"
    }, {
      key: "mjlpPrice"
    }, {
      key: "mjlpPlusFees"
    }, {
      key: "lpBtcPrice"
    }, {
      key: "lpEthPrice"
    }, {
      key: "performanceSyntheticCollectedFees"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 526,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 539,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpPerformanceData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 540,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 541,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 542,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "performanceSyntheticCollectedFees",
    domain: [60, 210],
    unit: "%",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 547,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "mjlpPrice",
    domain: [0.4, 1.7],
    orientation: "right",
    yAxisId: "right",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 554,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 562,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 567,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpBtcCollectedFees",
    name: "% LP BTC-USDC (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 568,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEthCollectedFees",
    name: "% LP ETH-USDC (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 578,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    dot: false,
    isAnimationActive: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSyntheticCollectedFees",
    name: "% Index (w/ fees)",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 588,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "syntheticPrice",
    name: "Index Price",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 599,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "mjlpPrice",
    name: "Mjlp Price",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 610,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "mjlpPlusFees",
    name: "Mjlp w/ fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][3],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 621,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "lpBtcPrice",
    name: "LP BTC-USDC",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 632,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    type: "monotone",
    unit: "$",
    strokeWidth: 1,
    yAxisId: "right",
    dot: false,
    dataKey: "lpEthPrice",
    name: "LP ETH-USDC",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 643,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 656,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 657,
      columnNumber: 15
    }
  }, __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][3]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 658,
      columnNumber: 17
    }
  }, "Mjlp with fees"), " is based on MJLP share of fees received and excluding esMJAR rewards", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 660,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 661,
      columnNumber: 17
    }
  }, "% of Index (with fees)"), " ", "is Mjlp with fees / Index Price * 100", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 665,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 666,
      columnNumber: 17
    }
  }, "% of LP ETH-USDC (with fees)"), " ", "is Mjlp Price with fees / LP ETH-USDC * 100", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 670,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 671,
      columnNumber: 17
    }
  }, "Index Price"), " is 25% BTC, 25% ETH, 50% USDC")))), isExperiment && __jsx("div", {
    className: "chart-cell experiment",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 678,
      columnNumber: 11
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Performance vs. Index",
    loading: mjlpLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 679,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 680,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpPerformanceData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 681,
      columnNumber: 17
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 682,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 683,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "performanceSyntheticCollectedFees",
    domain: [80, 120],
    unit: "%",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 688,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 695,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 700,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSyntheticCollectedFees",
    name: "Collected Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 701,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSyntheticDistributedUsd",
    name: "Distributed Usd",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 711,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSyntheticDistributedEth",
    name: "Distributed Eth",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 721,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceSynthetic",
    name: "No Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][3],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 731,
      columnNumber: 19
    }
  }))))), isExperiment && __jsx("div", {
    className: "chart-cell experiment",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 747,
      columnNumber: 11
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Performance vs. ETH LP",
    loading: mjlpLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 748,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 749,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: mjlpPerformanceData,
    syncId: "syncMjlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 750,
      columnNumber: 17
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 751,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 752,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    dataKey: "performanceLpEthCollectedFees",
    domain: [80, 120],
    unit: "%",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 757,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 764,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 769,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEthCollectedFees",
    name: "Collected Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 770,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEthDistributedUsd",
    name: "Distributed Usd",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][1],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 780,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEthDistributedEth",
    name: "Distributed Eth",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 790,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    isAnimationActive: false,
    dot: false,
    type: "monotone",
    unit: "%",
    strokeWidth: 2,
    dataKey: "performanceLpEth",
    name: "No Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][3],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 800,
      columnNumber: 19
    }
  }))))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 815,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Traders Net PnL",
    loading: tradersLoading,
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    csvFields: [{
      key: "pnl",
      name: "Net PnL"
    }, {
      key: "pnlCumulative",
      name: "Cumulative PnL"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 816,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    syncId: "tradersId",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 825,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ComposedChart"], {
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 830,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 831,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 832,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    domain: [-(tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxAbsOfPnlAndCumulativePnl) * 1.05, (tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxAbsOfPnlAndCumulativePnl) * 1.05],
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 837,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatter"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 845,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 850,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Bar"], {
    type: "monotone",
    fill: mode == "dark" ? "#FFFFFF" : "#000000",
    dot: false,
    dataKey: "pnl",
    name: "Net PnL",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 851,
      columnNumber: 17
    }
  }, ((tradersData === null || tradersData === void 0 ? void 0 : tradersData.data) || []).map((item, i) => {
    return __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      key: `cell-${i}`,
      fill: item.pnl > 0 ? "#22c761" : "#f93333",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 860,
        columnNumber: 23
      }
    });
  })), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Line"], {
    type: "monotone",
    strokeWidth: 2,
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
    dataKey: "pnlCumulative",
    name: "Cumulative PnL",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 867,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 876,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 877,
      columnNumber: 15
    }
  }, "Considers settled (closed) positions"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 878,
      columnNumber: 15
    }
  }, "Fees are not factored into PnL")))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 882,
      columnNumber: 9
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Traders Profit vs. Loss",
    loading: tradersLoading,
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    csvFields: [{
      key: "profit"
    }, {
      key: "loss"
    }, {
      key: "profitCumulative"
    }, {
      key: "lossCumulative"
    }],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 883,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    syncId: "tradersId",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 894,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ComposedChart"], {
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    barGap: 0,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 899,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 900,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 901,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    domain: [-(tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxProfitLoss) * 1.05, (tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxProfitLoss) * 1.05],
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 906,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    domain: [-(tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxCumulativeProfitLoss) * 1.1, (tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxCumulativeProfitLoss) * 1.1],
    orientation: "right",
    yAxisId: "right",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 914,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Tooltip"], {
    formatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatter"],
    labelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    contentStyle: {
      textAlign: "left"
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 924,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 929,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Area"], {
    yAxisId: "right",
    type: "monotone",
    stroke: 0,
    fill: "#22c761",
    fillOpacity: "0.4",
    dataKey: "profitCumulative",
    name: "Cumulative Profit",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 930,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Area"], {
    yAxisId: "right",
    type: "monotone",
    stroke: 0,
    fill: "#f93333",
    fillOpacity: "0.4",
    dataKey: "lossCumulative",
    name: "Cumulative Loss",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 939,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Bar"], {
    type: "monotone",
    fill: "#22c761",
    dot: false,
    dataKey: "profit",
    name: "Profit",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 948,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Bar"], {
    type: "monotone",
    fill: "#f93333",
    dot: false,
    dataKey: "loss",
    name: "Loss",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 955,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 964,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 965,
      columnNumber: 15
    }
  }, "Considers settled (closed) positions"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 966,
      columnNumber: 15
    }
  }, "Fees are not factored into PnL")))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 970,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    loading: fundingRateLoading,
    title: "Borrowing Rate Annualized",
    data: fundingRateData,
    yaxisDataKey: "ETH",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterPercent"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterPercent"],
    items: [{
      key: "OP",
      color: "#7C43DA"
    }, {
      key: "ETH",
      color: "#6185F5"
    }, {
      key: "BTC",
      color: "#F7931A"
    }, {
      key: "USDC",
      color: "#2775CA"
    }, {
      key: "USDT",
      color: "#67B18A"
    }, {
      key: "DAI",
      color: "#FAC044"
    }],
    type: "Line",
    yaxisDomain: [0, 90 /* ~87% is a maximum yearly borrow rate */],
    isCoinChart: true,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 971,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 991,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    loading: tradersLoading,
    title: "Open Interest",
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data.map(item => _objectSpread({
      all: item.openInterest
    }, item)),
    yaxisDataKey: "openInterest",
    items: [{
      key: "shortOpenInterest",
      name: "Short",
      color: "#f93333"
    }, {
      key: "longOpenInterest",
      name: "Long",
      color: "#22c761"
    }],
    type: "Bar",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 992,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1007,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: aumPerformanceLoading,
    title: "MJAR Performance Annualized",
    data: aumPerformanceData,
    yaxisDataKey: "apr",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterPercent"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterPercent"],
    items: [{
      key: "apr",
      name: "APR",
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0]
    }],
    description: "Formula = Daily Fees / MJLP Pool * 365 days * 100",
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1008,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1021,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: aumPerformanceLoading,
    title: "MJAR Daily Usage",
    data: aumPerformanceData,
    yaxisDataKey: "usage",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterPercent"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterPercent"],
    items: [{
      key: "usage",
      name: "Daily Usage",
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    }],
    description: "Formula = Daily Volume / MJLP Pool * 100",
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1022,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1035,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: usersLoading,
    title: "Unique Users",
    data: usersData,
    yaxisDataKey: "uniqueSum",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatterUnits"],
    items: [{
      key: "uniqueSwapCount",
      name: "Swaps"
    }, {
      key: "uniqueMarginCount",
      name: "Margin trading"
    }, {
      key: "uniqueMintBurnCount",
      name: "Mint & Burn MJLP"
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1036,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1053,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: usersLoading,
    title: "New Users",
    data: usersData === null || usersData === void 0 ? void 0 : usersData.map(item => _objectSpread(_objectSpread({}, item), {}, {
      all: item.newCount
    })),
    yaxisDataKey: "newCount",
    rightYaxisDataKey: "uniqueCountCumulative",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatterUnits"],
    items: [{
      key: "newSwapCount",
      name: "Swap"
    }, {
      key: "newMarginCount",
      name: "Margin trading"
    }, {
      key: "newMintBurnCount",
      name: "Mint & Burn"
    }, {
      key: "uniqueCountCumulative",
      name: "Cumulative",
      type: "Line",
      yAxisId: "right",
      strokeWidth: 2,
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1054,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1080,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: usersLoading,
    title: "New vs. Existing Users",
    data: usersData === null || usersData === void 0 ? void 0 : usersData.map(item => _objectSpread(_objectSpread({}, item), {}, {
      all: item.uniqueCount
    })),
    yaxisDataKey: "uniqueCount",
    rightYaxisDataKey: "oldPercent",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatterUnits"],
    items: [{
      key: "newCount",
      name: "New"
    }, {
      key: "oldCount",
      name: "Existing"
    }, {
      key: "oldPercent",
      name: "Existing %",
      yAxisId: "right",
      type: "Line",
      strokeWidth: 2,
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4],
      unit: "%"
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1081,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1110,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncMjlp",
    loading: usersLoading,
    title: "User Actions",
    data: (usersData || []).map(item => _objectSpread(_objectSpread({}, item), {}, {
      all: item.actionCount
    })),
    yaxisDataKey: "actionCount",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterNumber"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterNumber"],
    tooltipLabelFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatterUnits"],
    items: [{
      key: "actionSwapCount",
      name: "Swaps"
    }, {
      key: "actionMarginCount",
      name: "Margin trading"
    }, {
      key: "actionMintBurnCount",
      name: "Mint & Burn MJLP"
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1111,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1131,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    loading: swapSourcesLoading,
    title: "Swap Sources",
    data: swapSources,
    items: swapSourcesKeys.map(key => ({
      key
    })),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1132,
      columnNumber: 11
    }
  }))));
}
/* harmony default export */ __webpack_exports__["default"] = (Optimism);

/***/ })

};
//# sourceMappingURL=server.e21dc533b10b1003cad1.hot-update.js.map