
export const FANTOM = 250;

export const addresses = {

  [FANTOM]: {
    SKULL: "0x9945Dd3eCB40A6b594813f2A4DF1643b10Fe3550", // DONE
    ES_SKULL: "",
    SLP: "0xe05C7be79548f4E35b39E03ceF80ccac56AC065e", // DONE
    BN_SKULL: "",
    STAKED_SKULL_TRACKER: "0x67F2514B5d31524228c1A625D35644CF0a1f2543", // DONE
    STAKED_SLP_TRACKER: "0xeBBFe4e7a7520163e016DE54c09E621B85C9F8c9", // DONE
    BONUS_SKULL_TRACKER: "",
    FEE_SKULL_TRACKER: "0x499FF6d419A8249Bf4bD7F809ab4E87c6B99453a", // DONE
    FEE_SLP_TRACKER: "0xEfC3a97e4e94645e2421aC36619D80F63a141193", // DONE
    FTM: "0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83",
    BTC: "0x321162Cd933E2Be498Cd2267a90534A804051b11", // 8 decimals wrapped btc
    ETH: "0x74b23882a30290451A17c44f4F05243b6b58C76d", // 18 decimals wrapped eth
    RewardReader: "0x6F555eB67C0233Aea868b1Af16a09f75D19aE8FD", // DONE
    SlpManager: "0xc433aB8B7418fF1dDC34739e1F2f4A8c49D3301F", // DONE
    Router: "0xAdbf78Beae98a0bEC0Fe780CF3EB1d2F8A68186f", // DONE
    OrderBook: "0x8965fD4F006A93096BE79095Fb21833c11a6C7AE", // DONE
    PositionManager: "0x87Ca186316359Ee1815Db3f035f2A8fa1e9fEF95", // DONE
    FastPriceFeed: "0x49eF1610Be70fCAE062E191B55abE336907f0D30", // DONE
    PositionRouter: "0xf58ea416Eb0A786a84c869eC8E154d212e3E2FE2", // DONE
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
