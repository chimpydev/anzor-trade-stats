
export const FANTOM = 250;

export const addresses = {

  [FANTOM]: {
    ANZOR: "",
    ES_ANZOR: "",
    ALP: "",
    BN_ANZOR: "",
    STAKED_ANZOR_TRACKER: "",
    STAKED_ALP_TRACKER: "",
    BONUS_ANZOR_TRACKER: "",
    FEE_ANZOR_TRACKER: "",
    FEE_ALP_TRACKER: "",
    FTM: "",
    BTC: "", // 8 decimals wrapped btc
    ETH: "", // 18 decimals wrapped eth
    RewardReader: "",
    AlpManager: "",
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
