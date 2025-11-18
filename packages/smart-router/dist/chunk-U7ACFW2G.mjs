import { Percent, WNATIVE, ERC20Token, CurrencyAmount } from '@pancakeswap/sdk';
import { ChainId } from '@pancakeswap/chains';
import { USDC, USDT, WBTC_ETH, BUSD, bscTokens, bscTestnetTokens, arbitrumTokens, arbitrumGoerliTokens, polygonZkEvmTokens, polygonZkEvmTestnetTokens, zksyncTokens, zkSyncTestnetTokens, lineaTokens, lineaTestnetTokens, opBnbTokens, opBnbTestnetTokens, baseTokens, baseTestnetTokens, scrollSepoliaTokens, sepoliaTokens, arbSepoliaTokens, baseSepoliaTokens, monadTestnetTokens, ethereumTokens, goerliTestnetTokens } from '@pancakeswap/tokens';

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var BIG_INT_TEN = 10n;
var BIPS_BASE = 10000n;
var MIN_BNB = BIG_INT_TEN ** 16n;
var BETTER_TRADE_LESS_HOPS_THRESHOLD = new Percent(50n, BIPS_BASE);
var SMART_ROUTER_ADDRESSES = {
  [ChainId.ETHEREUM]: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4",
  [ChainId.GOERLI]: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
  [ChainId.BSC]: "0x13f4EA83D0bd40E75C8222255bc855a974568Dd4",
  [ChainId.BSC_TESTNET]: "0x9a489505a00cE272eAa5e07Dba6491314CaE3796",
  [ChainId.ARBITRUM_ONE]: "0x32226588378236Fd0c7c4053999F88aC0e5cAc77",
  [ChainId.ARBITRUM_GOERLI]: "0xBee35e9Cbd9595355Eaf5DE2055EF525adB41bE6",
  [ChainId.POLYGON_ZKEVM]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.POLYGON_ZKEVM_TESTNET]: "0x365C5F0B816828936320ea143e337fbA7D1b911E",
  [ChainId.ZKSYNC]: "0xf8b59f3c3Ab33200ec80a8A58b2aA5F5D2a8944C",
  [ChainId.ZKSYNC_TESTNET]: "0x4DC9186c6C5F7dd430c7b6D8D513076637902241",
  [ChainId.LINEA]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.LINEA_TESTNET]: "0x21d809FB4052bb1807cfe2418bA638d72F4aEf87",
  [ChainId.OPBNB]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.OPBNB_TESTNET]: "0xf317eD77Baed624d0EA2384AA88D91B774a9b009",
  [ChainId.BASE]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.BASE_TESTNET]: "0xDDC44b8507B4Ca992fB60F0ECdF5651A87668509",
  [ChainId.SCROLL_SEPOLIA]: "0xDDC44b8507B4Ca992fB60F0ECdF5651A87668509",
  [ChainId.SEPOLIA]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.ARBITRUM_SEPOLIA]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.BASE_SEPOLIA]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.MONAD_TESTNET]: "0xe27dC57FcE896350a38D8d8aDcEefBfb5649D9De"
};
var V2_ROUTER_ADDRESS = {
  [ChainId.ETHEREUM]: "0xEfF92A263d31888d860bD50809A8D171709b7b1c",
  [ChainId.GOERLI]: "0xEfF92A263d31888d860bD50809A8D171709b7b1c",
  [ChainId.BSC]: "0x10ED43C718714eb63d5aA57B78B54704E256024E",
  [ChainId.BSC_TESTNET]: "0xD99D1c33F9fC3444f8101754aBC46c52416550D1",
  [ChainId.ARBITRUM_ONE]: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  [ChainId.ARBITRUM_GOERLI]: "0xB8054A1F11090fbe82B45aC3c72e86732f8355DC",
  [ChainId.POLYGON_ZKEVM]: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  [ChainId.POLYGON_ZKEVM_TESTNET]: "0x1ac9F6489487a282961b3929bCFA0a773251315E",
  [ChainId.ZKSYNC]: "0x5aEaF2883FBf30f3D62471154eDa3C0c1b05942d",
  [ChainId.ZKSYNC_TESTNET]: "0xA0Fbd5d1474950bc9417FB00f9d4e2ee0385c560",
  [ChainId.LINEA]: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  [ChainId.LINEA_TESTNET]: "0xD7A304138D50C125733d1fE8a2041199E4944Aa1",
  [ChainId.OPBNB]: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  [ChainId.OPBNB_TESTNET]: "0x62FF25CFD64E55673168c3656f4902bD7Aa5F0f4",
  [ChainId.BASE]: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  [ChainId.BASE_TESTNET]: "0xC259d1D3476558630d83b0b60c105ae958382792",
  [ChainId.SCROLL_SEPOLIA]: "0x715303D2eF7dA7FFAbF637651D71FD11d41fAf7F",
  [ChainId.SEPOLIA]: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  [ChainId.ARBITRUM_SEPOLIA]: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  [ChainId.BASE_SEPOLIA]: "0x8cFe327CEc66d1C090Dd72bd0FF11d690C33a2Eb",
  [ChainId.MONAD_TESTNET]: "0x3a3eBAe0Eec80852FBC7B9E824C6756969cc8dc1"
};
var STABLE_SWAP_INFO_ADDRESS = {
  [ChainId.ETHEREUM]: "",
  [ChainId.GOERLI]: "",
  [ChainId.BSC]: "0xa680d27f63Fa5E213C502d1B3Ca1EB6a3C1b31D6",
  [ChainId.BSC_TESTNET]: "0xaE6C14AAA753B3FCaB96149e1E10Bc4EDF39F546",
  [ChainId.ARBITRUM_ONE]: "",
  [ChainId.ARBITRUM_GOERLI]: "",
  [ChainId.POLYGON_ZKEVM]: "",
  [ChainId.POLYGON_ZKEVM_TESTNET]: "",
  [ChainId.ZKSYNC]: "",
  [ChainId.ZKSYNC_TESTNET]: "",
  [ChainId.LINEA]: "",
  [ChainId.LINEA_TESTNET]: "",
  [ChainId.OPBNB]: "",
  [ChainId.OPBNB_TESTNET]: "",
  [ChainId.BASE]: "",
  [ChainId.BASE_TESTNET]: "",
  [ChainId.SCROLL_SEPOLIA]: "",
  [ChainId.SEPOLIA]: "",
  [ChainId.ARBITRUM_SEPOLIA]: "",
  [ChainId.BASE_SEPOLIA]: "",
  [ChainId.MONAD_TESTNET]: ""
};
var BASES_TO_CHECK_TRADES_AGAINST = {
  [ChainId.ETHEREUM]: [WNATIVE[ChainId.ETHEREUM], USDC[ChainId.ETHEREUM], USDT[ChainId.ETHEREUM], WBTC_ETH],
  [ChainId.GOERLI]: [WNATIVE[ChainId.GOERLI], USDC[ChainId.GOERLI], BUSD[ChainId.GOERLI]],
  [ChainId.BSC]: [
    bscTokens.wbnb,
    bscTokens.cake,
    bscTokens.busd,
    bscTokens.usdt,
    bscTokens.btcb,
    bscTokens.eth,
    bscTokens.usdc
  ],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.wbnb, bscTestnetTokens.cake, bscTestnetTokens.busd],
  [ChainId.ARBITRUM_ONE]: [arbitrumTokens.weth, arbitrumTokens.usdt, arbitrumTokens.usdc],
  [ChainId.ARBITRUM_GOERLI]: [arbitrumGoerliTokens.weth, arbitrumGoerliTokens.usdc],
  [ChainId.POLYGON_ZKEVM]: [polygonZkEvmTokens.weth, polygonZkEvmTokens.usdt, polygonZkEvmTokens.usdc],
  [ChainId.POLYGON_ZKEVM_TESTNET]: [polygonZkEvmTestnetTokens.weth, polygonZkEvmTestnetTokens.usdt],
  [ChainId.ZKSYNC]: [zksyncTokens.usdc, zksyncTokens.weth],
  [ChainId.ZKSYNC_TESTNET]: [zkSyncTestnetTokens.usdc, zkSyncTestnetTokens.weth],
  [ChainId.LINEA]: [lineaTokens.usdc, lineaTokens.weth],
  [ChainId.LINEA_TESTNET]: [lineaTestnetTokens.usdc, lineaTestnetTokens.weth],
  [ChainId.OPBNB]: [opBnbTokens.wbnb, opBnbTokens.usdt],
  [ChainId.OPBNB_TESTNET]: [opBnbTestnetTokens.usdc, opBnbTestnetTokens.wbnb],
  [ChainId.BASE]: [baseTokens.usdc, baseTokens.weth],
  [ChainId.BASE_TESTNET]: [baseTestnetTokens.usdc, baseTestnetTokens.weth],
  [ChainId.SCROLL_SEPOLIA]: [scrollSepoliaTokens.usdc, scrollSepoliaTokens.weth],
  [ChainId.SEPOLIA]: [sepoliaTokens.usdc, sepoliaTokens.weth],
  [ChainId.ARBITRUM_SEPOLIA]: [arbSepoliaTokens.usdc, arbSepoliaTokens.weth],
  [ChainId.BASE_SEPOLIA]: [baseSepoliaTokens.usdc, baseSepoliaTokens.weth],
  [ChainId.MONAD_TESTNET]: [monadTestnetTokens.weth, monadTestnetTokens.usdc, monadTestnetTokens.busd]
};
var czusd = new ERC20Token(ChainId.BSC, "0xE68b79e51bf826534Ff37AA9CeE71a3842ee9c70", 18, "CZUSD", "CZUSD");
var ADDITIONAL_BASES = {
  [ChainId.BSC]: {
    // SNFTS-SFUND
    [bscTokens.snfts.address]: [bscTokens.sfund],
    [bscTokens.ankr.address]: [bscTokens.ankrbnb],
    [bscTokens.ankrbnb.address]: [bscTokens.ankrETH, bscTokens.ankr],
    [bscTokens.ankrETH.address]: [bscTokens.ankrbnb],
    // REVV - EDU
    [bscTokens.revv.address]: [bscTokens.edu],
    [bscTokens.edu.address]: [bscTokens.revv],
    // unshETH - USH
    [bscTokens.unshETH.address]: [bscTokens.ush],
    [bscTokens.ush.address]: [bscTokens.unshETH],
    [bscTokens.tusd.address]: [bscTokens.usdd],
    [bscTokens.usdd.address]: [bscTokens.tusd],
    [bscTokens.mpendle.address]: [bscTokens.pendle],
    [bscTokens.pendle.address]: [bscTokens.mpendle],
    [bscTokens.mdlp.address]: [bscTokens.dlp],
    [bscTokens.dlp.address]: [bscTokens.mdlp],
    // pancakeswap/pancake-frontend#7909
    // LSDT
    "0xAa83Bb1Be2a74AaA8795a8887054919A0Ea96BFA": [czusd],
    // GEM
    "0x701F1ed50Aa5e784B8Fb89d1Ba05cCCd627839a7": [czusd],
    // DOGD
    "0x99F4cc2BAE97F82A823CA80DcAe52EF972B7F270": [czusd]
  },
  [ChainId.ETHEREUM]: {
    // alETH - ALCX
    [ethereumTokens.alcx.address]: [ethereumTokens.alETH],
    [ethereumTokens.alETH.address]: [ethereumTokens.alcx],
    // rETH - ETH
    [ethereumTokens.weth.address]: [ethereumTokens.rETH]
  },
  [ChainId.BASE]: {
    // axlusdc - USDbC
    [baseTokens.axlusdc.address]: [baseTokens.usdbc],
    [baseTokens.usdbc.address]: [baseTokens.axlusdc]
  },
  [ChainId.ARBITRUM_ONE]: {
    [arbitrumTokens.mpendle.address]: [arbitrumTokens.pendle],
    [arbitrumTokens.pendle.address]: [arbitrumTokens.mpendle]
  }
};
var CUSTOM_BASES = {
  [ChainId.BSC]: {
    [bscTokens.axlusdc.address]: [bscTokens.usdt]
  }
};

// evm/constants/gasModel/stableSwap.ts
var BASE_SWAP_COST_STABLE_SWAP = 180000n;
var COST_PER_EXTRA_HOP_STABLE_SWAP = 70000n;

// evm/constants/gasModel/v2.ts
var BASE_SWAP_COST_V2 = 135000n;
var COST_PER_EXTRA_HOP_V2 = 50000n;
var COST_PER_UNINIT_TICK = 0n;
var BASE_SWAP_COST_V3 = (id) => {
  switch (id) {
    case ChainId.BSC:
    case ChainId.BSC_TESTNET:
    case ChainId.ETHEREUM:
    case ChainId.GOERLI:
    case ChainId.ZKSYNC:
    case ChainId.ZKSYNC_TESTNET:
    case ChainId.POLYGON_ZKEVM:
    case ChainId.POLYGON_ZKEVM_TESTNET:
    case ChainId.OPBNB:
    case ChainId.OPBNB_TESTNET:
    case ChainId.MONAD_TESTNET:
      return 2000n;
    default:
      return 0n;
  }
};
var COST_PER_INIT_TICK = (id) => {
  switch (id) {
    case ChainId.BSC:
    case ChainId.BSC_TESTNET:
    case ChainId.ETHEREUM:
    case ChainId.GOERLI:
    case ChainId.ZKSYNC:
    case ChainId.ZKSYNC_TESTNET:
    case ChainId.POLYGON_ZKEVM:
    case ChainId.POLYGON_ZKEVM_TESTNET:
    case ChainId.OPBNB:
    case ChainId.OPBNB_TESTNET:
    case ChainId.MONAD_TESTNET:
      return 31000n;
    default:
      return 0n;
  }
};
var COST_PER_HOP_V3 = (id) => {
  switch (id) {
    case ChainId.BSC:
    case ChainId.BSC_TESTNET:
    case ChainId.ETHEREUM:
    case ChainId.GOERLI:
    case ChainId.ZKSYNC:
    case ChainId.ZKSYNC_TESTNET:
    case ChainId.POLYGON_ZKEVM:
    case ChainId.POLYGON_ZKEVM_TESTNET:
    case ChainId.OPBNB:
    case ChainId.OPBNB_TESTNET:
    case ChainId.MONAD_TESTNET:
      return 80000n;
    default:
      return 0n;
  }
};
var usdGasTokensByChain = {
  [ChainId.ETHEREUM]: [ethereumTokens.usdt],
  [ChainId.GOERLI]: [goerliTestnetTokens.usdc],
  [ChainId.BSC]: [bscTokens.usdt],
  [ChainId.BSC_TESTNET]: [bscTestnetTokens.usdt],
  [ChainId.ARBITRUM_ONE]: [arbitrumTokens.usdc],
  [ChainId.ARBITRUM_GOERLI]: [arbitrumGoerliTokens.usdc],
  [ChainId.POLYGON_ZKEVM]: [polygonZkEvmTokens.usdt],
  [ChainId.POLYGON_ZKEVM_TESTNET]: [polygonZkEvmTestnetTokens.usdt],
  [ChainId.ZKSYNC]: [zksyncTokens.usdc],
  [ChainId.ZKSYNC_TESTNET]: [zkSyncTestnetTokens.usdc],
  [ChainId.LINEA]: [lineaTokens.usdc],
  [ChainId.LINEA_TESTNET]: [lineaTestnetTokens.usdc],
  [ChainId.OPBNB]: [opBnbTokens.usdt],
  [ChainId.OPBNB_TESTNET]: [opBnbTestnetTokens.usdc],
  [ChainId.BASE]: [baseTokens.usdc],
  [ChainId.BASE_TESTNET]: [baseTestnetTokens.usdc],
  [ChainId.SCROLL_SEPOLIA]: [scrollSepoliaTokens.usdc],
  [ChainId.SEPOLIA]: [scrollSepoliaTokens.usdc],
  [ChainId.ARBITRUM_SEPOLIA]: [arbSepoliaTokens.usdc],
  [ChainId.BASE_SEPOLIA]: [baseSepoliaTokens.usdc],
  [ChainId.MONAD_TESTNET]: [monadTestnetTokens.usdc]
};
var DEFAULT = {
  defaultConfig: {
    gasLimitPerCall: 1e6
  },
  gasErrorFailureOverride: {
    gasLimitPerCall: 2e6
  },
  successRateFailureOverrides: {
    gasLimitPerCall: 2e6
  }
};
var BATCH_MULTICALL_CONFIGS = {
  [ChainId.BSC_TESTNET]: DEFAULT,
  [ChainId.BSC]: DEFAULT,
  [ChainId.ETHEREUM]: DEFAULT,
  [ChainId.GOERLI]: DEFAULT,
  [ChainId.ARBITRUM_ONE]: DEFAULT,
  [ChainId.ARBITRUM_GOERLI]: DEFAULT,
  [ChainId.POLYGON_ZKEVM]: {
    defaultConfig: {
      gasLimitPerCall: 5e5
    },
    gasErrorFailureOverride: {
      gasLimitPerCall: 15e5
    },
    successRateFailureOverrides: {
      gasLimitPerCall: 15e5
    }
  },
  [ChainId.POLYGON_ZKEVM_TESTNET]: {
    defaultConfig: {
      gasLimitPerCall: 5e5
    },
    gasErrorFailureOverride: {
      gasLimitPerCall: 15e5
    },
    successRateFailureOverrides: {
      gasLimitPerCall: 15e5
    }
  },
  [ChainId.ZKSYNC]: {
    defaultConfig: {
      gasLimitPerCall: 1e6
    },
    gasErrorFailureOverride: {
      gasLimitPerCall: 2e6
    },
    successRateFailureOverrides: {
      gasLimitPerCall: 3e6
    }
  },
  [ChainId.ZKSYNC_TESTNET]: DEFAULT,
  [ChainId.LINEA]: DEFAULT,
  [ChainId.LINEA_TESTNET]: DEFAULT,
  [ChainId.BASE]: {
    ...DEFAULT,
    defaultConfig: {
      ...DEFAULT.defaultConfig,
      dropUnexecutedCalls: true
    }
  },
  [ChainId.BASE_TESTNET]: DEFAULT,
  [ChainId.OPBNB]: DEFAULT,
  [ChainId.OPBNB_TESTNET]: DEFAULT,
  [ChainId.SCROLL_SEPOLIA]: DEFAULT,
  [ChainId.SEPOLIA]: DEFAULT,
  [ChainId.ARBITRUM_SEPOLIA]: DEFAULT,
  [ChainId.BASE_SEPOLIA]: DEFAULT,
  [ChainId.MONAD_TESTNET]: DEFAULT
};
var V2_FEE_PATH_PLACEHOLDER = 8388608;
var MSG_SENDER = "0x0000000000000000000000000000000000000001";
var ADDRESS_THIS = "0x0000000000000000000000000000000000000002";
var MIXED_ROUTE_QUOTER_ADDRESSES = {
  [ChainId.ETHEREUM]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.GOERLI]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.BSC]: "0x678Aa4bF4E210cf2166753e054d5b7c31cc7fa86",
  [ChainId.BSC_TESTNET]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.ARBITRUM_ONE]: "0x5457fa0318753E9eaC2d17DFfdb6383da207d705",
  [ChainId.ARBITRUM_GOERLI]: "0x805e03325116Da555Babf012C7bd490Bdd6EEa95",
  [ChainId.POLYGON_ZKEVM]: "0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B",
  [ChainId.POLYGON_ZKEVM_TESTNET]: "0x9CFCdecF9e37Bf25023A2B42537127c1089600fE",
  [ChainId.ZKSYNC]: "0x9B1edFB3848660402E4f1DC25733764e80aA627A",
  [ChainId.ZKSYNC_TESTNET]: "0x7931c270f59Cb1c2617e87976689bD6803afF50a",
  [ChainId.LINEA]: "0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B",
  [ChainId.LINEA_TESTNET]: "0x7d3ed219e45637Cfa77b1a634d0489a2950d1B7F",
  [ChainId.OPBNB]: "0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B",
  [ChainId.OPBNB_TESTNET]: "0x118F080BF268aa7De4bE6d5e579D926903E7d6Cb",
  [ChainId.BASE]: "0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B",
  [ChainId.BASE_TESTNET]: "0x9d4277f1D41CCB30C0e91f7d1bBA2A739E19032C",
  [ChainId.SCROLL_SEPOLIA]: "0x9d4277f1D41CCB30C0e91f7d1bBA2A739E19032C",
  [ChainId.SEPOLIA]: "0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B",
  [ChainId.ARBITRUM_SEPOLIA]: "0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B",
  [ChainId.BASE_SEPOLIA]: "0x4c650FB471fe4e0f476fD3437C3411B1122c4e3B",
  [ChainId.MONAD_TESTNET]: "0x7f988126C2c5d4967Bb5E70bDeB7e26DB6BD5C28"
};
var V3_QUOTER_ADDRESSES = {
  [ChainId.ETHEREUM]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.GOERLI]: "0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2",
  [ChainId.BSC]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.BSC_TESTNET]: "0xbC203d7f83677c7ed3F7acEc959963E7F4ECC5C2",
  [ChainId.ARBITRUM_ONE]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.ARBITRUM_GOERLI]: "0xC0F9488345ed89105b3bd135150905F718Bb254E",
  [ChainId.POLYGON_ZKEVM]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.POLYGON_ZKEVM_TESTNET]: "0xA9c08a89Be4503E04Fd84Eadad4320eE34e9B11D",
  [ChainId.ZKSYNC]: "0x3d146FcE6c1006857750cBe8aF44f76a28041CCc",
  [ChainId.ZKSYNC_TESTNET]: "0x43e273b4Ffd6bC9d6Be1a862D19893549c3b9b46",
  [ChainId.LINEA]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.LINEA_TESTNET]: "0x669254936caE83bE34008BdFdeeA63C902497B31",
  [ChainId.OPBNB]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.OPBNB_TESTNET]: "0x052a99849Ef2e13a5CB28275862991671D4b6fF5",
  [ChainId.BASE]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.BASE_TESTNET]: "0x6cc56b20bf8C4FfD58050D15AbA2978A745CC691",
  [ChainId.SCROLL_SEPOLIA]: "0x6cc56b20bf8C4FfD58050D15AbA2978A745CC691",
  [ChainId.SEPOLIA]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.ARBITRUM_SEPOLIA]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.BASE_SEPOLIA]: "0xB048Bbc1Ee6b733FFfCFb9e9CeF7375518e25997",
  [ChainId.MONAD_TESTNET]: "0x74b06eFA24F39C60AA7F61BD516a3eaf39613D57"
};
var TICK_LENS_MAINNET_ADDRESS = "0x9a489505a00cE272eAa5e07Dba6491314CaE3796";
var TICK_LENS_TESTNET_ADDRESS = "0xac1cE734566f390A94b00eb9bf561c2625BF44ea";
var V3_TICK_LENS_ADDRESSES = {
  [ChainId.ETHEREUM]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.GOERLI]: TICK_LENS_TESTNET_ADDRESS,
  [ChainId.BSC]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.BSC_TESTNET]: TICK_LENS_TESTNET_ADDRESS,
  [ChainId.ARBITRUM_ONE]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.ARBITRUM_GOERLI]: "0x2F6dE77f29a0065398837DD4a485c48eE8D13afc",
  [ChainId.POLYGON_ZKEVM]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.POLYGON_ZKEVM_TESTNET]: "0x1415dc83bc3d87089ab533B196D14d9C49828C69",
  [ChainId.ZKSYNC]: "0x7b08978FA77910f77d273c353C62b5BFB9E6D17B",
  [ChainId.ZKSYNC_TESTNET]: "0x",
  [ChainId.LINEA]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.LINEA_TESTNET]: "0xEf60E2B3bB419891Aa2541b805f5AcEA991C181F",
  [ChainId.OPBNB]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.OPBNB_TESTNET]: "0x15571d4a7D08e16108b97cf7c80Ffd5C3fcb9657",
  [ChainId.BASE]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.BASE_TESTNET]: "0x66A9870FF7707936B0B0278cF999C5f2Ac2e42F5",
  [ChainId.SCROLL_SEPOLIA]: "0x66A9870FF7707936B0B0278cF999C5f2Ac2e42F5",
  [ChainId.SEPOLIA]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.ARBITRUM_SEPOLIA]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.BASE_SEPOLIA]: TICK_LENS_MAINNET_ADDRESS,
  [ChainId.MONAD_TESTNET]: "0xf9A142FDc30Fa9f76ff2bfEc25E07449A504AeC3"
};
function wrappedCurrency(currency, chainId) {
  return currency?.isNative ? WNATIVE[chainId] : currency?.isToken ? currency : void 0;
}
function wrappedCurrencyAmount(currencyAmount, chainId) {
  const token = currencyAmount && chainId ? wrappedCurrency(currencyAmount.currency, chainId) : void 0;
  return token && currencyAmount ? CurrencyAmount.fromRawAmount(token, currencyAmount.quotient) : void 0;
}

// evm/abis/IPancakePair.ts
var pancakePairABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Approval",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "Burn",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1",
        type: "uint256"
      }
    ],
    name: "Mint",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "sender",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0In",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1In",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "Swap",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve0",
        type: "uint112"
      },
      {
        indexed: false,
        internalType: "uint112",
        name: "reserve1",
        type: "uint112"
      }
    ],
    name: "Sync",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "Transfer",
    type: "event"
  },
  {
    inputs: [],
    name: "DOMAIN_SEPARATOR",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MINIMUM_LIQUIDITY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "PERMIT_TYPEHASH",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "burn",
    outputs: [
      {
        internalType: "uint256",
        name: "amount0",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount1",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "factory",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getReserves",
    outputs: [
      {
        internalType: "uint112",
        name: "reserve0",
        type: "uint112"
      },
      {
        internalType: "uint112",
        name: "reserve1",
        type: "uint112"
      },
      {
        internalType: "uint32",
        name: "blockTimestampLast",
        type: "uint32"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      },
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "kLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "mint",
    outputs: [
      {
        internalType: "uint256",
        name: "liquidity",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      }
    ],
    name: "nonces",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        internalType: "uint8",
        name: "v",
        type: "uint8"
      },
      {
        internalType: "bytes32",
        name: "r",
        type: "bytes32"
      },
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "price0CumulativeLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "price1CumulativeLast",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      }
    ],
    name: "skim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount0Out",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "amount1Out",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "swap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [],
    name: "sync",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "token0",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "token1",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address"
      },
      {
        internalType: "address",
        name: "to",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256"
      }
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// evm/abis/StableSwapPair.ts
var stableSwapPairABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256[2]",
        name: "token_amounts",
        type: "uint256[2]"
      },
      {
        indexed: false,
        internalType: "uint256[2]",
        name: "fees",
        type: "uint256[2]"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "invariant",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "token_supply",
        type: "uint256"
      }
    ],
    name: "AddLiquidity",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "admin_fee",
        type: "uint256"
      }
    ],
    name: "CommitNewFee",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "DonateAdminFees",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "Kill",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "fee",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "admin_fee",
        type: "uint256"
      }
    ],
    name: "NewFee",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "old_A",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "new_A",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "initial_time",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "future_time",
        type: "uint256"
      }
    ],
    name: "RampA",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256[2]",
        name: "token_amounts",
        type: "uint256[2]"
      },
      {
        indexed: false,
        internalType: "uint256[2]",
        name: "fees",
        type: "uint256[2]"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "token_supply",
        type: "uint256"
      }
    ],
    name: "RemoveLiquidity",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256[2]",
        name: "token_amounts",
        type: "uint256[2]"
      },
      {
        indexed: false,
        internalType: "uint256[2]",
        name: "fees",
        type: "uint256[2]"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "invariant",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "token_supply",
        type: "uint256"
      }
    ],
    name: "RemoveLiquidityImbalance",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "provider",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "token_amount",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "coin_amount",
        type: "uint256"
      }
    ],
    name: "RemoveLiquidityOne",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "RevertParameters",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "A",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "t",
        type: "uint256"
      }
    ],
    name: "StopRampA",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "buyer",
        type: "address"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "sold_id",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens_sold",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "bought_id",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "tokens_bought",
        type: "uint256"
      }
    ],
    name: "TokenExchange",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [],
    name: "Unkill",
    type: "event"
  },
  {
    inputs: [],
    name: "A",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "ADMIN_ACTIONS_DELAY",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "FEE_DENOMINATOR",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "KILL_DEADLINE_DT",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_A",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_ADMIN_FEE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_A_CHANGE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_DECIMAL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_FEE",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_RAMP_TIME",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "N_COINS",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PRECISION",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "PRECISION_MUL",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "RATES",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "STABLESWAP_FACTORY",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "amounts",
        type: "uint256[2]"
      },
      {
        internalType: "uint256",
        name: "min_mint_amount",
        type: "uint256"
      }
    ],
    name: "add_liquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "admin_actions_deadline",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256"
      }
    ],
    name: "admin_balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "admin_fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "apply_new_fee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "balances",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "amounts",
        type: "uint256[2]"
      },
      {
        internalType: "bool",
        name: "deposit",
        type: "bool"
      }
    ],
    name: "calc_token_amount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_token_amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256"
      }
    ],
    name: "calc_withdraw_one_coin",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "coins",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "new_fee",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "new_admin_fee",
        type: "uint256"
      }
    ],
    name: "commit_new_fee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "donate_admin_fees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "j",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "min_dy",
        type: "uint256"
      }
    ],
    name: "exchange",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "future_A",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "future_A_time",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "future_admin_fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "future_fee",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "j",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256"
      }
    ],
    name: "get_dy",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "i",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "j",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "dx",
        type: "uint256"
      }
    ],
    name: "get_dy_underlying",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "get_virtual_price",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "initial_A",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "initial_A_time",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address[2]",
        name: "_coins",
        type: "address[2]"
      },
      {
        internalType: "uint256",
        name: "_A",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_fee",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_admin_fee",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address"
      }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "is_killed",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "kill_deadline",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "kill_me",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_future_A",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_future_time",
        type: "uint256"
      }
    ],
    name: "ramp_A",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256"
      },
      {
        internalType: "uint256[2]",
        name: "min_amounts",
        type: "uint256[2]"
      }
    ],
    name: "remove_liquidity",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256[2]",
        name: "amounts",
        type: "uint256[2]"
      },
      {
        internalType: "uint256",
        name: "max_burn_amount",
        type: "uint256"
      }
    ],
    name: "remove_liquidity_imbalance",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_token_amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "i",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "min_amount",
        type: "uint256"
      }
    ],
    name: "remove_liquidity_one_coin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "revert_new_parameters",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "stop_rampget_A",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract PancakeStableSwapLP",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address"
      }
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "unkill_me",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdraw_admin_fees",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

export { ADDITIONAL_BASES, ADDRESS_THIS, BASES_TO_CHECK_TRADES_AGAINST, BASE_SWAP_COST_STABLE_SWAP, BASE_SWAP_COST_V2, BASE_SWAP_COST_V3, BATCH_MULTICALL_CONFIGS, BETTER_TRADE_LESS_HOPS_THRESHOLD, BIG_INT_TEN, BIPS_BASE, COST_PER_EXTRA_HOP_STABLE_SWAP, COST_PER_EXTRA_HOP_V2, COST_PER_HOP_V3, COST_PER_INIT_TICK, COST_PER_UNINIT_TICK, CUSTOM_BASES, MIN_BNB, MIXED_ROUTE_QUOTER_ADDRESSES, MSG_SENDER, SMART_ROUTER_ADDRESSES, STABLE_SWAP_INFO_ADDRESS, V2_FEE_PATH_PLACEHOLDER, V2_ROUTER_ADDRESS, V3_QUOTER_ADDRESSES, V3_TICK_LENS_ADDRESSES, __export, pancakePairABI, stableSwapPairABI, usdGasTokensByChain, wrappedCurrency, wrappedCurrencyAmount };
