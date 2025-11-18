import { ChainId } from '@pancakeswap/chains';
import { encodePacked } from 'viem';
import { isV3Pool } from '@pancakeswap/routing-sdk-addon-v3';
import { CurrencyAmount } from '@pancakeswap/swap-sdk-core';
import { isStablePool } from '@pancakeswap/routing-sdk-addon-stable-swap';
import { isV2Pool } from '@pancakeswap/routing-sdk-addon-v2';
import invariant from 'tiny-invariant';

// src/constants/mixedRouteQuoterV1.ts
var EMPTY_FEE_PATH_PLACEHOLDER = 8388608;
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
function encodeRouteToPath(route, exactOutput) {
  const firstInputToken = route.path[0].wrapped;
  const { path, types } = route.pools.reduce(
    ({ inputToken, path: p, types: t }, pool, index) => {
      const outputToken = route.path[index + 1].wrapped;
      const fee = isV3Pool(pool) ? pool.getPoolData().fee : EMPTY_FEE_PATH_PLACEHOLDER;
      if (index === 0) {
        return {
          inputToken: outputToken,
          types: ["address", "uint24", "address"],
          path: [inputToken.address, fee, outputToken.address]
        };
      }
      return {
        inputToken: outputToken,
        types: [...t, "uint24", "address"],
        path: [...p, fee, outputToken.address]
      };
    },
    { inputToken: firstInputToken, path: [], types: [] }
  );
  return exactOutput ? encodePacked(types.reverse(), path.reverse()) : encodePacked(types, path);
}

// src/utils/isMixedRoute.ts
function isMixedRoute({ pools }) {
  let lastType;
  for (const p of pools) {
    if (lastType === void 0) {
      lastType = p.type;
      continue;
    }
    if (lastType !== p.type) {
      return true;
    }
  }
  return false;
}
function isV3Route({ pools }) {
  return pools.every((p) => isV3Pool(p));
}

// src/abis/IQuoterV2.ts
var quoterV2ABI = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    name: "quoteExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "sqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "initializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      }
    ],
    name: "quoteExactOutput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "sqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "initializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "gasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/fetchV3Quote.ts
function buildV3QuoteCall(route) {
  const { path, amount } = route;
  const {
    currency: { chainId }
  } = amount;
  const isExactOut = path[path.length - 1].wrapped.equals(amount.currency.wrapped);
  return {
    address: V3_QUOTER_ADDRESSES[chainId],
    abi: quoterV2ABI,
    functionName: isExactOut ? "quoteExactOutput" : "quoteExactInput",
    args: [encodeRouteToPath(route, isExactOut), amount.quotient]
  };
}
var fetchV3Quote = async ({ route, client }) => {
  const { path, amount } = route;
  const isExactOut = path[path.length - 1].wrapped.equals(amount.currency.wrapped);
  const result = await client.multicall({
    contracts: [buildV3QuoteCall(route)],
    allowFailure: false
  });
  const [[quote, , , gasUseEstimate]] = result;
  const outCurrency = isExactOut ? path[0] : path[path.length - 1];
  return {
    quote: CurrencyAmount.fromRawAmount(outCurrency, quote),
    gasUseEstimate
  };
};

// src/abis/IMixedRouteQuoterV1.ts
var mixedRouteQuoterV1ABI = [
  {
    inputs: [
      {
        internalType: "bytes",
        name: "path",
        type: "bytes"
      },
      {
        internalType: "uint256[]",
        name: "flag",
        type: "uint256[]"
      },
      {
        internalType: "uint256",
        name: "amountIn",
        type: "uint256"
      }
    ],
    name: "quoteExactInput",
    outputs: [
      {
        internalType: "uint256",
        name: "amountOut",
        type: "uint256"
      },
      {
        internalType: "uint160[]",
        name: "v3SqrtPriceX96AfterList",
        type: "uint160[]"
      },
      {
        internalType: "uint32[]",
        name: "v3InitializedTicksCrossedList",
        type: "uint32[]"
      },
      {
        internalType: "uint256",
        name: "v3SwapGasEstimate",
        type: "uint256"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  }
];

// src/fetchMixedRouteQuote.ts
function buildMixedRouteQuoteCall(route) {
  const { path, amount } = route;
  const {
    currency: { chainId }
  } = amount;
  const isExactOut = path[path.length - 1].wrapped.equals(amount.currency.wrapped);
  invariant(!isExactOut, "EXACT_OUT_NOT_SUPPORTED");
  return {
    address: MIXED_ROUTE_QUOTER_ADDRESSES[chainId],
    abi: mixedRouteQuoterV1ABI,
    functionName: "quoteExactInput",
    args: [
      encodeRouteToPath(route, false),
      route.pools.map((pool) => {
        if (isV3Pool(pool)) {
          return 0n;
        }
        if (isV2Pool(pool)) {
          return 1n;
        }
        if (isStablePool(pool)) {
          const stablePool = pool.getPoolData();
          if (stablePool.balances.length === 2) {
            return 2n;
          }
          if (stablePool.balances.length === 3) {
            return 3n;
          }
        }
        return -1n;
      }).filter((index) => index >= 0),
      amount.quotient
    ]
  };
}

// src/fetchQuotes.ts
var fetchQuotes = async ({ routes, client }) => {
  const [route] = routes;
  const { amount, path } = route;
  const isExactOut = path[path.length - 1].wrapped.equals(amount.currency.wrapped);
  const results = await client.multicall({
    contracts: routes.map((r) => {
      if (isV3Route(r)) {
        return buildV3QuoteCall(r);
      }
      return buildMixedRouteQuoteCall(r);
    })
  });
  return results.map((result, i) => {
    if (result.status === "failure") {
      console.error("[QUOTER]: fail to get quote", result.error);
      return void 0;
    }
    const { path: currentPath } = routes[i];
    const outCurrency = isExactOut ? currentPath[0] : currentPath[currentPath.length - 1];
    const [quote, , , gasUseEstimate] = result.result;
    return {
      quote: CurrencyAmount.fromRawAmount(outCurrency, quote),
      gasUseEstimate
    };
  });
};

export { EMPTY_FEE_PATH_PLACEHOLDER, MIXED_ROUTE_QUOTER_ADDRESSES, V3_QUOTER_ADDRESSES, buildV3QuoteCall, encodeRouteToPath, fetchQuotes, fetchV3Quote, isMixedRoute, isV3Route };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map