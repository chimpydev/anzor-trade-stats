
export const FANTOM = 250;

export const addresses = {

  [FANTOM]: {
    MVX: "",
    ES_MVX: "",
    MVLP: "",
    BN_MVX: "",
    STAKED_MVX_TRACKER: "",
    STAKED_MVLP_TRACKER: "",
    BONUS_MVX_TRACKER: "",
    FEE_MVX_TRACKER: "",
    FEE_MVLP_TRACKER: "",
    MATIC: "",
    BTC: "", // 8 decimals wrapped btc
    ETH: "", // 18 decimals wrapped eth
    RewardReader: "",
    MvlpManager: "",
    Router: "",
    OrderBook: "",
    PositionManager: "",
    FastPriceFeed: "",
    PositionRouter: "",
    PositionExecutorUpKeep: ""

  },
};

export function getAddress(chainId, key) {
  if (!chainId in addresses) {
    throw new Error(`Unknown chain ${chainId}`);
  }
  if (!(key in addresses[chainId])) {
    throw new Error(`Unknown address key ${key}`);
  }
  return addresses[chainId][key];
}
