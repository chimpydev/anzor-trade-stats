exports.id = "server";
exports.modules = {

/***/ "./abis/SlpManager.json":
/*!******************************!*\
  !*** ./abis/SlpManager.json ***!
  \******************************/
/*! exports provided: _format, contractName, sourceName, abi, default */
/***/ (function(module) {

module.exports = JSON.parse("{\"_format\":\"hh-sol-artifact-1\",\"contractName\":\"SlpManager\",\"sourceName\":\"contracts/core/SlpManager.sol\",\"abi\":[{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_vault\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_usdm\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_slp\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_cooldownDuration\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"constructor\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"aumInUsdm\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"slpSupply\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"usdmAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"mintAmount\",\"type\":\"uint256\"}],\"name\":\"AddLiquidity\",\"type\":\"event\"},{\"anonymous\":false,\"inputs\":[{\"indexed\":false,\"internalType\":\"address\",\"name\":\"account\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"address\",\"name\":\"token\",\"type\":\"address\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"slpAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"aumInUsdm\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"slpSupply\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"usdmAmount\",\"type\":\"uint256\"},{\"indexed\":false,\"internalType\":\"uint256\",\"name\":\"amountOut\",\"type\":\"uint256\"}],\"name\":\"RemoveLiquidity\",\"type\":\"event\"},{\"inputs\":[],\"name\":\"MAX_COOLDOWN_DURATION\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"PRICE_PRECISION\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"USDM_DECIMALS\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minUsdm\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minSlp\",\"type\":\"uint256\"}],\"name\":\"addLiquidity\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_fundingAccount\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_token\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_amount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minUsdm\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minSlp\",\"type\":\"uint256\"}],\"name\":\"addLiquidityForAccount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"aumAddition\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"aumDeduction\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"cooldownDuration\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"maximise\",\"type\":\"bool\"}],\"name\":\"getAum\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"maximise\",\"type\":\"bool\"}],\"name\":\"getAumInUsdm\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"getAums\",\"outputs\":[{\"internalType\":\"uint256[]\",\"name\":\"\",\"type\":\"uint256[]\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"gov\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"inPrivateMode\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"isHandler\",\"outputs\":[{\"internalType\":\"bool\",\"name\":\"\",\"type\":\"bool\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"name\":\"lastAddedAt\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"slp\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_tokenOut\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_slpAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minOut\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_receiver\",\"type\":\"address\"}],\"name\":\"removeLiquidity\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_account\",\"type\":\"address\"},{\"internalType\":\"address\",\"name\":\"_tokenOut\",\"type\":\"address\"},{\"internalType\":\"uint256\",\"name\":\"_slpAmount\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_minOut\",\"type\":\"uint256\"},{\"internalType\":\"address\",\"name\":\"_receiver\",\"type\":\"address\"}],\"name\":\"removeLiquidityForAccount\",\"outputs\":[{\"internalType\":\"uint256\",\"name\":\"\",\"type\":\"uint256\"}],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_aumAddition\",\"type\":\"uint256\"},{\"internalType\":\"uint256\",\"name\":\"_aumDeduction\",\"type\":\"uint256\"}],\"name\":\"setAumAdjustment\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"uint256\",\"name\":\"_cooldownDuration\",\"type\":\"uint256\"}],\"name\":\"setCooldownDuration\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_gov\",\"type\":\"address\"}],\"name\":\"setGov\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"address\",\"name\":\"_handler\",\"type\":\"address\"},{\"internalType\":\"bool\",\"name\":\"_isActive\",\"type\":\"bool\"}],\"name\":\"setHandler\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[{\"internalType\":\"bool\",\"name\":\"_inPrivateMode\",\"type\":\"bool\"}],\"name\":\"setInPrivateMode\",\"outputs\":[],\"stateMutability\":\"nonpayable\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"usdm\",\"outputs\":[{\"internalType\":\"address\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"},{\"inputs\":[],\"name\":\"vault\",\"outputs\":[{\"internalType\":\"contract IVault\",\"name\":\"\",\"type\":\"address\"}],\"stateMutability\":\"view\",\"type\":\"function\"}]}");

/***/ }),

/***/ "./src/dataProvider.js":
/*!*****************************!*\
  !*** ./src/dataProvider.js ***!
  \*****************************/
/*! exports provided: queryEarnData, tokenDecimals, tokenSymbols, useRequest, useCoingeckoPrices, useGraph, useLastBlock, useLastSubgraphBlock, useTradersData, useSwapSources, useTotalVolumeFromServer, getStatsFromSubgraph, useVolumeDataFromServer, useUsersData, useFundingRateData, useVolumeData, useFeesData, useAumPerformanceData, useSlpData, useSlpPerformanceData, useReferralsData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "queryEarnData", function() { return queryEarnData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenDecimals", function() { return tokenDecimals; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "tokenSymbols", function() { return tokenSymbols; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useRequest", function() { return useRequest; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useCoingeckoPrices", function() { return useCoingeckoPrices; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useGraph", function() { return useGraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLastBlock", function() { return useLastBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useLastSubgraphBlock", function() { return useLastSubgraphBlock; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTradersData", function() { return useTradersData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSwapSources", function() { return useSwapSources; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useTotalVolumeFromServer", function() { return useTotalVolumeFromServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStatsFromSubgraph", function() { return getStatsFromSubgraph; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useVolumeDataFromServer", function() { return useVolumeDataFromServer; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useUsersData", function() { return useUsersData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFundingRateData", function() { return useFundingRateData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useVolumeData", function() { return useVolumeData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useFeesData", function() { return useFeesData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useAumPerformanceData", function() { return useAumPerformanceData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSlpData", function() { return useSlpData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useSlpPerformanceData", function() { return useSlpPerformanceData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "useReferralsData", function() { return useReferralsData; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @apollo/client */ "@apollo/client");
/* harmony import */ var _apollo_client__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_apollo_client__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! cross-fetch */ "cross-fetch");
/* harmony import */ var cross_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(cross_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ethers */ "ethers");
/* harmony import */ var ethers__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(ethers__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _addresses__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./addresses */ "./src/addresses.js");
/* harmony import */ var _abis_RewardReader_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../abis/RewardReader.json */ "./abis/RewardReader.json");
var _abis_RewardReader_json__WEBPACK_IMPORTED_MODULE_6___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../abis/RewardReader.json */ "./abis/RewardReader.json", 1);
/* harmony import */ var _abis_SlpManager_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../abis/SlpManager.json */ "./abis/SlpManager.json");
var _abis_SlpManager_json__WEBPACK_IMPORTED_MODULE_7___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../abis/SlpManager.json */ "./abis/SlpManager.json", 1);
/* harmony import */ var _abis_v1_Token_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../abis/v1/Token.json */ "./abis/v1/Token.json");
var _abis_v1_Token_json__WEBPACK_IMPORTED_MODULE_8___namespace = /*#__PURE__*/__webpack_require__.t(/*! ../abis/v1/Token.json */ "./abis/v1/Token.json", 1);
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return typeof key === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (typeof input !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (typeof res !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }






const {
  JsonRpcProvider
} = ethers__WEBPACK_IMPORTED_MODULE_4__["providers"];



const providers = {
  fantom: new JsonRpcProvider("https://rpc.ftm.tools/")
};
function getProvider(chainName) {
  if (!(chainName in providers)) {
    throw new Error(`Unknown chain ${chainName}`);
  }
  return providers["fantom"];
}
function getChainId(chainName) {
  const chainId = {
    fantom: _addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"]
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
async function queryEarnData(chainName, account) {
  const provider = getProvider(chainName);
  const chainId = getChainId(chainName);
  const rewardReader = new ethers__WEBPACK_IMPORTED_MODULE_4__["Contract"](Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(chainId, "RewardReader"), _abis_RewardReader_json__WEBPACK_IMPORTED_MODULE_6__.abi, provider);
  const slpContract = new ethers__WEBPACK_IMPORTED_MODULE_4__["Contract"](Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(chainId, "SLP"), _abis_v1_Token_json__WEBPACK_IMPORTED_MODULE_8__.abi, provider);
  const slpManager = new ethers__WEBPACK_IMPORTED_MODULE_4__["Contract"](Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(chainId, "SlpManager"), _abis_SlpManager_json__WEBPACK_IMPORTED_MODULE_7__.abi, provider);
  let depositTokens;
  let rewardTrackersForDepositBalances;
  let rewardTrackersForStakingInfo;
  if (chainId === _addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"]) {
    depositTokens = [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "SKULL"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "ES_SKULL"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "STAKED_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "BONUS_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "BN_SKULL"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "SLP")];
    rewardTrackersForDepositBalances = [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "STAKED_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "STAKED_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "BONUS_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "FEE_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "FEE_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "FEE_SLP_TRACKER")];
    rewardTrackersForStakingInfo = [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "STAKED_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "BONUS_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "FEE_SKULL_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "STAKED_SLP_TRACKER"), Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "FEE_SLP_TRACKER")];
  }
  const [balances, stakingInfo, slpTotalSupply, slpAum, skullPrice] = await Promise.all([rewardReader.getDepositBalances(account, depositTokens, rewardTrackersForDepositBalances), rewardReader.getStakingInfo(account, rewardTrackersForStakingInfo).then(info => {
    return rewardTrackersForStakingInfo.map((_, i) => {
      return info.slice(i * 5, (i + 1) * 5);
    });
  }), slpContract.totalSupply(), slpManager.getAumInUsdm(true), cross_fetch__WEBPACK_IMPORTED_MODULE_3___default()("https://api.coingecko.com/api/v3/simple/price?ids=metavault-trade&vs_currencies=usd").then(async res => {
    const j = await res.json();
    return j["metavault-trade"]["usd"];
  })]);
  const slpPrice = slpAum / 1e18 / (slpTotalSupply / 1e18);
  const now = new Date();
  return {
    SLP: {
      stakedSLP: balances[5] / 1e18,
      pendingETH: stakingInfo[4][0] / 1e18,
      pendingEsSKULL: stakingInfo[3][0] / 1e18,
      slpPrice
    },
    SKULL: {
      stakedSKULL: balances[0] / 1e18,
      stakedEsSKULL: balances[1] / 1e18,
      pendingETH: stakingInfo[2][0] / 1e18,
      pendingEsSKULL: stakingInfo[0][0] / 1e18,
      skullPrice
    },
    timestamp: parseInt(now / 1000),
    datetime: now.toISOString()
  };
}
const tokenDecimals = {
  "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83": 18,
  // WFTM
  "0x74b23882a30290451A17c44f4F05243b6b58C76d": 18,
  // WETH
  "0x321162Cd933E2Be498Cd2267a90534A804051b11": 8,
  // BTC
  "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75": 6,
  // USDC
  "0x049d68029688eAbF473097a2fC38ef61633A3C7A": 6,
  // USDT
  "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E": 18 // DAI
};

const tokenSymbols = {
  // Fantom
  "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83": "WFTM",
  "0x74b23882a30290451A17c44f4F05243b6b58C76d": "WETH",
  "0x321162Cd933E2Be498Cd2267a90534A804051b11": "WBTC",
  "0x04068DA6C83AFCFA0e13ba15A6696662335D5B75": "USDC",
  "0x049d68029688eAbF473097a2fC38ef61633A3C7A": "USDT",
  "0x8D11eC38a3EB5E956B052f67Da8Bdc9bef8Abf3E": "DAI"
};
function getTokenDecimals(token) {
  return tokenDecimals[token] || 18;
}
const knownSwapSources = {
  fantom: {
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "Router")]: "SKULL",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "OrderBook")]: "SKULL",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "PositionManager")]: "SKULL",
    // [getAddress(FANTOM, "OrderExecutor")]: "SKULL",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "FastPriceFeed")]: "SKULL",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "PositionExecutorUpKeep")]: "SKULL",
    [Object(_addresses__WEBPACK_IMPORTED_MODULE_5__["getAddress"])(_addresses__WEBPACK_IMPORTED_MODULE_5__["FANTOM"], "PositionRouter")]: "SKULL"
  }
};
const defaultFetcher = url => cross_fetch__WEBPACK_IMPORTED_MODULE_3___default()(url).then(res => res.json());
function useRequest(url, defaultValue, fetcher = defaultFetcher) {
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: data,
    1: setData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(defaultValue);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(async () => {
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
function useCoingeckoPrices(symbol, {
  from = FIRST_DATE_TS
} = {}) {
  // token ids https://api.coingecko.com/api/v3/coins
  const _symbol = {
    BTC: "bitcoin",
    ETH: "ethereum",
    FTM: "fantom",
    MATIC: "matic-network",
    WBTC: "wrapped-bitcoin",
    USDC: "usd-coin",
    USDT: "tether",
    DAI: "dai"
  }[symbol];
  const now = Date.now() / 1000;
  const days = Math.ceil(now / 86400) - Math.ceil(from / 86400) - 1;
  const url = `https://api.coingecko.com/api/v3/coins/${_symbol}/market_chart?vs_currency=usd&days=${days}&interval=daily`;
  const [res, loading, error] = useRequest(url);
  const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!res || res.length === 0) {
      return null;
    }
    const ret = res.prices.map(item => {
      // -1 is for shifting to previous day
      // because CG uses first price of the day, but for SLP we store last price of the day
      const timestamp = item[0] - 1;
      const groupTs = parseInt(timestamp / 1000 / 86400) * 86400;
      return {
        timestamp: groupTs,
        value: item[1]
      };
    });
    return ret;
  }, [res]);
  return [data, loading, error];
}
function getImpermanentLoss(change) {
  return 2 * Math.sqrt(change) / (1 + change) - 1;
}
function getChainSubgraph(chainName) {
  // return "chimpydev/stats";
  return "chimpydev/core";
}
function useGraph(querySource, {
  subgraph = null,
  subgraphUrl = null,
  chainName = "fantom"
} = {}) {
  const query = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_1__["gql"])(querySource);
  if (!subgraphUrl) {
    if (!subgraph) {
      subgraph = getChainSubgraph(chainName);
    }
    subgraphUrl = `https://api.thegraph.com/subgraphs/name/${subgraph}`;
  }
  const client = new _apollo_client__WEBPACK_IMPORTED_MODULE_1__["ApolloClient"]({
    link: new _apollo_client__WEBPACK_IMPORTED_MODULE_1__["HttpLink"]({
      uri: subgraphUrl,
      fetch: (cross_fetch__WEBPACK_IMPORTED_MODULE_3___default())
    }),
    cache: new _apollo_client__WEBPACK_IMPORTED_MODULE_1__["InMemoryCache"]()
  });
  const {
    0: data,
    1: setData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    setLoading(true);
  }, [querySource, setLoading]);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    client.query({
      query
    }).then(res => {
      setData(res.data);
      setLoading(false);
    }).catch(ex => {
      console.warn("Subgraph request failed error: %s subgraphUrl: %s", ex.message, subgraphUrl);
      setError(ex);
      setLoading(false);
    });
  }, [querySource, setData, setError, setLoading]);
  return [data, loading, error];
}
function useLastBlock(chainName = "fantom") {
  const {
    0: data,
    1: setData
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])();
  const {
    0: loading,
    1: setLoading
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(true);
  const {
    0: error,
    1: setError
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    providers[chainName].getBlock().then(setData).catch(setError).finally(() => setLoading(false));
  }, []);
  return [data, loading, error];
}
function useLastSubgraphBlock(chainName = "fantom") {
  const [data, loading, error] = useGraph(`{
    _meta {
      block {
        number
      }
    } 
  }`, {
    chainName
  });
  const {
    0: block,
    1: setBlock
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    if (!data) {
      return;
    }
    providers[chainName].getBlock(data._meta.block.number).then(block => {
      setBlock(block);
    });
  }, [data, setBlock]);
  return [block, loading, error];
}
function useTradersData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
} = {}) {
  const [closedPositionsData, loading, error] = useGraph(`{
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
  }`, {
    chainName
  });
  const [feesData] = useFeesData({
    from,
    to,
    chainName
  });
  const marginFeesByTs = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!feesData || !closedPositionsData || closedPositionsData && !closedPositionsData.tradingStats.length) {
      return {};
    }
    let feesCumulative = 0;
    return feesData.reduce((memo, {
      timestamp,
      margin: fees
    }) => {
      feesCumulative += fees;
      memo[timestamp] = {
        fees,
        feesCumulative
      };
      return memo;
    }, {});
  }, [feesData]);
  let ret = null;
  const data = closedPositionsData && closedPositionsData.tradingStats.length > 0 ? Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(closedPositionsData.tradingStats, i => i.timestamp).map(dataItem => {
    var _marginFeesByTs$dataI, _marginFeesByTs$dataI2;
    const longOpenInterest = dataItem.longOpenInterest / 1e30;
    const shortOpenInterest = dataItem.shortOpenInterest / 1e30;
    const openInterest = longOpenInterest + shortOpenInterest;
    const fees = ((_marginFeesByTs$dataI = marginFeesByTs[dataItem.timestamp]) === null || _marginFeesByTs$dataI === void 0 ? void 0 : _marginFeesByTs$dataI.fees) || 0;
    const feesCumulative = ((_marginFeesByTs$dataI2 = marginFeesByTs[dataItem.timestamp]) === null || _marginFeesByTs$dataI2 === void 0 ? void 0 : _marginFeesByTs$dataI2.feesCumulative) || 0;
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
      timestamp: dataItem.timestamp
    };
  }) : null;
  if (data) {
    const maxProfit = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["maxBy"])(data, item => item.profit).profit;
    const maxLoss = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["minBy"])(data, item => item.loss).loss;
    const maxProfitLoss = Math.max(maxProfit, -maxLoss);
    const maxPnl = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["maxBy"])(data, item => item.pnl).pnl;
    const minPnl = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["minBy"])(data, item => item.pnl).pnl;
    const maxCumulativePnl = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["maxBy"])(data, item => item.pnlCumulative).pnlCumulative;
    const minCumulativePnl = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["minBy"])(data, item => item.pnlCumulative).pnlCumulative;
    const profitCumulative = data[data.length - 1].profitCumulative;
    const lossCumulative = data[data.length - 1].lossCumulative;
    const stats = {
      maxProfit,
      maxLoss,
      maxProfitLoss,
      profitCumulative,
      lossCumulative,
      maxCumulativeProfitLoss: Math.max(profitCumulative, -lossCumulative),
      maxAbsOfPnlAndCumulativePnl: Math.max(Math.abs(maxPnl), Math.abs(maxCumulativePnl), Math.abs(minPnl), Math.abs(minCumulativePnl))
    };
    ret = {
      data,
      stats
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
function useSwapSources({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
} = {}) {
  const query = `{
    a: ${getSwapSourcesFragment(0, from, to)}
    b: ${getSwapSourcesFragment(1000, from, to)}
    c: ${getSwapSourcesFragment(2000, from, to)}
    d: ${getSwapSourcesFragment(3000, from, to)}
    e: ${getSwapSourcesFragment(4000, from, to)}
  }`;
  const [graphData, loading, error] = useGraph(query, {
    chainName
  });
  let total = 0;
  let data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!graphData) {
      return null;
    }
    const {
      a,
      b,
      c,
      d,
      e
    } = graphData;
    const all = [...a, ...b, ...c, ...d, ...e];
    const totalVolumeBySource = a.reduce((acc, item) => {
      const source = knownSwapSources[chainName][item.source] || item.source;
      if (!acc[source]) {
        acc[source] = 0;
      }
      acc[source] += item.swap / 1e30;
      return acc;
    }, {});
    const topVolumeSources = new Set(Object.entries(totalVolumeBySource).sort((a, b) => b[1] - a[1]).map(item => item[0]).slice(0, 30));
    let ret = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["chain"])(all).groupBy(item => parseInt(item.timestamp / 86400) * 86400).map((values, timestamp) => {
      let all = 0;
      const retItem = _objectSpread({
        timestamp: Number(timestamp)
      }, values.reduce((memo, item) => {
        let source = knownSwapSources[chainName][item.source] || item.source;
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
      }, {}));
      retItem.all = all;
      return retItem;
    }).sortBy(item => item.timestamp).value();
    return ret;
  }, [graphData]);
  return [data, loading, error];
}
function getServerHostname(chainName) {
  return process.env.RAZZLE_SKULL_API_URL;
}
function useTotalVolumeFromServer() {
  const [data, loading] = useRequest(getServerHostname() + "/total_volume");
  return Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!data) {
      return [data, loading];
    }
    const total = data.reduce((memo, item) => {
      return memo + parseInt(item.data.volume) / 1e30;
    }, 0);
    return [total, loading];
  }, [data, loading]);
}
async function getStatsFromSubgraph(graphClient, chainName = "fantom") {
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
  const query = Object(_apollo_client__WEBPACK_IMPORTED_MODULE_1__["gql"])(queryString);
  const {
    data
  } = await graphClient.query({
    query
  });
  const statsProps = ["totalVolumes", "deltaVolumes", "totalFees", "deltaFees"];
  const methodProps = ["swap", "mint", "burn", "margin", "liquidation"];
  const result = {};
  console.log(data);
  statsProps.forEach(statsProp => {
    result[statsProp] = {};
    let total = 0;
    methodProps.forEach(methodProp => {
      const statValue = parseInt(data[statsProp][0][methodProp]) / 1e30;
      console.log(statValue);
      result[statsProp][methodProp] = statValue;
      total += statValue;
    });
    result[statsProp].total = total;
  });
  console.log(result);
  return result;
}
function useVolumeDataFromServer({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
} = {}) {
  const PROPS = "margin liquidation swap mint burn".split(" ");
  const [data, loading] = useRequest(`${getServerHostname(chainName)}/daily_volume`, null, async url => {
    let after;
    const ret = [];
    while (true) {
      const res = await (await cross_fetch__WEBPACK_IMPORTED_MODULE_3___default()(url + (after ? `?after=${after}` : ""))).json();
      if (res.length === 0) return ret;
      for (const item of res) {
        if (item.data.timestamp < from) {
          return ret;
        }
        ret.push(item);
      }
      after = res[res.length - 1].id;
    }
  });
  const ret = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
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
    return Object.keys(tmp).sort().map(timestamp => {
      const item = tmp[timestamp];
      let all = 0;
      let movingAverageAll;
      const movingAverageTs = timestamp - MOVING_AVERAGE_PERIOD;
      if (movingAverageTs in cumulativeByTs) {
        movingAverageAll = (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS;
      }
      PROPS.forEach(prop => {
        if (item[prop]) all += item[prop];
      });
      cumulative += all;
      cumulativeByTs[timestamp] = cumulative;
      return _objectSpread({
        timestamp,
        all,
        cumulative,
        movingAverageAll
      }, item);
    });
  }, [data, from, to]);
  return [ret, loading];
}
function useUsersData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
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
  const [graphData, loading, error] = useGraph(query, {
    chainName
  });
  const prevUniqueCountCumulative = {};
  const data = graphData ? Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(graphData.userStats, "timestamp").map(item => {
    const newCountData = ["", "Swap", "Margin", "MintBurn"].reduce((memo, type) => {
      memo[`new${type}Count`] = prevUniqueCountCumulative[type] ? item[`unique${type}CountCumulative`] - prevUniqueCountCumulative[type] : item[`unique${type}Count`];
      prevUniqueCountCumulative[type] = item[`unique${type}CountCumulative`];
      return memo;
    }, {});
    const oldCount = item.uniqueCount - newCountData.newCount;
    const oldPercent = (oldCount / item.uniqueCount * 100).toFixed(1);
    return _objectSpread(_objectSpread({
      all: item.uniqueCount,
      uniqueSum: item.uniqueSwapCount + item.uniqueMarginCount + item.uniqueMintBurnCount,
      oldCount,
      oldPercent
    }, newCountData), item);
  }) : null;
  return [data, loading, error];
}
function useFundingRateData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
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
  const [graphData, loading, error] = useGraph(query, {
    chainName
  });
  const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!graphData) {
      return null;
    }
    const groups = graphData.fundingRates.reduce((memo, item) => {
      const symbol = tokenSymbols[item.token];
      memo[item.timestamp] = memo[item.timestamp] || {
        timestamp: item.timestamp
      };
      const group = memo[item.timestamp];
      const timeDelta = parseInt((item.endTimestamp - item.startTimestamp) / 3600) * 3600;
      let fundingRate = 0;
      if (item.endFundingRate && item.startFundingRate) {
        const fundingDelta = item.endFundingRate - item.startFundingRate;
        const divisor = timeDelta / 86400;
        fundingRate = fundingDelta / divisor / 10000 * 365;
      }
      group[symbol] = fundingRate;
      return memo;
    }, {});
    return fillNa(Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(Object.values(groups), "timestamp"), ["FTM", "ETH", "USDC", "USDT", "BTC", "DAI"]);
  }, [graphData]);
  return [data, loading, error];
}
const MOVING_AVERAGE_DAYS = 7;
const MOVING_AVERAGE_PERIOD = 86400 * MOVING_AVERAGE_DAYS;
function useVolumeData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
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
  const [graphData, loading, error] = useGraph(query, {
    chainName
  });
  const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!graphData) {
      return null;
    }
    let ret = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(graphData.volumeStats, timestampProp).map(item => {
      const ret = {
        timestamp: item[timestampProp]
      };
      let all = 0;
      PROPS.forEach(prop => {
        ret[prop] = item[prop] / 1e30;
        all += ret[prop];
      });
      ret.all = all;
      return ret;
    });
    let cumulative = 0;
    const cumulativeByTs = {};
    return ret.map(item => {
      cumulative += item.all;
      let movingAverageAll;
      const movingAverageTs = item.timestamp - MOVING_AVERAGE_PERIOD;
      if (movingAverageTs in cumulativeByTs) {
        movingAverageAll = (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS;
      }
      return _objectSpread({
        movingAverageAll,
        cumulative
      }, item);
    });
  }, [graphData]);
  let total;
  if (data && data.length) total = data[data.length - 1].cumulative;
  return [data, total, loading, error];
}
function useFeesData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
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
  let [feesData, loading, error] = useGraph(feesQuery, {
    chainName
  });
  const feesChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!feesData || feesData && feesData.feeStats.length === 0) {
      return null;
    }
    let chartData = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(feesData.feeStats, "id").map(item => {
      const ret = {
        timestamp: item.timestamp || item.id
      };
      PROPS.forEach(prop => {
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
    return Object(lodash__WEBPACK_IMPORTED_MODULE_2__["chain"])(chartData).groupBy(item => item.timestamp).map((values, timestamp) => {
      const all = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sumBy"])(values, "all");
      cumulative += all;
      let movingAverageAll;
      const movingAverageTs = timestamp - MOVING_AVERAGE_PERIOD;
      if (movingAverageTs in cumulativeByTs) {
        movingAverageAll = (cumulative - cumulativeByTs[movingAverageTs]) / MOVING_AVERAGE_DAYS;
      }
      const ret = {
        timestamp: Number(timestamp),
        all,
        cumulative,
        movingAverageAll
      };
      PROPS.forEach(prop => {
        ret[prop] = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sumBy"])(values, prop);
      });
      cumulativeByTs[timestamp] = cumulative;
      return ret;
    }).value().filter(item => item.timestamp >= from);
  }, [feesData]);
  return [feesChartData, loading, error];
}
function useAumPerformanceData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  groupPeriod
}) {
  const [feesData, feesLoading] = useFeesData({
    from,
    to,
    groupPeriod
  });
  const [slpData, slpLoading] = useSlpData({
    from,
    to,
    groupPeriod
  });
  const [volumeData, volumeLoading] = useVolumeData({
    from,
    to,
    groupPeriod
  });
  const dailyCoef = 86400 / groupPeriod;
  const data = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!feesData || !slpData || !volumeData) {
      return null;
    }
    const ret = feesData.map((feeItem, i) => {
      const slpItem = slpData[i];
      const volumeItem = volumeData[i];
      let apr = feeItem !== null && feeItem !== void 0 && feeItem.all && slpItem !== null && slpItem !== void 0 && slpItem.aum ? feeItem.all / slpItem.aum * 100 * 365 * dailyCoef : null;
      if (apr > 10000) {
        apr = null;
      }
      let usage = volumeItem !== null && volumeItem !== void 0 && volumeItem.all && slpItem !== null && slpItem !== void 0 && slpItem.aum ? volumeItem.all / slpItem.aum * 100 * dailyCoef : null;
      if (usage > 10000) {
        usage = null;
      }
      return {
        timestamp: feeItem.timestamp,
        apr,
        usage
      };
    });
    const averageApr = ret.reduce((memo, item) => item.apr + memo, 0) / ret.length;
    ret.forEach(item => item.averageApr = averageApr);
    const averageUsage = ret.reduce((memo, item) => item.usage + memo, 0) / ret.length;
    ret.forEach(item => item.averageUsage = averageUsage);
    return ret;
  }, [feesData, slpData, volumeData]);
  return [data, feesLoading || slpLoading || volumeLoading];
}
function useSlpData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
} = {}) {
  const query = `{
    slpStats(
      first: 1000
      orderBy: timestamp
      orderDirection: desc
      where: {period: daily, timestamp_gte: ${from}, timestamp_lte: ${to}}
    ) {
      timestamp
      aumInUsdm
      slpSupply
      distributedUsd
      distributedEth
    }
  }`;
  let [data, loading, error] = useGraph(query, {
    chainName
  });
  let cumulativeDistributedUsdPerSlp = 0;
  let cumulativeDistributedEthPerSlp = 0;
  const slpChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    if (!data || data && data.slpStats.length === 0) {
      return null;
    }
    const getTimestamp = item => item.timestamp;
    let prevSlpSupply;
    let prevAum;
    let ret = Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(data.slpStats, item => item.timestamp).filter(item => item.timestamp % 86400 === 0).reduce((memo, item) => {
      const last = memo[memo.length - 1];
      const aum = Number(item.aumInUsdm) / 1e18;
      const slpSupply = Number(item.slpSupply) / 1e18;
      const distributedUsd = Number(item.distributedUsd) / 1e30;
      const distributedUsdPerSlp = distributedUsd / slpSupply || 0;
      cumulativeDistributedUsdPerSlp += distributedUsdPerSlp;
      const distributedEth = Number(item.distributedEth) / 1e18;
      const distributedEthPerSlp = distributedEth / slpSupply || 0;
      cumulativeDistributedEthPerSlp += distributedEthPerSlp;
      const slpPrice = aum / slpSupply;
      const timestamp = parseInt(item.timestamp);
      const newItem = {
        timestamp,
        aum,
        slpSupply,
        slpPrice,
        cumulativeDistributedEthPerSlp,
        cumulativeDistributedUsdPerSlp,
        distributedUsdPerSlp,
        distributedEthPerSlp
      };
      if (last && last.timestamp === timestamp) {
        memo[memo.length - 1] = newItem;
      } else {
        memo.push(newItem);
      }
      return memo;
    }, []).map(item => {
      let {
        slpSupply,
        aum
      } = item;
      if (!slpSupply) {
        slpSupply = prevSlpSupply;
      }
      if (!aum) {
        aum = prevAum;
      }
      item.slpSupplyChange = prevSlpSupply ? (slpSupply - prevSlpSupply) / prevSlpSupply * 100 : 0;
      if (item.slpSupplyChange > 1000) item.slpSupplyChange = 0;
      item.aumChange = prevAum ? (aum - prevAum) / prevAum * 100 : 0;
      if (item.aumChange > 1000) item.aumChange = 0;
      prevSlpSupply = slpSupply;
      prevAum = aum;
      return item;
    });
    ret = fillNa(ret);
    return ret;
  }, [data]);
  return [slpChartData, loading, error];
}
function useSlpPerformanceData(slpData, feesData, {
  from = FIRST_DATE_TS,
  chainName = "fantom"
} = {}) {
  const [btcPrices] = useCoingeckoPrices("BTC", {
    from
  });
  const [ethPrices] = useCoingeckoPrices("ETH", {
    from
  });
  const [maticPrices] = useCoingeckoPrices("FTM", {
    from
  });
  const slpPerformanceChartData = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _slpDataById$btcPrice, _btcPrices$, _ethPrices$;
    if (!btcPrices || !ethPrices || !slpData || !feesData) {
      return null;
    }
    const slpDataById = slpData.reduce((memo, item) => {
      memo[item.timestamp] = item;
      return memo;
    }, {});
    const feesDataById = feesData.reduce((memo, item) => {
      memo[item.timestamp] = item;
      return memo;
    });
    let BTC_WEIGHT = 0.15;
    let ETH_WEIGHT = 0.2;
    let FTM_WEIGHT = 0.1;
    let prevEthPrice = 1200;
    let prevMaticPrice = 0.4;
    const STABLE_WEIGHT = 0.5;
    const SLP_START_PRICE = ((_slpDataById$btcPrice = slpDataById[btcPrices[0].timestamp]) === null || _slpDataById$btcPrice === void 0 ? void 0 : _slpDataById$btcPrice.slpPrice) || 1.19;
    const btcFirstPrice = (_btcPrices$ = btcPrices[0]) === null || _btcPrices$ === void 0 ? void 0 : _btcPrices$.value;
    const ethFirstPrice = (_ethPrices$ = ethPrices[0]) === null || _ethPrices$ === void 0 ? void 0 : _ethPrices$.value;
    const maticFirstPrice = maticPrices && maticPrices[0] && maticPrices[0].value || prevMaticPrice;
    const indexBtcCount = SLP_START_PRICE * BTC_WEIGHT / btcFirstPrice;
    const indexEthCount = SLP_START_PRICE * ETH_WEIGHT / ethFirstPrice;
    const indexMaticCount = SLP_START_PRICE * FTM_WEIGHT / maticFirstPrice;
    const lpBtcCount = SLP_START_PRICE * 0.5 / btcFirstPrice;
    const lpEthCount = SLP_START_PRICE * 0.5 / ethFirstPrice;
    const lpMaticCount = SLP_START_PRICE * 0.5 / maticFirstPrice;
    const ret = [];
    let cumulativeFeesPerSlp = 0;
    let cumulativeEsskullRewardsPerSlp = 0;
    let lastSlpPrice = 0;
    for (let i = 0; i < btcPrices.length; i++) {
      var _ethPrices$i, _slpItem$slpPrice, _slpDataById$timestam, _feesDataById$timesta;
      const btcPrice = btcPrices[i].value;
      const ethPrice = ((_ethPrices$i = ethPrices[i]) === null || _ethPrices$i === void 0 ? void 0 : _ethPrices$i.value) || prevEthPrice;
      const maticPrice = maticPrices && maticPrices[i] && maticPrices[i].value || prevMaticPrice;
      prevMaticPrice = maticPrice;
      prevEthPrice = ethPrice;
      const timestampGroup = parseInt(btcPrices[i].timestamp / 86400) * 86400;
      const slpItem = slpDataById[timestampGroup];
      const slpPrice = (_slpItem$slpPrice = slpItem === null || slpItem === void 0 ? void 0 : slpItem.slpPrice) !== null && _slpItem$slpPrice !== void 0 ? _slpItem$slpPrice : lastSlpPrice;
      lastSlpPrice = slpPrice;
      const slpSupply = (_slpDataById$timestam = slpDataById[timestampGroup]) === null || _slpDataById$timestam === void 0 ? void 0 : _slpDataById$timestam.slpSupply;
      const dailyFees = (_feesDataById$timesta = feesDataById[timestampGroup]) === null || _feesDataById$timesta === void 0 ? void 0 : _feesDataById$timesta.all;
      const syntheticPrice = indexBtcCount * btcPrice + indexEthCount * ethPrice + indexMaticCount * maticPrice + SLP_START_PRICE * STABLE_WEIGHT;
      const lpBtcPrice = (lpBtcCount * btcPrice + SLP_START_PRICE / 2) * (1 + getImpermanentLoss(btcPrice / btcFirstPrice));
      const lpEthPrice = (lpEthCount * ethPrice + SLP_START_PRICE / 2) * (1 + getImpermanentLoss(ethPrice / ethFirstPrice));
      const lpMaticPrice = (lpMaticCount * maticPrice + SLP_START_PRICE / 2) * (1 + getImpermanentLoss(maticPrice / maticFirstPrice));
      if (dailyFees && slpSupply) {
        const INCREASED_SLP_REWARDS_TIMESTAMP = 1635714000;
        const SLP_REWARDS_SHARE = timestampGroup >= INCREASED_SLP_REWARDS_TIMESTAMP ? 0.7 : 0.5;
        const collectedFeesPerSlp = dailyFees / slpSupply * SLP_REWARDS_SHARE;
        cumulativeFeesPerSlp += collectedFeesPerSlp;
        cumulativeEsskullRewardsPerSlp += slpPrice * 0.8 / 365;
      }
      let slpPlusFees = slpPrice;
      if (slpPrice && slpSupply && cumulativeFeesPerSlp) {
        slpPlusFees = slpPrice + cumulativeFeesPerSlp;
      }
      let slpApr;
      let slpPlusDistributedUsd;
      let slpPlusDistributedEth;
      if (slpItem) {
        if (slpItem.cumulativeDistributedUsdPerSlp) {
          slpPlusDistributedUsd = slpPrice + slpItem.cumulativeDistributedUsdPerSlp;
          // slpApr = slpItem.distributedUsdPerSlp / slpPrice * 365 * 100 // incorrect?
        }

        if (slpItem.cumulativeDistributedEthPerSlp) {
          slpPlusDistributedEth = slpPrice + slpItem.cumulativeDistributedEthPerSlp * ethPrice;
        }
      }
      ret.push({
        timestamp: btcPrices[i].timestamp,
        syntheticPrice,
        lpBtcPrice,
        lpEthPrice,
        lpMaticPrice,
        slpPrice,
        btcPrice,
        ethPrice,
        slpPlusFees,
        slpPlusDistributedUsd,
        slpPlusDistributedEth,
        performanceLpEth: (slpPrice / lpEthPrice * 100).toFixed(1),
        performanceLpEthCollectedFees: (slpPlusFees / lpEthPrice * 100).toFixed(1),
        performanceLpEthDistributedUsd: (slpPlusDistributedUsd / lpEthPrice * 100).toFixed(1),
        performanceLpEthDistributedEth: (slpPlusDistributedEth / lpEthPrice * 100).toFixed(1),
        performanceLpBtcCollectedFees: (slpPlusFees / lpBtcPrice * 100).toFixed(1),
        performanceSynthetic: (slpPrice / syntheticPrice * 100).toFixed(1),
        performanceSyntheticCollectedFees: (slpPlusFees / syntheticPrice * 100).toFixed(1),
        performanceSyntheticDistributedUsd: (slpPlusDistributedUsd / syntheticPrice * 100).toFixed(1),
        performanceSyntheticDistributedEth: (slpPlusDistributedEth / syntheticPrice * 100).toFixed(1),
        slpApr
      });
    }
    return ret;
  }, [btcPrices, ethPrices, slpData, feesData]);
  return [slpPerformanceChartData];
}
function useReferralsData({
  from = FIRST_DATE_TS,
  to = NOW_TS,
  chainName = "fantom"
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
  const [graphData, loading, error] = useGraph(query, {
    subgraph
  });
  const data = graphData ? Object(lodash__WEBPACK_IMPORTED_MODULE_2__["sortBy"])(graphData.globalStats, "timestamp").map(item => {
    const totalRebateUsd = item.totalRebateUsd / 1e30;
    const discountUsd = item.discountUsd / 1e30;
    return _objectSpread(_objectSpread({}, item), {}, {
      volume: item.volume / 1e30,
      volumeCumulative: item.volumeCumulative / 1e30,
      totalRebateUsd,
      totalRebateUsdCumulative: item.totalRebateUsdCumulative / 1e30,
      discountUsd,
      referrerRebateUsd: totalRebateUsd - discountUsd,
      discountUsdCumulative: item.discountUsdCumulative / 1e30,
      referralCodesCount: parseInt(item.referralCodesCount),
      referralCodesCountCumulative: parseInt(item.referralCodesCountCumulative),
      referrersCount: parseInt(item.referrersCount),
      referrersCountCumulative: parseInt(item.referrersCountCumulative),
      referralsCount: parseInt(item.referralsCount),
      referralsCountCumulative: parseInt(item.referralsCountCumulative)
    });
  }) : null;
  return [data, loading, error];
}

/***/ }),

/***/ "./src/views/Fantom.js":
/*!*****************************!*\
  !*** ./src/views/Fantom.js ***!
  \*****************************/
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
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\views\\Fantom.js";
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
function Fantom(props) {
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
  const [slpData, slpLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useSlpData"])(params);
  const {
    0: totalAum,
    1: totalAumDelta
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useMemo"])(() => {
    var _slpData, _slpData2;
    if (!slpData) {
      return [];
    }
    const total = (_slpData = slpData[slpData.length - 1]) === null || _slpData === void 0 ? void 0 : _slpData.aum;
    const delta = total - ((_slpData2 = slpData[slpData.length - 2]) === null || _slpData2 === void 0 ? void 0 : _slpData2.aum);
    return [total, delta];
  }, [slpData]);
  const [aumPerformanceData, aumPerformanceLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useAumPerformanceData"])(params);
  const [slpPerformanceData, slpPerformanceLoading] = Object(_dataProvider__WEBPACK_IMPORTED_MODULE_11__["useSlpPerformanceData"])(slpData, feesData, params);
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
  }, "Analytics / Fantom"), lastSubgraphBlock && lastBlock && __jsx("p", {
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
    href: `https://ftmscan.com/block/${lastSubgraphBlock.number}`,
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
  }, "SLP Pool"), __jsx("div", {
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
    title: "SKULL & Slp Supply",
    loading: slpLoading,
    data: slpData,
    csvFields: [{
      key: "aum"
    }, {
      key: "slpSupply"
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
    data: slpData,
    syncId: "syncSlp",
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
    name: "SKULL",
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
    dataKey: "slpSupply",
    stackId: "a",
    name: "SLP Supply",
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
    title: "Slp Performance",
    loading: slpLoading,
    data: slpPerformanceData,
    csvFields: [{
      key: "syntheticPrice"
    }, {
      key: "slpPrice"
    }, {
      key: "slpPlusFees"
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
      key: "FTM_WEIGHT"
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
    data: slpPerformanceData,
    syncId: "syncSlp",
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
  }, "% of Index (with fees)"), " ", "is SLP with fees / Index Price * 100. Index is a basket of 25% BTC, 25% ETH, 50% USDC rebalanced once\xA0a\xA0day", __jsx("br", {
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
  }, "% of LP ETH-USDC (with fees)"), " ", "is SLP Price with fees / LP ETH-USDC * 100", __jsx("br", {
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
    title: "Slp Price Comparison",
    loading: slpLoading,
    data: slpPerformanceData,
    csvFields: [{
      key: "syntheticPrice"
    }, {
      key: "slpPrice"
    }, {
      key: "slpPlusFees"
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
    data: slpPerformanceData,
    syncId: "syncSlp",
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
    dataKey: "slpPrice",
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
    dataKey: "slpPrice",
    name: "Slp Price",
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
    dataKey: "slpPlusFees",
    name: "Slp w/ fees",
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
  }, "Slp with fees"), " is based on SLP share of fees received", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 661,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 662,
      columnNumber: 17
    }
  }, "% of Index (with fees)"), " ", "is Slp with fees / Index Price * 100", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 666,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 667,
      columnNumber: 17
    }
  }, "% of LP ETH-USDC (with fees)"), " ", "is Slp Price with fees / LP ETH-USDC * 100", __jsx("br", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 671,
      columnNumber: 17
    }
  }), __jsx("span", {
    style: {
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][2]
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 672,
      columnNumber: 17
    }
  }, "Index Price"), " is 25% BTC, 25% ETH, 50% USDC")))), isExperiment && __jsx("div", {
    className: "chart-cell experiment",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 679,
      columnNumber: 11
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Performance vs. Index",
    loading: slpLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 680,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 681,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: slpPerformanceData,
    syncId: "syncSlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 682,
      columnNumber: 17
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 683,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 684,
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
      lineNumber: 689,
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
      lineNumber: 696,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
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
    dataKey: "performanceSyntheticCollectedFees",
    name: "Collected Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 702,
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
      lineNumber: 712,
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
      lineNumber: 722,
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
      lineNumber: 732,
      columnNumber: 19
    }
  }))))), isExperiment && __jsx("div", {
    className: "chart-cell experiment",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 748,
      columnNumber: 11
    }
  }, __jsx(_components_ChartWrapper__WEBPACK_IMPORTED_MODULE_7__["default"], {
    title: "Performance vs. ETH LP",
    loading: slpLoading,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 749,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 750,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["LineChart"], {
    data: slpPerformanceData,
    syncId: "syncSlp",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 751,
      columnNumber: 17
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 752,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 753,
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
      lineNumber: 758,
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
      lineNumber: 765,
      columnNumber: 19
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
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
    dataKey: "performanceLpEthCollectedFees",
    name: "Collected Fees",
    stroke: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 771,
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
      lineNumber: 781,
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
      lineNumber: 791,
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
      lineNumber: 801,
      columnNumber: 19
    }
  }))))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 816,
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
      lineNumber: 817,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    syncId: "tradersId",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 826,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ComposedChart"], {
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 831,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 832,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 833,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    domain: [-(tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxAbsOfPnlAndCumulativePnl) * 1.05, (tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxAbsOfPnlAndCumulativePnl) * 1.05],
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 838,
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
      lineNumber: 846,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 851,
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
      lineNumber: 852,
      columnNumber: 17
    }
  }, ((tradersData === null || tradersData === void 0 ? void 0 : tradersData.data) || []).map((item, i) => {
    return __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Cell"], {
      key: `cell-${i}`,
      fill: item.pnl > 0 ? "#22c761" : "#f93333",
      __self: this,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 861,
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
      lineNumber: 868,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 877,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 878,
      columnNumber: 15
    }
  }, "Considers settled (closed) positions"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 879,
      columnNumber: 15
    }
  }, "Fees are not factored into PnL")))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 883,
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
      lineNumber: 884,
      columnNumber: 11
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ResponsiveContainer"], {
    width: "100%",
    syncId: "tradersId",
    height: _helpers__WEBPACK_IMPORTED_MODULE_5__["CHART_HEIGHT"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 895,
      columnNumber: 13
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["ComposedChart"], {
    data: tradersData === null || tradersData === void 0 ? void 0 : tradersData.data,
    barGap: 0,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 900,
      columnNumber: 15
    }
  }, __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["CartesianGrid"], {
    strokeDasharray: "10 10",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 901,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["XAxis"], {
    dataKey: "timestamp",
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipLabelFormatter"],
    minTickGap: 30,
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 902,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["YAxis"], {
    domain: [-(tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxProfitLoss) * 1.05, (tradersData === null || tradersData === void 0 ? void 0 : tradersData.stats.maxProfitLoss) * 1.05],
    tickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatter"],
    width: _helpers__WEBPACK_IMPORTED_MODULE_5__["YAXIS_WIDTH"],
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 907,
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
      lineNumber: 915,
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
      lineNumber: 925,
      columnNumber: 17
    }
  }), __jsx(recharts__WEBPACK_IMPORTED_MODULE_6__["Legend"], {
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
    fill: "#22c761",
    fillOpacity: "0.4",
    dataKey: "profitCumulative",
    name: "Cumulative Profit",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 931,
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
      lineNumber: 940,
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
      lineNumber: 949,
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
      lineNumber: 956,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "chart-description",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 965,
      columnNumber: 13
    }
  }, __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 966,
      columnNumber: 15
    }
  }, "Considers settled (closed) positions"), __jsx("p", {
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 967,
      columnNumber: 15
    }
  }, "Fees are not factored into PnL")))), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 971,
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
      key: "FTM",
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
      lineNumber: 972,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 992,
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
      lineNumber: 993,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1008,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncSlp",
    loading: aumPerformanceLoading,
    title: "SKULL Performance Annualized",
    data: aumPerformanceData,
    yaxisDataKey: "apr",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterPercent"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterPercent"],
    items: [{
      key: "apr",
      name: "APR",
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][0]
    }],
    description: "Formula = Daily Fees / SLP Pool * 365 days * 100",
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1009,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1022,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncSlp",
    loading: aumPerformanceLoading,
    title: "SKULL Daily Usage",
    data: aumPerformanceData,
    yaxisDataKey: "usage",
    yaxisTickFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["yaxisFormatterPercent"],
    tooltipFormatter: _helpers__WEBPACK_IMPORTED_MODULE_5__["tooltipFormatterPercent"],
    items: [{
      key: "usage",
      name: "Daily Usage",
      color: _helpers__WEBPACK_IMPORTED_MODULE_5__["COLORS"][4]
    }],
    description: "Formula = Daily Volume / SLP Pool * 100",
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1023,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1036,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncSlp",
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
      name: "Mint & Burn SLP"
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1037,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1054,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncSlp",
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
      lineNumber: 1055,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1081,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncSlp",
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
      lineNumber: 1082,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1111,
      columnNumber: 9
    }
  }, __jsx(_components_GenericChart__WEBPACK_IMPORTED_MODULE_10__["default"], {
    syncId: "syncSlp",
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
      name: "Mint & Burn SLP"
    }],
    type: "Composed",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1112,
      columnNumber: 11
    }
  })), __jsx("div", {
    className: "chart-cell",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 1132,
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
      lineNumber: 1133,
      columnNumber: 11
    }
  }))));
}
/* harmony default export */ __webpack_exports__["default"] = (Fantom);

/***/ })

};
//# sourceMappingURL=server.975bd578636a488a0dce.hot-update.js.map