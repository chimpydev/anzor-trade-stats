
export const AVALANCHE = 10;

export const addresses = {

  [AVALANCHE]: {
    MJAR: "0x9945Dd3eCB40A6b594813f2A4DF1643b10Fe3550", // DONE
    ES_MJAR: "",
    MJLP: "0x85CEF8dd0AaD49Fb4C04529f65D92177B936Da74", // DONE
    BN_MJAR: "",
    STAKED_MJAR_TRACKER: "",
    STAKED_MJLP_TRACKER: "",
    BONUS_MJAR_TRACKER: "",
    FEE_MJAR_TRACKER: "",
    FEE_MJLP_TRACKER: "",
    AVAX: "0xB31f66AA3C1e785363F0875A1B74E27b85FD66c7", // DONE AVAX
    BTC: "0x321162Cd933E2Be498Cd2267a90534A804051b11", // 8 decimals wrapped btc
    ETH: "0x74b23882a30290451A17c44f4F05243b6b58C76d", // 18 decimals wrapped eth
    RewardReader: "0xeF98e5d4F67633D6072c2a93e69A7F6a6179fD1b",
    MjlpManager: "0xCeF49b3f525d646924d20A4bC7B325dBb537e45A", // DONE
    Router: "0x5043C2470D7454F1678f6ecCCEE9D3D4588320cC", // DONE
    OrderBook: "0x286798570bf721c45A757B1de0B3149526c42273", // DONE
    PositionManager: "0x8F27c5F885B19279E12cdCbf29c9B0541dc563F3", // DONE
    FastPriceFeed: "",
    PositionRouter: "0xD30E4778512A0b24A34D355A5Ef28d337e96Bb95", // DONE
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
