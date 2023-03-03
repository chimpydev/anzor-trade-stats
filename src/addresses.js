
export const FANTOM = 250;

export const addresses = {

  [FANTOM]: {
    SKULL: "0xfa5992A8A47aF7029e04eC6a95203AD3f301460b", // DONE
    ES_SKULL: "0x2b402AeDd4ccC193DC2A50c281Fb8945ddaD9760", // DONE
    SLP: "0xae904132587Db1c9177ED4755c32811407ebeAb4", // DONE
    BN_SKULL: "0x94d05cd11F595C0a25fcdE6f5C762b50448f2cdc", // DONE
    STAKED_SKULL_TRACKER: "0x6f0dcE2785241f72f10605b3644983e91D806732", // DONE
    STAKED_SLP_TRACKER: "0x748E9EE6E878Eca5d7d97C7427066aaeF095C7E3", // DONE
    BONUS_SKULL_TRACKER: "0x350FD63274e00DD45bc85B2745b24a5047473568",
    FEE_SKULL_TRACKER: "0xF03C3b4449Cb25611A590566CF7DCe586ad2aedd", // DONE
    FEE_SLP_TRACKER: "0x821D86F3860acb43bbA46f32231FDD11db2B2b0e", // DONE
    FTM: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    BTC: "0x321162Cd933E2Be498Cd2267a90534A804051b11", // 8 decimals wrapped btc
    ETH: "0x74b23882a30290451A17c44f4F05243b6b58C76d", // 18 decimals wrapped eth
    RewardReader: "0x096aA9D819e465f5f8Bea83947fa43af67d8ac09", // DONE
    SlpManager: "0x9A3CF1DF49Ab9A4C8c3C8DC5EEbd0e6A384F1B9d", // DONE
    Router: "0xDC41E2dEe74Fc8237Af877811d089039DCa646Ac", // DONE
    OrderBook: "0xe913547bC9e19C2d38215f7Ab2535cc89c25b096", // DONE
    PositionManager: "0x493207B0b5616b0d2db041Bcc4C9013e12B1016f", // DONE
    FastPriceFeed: "0xfe2A4da911C9B41ddaC739494A8b0aA7Ab3DE176", // DONE
    PositionRouter: "0x1CA2C9F35651B4660ebC0d5694dc081a50fA67f6", // DONE
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
