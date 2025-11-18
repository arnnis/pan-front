'use strict';

var chains = require('@pancakeswap/chains');
var BigNumber7 = require('bignumber.js');
var chunk = require('lodash/chunk');
var fromPairs2 = require('lodash/fromPairs');
var viem = require('viem');
var uniq = require('lodash/uniq');
var tokens = require('@pancakeswap/tokens');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var BigNumber7__default = /*#__PURE__*/_interopDefault(BigNumber7);
var chunk__default = /*#__PURE__*/_interopDefault(chunk);
var fromPairs2__default = /*#__PURE__*/_interopDefault(fromPairs2);
var uniq__default = /*#__PURE__*/_interopDefault(uniq);

// src/constants/supportedChains.ts
var SUPPORTED_CHAIN_IDS = [
  chains.ChainId.BSC,
  chains.ChainId.BSC_TESTNET,
  chains.ChainId.ETHEREUM,
  chains.ChainId.ARBITRUM_ONE,
  chains.ChainId.ARBITRUM_GOERLI,
  chains.ChainId.ZKSYNC,
  chains.ChainId.ZKSYNC_TESTNET,
  chains.ChainId.LINEA_TESTNET,
  chains.ChainId.BASE_TESTNET,
  chains.ChainId.POLYGON_ZKEVM_TESTNET,
  chains.ChainId.OPBNB,
  chains.ChainId.BASE
];
var CAKE_VAULT_SUPPORTED_CHAINS = [chains.ChainId.BSC, chains.ChainId.BSC_TESTNET];

// src/utils/isPoolsSupported.ts
function isPoolsSupported(chainId) {
  return SUPPORTED_CHAIN_IDS.includes(chainId);
}
function isCakeVaultSupported(chainId) {
  return !!chainId && CAKE_VAULT_SUPPORTED_CHAINS.includes(chainId);
}

// src/constants/config/endpoint.ts
var POOLS_API = "https://configs.pancakeswap.com/api/data/cached/syrup-pools";

// src/constants/pools/index.ts
var poolCache = {};
var fetchRequests = {};
var getPoolsConfig = async (chainId) => {
  if (!isPoolsSupported(chainId)) {
    return void 0;
  }
  if (poolCache[chainId]) {
    return poolCache[chainId];
  }
  if (fetchRequests[chainId]) {
    return fetchRequests[chainId];
  }
  const fetchPoolConfig = async () => {
    try {
      const response = await fetch(`${POOLS_API}?chainId=${chainId}`, {
        signal: AbortSignal.timeout(3e3)
      });
      if (response.ok) {
        const pools = await response.json();
        if (!pools) {
          throw new Error(`Unexpected empty pool fetched from remote ${pools}`);
        }
        poolCache[chainId] = pools;
        return pools;
      }
      throw new Error(`Fetch failed with status: ${response.status}`);
    } catch (e) {
      if (e instanceof Error) {
        throw new Error(`Fetch failed: ${e.message}`);
      } else {
        throw new Error(`Fetch failed: ${e}`);
      }
    } finally {
      fetchRequests[chainId] = void 0;
    }
  };
  fetchRequests[chainId] = fetchPoolConfig();
  return fetchRequests[chainId];
};
var getLivePoolsConfig = async (chainId) => {
  if (!isPoolsSupported(chainId)) {
    return void 0;
  }
  try {
    const response = await fetch(`${POOLS_API}?chainId=${chainId}&isFinished=false`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Get live pools by chain config error: ", error);
    return [];
  }
};
var MAX_LOCK_DURATION = 31536e3;
var UNLOCK_FREE_DURATION = 604800;
var ONE_WEEK_DEFAULT = 604800;
var BOOST_WEIGHT = 20000000000000n;
var DURATION_FACTOR = 31536000n;

// src/constants/boostedPools/arb.ts
var arbBoostedPools = [
  {
    boosterType: 0 /* ALP */,
    contractAddress: "0x85146C0c5968d9640121eebd13030c99298f87b3",
    tooltipsText: "Fee APY include the transaction fees shared in the ALP pool, funding rates for positions held, and liquidation income, and will be reflected in the growth of the ALP price. Stake APY is the return for staking ALP. Both Annualized using compound interest, for reference purposes only."
  },
  {
    boosterType: 0 /* ALP */,
    contractAddress: "0xCe10072E051DA9B8e297AC439B3d7c5C45A32c8f",
    tooltipsText: "Fee APY include the transaction fees shared in the ALP pool, funding rates for positions held, and liquidation income, and will be reflected in the growth of the ALP price. Stake APY is the return for staking ALP. Both Annualized using compound interest, for reference purposes only."
  }
];

// src/constants/boostedPools/opBNB.ts
var opBnbBoostedPools = [
  {
    boosterType: 0 /* ALP */,
    contractAddress: "0xa1B46Cb13b43fb8Ae5dC7222e3294fcd10024168",
    tooltipsText: "Fee APY include the transaction fees shared in the ALP pool, funding rates for positions held, and liquidation income, and will be reflected in the growth of the ALP price. Stake APY is the return for staking ALP. Both Annualized using compound interest, for reference purposes only."
  }
];

// src/constants/boostedPools/index.ts
var BOOSTED_POOLS_CONFIG_BY_CHAIN = {
  [chains.ChainId.ARBITRUM_ONE]: arbBoostedPools,
  [chains.ChainId.OPBNB]: opBnbBoostedPools
};
var getBoostedPoolsConfig = (chainId) => {
  return BOOSTED_POOLS_CONFIG_BY_CHAIN[chainId];
};
var getBoostedPoolConfig = (chainId, contractAddress) => {
  const pool = getBoostedPoolsConfig(chainId);
  return pool?.find((i) => i?.contractAddress?.toLowerCase() === contractAddress.toLowerCase());
};
var ICAKE = {
  [chains.ChainId.BSC]: "0x3C458828D1622F5f4d526eb0d24Da8C4Eb8F07b1",
  [chains.ChainId.BSC_TESTNET]: "0x5FB0b7a782c2f192493d86922dD3873b6392C8e8",
  [chains.ChainId.ETHEREUM]: "0x",
  [chains.ChainId.ARBITRUM_ONE]: "0x",
  [chains.ChainId.ARBITRUM_GOERLI]: "0x",
  [chains.ChainId.ZKSYNC]: "0x",
  [chains.ChainId.ZKSYNC_TESTNET]: "0x",
  [chains.ChainId.BASE_TESTNET]: "0x",
  [chains.ChainId.LINEA_TESTNET]: "0x",
  [chains.ChainId.POLYGON_ZKEVM_TESTNET]: "0x",
  [chains.ChainId.OPBNB]: "0x",
  [chains.ChainId.BASE]: "0x"
};
var CAKE_VAULT = {
  [chains.ChainId.BSC]: "0x45c54210128a065de780C4B0Df3d16664f7f859e",
  [chains.ChainId.BSC_TESTNET]: "0x1088Fb24053F03802F673b84d16AE1A7023E400b",
  [chains.ChainId.ETHEREUM]: "0x",
  [chains.ChainId.ARBITRUM_ONE]: "0x",
  [chains.ChainId.ARBITRUM_GOERLI]: "0x",
  [chains.ChainId.ZKSYNC]: "0x",
  [chains.ChainId.ZKSYNC_TESTNET]: "0x",
  [chains.ChainId.BASE_TESTNET]: "0x",
  [chains.ChainId.LINEA_TESTNET]: "0x",
  [chains.ChainId.POLYGON_ZKEVM_TESTNET]: "0x",
  [chains.ChainId.OPBNB]: "0x",
  [chains.ChainId.BASE]: "0x"
};
var CAKE_FLEXIBLE_SIDE_VAULT = {
  [chains.ChainId.BSC]: "0x615e896A8C2CA8470A2e9dc2E9552998f8658Ea0",
  [chains.ChainId.BSC_TESTNET]: "0x1088Fb24053F03802F673b84d16AE1A7023E400b",
  [chains.ChainId.ETHEREUM]: "0x",
  [chains.ChainId.ARBITRUM_ONE]: "0x",
  [chains.ChainId.ARBITRUM_GOERLI]: "0x",
  [chains.ChainId.ZKSYNC]: "0x",
  [chains.ChainId.ZKSYNC_TESTNET]: "0x",
  [chains.ChainId.BASE_TESTNET]: "0x",
  [chains.ChainId.LINEA_TESTNET]: "0x",
  [chains.ChainId.POLYGON_ZKEVM_TESTNET]: "0x",
  [chains.ChainId.OPBNB]: "0x",
  [chains.ChainId.BASE]: "0x"
};

// src/constants/index.ts
var BSC_BLOCK_TIME = 3;
var BLOCKS_PER_DAY = 60 / BSC_BLOCK_TIME * 60 * 24;
var BLOCKS_PER_YEAR = BLOCKS_PER_DAY * 365;
var SECONDS_IN_YEAR = 31536e3;

// src/types.ts
var PoolCategory = /* @__PURE__ */ ((PoolCategory2) => {
  PoolCategory2["COMMUNITY"] = "Community";
  PoolCategory2["CORE"] = "Core";
  PoolCategory2["BINANCE"] = "Binance";
  PoolCategory2["AUTO"] = "Auto";
  return PoolCategory2;
})(PoolCategory || {});
var VaultKey = /* @__PURE__ */ ((VaultKey2) => {
  VaultKey2["CakeVaultV1"] = "cakeVaultV1";
  VaultKey2["CakeVault"] = "cakeVault";
  VaultKey2["CakeFlexibleSideVault"] = "cakeFlexibleSideVault";
  VaultKey2["IfoPool"] = "ifoPool";
  return VaultKey2;
})(VaultKey || {});
var BIG_ZERO = new BigNumber7__default.default(0);
new BigNumber7__default.default(1);
new BigNumber7__default.default(2);
new BigNumber7__default.default(9);
new BigNumber7__default.default(10);
new BigNumber7__default.default(100);

// src/abis/ISmartChef.ts
var smartChefABI = [
  {
    inputs: [
      { internalType: "address", name: "_pancakeProfile", type: "address" },
      { internalType: "bool", name: "_pancakeProfileIsRequested", type: "bool" },
      { internalType: "uint256", name: "_pancakeProfileThresholdPoints", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "EmergencyWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "poolLimitPerUser", type: "uint256" }],
    name: "NewPoolLimit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "rewardPerSecond", type: "uint256" }],
    name: "NewRewardPerSecond",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "startTimestamp", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endTimestamp", type: "uint256" }
    ],
    name: "NewStartAndEndTimestamp",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "blockNumber", type: "uint256" }],
    name: "RewardsStop",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "token", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "TokenRecovery",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bool", name: "isProfileRequested", type: "bool" },
      { indexed: false, internalType: "uint256", name: "thresholdPoints", type: "uint256" }
    ],
    name: "UpdateProfileAndThresholdPointsRequirement",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [],
    name: "PRECISION_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "SMART_CHEF_FACTORY",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "accTokenPerShare",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "emergencyWithdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "endTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "hasUserLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20Metadata", name: "_stakedToken", type: "address" },
      { internalType: "contract IERC20Metadata", name: "_rewardToken", type: "address" },
      { internalType: "uint256", name: "_rewardPerSecond", type: "uint256" },
      { internalType: "uint256", name: "_startTimestamp", type: "uint256" },
      { internalType: "uint256", name: "_endTimestamp", type: "uint256" },
      { internalType: "uint256", name: "_poolLimitPerUser", type: "uint256" },
      { internalType: "uint256", name: "_numberSecondsForUserLimit", type: "uint256" },
      { internalType: "address", name: "_admin", type: "address" }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lastRewardTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "numberSecondsForUserLimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfile",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfileIsRequested",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfileThresholdPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "pendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "poolLimitPerUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "recoverToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "rewardPerSecond",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "contract IERC20Metadata", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stakedToken",
    outputs: [{ internalType: "contract IERC20Metadata", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "startTimestamp",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "stopReward", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bool", name: "_userLimit", type: "bool" },
      { internalType: "uint256", name: "_poolLimitPerUser", type: "uint256" }
    ],
    name: "updatePoolLimitPerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bool", name: "_isRequested", type: "bool" },
      { internalType: "uint256", name: "_thresholdPoints", type: "uint256" }
    ],
    name: "updateProfileAndThresholdPointsRequirement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_rewardPerSecond", type: "uint256" }],
    name: "updateRewardPerSecond",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startTimestamp", type: "uint256" },
      { internalType: "uint256", name: "_endTimestamp", type: "uint256" }
    ],
    name: "updateStartAndEndTimestamp",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "userLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/ISousChef.ts
var sousChefABI = [
  {
    inputs: [],
    name: "bonusEndBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "emergencyWithdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_from", type: "uint256" },
      { internalType: "uint256", name: "_to", type: "uint256" }
    ],
    name: "getMultiplier",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "massUpdatePools", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "pendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "poolInfo",
    outputs: [
      { internalType: "contract IBEP20", name: "lpToken", type: "address" },
      { internalType: "uint256", name: "allocPoint", type: "uint256" },
      { internalType: "uint256", name: "lastRewardBlock", type: "uint256" },
      { internalType: "uint256", name: "accCakePerShare", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "rewardPerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "startBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "stopReward", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "syrup",
    outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
    name: "updatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/ISousChefV2.ts
var sousChefV2ABI = [
  {
    inputs: [],
    name: "PRECISION_FACTOR",
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
    name: "accTokenPerShare",
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
    name: "bonusEndBlock",
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
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "deposit",
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
      }
    ],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "hasUserLimit",
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
    name: "lastRewardBlock",
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
    name: "numberBlocksForUserLimit",
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
        internalType: "address",
        name: "_user",
        type: "address"
      }
    ],
    name: "pendingReward",
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
    name: "poolLimitPerUser",
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
        name: "_tokenAddress",
        type: "address"
      },
      {
        internalType: "uint256",
        name: "_tokenAmount",
        type: "uint256"
      }
    ],
    name: "recoverWrongTokens",
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
    name: "rewardPerBlock",
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
    name: "rewardToken",
    outputs: [
      {
        internalType: "contract IBEP20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stakedToken",
    outputs: [
      {
        internalType: "contract IBEP20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "startBlock",
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
    name: "stopReward",
    outputs: [],
    stateMutability: "nonpayable",
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
    inputs: [
      {
        internalType: "bool",
        name: "_hasUserLimit",
        type: "bool"
      },
      {
        internalType: "uint256",
        name: "_poolLimitPerUser",
        type: "uint256"
      }
    ],
    name: "updatePoolLimitPerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_rewardPerBlock",
        type: "uint256"
      }
    ],
    name: "updateRewardPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_startBlock",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "_bonusEndBlock",
        type: "uint256"
      }
    ],
    name: "updateStartAndEndBlocks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "rewardDebt",
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
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/abis/ISousChefV3.ts
var sousChefV3ABI = [
  {
    inputs: [
      { internalType: "address", name: "_pancakeProfile", type: "address" },
      { internalType: "bool", name: "_pancakeProfileIsRequested", type: "bool" },
      { internalType: "uint256", name: "_pancakeProfileThresholdPoints", type: "uint256" }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "Deposit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "EmergencyWithdraw",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "poolLimitPerUser", type: "uint256" }],
    name: "NewPoolLimit",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "rewardPerBlock", type: "uint256" }],
    name: "NewRewardPerBlock",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "startBlock", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "endBlock", type: "uint256" }
    ],
    name: "NewStartAndEndBlocks",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "previousOwner", type: "address" },
      { indexed: true, internalType: "address", name: "newOwner", type: "address" }
    ],
    name: "OwnershipTransferred",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "uint256", name: "blockNumber", type: "uint256" }],
    name: "RewardsStop",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "token", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "TokenRecovery",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bool", name: "isProfileRequested", type: "bool" },
      { indexed: false, internalType: "uint256", name: "thresholdPoints", type: "uint256" }
    ],
    name: "UpdateProfileAndThresholdPointsRequirement",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
    ],
    name: "Withdraw",
    type: "event"
  },
  {
    inputs: [],
    name: "PRECISION_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "SMART_CHEF_FACTORY",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "accTokenPerShare",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bonusEndBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "emergencyWithdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "hasUserLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "contract IERC20Metadata", name: "_stakedToken", type: "address" },
      { internalType: "contract IERC20Metadata", name: "_rewardToken", type: "address" },
      { internalType: "uint256", name: "_rewardPerBlock", type: "uint256" },
      { internalType: "uint256", name: "_startBlock", type: "uint256" },
      { internalType: "uint256", name: "_bonusEndBlock", type: "uint256" },
      { internalType: "uint256", name: "_poolLimitPerUser", type: "uint256" },
      { internalType: "uint256", name: "_numberBlocksForUserLimit", type: "uint256" },
      { internalType: "address", name: "_admin", type: "address" }
    ],
    name: "initialize",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "isInitialized",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "lastRewardBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "numberBlocksForUserLimit",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfile",
    outputs: [{ internalType: "contract IPancakeProfile", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfileIsRequested",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "pancakeProfileThresholdPoints",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "pendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "poolLimitPerUser",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "recoverToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "rewardPerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "contract IERC20Metadata", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "stakedToken",
    outputs: [{ internalType: "contract IERC20Metadata", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "startBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "stopReward", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bool", name: "_userLimit", type: "bool" },
      { internalType: "uint256", name: "_poolLimitPerUser", type: "uint256" }
    ],
    name: "updatePoolLimitPerUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bool", name: "_isRequested", type: "bool" },
      { internalType: "uint256", name: "_thresholdPoints", type: "uint256" }
    ],
    name: "updateProfileAndThresholdPointsRequirement",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_rewardPerBlock", type: "uint256" }],
    name: "updateRewardPerBlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_startBlock", type: "uint256" },
      { internalType: "uint256", name: "_bonusEndBlock", type: "uint256" }
    ],
    name: "updateStartAndEndBlocks",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "userLimit",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/utils/getContractAddress.ts
function getContractAddress(addresses, chainId) {
  if (!isPoolsSupported(chainId)) {
    throw new Error(`Cannot get contract address. Unsupported chain ${chainId}`);
  }
  return addresses[chainId];
}

// src/utils/isLegacyPool.ts
function isLegacyPool(pool) {
  if (pool.tokenPerBlock) {
    return true;
  }
  return false;
}
function isUpgradedPool(pool) {
  if (pool.tokenPerSecond) {
    return true;
  }
  return false;
}
var getPoolAprByTokenPerBlock = (stakingTokenPrice, rewardTokenPrice, totalStaked, tokenPerBlock) => {
  const totalRewardPricePerYear = new BigNumber7__default.default(rewardTokenPrice).times(tokenPerBlock).times(BLOCKS_PER_YEAR);
  const totalStakingTokenInPool = new BigNumber7__default.default(stakingTokenPrice).times(totalStaked);
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber();
};
var getPoolAprByTokenPerSecond = (stakingTokenPrice, rewardTokenPrice, totalStaked, tokenPerSecond) => {
  const totalRewardPricePerYear = new BigNumber7__default.default(rewardTokenPrice).times(tokenPerSecond).times(SECONDS_IN_YEAR);
  const totalStakingTokenInPool = new BigNumber7__default.default(stakingTokenPrice).times(totalStaked);
  const apr = totalRewardPricePerYear.div(totalStakingTokenInPool).times(100);
  return apr.isNaN() || !apr.isFinite() ? null : apr.toNumber();
};

// src/abis/ISousChefBNB.ts
var sousChefBnbABI = [
  {
    inputs: [],
    name: "WBNB",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "adminAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "bonusEndBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "deposit", outputs: [], stateMutability: "payable", type: "function" },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "emergencyRewardWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "emergencyWithdraw", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "uint256", name: "_from", type: "uint256" },
      { internalType: "uint256", name: "_to", type: "uint256" }
    ],
    name: "getMultiplier",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "limitAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "massUpdatePools", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "pendingReward",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "poolInfo",
    outputs: [
      { internalType: "contract IBEP20", name: "lpToken", type: "address" },
      { internalType: "uint256", name: "allocPoint", type: "uint256" },
      { internalType: "uint256", name: "lastRewardBlock", type: "uint256" },
      { internalType: "uint256", name: "accCakePerShare", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_blacklistAddress", type: "address" }],
    name: "removeBlackList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "rewardPerBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "rewardToken",
    outputs: [{ internalType: "contract IBEP20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_adminAddress", type: "address" }],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_blacklistAddress", type: "address" }],
    name: "setBlackList",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "setLimitAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "startBlock",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalAllocPoint",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_pid", type: "uint256" }],
    name: "updatePool",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "amount", type: "uint256" },
      { internalType: "uint256", name: "rewardDebt", type: "uint256" },
      { internalType: "bool", name: "inBlackList", type: "bool" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { stateMutability: "payable", type: "receive" }
];

// src/utils/getPoolContractBySousId.ts
function getSousChefBNBContract({
  address,
  signer,
  publicClient
}) {
  return {
    ...viem.getContract({
      abi: sousChefBnbABI,
      address,
      client: {
        public: publicClient,
        wallet: signer
      }
    }),
    abi: sousChefBnbABI,
    address,
    account: signer?.account,
    chain: signer?.chain
  };
}
function getSousChefV2Contract({
  address,
  signer,
  publicClient
}) {
  return {
    ...viem.getContract({
      abi: sousChefV2ABI,
      address,
      client: {
        public: publicClient,
        wallet: signer
      }
    }),
    abi: sousChefV2ABI,
    address,
    account: signer?.account,
    chain: signer?.chain
  };
}
function getSmartChefChefV2Contract({
  address,
  signer,
  publicClient
}) {
  return {
    ...viem.getContract({
      abi: smartChefABI,
      address,
      client: {
        public: publicClient,
        wallet: signer
      }
    }),
    abi: smartChefABI,
    address,
    account: signer?.account,
    chain: signer?.chain
  };
}
async function getPoolContractBySousId({ chainId, sousId, signer, publicClient }) {
  if (!chainId) {
    return null;
  }
  const pools = await getPoolsConfig(chainId);
  const pool = pools?.find((p) => p.sousId === Number(sousId));
  if (!pool) {
    return null;
  }
  const { contractAddress } = pool;
  if (isLegacyPool(pool)) {
    if (pool.poolCategory === "Binance" /* BINANCE */) {
      return getSousChefBNBContract({ address: contractAddress, signer, publicClient });
    }
    return getSousChefV2Contract({ address: contractAddress, signer, publicClient });
  }
  return getSmartChefChefV2Contract({ address: contractAddress, signer, publicClient });
}

// src/utils/boosted/checkIsBoostedPool.ts
var checkIsBoostedPool = (contract, chainId) => {
  const list = getBoostedPoolsConfig(chainId);
  const isBoosted = list?.find((i) => i?.contractAddress?.toLowerCase() === contract.toLowerCase());
  return isBoosted !== void 0;
};
var WEEK = 7;
var YEAR = 365;
var API_URL = "https://perp.pancakeswap.finance/bapi/futures/v1/public/future/apx/fee/info?chain=";
var CONTRACT_ADDRESS = {
  [chains.ChainId.OPBNB]: "0x5A5454A6030FB50ceb3eb78977D140198A27be5e",
  [chains.ChainId.ARBITRUM_ONE]: "0xB3879E95a4B8e3eE570c232B19d520821F540E48"
};
var CHAIN_NAME_MAP = {
  [chains.ChainId.OPBNB]: "OPBNB",
  [chains.ChainId.ARBITRUM_ONE]: "ARB"
};
var fetchAlpBoostedPoolApr = async (client, chainId) => {
  try {
    const [totalValue] = await client.multicall({
      contracts: [
        {
          abi: [
            {
              inputs: [],
              name: "totalValue",
              outputs: [
                {
                  components: [
                    { internalType: "address", name: "tokenAddress", type: "address" },
                    { internalType: "int256", name: "value", type: "int256" },
                    { internalType: "uint8", name: "decimals", type: "uint8" },
                    { internalType: "int256", name: "valueUsd", type: "int256" },
                    { internalType: "uint16", name: "targetWeight", type: "uint16" },
                    { internalType: "uint16", name: "feeBasisPoints", type: "uint16" },
                    { internalType: "uint16", name: "taxBasisPoints", type: "uint16" },
                    { internalType: "bool", name: "dynamicFee", type: "bool" }
                  ],
                  internalType: "struct IVault.LpItem[]",
                  name: "lpItems",
                  type: "tuple[]"
                }
              ],
              stateMutability: "view",
              type: "function"
            }
          ],
          address: CONTRACT_ADDRESS?.[chainId],
          functionName: "totalValue"
        }
      ],
      allowFailure: false
    });
    const totalValueUsd = totalValue.map((i) => new BigNumber7__default.default(i.valueUsd.toString()).div(1e18).toNumber()).reduce((a, b) => a + b, 0);
    const response = await fetch(`${API_URL}${CHAIN_NAME_MAP[chainId]}`);
    const result = await response.json();
    const { alpFundingFee, alpTradingFee, alpLipFee } = result.data;
    const apr = new BigNumber7__default.default(alpFundingFee).plus(alpTradingFee).plus(alpLipFee);
    const totalApr = apr.div(totalValueUsd.toString()).div(WEEK);
    const apy = totalApr.plus(1).exponentiatedBy(YEAR).minus(1).times(100);
    return apy.toNumber();
  } catch (error) {
    console.info("Fetch ALP boosted fee error: ", error);
    return 0;
  }
};

// src/utils/boosted/apr/getBoostedPoolApr.ts
var getBoostedPoolApr = async ({ client, contractAddress, chainId }) => {
  const pool = chainId && getBoostedPoolConfig(chainId, contractAddress);
  if (!contractAddress || !chainId || !pool) {
    return 0;
  }
  if (pool?.boosterType === 0 /* ALP */) {
    const result = await fetchAlpBoostedPoolApr(client, chainId);
    return result;
  }
  return 0;
};

// src/queries/fetchPools.ts
var getLivePoolsWithEnd = async (chainId) => {
  const poolsConfig = await getPoolsConfig(chainId);
  if (!poolsConfig) {
    return null;
  }
  return poolsConfig.filter((p) => p.sousId !== 0 && !p.isFinished);
};
async function fetchUpgradedPoolsTimeLimits(pools, chainId, provider) {
  if (!pools.length) {
    return [];
  }
  const calls = pools.flatMap(({ contractAddress }) => {
    return [
      {
        abi: smartChefABI,
        address: contractAddress,
        functionName: "startTimestamp"
      },
      {
        abi: smartChefABI,
        address: contractAddress,
        functionName: "endTimestamp"
      }
    ];
  });
  const client = provider({ chainId });
  const startEndRaw = await client.multicall({
    contracts: calls,
    allowFailure: false
  });
  const startEndResult = startEndRaw.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  return pools.map((cakePoolConfig, index) => {
    const [startTimestamp, endTimestamp] = startEndResult[index];
    return {
      sousId: cakePoolConfig.sousId,
      startTimestamp: Number(startTimestamp),
      endTimestamp: Number(endTimestamp)
    };
  });
}
var fetchLegacyPoolsBlockLimits = async (pools, chainId, provider) => {
  if (!pools.length) {
    return [];
  }
  const startEndBlockCalls = pools.flatMap(({ contractAddress }) => {
    return [
      {
        abi: sousChefABI,
        address: contractAddress,
        functionName: "startBlock"
      },
      {
        abi: sousChefABI,
        address: contractAddress,
        functionName: "bonusEndBlock"
      }
    ];
  });
  const client = provider({ chainId });
  const [block, startEndBlockRaw] = await Promise.all([
    client.getBlock({ blockTag: "latest" }),
    client.multicall({
      contracts: startEndBlockCalls,
      allowFailure: false
    })
  ]);
  const startEndBlockResult = startEndBlockRaw.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 2);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);
  const getTimestampFromBlock = (targetBlock) => {
    return Number(block.timestamp) + (targetBlock - Number(block.number)) * BSC_BLOCK_TIME;
  };
  return pools.map((cakePoolConfig, index) => {
    const [startBlock, endBlock] = startEndBlockResult[index];
    return {
      sousId: cakePoolConfig.sousId,
      startTimestamp: getTimestampFromBlock(Number(startBlock)),
      endTimestamp: getTimestampFromBlock(Number(endBlock))
    };
  });
};
var fetchPoolsTimeLimits = async (chainId, provider) => {
  const livedPools = await getLivePoolsWithEnd(chainId);
  if (!livedPools) {
    return null;
  }
  const upgradedPools = livedPools.filter(isUpgradedPool);
  const legacyPools = livedPools.filter(isLegacyPool);
  const [upgradePoolLimits, legacyPoolLimits] = await Promise.all([
    fetchUpgradedPoolsTimeLimits(upgradedPools, chainId, provider),
    fetchLegacyPoolsBlockLimits(legacyPools, chainId, provider)
  ]);
  return [...upgradePoolLimits, ...legacyPoolLimits];
};
var fetchPoolsTotalStaking = async (chainId, provider) => {
  const poolsConfig = await getPoolsConfig(chainId);
  if (!poolsConfig) {
    return null;
  }
  const poolsBalanceOf = poolsConfig.map(({ contractAddress, stakingToken }) => {
    return {
      abi: viem.erc20Abi,
      address: stakingToken.address,
      functionName: "balanceOf",
      args: [contractAddress]
    };
  });
  const client = provider({ chainId });
  const poolsTotalStaked = await client.multicall({
    contracts: poolsBalanceOf,
    allowFailure: false
  });
  return poolsConfig.map((p, index) => ({
    sousId: p.sousId,
    totalStaked: new BigNumber7__default.default(poolsTotalStaked[index].toString()).toJSON()
  }));
};
var fetchPoolsStakingLimitsByBlock = async ({
  poolsWithStakingLimit,
  chainId,
  provider
}) => {
  const poolsConfig = await getPoolsConfig(chainId);
  if (!poolsConfig) {
    throw new Error(`No pools found on chain ${chainId}`);
  }
  const validPools = poolsConfig.filter(isLegacyPool).filter((p) => p.stakingToken.symbol !== "BNB" && !p.isFinished).filter((p) => !poolsWithStakingLimit.includes(p.sousId));
  const poolStakingCalls = validPools.map(({ contractAddress }) => {
    return ["hasUserLimit", "poolLimitPerUser", "numberBlocksForUserLimit"].map(
      (method) => ({
        address: contractAddress,
        functionName: method,
        abi: sousChefV2ABI
      })
    );
  }).flat();
  const client = provider({ chainId });
  const poolStakingResultRaw = await client.multicall({
    contracts: poolStakingCalls,
    allowFailure: true
  });
  const chunkSize = poolStakingCalls.length / validPools.length;
  const poolStakingChunkedResultRaw = chunk__default.default(poolStakingResultRaw.flat(), chunkSize);
  return fromPairs2__default.default(
    poolStakingChunkedResultRaw.map((stakingLimitRaw, index) => {
      const hasUserLimit = stakingLimitRaw[0]?.result;
      const stakingLimit = hasUserLimit && stakingLimitRaw[1].result ? new BigNumber7__default.default(stakingLimitRaw[1].result.toString()) : BIG_ZERO;
      const numberBlocksForUserLimit = stakingLimitRaw[2].result ? Number(stakingLimitRaw[2].result) : 0;
      const numberSecondsForUserLimit = numberBlocksForUserLimit * BSC_BLOCK_TIME;
      return [validPools[index].sousId, { stakingLimit, numberSecondsForUserLimit }];
    })
  );
};
var fetchPoolsStakingLimitsByTime = async ({
  poolsWithStakingLimit,
  chainId,
  provider
}) => {
  const poolsConfig = await getPoolsConfig(chainId);
  if (!poolsConfig) {
    throw new Error(`No pools found on chain ${chainId}`);
  }
  const validPools = poolsConfig.filter(isUpgradedPool).filter((p) => p.stakingToken.symbol !== "BNB" && !p.isFinished).filter((p) => !poolsWithStakingLimit.includes(p.sousId));
  const poolStakingCalls = validPools.map(({ contractAddress }) => {
    return ["hasUserLimit", "poolLimitPerUser", "numberSecondsForUserLimit"].map(
      (method) => ({
        abi: smartChefABI,
        address: contractAddress,
        functionName: method
      })
    );
  }).flat();
  const client = provider({ chainId });
  const poolStakingResultRaw = await client.multicall({
    contracts: poolStakingCalls,
    allowFailure: true
  });
  const chunkSize = poolStakingCalls.length / validPools.length;
  const poolStakingChunkedResultRaw = chunk__default.default(poolStakingResultRaw.flat(), chunkSize);
  return fromPairs2__default.default(
    poolStakingChunkedResultRaw.map((stakingLimitRaw, index) => {
      const hasUserLimit = stakingLimitRaw[0].result;
      const stakingLimit = hasUserLimit && stakingLimitRaw[1].result ? new BigNumber7__default.default(stakingLimitRaw[1].result.toString()) : BIG_ZERO;
      const numberSecondsForUserLimit = stakingLimitRaw[2].result ? Number(stakingLimitRaw[2].result) : 0;
      return [validPools[index].sousId, { stakingLimit, numberSecondsForUserLimit }];
    })
  );
};
var fetchPoolsStakingLimits = async (params) => {
  const [limitsByTime, limitsByBlock] = await Promise.all([
    fetchPoolsStakingLimitsByTime(params),
    fetchPoolsStakingLimitsByBlock(params)
  ]);
  return {
    ...limitsByTime,
    ...limitsByBlock
  };
};
var fetchPoolsProfileRequirement = async (chainId, provider) => {
  const poolsConfig = await getPoolsConfig(chainId);
  if (!poolsConfig) {
    throw new Error(`No pools found on chain ${chainId}`);
  }
  const livePoolsWithV3 = poolsConfig.filter(
    (pool) => (isUpgradedPool(pool) || isLegacyPool(pool) && pool?.version === 3) && !pool?.isFinished
  );
  const poolProfileRequireCalls = livePoolsWithV3.map(({ contractAddress }) => {
    return ["pancakeProfileIsRequested", "pancakeProfileThresholdPoints"].map(
      (method) => ({
        abi: sousChefV3ABI,
        address: contractAddress,
        functionName: method
      })
    );
  }).flat();
  const client = provider({ chainId });
  const poolProfileRequireResultRaw = await client.multicall({
    contracts: poolProfileRequireCalls
  });
  const chunkSize = poolProfileRequireCalls.length / livePoolsWithV3.length;
  const poolStakingChunkedResultRaw = chunk__default.default(poolProfileRequireResultRaw.flat(), chunkSize);
  return fromPairs2__default.default(
    poolStakingChunkedResultRaw.map((poolProfileRequireRaw, index) => {
      const hasProfileRequired = poolProfileRequireRaw[0].result;
      const profileThresholdPoints = poolProfileRequireRaw[1].result ? new BigNumber7__default.default(poolProfileRequireRaw[1].result.toString()) : BIG_ZERO;
      return [
        livePoolsWithV3[index].sousId,
        {
          required: !!hasProfileRequired,
          thresholdPoints: profileThresholdPoints.toJSON()
        }
      ];
    })
  );
};
var getPoolsFactory = (filter) => async (chainId) => {
  const poolsConfig = await getPoolsConfig(chainId);
  if (!poolsConfig) {
    throw new Error(`Unable to get pools config on chain ${chainId}`);
  }
  return poolsConfig.filter(filter);
};
var getNonBnbPools = getPoolsFactory((pool) => pool.stakingToken.symbol !== "BNB");
var getBnbPools = getPoolsFactory((pool) => pool.stakingToken.symbol === "BNB");
var getNonMasterPools = getPoolsFactory((pool) => pool.sousId !== 0);
var fetchPoolsAllowance = async ({ account, chainId, provider }) => {
  const nonBnbPools = await getNonBnbPools(chainId);
  const client = provider({ chainId });
  const allowances = await client.multicall({
    contracts: nonBnbPools.map(
      ({ contractAddress, stakingToken }) => ({
        address: stakingToken.address,
        abi: viem.erc20Abi,
        functionName: "allowance",
        args: [account, contractAddress]
      })
    ),
    allowFailure: false
  });
  return fromPairs2__default.default(
    nonBnbPools.map((pool, index) => [pool.sousId, new BigNumber7__default.default(allowances[index].toString()).toJSON()])
  );
};
var fetchUserBalances = async ({ account, chainId, provider }) => {
  const nonBnbPools = await getNonBnbPools(chainId);
  const bnbPools = await getBnbPools(chainId);
  const tokens = uniq__default.default(nonBnbPools.map((pool) => pool.stakingToken.address));
  const client = provider({ chainId });
  const tokenBalance = await client.multicall({
    contracts: [
      {
        abi: [
          {
            inputs: [{ internalType: "address", name: "addr", type: "address" }],
            name: "getEthBalance",
            outputs: [{ internalType: "uint256", name: "balance", type: "uint256" }],
            stateMutability: "view",
            type: "function"
          }
        ],
        address: "0xcA11bde05977b3631167028862bE2a173976CA11",
        // TODO: Here is multicall address, should extract addresses to a package for multi chain
        functionName: "getEthBalance",
        args: [account]
      },
      ...tokens.map(
        (token) => ({
          abi: viem.erc20Abi,
          address: token,
          functionName: "balanceOf",
          args: [account]
        })
      )
    ]
  });
  const [bnbBalance, ...tokenBalancesResults] = tokenBalance;
  const tokenBalances = fromPairs2__default.default(tokens.map((token, index) => [token, tokenBalancesResults[index].result]));
  const poolTokenBalances = fromPairs2__default.default(
    nonBnbPools.map((pool) => {
      if (!tokenBalances[pool.stakingToken.address])
        return null;
      return [pool.sousId, new BigNumber7__default.default(tokenBalances[pool.stakingToken.address].toString()).toJSON()];
    }).filter((p) => Boolean(p))
  );
  const bnbBalanceJson = new BigNumber7__default.default(bnbBalance.result?.toString()).toJSON();
  const bnbBalances = fromPairs2__default.default(bnbPools.map((pool) => [pool.sousId, bnbBalanceJson]));
  return { ...poolTokenBalances, ...bnbBalances };
};
var fetchUserStakeBalances = async ({ account, chainId, provider }) => {
  const nonMasterPools = await getNonMasterPools(chainId);
  const client = provider({ chainId });
  const userInfo = await client.multicall({
    contracts: nonMasterPools.map(
      ({ contractAddress }) => ({
        abi: sousChefABI.filter((r) => r.name === "userInfo"),
        address: contractAddress,
        functionName: "userInfo",
        args: [account]
      })
    ),
    allowFailure: false
  });
  return fromPairs2__default.default(
    nonMasterPools.map((pool, index) => [pool.sousId, new BigNumber7__default.default(userInfo[index][0].toString()).toJSON()])
  );
};
var fetchUserPendingRewards = async ({ account, chainId, provider }) => {
  const nonMasterPools = await getNonMasterPools(chainId);
  const client = provider({ chainId });
  const res = await client.multicall({
    contracts: nonMasterPools.map(
      ({ contractAddress }) => ({
        abi: sousChefABI.filter((r) => r.name === "pendingReward"),
        address: contractAddress,
        functionName: "pendingReward",
        args: [account]
      })
    ),
    allowFailure: false
  });
  return fromPairs2__default.default(nonMasterPools.map((pool, index) => [pool.sousId, new BigNumber7__default.default(res[index].toString()).toJSON()]));
};

// src/abis/ICakeVaultV2.ts
var cakeVaultV2ABI = [
  {
    inputs: [],
    name: "BOOST_WEIGHT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "BOOST_WEIGHT_LIMIT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DURATION_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "DURATION_FACTOR_OVERDUE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_CALL_FEE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_LOCK_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_LOCK_DURATION_LIMIT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_PERFORMANCE_FEE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_WITHDRAW_FEE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MAX_WITHDRAW_FEE_PERIOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_DEPOSIT_AMOUNT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_LOCK_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "MIN_WITHDRAW_AMOUNT",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PRECISION_FACTOR",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "PRECISION_FACTOR_SHARE",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "UNLOCK_FREE_DURATION",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "admin",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "available",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "boostContract",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "cakePoolPID",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "calculateOverdueFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "calculatePerformanceFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "calculateTotalPendingCakeRewards",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "uint256", name: "_shares", type: "uint256" }
    ],
    name: "calculateWithdrawFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_amount", type: "uint256" },
      { internalType: "uint256", name: "_lockDuration", type: "uint256" }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "freeFeeUsers",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getPricePerFullShare",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_token", type: "address" }],
    name: "inCaseTokensGetStuck",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "contract IERC20", name: "dummyToken", type: "address" }],
    name: "init",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "lastHarvestedTime",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "masterchefV2",
    outputs: [{ internalType: "contract IMasterChefV2", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "operator",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "overdueFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "owner",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "pause", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "performanceFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "performanceFeeContract",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "_admin", type: "address" }],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_boostContract", type: "address" }],
    name: "setBoostContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_boostWeight", type: "uint256" }],
    name: "setBoostWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_durationFactor", type: "uint256" }],
    name: "setDurationFactor",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_durationFactorOverdue", type: "uint256" }],
    name: "setDurationFactorOverdue",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_user", type: "address" },
      { internalType: "bool", name: "_free", type: "bool" }
    ],
    name: "setFreeFeeUser",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_maxLockDuration", type: "uint256" }],
    name: "setMaxLockDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_operator", type: "address" }],
    name: "setOperator",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_performanceFee", type: "uint256" }],
    name: "setPerformanceFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_performanceFeeContract", type: "uint256" }],
    name: "setPerformanceFeeContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_treasury", type: "address" }],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_unlockFreeDuration", type: "uint256" }],
    name: "setUnlockFreeDuration",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_withdrawFee", type: "uint256" }],
    name: "setWithdrawFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_withdrawFeeContract", type: "uint256" }],
    name: "setWithdrawFeeContract",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_withdrawFeePeriod", type: "uint256" }],
    name: "setWithdrawFeePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "token",
    outputs: [{ internalType: "contract IERC20", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalBoostDebt",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalLockedAmount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalShares",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "newOwner", type: "address" }],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "treasury",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "_user", type: "address" }],
    name: "unlock",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "unpause", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "userInfo",
    outputs: [
      { internalType: "uint256", name: "shares", type: "uint256" },
      { internalType: "uint256", name: "lastDepositedTime", type: "uint256" },
      { internalType: "uint256", name: "cakeAtLastUserAction", type: "uint256" },
      { internalType: "uint256", name: "lastUserActionTime", type: "uint256" },
      { internalType: "uint256", name: "lockStartTime", type: "uint256" },
      { internalType: "uint256", name: "lockEndTime", type: "uint256" },
      { internalType: "uint256", name: "userBoostedShare", type: "uint256" },
      { internalType: "bool", name: "locked", type: "bool" },
      { internalType: "uint256", name: "lockedAmount", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_shares", type: "uint256" }],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "withdrawAll", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [{ internalType: "uint256", name: "_amount", type: "uint256" }],
    name: "withdrawByAmount",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawFee",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawFeeContract",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawFeePeriod",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];

// src/queries/getAddresses.ts
function getCakeFlexibleSideVaultAddress(chainId) {
  return getContractAddress(CAKE_FLEXIBLE_SIDE_VAULT, chainId);
}
function getCakeVaultAddress(chainId) {
  return getContractAddress(CAKE_VAULT, chainId);
}

// src/queries/fetchVaultPublic.ts
var balanceOfAbi = [
  {
    inputs: [{ internalType: "address", name: "account", type: "address" }],
    name: "balanceOf",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  }
];
var fetchPublicVaultData = async ({
  chainId,
  cakeVaultAddress = getCakeVaultAddress(chainId),
  provider
}) => {
  try {
    const client = provider({ chainId });
    const [sharePrice, shares, totalLockedAmount, totalCakeInVault] = await client.multicall({
      contracts: [
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "getPricePerFullShare"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "totalShares"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "totalLockedAmount"
        },
        {
          abi: balanceOfAbi,
          address: tokens.CAKE[chains.ChainId.BSC].address,
          functionName: "balanceOf",
          args: [cakeVaultAddress]
        }
      ],
      allowFailure: true
    });
    const totalSharesAsBigNumber = shares.status === "success" && shares.result ? new BigNumber7__default.default(shares.result.toString()) : BIG_ZERO;
    const totalLockedAmountAsBigNumber = totalLockedAmount.status === "success" && totalLockedAmount.result ? new BigNumber7__default.default(totalLockedAmount.result.toString()) : BIG_ZERO;
    const sharePriceAsBigNumber = sharePrice.status === "success" && sharePrice.result ? new BigNumber7__default.default(sharePrice.result.toString()) : BIG_ZERO;
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      totalLockedAmount: totalLockedAmountAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: totalCakeInVault.result ? new BigNumber7__default.default(totalCakeInVault.result.toString()).toJSON() : "0"
    };
  } catch (error) {
    return {
      totalShares: null,
      totalLockedAmount: null,
      pricePerFullShare: null,
      totalCakeInVault: null
    };
  }
};
var fetchPublicFlexibleSideVaultData = async ({
  chainId,
  cakeVaultAddress = getCakeFlexibleSideVaultAddress(chainId),
  provider
}) => {
  try {
    const client = provider({ chainId });
    const [sharePrice, shares, totalCakeInVault] = await client.multicall({
      contracts: [
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "getPricePerFullShare"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "totalShares"
        },
        {
          abi: balanceOfAbi,
          address: tokens.CAKE[chains.ChainId.BSC].address,
          functionName: "balanceOf",
          args: [cakeVaultAddress]
        }
      ],
      allowFailure: true
    });
    const totalSharesAsBigNumber = shares.status === "success" ? new BigNumber7__default.default(shares.result.toString()) : BIG_ZERO;
    const sharePriceAsBigNumber = sharePrice.status === "success" ? new BigNumber7__default.default(sharePrice.result.toString()) : BIG_ZERO;
    return {
      totalShares: totalSharesAsBigNumber.toJSON(),
      pricePerFullShare: sharePriceAsBigNumber.toJSON(),
      totalCakeInVault: new BigNumber7__default.default((totalCakeInVault.result || "0").toString()).toJSON()
    };
  } catch (error) {
    return {
      totalShares: null,
      pricePerFullShare: null,
      totalCakeInVault: null
    };
  }
};
var fetchVaultFees = async ({
  chainId,
  cakeVaultAddress = getCakeVaultAddress(chainId),
  provider
}) => {
  try {
    const client = provider({ chainId });
    const [performanceFee, withdrawalFee, withdrawalFeePeriod] = await client.multicall({
      contracts: [
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "performanceFee"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "withdrawFee"
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "withdrawFeePeriod"
        }
      ],
      allowFailure: false
    });
    return {
      performanceFee: Number(performanceFee),
      withdrawalFee: Number(withdrawalFee),
      withdrawalFeePeriod: Number(withdrawalFeePeriod)
    };
  } catch (error) {
    return {
      performanceFee: null,
      withdrawalFee: null,
      withdrawalFeePeriod: null
    };
  }
};

// src/abis/ICakeFlexibleSideVaultV2.ts
var cakeFlexibleSideVaultV2ABI = [
  {
    inputs: [],
    name: "MAX_PERFORMANCE_FEE",
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
    name: "MAX_WITHDRAW_AMOUNT_BOOSTER",
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
    name: "MAX_WITHDRAW_FEE",
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
    name: "MAX_WITHDRAW_FEE_PERIOD",
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
    name: "MIN_DEPOSIT_AMOUNT",
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
    name: "MIN_WITHDRAW_AMOUNT",
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
    name: "MIN_WITHDRAW_AMOUNT_BOOSTER",
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
    name: "admin",
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
    name: "available",
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
    inputs: [],
    name: "cakePool",
    outputs: [
      {
        internalType: "contract ICakePool",
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
        name: "_amount",
        type: "uint256"
      }
    ],
    name: "deposit",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "emergencyWithdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "getPricePerFullShare",
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
        name: "_token",
        type: "address"
      }
    ],
    name: "inCaseTokensGetStuck",
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
    inputs: [],
    name: "pause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "paused",
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
    name: "performanceFee",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_admin",
        type: "address"
      }
    ],
    name: "setAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_performanceFee",
        type: "uint256"
      }
    ],
    name: "setPerformanceFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_treasury",
        type: "address"
      }
    ],
    name: "setTreasury",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawAmountBooster",
        type: "uint256"
      }
    ],
    name: "setWithdrawAmountBooster",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawFee",
        type: "uint256"
      }
    ],
    name: "setWithdrawFee",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_withdrawFeePeriod",
        type: "uint256"
      }
    ],
    name: "setWithdrawFeePeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "staking",
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
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "totalShares",
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
    name: "treasury",
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
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "userInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "shares",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "lastDepositedTime",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "cakeAtLastUserAction",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "lastUserActionTime",
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
        name: "_shares",
        type: "uint256"
      }
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawAll",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "withdrawAmountBooster",
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
    name: "withdrawFee",
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
    name: "withdrawFeePeriod",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
];

// src/queries/fetchVaultUser.ts
var fetchVaultUser = async ({ account, chainId, provider }) => {
  try {
    const cakeVaultAddress = getCakeVaultAddress(chainId);
    const client = provider({ chainId });
    const [userContractResponse, currentPerformanceFee, currentOverdueFee] = await client.multicall({
      contracts: [
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "userInfo",
          args: [account]
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "calculatePerformanceFee",
          args: [account]
        },
        {
          abi: cakeVaultV2ABI,
          address: cakeVaultAddress,
          functionName: "calculateOverdueFee",
          args: [account]
        }
      ],
      allowFailure: false
    });
    return {
      isLoading: false,
      userShares: new BigNumber7__default.default(userContractResponse[0].toString()).toJSON(),
      lastDepositedTime: userContractResponse[1].toString(),
      lastUserActionTime: userContractResponse[3].toString(),
      cakeAtLastUserAction: new BigNumber7__default.default(userContractResponse[2].toString()).toJSON(),
      userBoostedShare: new BigNumber7__default.default(userContractResponse[6].toString()).toJSON(),
      locked: userContractResponse[7],
      lockEndTime: userContractResponse[5].toString(),
      lockStartTime: userContractResponse[4].toString(),
      lockedAmount: new BigNumber7__default.default(userContractResponse[8].toString()).toJSON(),
      currentPerformanceFee: new BigNumber7__default.default(currentPerformanceFee.toString()).toJSON(),
      currentOverdueFee: new BigNumber7__default.default(currentOverdueFee.toString()).toJSON()
    };
  } catch (error) {
    return {
      isLoading: true,
      userShares: "",
      lastDepositedTime: "",
      lastUserActionTime: "",
      cakeAtLastUserAction: "",
      userBoostedShare: "",
      lockEndTime: "",
      lockStartTime: "",
      locked: false,
      lockedAmount: "",
      currentPerformanceFee: "",
      currentOverdueFee: ""
    };
  }
};
var fetchFlexibleSideVaultUser = async ({
  account,
  chainId,
  provider
}) => {
  try {
    const userContractResponse = await await provider({ chainId }).readContract({
      abi: cakeFlexibleSideVaultV2ABI,
      address: getCakeFlexibleSideVaultAddress(chainId),
      functionName: "userInfo",
      args: [account]
    });
    return {
      isLoading: false,
      userShares: new BigNumber7__default.default(userContractResponse[0].toString()).toJSON(),
      lastDepositedTime: userContractResponse[1].toString(),
      lastUserActionTime: userContractResponse[3].toString(),
      cakeAtLastUserAction: new BigNumber7__default.default(userContractResponse[2].toString()).toJSON()
    };
  } catch (error) {
    return {
      isLoading: true,
      userShares: "",
      lastDepositedTime: "",
      lastUserActionTime: "",
      cakeAtLastUserAction: ""
    };
  }
};

exports.BLOCKS_PER_DAY = BLOCKS_PER_DAY;
exports.BLOCKS_PER_YEAR = BLOCKS_PER_YEAR;
exports.BOOSTED_POOLS_CONFIG_BY_CHAIN = BOOSTED_POOLS_CONFIG_BY_CHAIN;
exports.BOOST_WEIGHT = BOOST_WEIGHT;
exports.BSC_BLOCK_TIME = BSC_BLOCK_TIME;
exports.CAKE_FLEXIBLE_SIDE_VAULT = CAKE_FLEXIBLE_SIDE_VAULT;
exports.CAKE_VAULT = CAKE_VAULT;
exports.CAKE_VAULT_SUPPORTED_CHAINS = CAKE_VAULT_SUPPORTED_CHAINS;
exports.DURATION_FACTOR = DURATION_FACTOR;
exports.ICAKE = ICAKE;
exports.MAX_LOCK_DURATION = MAX_LOCK_DURATION;
exports.ONE_WEEK_DEFAULT = ONE_WEEK_DEFAULT;
exports.PoolCategory = PoolCategory;
exports.SECONDS_IN_YEAR = SECONDS_IN_YEAR;
exports.SUPPORTED_CHAIN_IDS = SUPPORTED_CHAIN_IDS;
exports.UNLOCK_FREE_DURATION = UNLOCK_FREE_DURATION;
exports.VaultKey = VaultKey;
exports.cakeFlexibleSideVaultV2ABI = cakeFlexibleSideVaultV2ABI;
exports.cakeVaultV2ABI = cakeVaultV2ABI;
exports.checkIsBoostedPool = checkIsBoostedPool;
exports.fetchFlexibleSideVaultUser = fetchFlexibleSideVaultUser;
exports.fetchPoolsAllowance = fetchPoolsAllowance;
exports.fetchPoolsProfileRequirement = fetchPoolsProfileRequirement;
exports.fetchPoolsStakingLimits = fetchPoolsStakingLimits;
exports.fetchPoolsStakingLimitsByBlock = fetchPoolsStakingLimitsByBlock;
exports.fetchPoolsTimeLimits = fetchPoolsTimeLimits;
exports.fetchPoolsTotalStaking = fetchPoolsTotalStaking;
exports.fetchPublicFlexibleSideVaultData = fetchPublicFlexibleSideVaultData;
exports.fetchPublicVaultData = fetchPublicVaultData;
exports.fetchUserBalances = fetchUserBalances;
exports.fetchUserPendingRewards = fetchUserPendingRewards;
exports.fetchUserStakeBalances = fetchUserStakeBalances;
exports.fetchVaultFees = fetchVaultFees;
exports.fetchVaultUser = fetchVaultUser;
exports.getBoostedPoolApr = getBoostedPoolApr;
exports.getBoostedPoolConfig = getBoostedPoolConfig;
exports.getBoostedPoolsConfig = getBoostedPoolsConfig;
exports.getCakeFlexibleSideVaultAddress = getCakeFlexibleSideVaultAddress;
exports.getCakeVaultAddress = getCakeVaultAddress;
exports.getContractAddress = getContractAddress;
exports.getLivePoolsConfig = getLivePoolsConfig;
exports.getPoolAprByTokenPerBlock = getPoolAprByTokenPerBlock;
exports.getPoolAprByTokenPerSecond = getPoolAprByTokenPerSecond;
exports.getPoolContractBySousId = getPoolContractBySousId;
exports.getPoolsConfig = getPoolsConfig;
exports.getSmartChefChefV2Contract = getSmartChefChefV2Contract;
exports.getSousChefBNBContract = getSousChefBNBContract;
exports.getSousChefV2Contract = getSousChefV2Contract;
exports.isCakeVaultSupported = isCakeVaultSupported;
exports.isLegacyPool = isLegacyPool;
exports.isPoolsSupported = isPoolsSupported;
exports.isUpgradedPool = isUpgradedPool;
exports.smartChefABI = smartChefABI;
exports.sousChefABI = sousChefABI;
exports.sousChefBnbABI = sousChefBnbABI;
exports.sousChefV2ABI = sousChefV2ABI;
exports.sousChefV3ABI = sousChefV3ABI;
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.js.map