exports.id = "server";
exports.modules = {

/***/ "./src/views/Trading.js":
/*!******************************!*\
  !*** ./src/views/Trading.js ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../helpers */ "./src/helpers.js");
/* harmony import */ var _dataProvider__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dataProvider */ "./src/dataProvider.js");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! recharts */ "recharts");
/* harmony import */ var recharts__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(recharts__WEBPACK_IMPORTED_MODULE_4__);
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\views\\Trading.js";
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
function Trading() {
  const {
    0: from,
    1: setFrom
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["tsToIso"])(Date.now() - 86400000 * 3));
  const {
    0: to,
    1: setTo
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const fromTs = +new Date(from) / 1000;
  const toTs = to !== null && to !== void 0 ? to : +new Date(to) / 1000;
  const params = {
    from: fromTs,
    to: toTs
  };
  const [btcData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])(`/api/prices/BTC`, params), []);
  const [ethData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])(`/api/prices/ETH`, params), []);
  const [bnbData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])(`/api/prices/BNB`, params), []);
  const assetChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    const all = {};
    const options = [['BTC', btcData], ['ETH', ethData], ['BNB', bnbData]];
    options.forEach(([name, assetData]) => {
      if (!assetData || assetData.length === 0) {
        return;
      }
      let maxPrice = 0;
      let minPrice = Infinity;
      all[name] = {
        data: assetData.map(item => {
          const price = item.price / 1e8;
          if (price > maxPrice) {
            maxPrice = price;
          }
          if (price < minPrice) {
            minPrice = price;
          }
          return {
            date: new Date(item.timestamp * 1000),
            price: price,
            poolAmount: item.poolAmount
          };
        })
      };
      all[name].maxPrice = maxPrice;
      all[name].minPrice = minPrice;
    });
    return all;
  }, [btcData, ethData, bnbData]);
  const [pnlData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])('/api/marginPnl', params), []);
  const pnlChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    return pnlData.map(item => {
      if (!item.metrics) {
        return {
          date: new Date(item.timestamp * 1000)
        };
      }
      return {
        date: new Date(item.timestamp * 1000),
        net: item.metrics.net,
        profits: item.metrics.profits,
        loss: item.metrics.loss,
        long: item.metrics.long,
        short: item.metrics.short
      };
    });
  }, [pnlData]);
  const pnlMin = pnlChartData.length ? pnlChartData[pnlChartData.length - 1].loss : 0;
  const pnlMax = pnlChartData.length ? pnlChartData[pnlChartData.length - 1].profits : 0;
  const [liquidationsData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])('api/liquidations', {
    from: fromTs,
    to: toTs
  }), []);
  const liquidationsChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    let cum = 0;
    let longCum = 0;
    let shortCum = 0;
    return liquidationsData.map(item => {
      const collateral = item.collateral || 0;
      cum += collateral;
      if (item.isLong) {
        longCum += collateral;
      } else {
        shortCum += collateral;
      }
      return {
        date: new Date(item.timestamp * 1000),
        collateral: cum,
        long: longCum,
        short: shortCum
      };
    });
  }, [liquidationsData]);
  const [feesData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])('/api/fees', _objectSpread({
    disableGrouping: 1
  }, params)), []);
  const feesChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    const cum = {};
    return feesData.map(item => {
      cum[item.type] = (cum[item.type] || 0) + item.value;
      const all = Object.values(cum).reduce((sum, value) => sum + value);
      return _objectSpread(_objectSpread({}, cum), {}, {
        all,
        date: new Date(item.timestamp * 1000)
      });
    });
  }, [feesData]);
  const [swapSourcesData] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_3__["useRequest"])(Object(_helpers__WEBPACK_IMPORTED_MODULE_2__["urlWithParams"])('/api/swapSources', _objectSpread({
    period: 3600,
    rawSource: 1
  }, params)), []);
  const swapSourcesFilteredKeys = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (swapSourcesData.length === 0) {
      return [];
    }
    const count = {};
    swapSourcesData.forEach(item => {
      if (!item.metrics) {
        return;
      }
      Object.keys(item.metrics).forEach(key => {
        count[key] = (count[key] || 0) + 1;
      });
    });
    return Object.keys(count).filter(key => count[key] > 1);
  }, [swapSourcesData]);
  const swapSourcesChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (swapSourcesFilteredKeys.length === 0) {
      return [];
    }
    let cum = {};
    return swapSourcesData.map(item => {
      let all = 0;
      swapSourcesFilteredKeys.forEach(key => {
        if (item.metrics && item.metrics[key]) {
          cum[key] = (cum[key] || 0) + item.metrics[key];
          all += cum[key];
        }
      });
      return _objectSpread({
        date: new Date(item.timestamp * 1000),
        all
      }, cum);
    });
  }, [swapSourcesData, swapSourcesFilteredKeys]);
  const COLORS = ['red', 'green', 'blue', 'lightblue', 'purple', 'pink', 'brown', 'orange'];
  return __jsx(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, __jsx("div", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 180,
      columnNumber: 7
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 181,
      columnNumber: 9
    }
  }, __jsx("label", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 182,
      columnNumber: 11
    }
  }, "From"), __jsx("input", {
    type: "datetime-local",
    value: from,
    onChange: evt => setFrom(evt.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 183,
      columnNumber: 11
    }
  })), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 185,
      columnNumber: 9
    }
  }, __jsx("label", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 186,
      columnNumber: 11
    }
  }, "To"), __jsx("input", {
    type: "datetime-local",
    value: to,
    onChange: evt => setTo(evt.target.value),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 187,
      columnNumber: 11
    }
  }))), Object.entries(assetChartData).map(([name, {
    data,
    maxPrice,
    minPrice
  }]) => {
    return __jsx("div", {
      key: name,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 191,
        columnNumber: 16
      }
    }, __jsx("h2", {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 192,
        columnNumber: 11
      }
    }, name), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
      width: "100%",
      height: 600,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 193,
        columnNumber: 11
      }
    }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ComposedChart"], {
      data: data,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 194,
        columnNumber: 13
      }
    }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
      strokeDasharray: "10 10",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 197,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
      dataKey: "date",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 198,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
      yAxisId: "left",
      dataKey: "price",
      domain: [Math.round(minPrice * 0.99), Math.round(maxPrice * 1.01)],
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 199,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
      yAxisId: "right",
      orientation: "right",
      dataKey: "poolAmount",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 204,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 205,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 206,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
      isAnimationActive: false,
      strokeWidth: 0,
      yAxisId: "right",
      dataKey: "poolAmount",
      name: "Pool",
      dot: false,
      fill: "#627EEA",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 207,
        columnNumber: 15
      }
    }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
      isAnimationActive: false,
      yAxisId: "left",
      dataKey: "price",
      name: "Chainlink Price",
      dot: false,
      stroke: "#666",
      strokeWidth: 2,
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 208,
        columnNumber: 15
      }
    }))));
  }), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 214,
      columnNumber: 7
    }
  }, "Liquidated Collateral"), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
    width: "100%",
    height: 600,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 215,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ComposedChart"], {
    data: liquidationsChartData,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 216,
      columnNumber: 9
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 219,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
    dataKey: "date",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 220,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
    dataKey: "collateral",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 221,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 222,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 223,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    isAnimationActive: false,
    stackId: "a",
    dataKey: "long",
    name: "Long",
    dot: false,
    strokeWidth: 0,
    stroke: "purple",
    fill: "purple",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 224,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    isAnimationActive: false,
    stackId: "a",
    dataKey: "short",
    name: "Short",
    dot: false,
    stroke: "green",
    strokeWidth: 0,
    fill: "green",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 225,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dataKey: "collateral",
    name: "All",
    dot: false,
    stroke: "black",
    strokeWidth: 2,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 226,
      columnNumber: 11
    }
  }))), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 230,
      columnNumber: 7
    }
  }, "Global PnL"), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
    width: "100%",
    height: 600,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 231,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ComposedChart"], {
    data: pnlChartData,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 232,
      columnNumber: 9
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 235,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
    dataKey: "date",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 236,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
    domain: [pnlMin * 1.5, pnlMax * 0.50],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 237,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 238,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 239,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    isAnimationActive: false,
    dataKey: "profits",
    name: "Profits",
    dot: false,
    strokeWidth: 0,
    fill: "lightblue",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 240,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    isAnimationActive: false,
    dataKey: "loss",
    name: "Loss",
    dot: false,
    stroke: "pink",
    strokeWidth: 0,
    fill: "pink",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 241,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dataKey: "net",
    name: "Net",
    dot: false,
    stroke: "#000",
    strokeWidth: 2,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 242,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dataKey: "long",
    name: "Longs Net",
    dot: false,
    stroke: "green",
    strokeWidth: 1,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 243,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dataKey: "short",
    name: "Shorts Net",
    dot: false,
    stroke: "red",
    strokeWidth: 1,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 244,
      columnNumber: 11
    }
  }))), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 248,
      columnNumber: 7
    }
  }, "Fees"), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
    width: "100%",
    height: 600,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 249,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ComposedChart"], {
    syncId: "syncId",
    data: feesChartData,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 250,
      columnNumber: 9
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 251,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
    dataKey: "date",
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 252,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
    dataKey: "all",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 253,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 254,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 255,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "swap",
    stackId: "a",
    name: "Swap",
    stroke: "#FE88B1",
    fill: "#FE88B1",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 256,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "mint",
    stackId: "a",
    name: "Mint USDS",
    stroke: "#C9DB74",
    fill: "#C9DB74",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 257,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "burn",
    stackId: "a",
    name: "Burn USDS",
    stroke: "#ab6100",
    fill: "#ab6100",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 258,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "liquidation",
    stackId: "a",
    name: "Liquidation",
    stroke: "#c90000",
    fill: "#c90000",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 259,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Area"], {
    type: "monotone",
    dot: false,
    dataKey: "margin",
    stackId: "a",
    name: "Margin trading",
    stroke: "#5D69B1",
    fill: "#5D69B1",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 260,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
    isAnimationActive: false,
    dot: false,
    dataKey: "all",
    name: "Total",
    stroke: "#000",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 261,
      columnNumber: 11
    }
  }))), __jsx("h2", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 265,
      columnNumber: 7
    }
  }, "Swap volumes by recipient"), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["ResponsiveContainer"], {
    width: "100%",
    height: 600,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 266,
      columnNumber: 7
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["LineChart"], {
    syncId: "syncId",
    data: swapSourcesChartData,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 267,
      columnNumber: 9
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 268,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["XAxis"], {
    dataKey: "date",
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 269,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["YAxis"], {
    dataKey: "all",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 270,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Tooltip"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 271,
      columnNumber: 11
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 272,
      columnNumber: 11
    }
  }), swapSourcesFilteredKeys.map((key, i) => {
    return __jsx(recharts__WEBPACK_IMPORTED_MODULE_4__["Line"], {
      dataKey: key,
      dot: false,
      stroke: COLORS[i % COLORS.length],
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 274,
        columnNumber: 20
      }
    });
  }))));
}
/* harmony default export */ __webpack_exports__["default"] = (Trading);

/***/ })

};
//# sourceMappingURL=server.bb2204cc07241655653c.hot-update.js.map