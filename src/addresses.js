
export const FANTOM = 250;

export const addresses = {

  [FANTOM]: {
    SKULL: "0x9945Dd3eCB40A6b594813f2A4DF1643b10Fe3550", // DONE
    ES_SKULL: "0x9833496486990B0386075EcB9E502914b7b77ef5", // DONE
    SLP: "0x246a987Af7C30Ce24287b0790f7089eCEC566B6e", // DONE
    BN_SKULL: "0xb9e9135Db9C97e6d41A8AceC6Bdc83F4deE8c38a", // DONE
    STAKED_SKULL_TRACKER: "0x55f8071d1373a2345bFbAaA6c2FEcc081f919AD8", // DONE
    STAKED_SLP_TRACKER: "0xAEC20398C1f2b816Cfae32718e764328de20c06E", // DONE
    BONUS_SKULL_TRACKER: "0xa09E8E638b0681FA2640E67DCdD87bD389eBcBc2",
    FEE_SKULL_TRACKER: "0x6672876D31Ec526d876D89011675b21cd8a7167d", // DONE
    FEE_SLP_TRACKER: "0x6Fe9aDFe38dd5240Ec44db031c0092a4159d626A", // DONE
    FTM: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    BTC: "0x321162Cd933E2Be498Cd2267a90534A804051b11", // 8 decimals wrapped btc
    ETH: "0x74b23882a30290451A17c44f4F05243b6b58C76d", // 18 decimals wrapped eth
    RewardReader: "0x8fD367bf24634f0121D43E25EB5BAe0E203733a6", // DONE
    SlpManager: "0xc684bF426a822f13adFf941fC8C6f7713D4a85f7", // DONE
    Router: "0x5e15E722E9FEBEd1a6eC551Da68bf7C2F149E467", // DONE
    OrderBook: "0xB9065Bd9002D9077dD77CbFD452B504D5F979263", // DONE
    PositionManager: "0x96237c83b64860Eb4bD495A772937DDB62719f8D", // DONE
    FastPriceFeed: "0xBaF851f44242bD955B12507f1151D1ac4DE4fC72", // DONE
    PositionRouter: "0x3CC16F58b04bDA99673B1F32c1be0e799aDED37F", // DONE
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
