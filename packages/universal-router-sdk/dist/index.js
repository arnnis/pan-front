'use strict';

var chains = require('@pancakeswap/chains');
var sdk = require('@pancakeswap/sdk');
var smartRouter = require('@pancakeswap/smart-router');
var invariant = require('tiny-invariant');
var viem = require('viem');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var invariant__default = /*#__PURE__*/_interopDefault(invariant);

// src/constants.ts
var UNIVERSAL_ROUTER_ADDRESSES = {
  [chains.ChainId.ETHEREUM]: "0x65b382653f7C31bC0Af67f188122035461ec9C76",
  [chains.ChainId.GOERLI]: "0xC46abF8B66Df4B9Eb0cC0cf6eba24226AC6E6285",
  [chains.ChainId.SEPOLIA]: "0x55D32fa7Da7290838347bc97cb7fAD4992672255",
  [chains.ChainId.BSC]: "0x1A0A18AC4BECDDbd6389559687d1A73d8927E416",
  [chains.ChainId.BSC_TESTNET]: "0xd77C2afeBf3dC665af07588BF798bd938968c72E",
  // [ChainId.SCROLL]: '0xB89a6778D1efE7a5b7096757A21b810CC2886fa1',
  [chains.ChainId.SCROLL_SEPOLIA]: "0xB89a6778D1efE7a5b7096757A21b810CC2886fa1",
  [chains.ChainId.ARBITRUM_ONE]: "0xFE6508f0015C778Bdcc1fB5465bA5ebE224C9912",
  [chains.ChainId.ARBITRUM_GOERLI]: "0xa8EEA7aa6620712524d18D742821848e55E773B5",
  [chains.ChainId.ARBITRUM_SEPOLIA]: "0xFE6508f0015C778Bdcc1fB5465bA5ebE224C9912",
  [chains.ChainId.BASE]: "0xFE6508f0015C778Bdcc1fB5465bA5ebE224C9912",
  [chains.ChainId.BASE_TESTNET]: "0xa8EEA7aa6620712524d18D742821848e55E773B5",
  [chains.ChainId.BASE_SEPOLIA]: "0xFE6508f0015C778Bdcc1fB5465bA5ebE224C9912",
  [chains.ChainId.POLYGON_ZKEVM]: "0xB89a6778D1efE7a5b7096757A21b810CC2886fa1",
  [chains.ChainId.POLYGON_ZKEVM_TESTNET]: "0xa8EEA7aa6620712524d18D742821848e55E773B5",
  [chains.ChainId.LINEA]: "0xFE6508f0015C778Bdcc1fB5465bA5ebE224C9912",
  [chains.ChainId.LINEA_TESTNET]: "0x9f3Cb8251492a069dBF0634C24e9De305d6946B8",
  [chains.ChainId.ZKSYNC]: "0xdAee41E335322C85ff2c5a6745c98e1351806e98",
  [chains.ChainId.ZKSYNC_TESTNET]: "0xCa97D1FAFCEa54EFc68d66eA914AB2F8Fbfe93c5",
  [chains.ChainId.OPBNB]: "0xB89a6778D1efE7a5b7096757A21b810CC2886fa1",
  [chains.ChainId.OPBNB_TESTNET]: "0xa8EEA7aa6620712524d18D742821848e55E773B5",
  [chains.ChainId.MONAD_TESTNET]: "0x94D220C58A23AE0c2eE29344b00A30D1c2d9F1bc"
};
var getUniversalRouterAddress = (chainId) => {
  if (!(chainId in UNIVERSAL_ROUTER_ADDRESSES))
    throw new Error(`Universal Router not deployed on chain ${chainId}`);
  return UNIVERSAL_ROUTER_ADDRESSES[chainId];
};
var CONTRACT_BALANCE = 2n ** 255n;
var SENDER_AS_RECIPIENT = "0x0000000000000000000000000000000000000001";
var ROUTER_AS_RECIPIENT = "0x0000000000000000000000000000000000000002";

// src/utils/numbers.ts
function encodeFeeBips(fee) {
  return fee.multiply(1e4).quotient.toString();
}
var ALLOW_REVERT_FLAG = 128;
var REVERTIBLE_COMMANDS = /* @__PURE__ */ new Set([
  // CommandType.SEAPORT_V1_5,
  // CommandType.SEAPORT_V1_4,
  // CommandType.LOOKS_RARE_V2,
  // CommandType.X2Y2_721,
  // CommandType.X2Y2_1155,
  32 /* EXECUTE_SUB_PLAN */
]);
var ABI_STRUCT_PERMIT_DETAILS = `
struct PermitDetails {
  address token;
  uint160 amount;
  uint48 expiration;
  uint48 nonce;
}`.replaceAll("\n", "");
var ABI_STRUCT_PERMIT_SINGLE = `
struct PermitSingle {
  PermitDetails details;
  address spender;
  uint256 sigDeadline;
}
`.replaceAll("\n", "");
var ABI_STRUCT_PERMIT_BATCH = `
struct PermitBatch {
  PermitSingle[] details;
  address spender;
  uint256 sigDeadline;
}
`.replaceAll("\n", "");
var ABI_STRUCT_ALLOWANCE_TRANSFER_DETAILS = `
struct AllowanceTransferDetails {
  address from;
  address to;
  uint160 amount;
  address token;
}
`.replaceAll("\n", "");
var ABI_PARAMETER = {
  // Batch Reverts
  [32 /* EXECUTE_SUB_PLAN */]: viem.parseAbiParameters("bytes _commands, bytes[] _inputs"),
  // Permit2 Actions
  [10 /* PERMIT2_PERMIT */]: viem.parseAbiParameters([
    "PermitSingle permitSingle, bytes data",
    ABI_STRUCT_PERMIT_SINGLE,
    ABI_STRUCT_PERMIT_DETAILS
  ]),
  [3 /* PERMIT2_PERMIT_BATCH */]: viem.parseAbiParameters([
    "PermitBatch permitBatch, bytes data",
    ABI_STRUCT_PERMIT_BATCH,
    ABI_STRUCT_PERMIT_SINGLE,
    ABI_STRUCT_PERMIT_DETAILS
  ]),
  [2 /* PERMIT2_TRANSFER_FROM */]: viem.parseAbiParameters("address token, address recipient, uint160 amount"),
  [13 /* PERMIT2_TRANSFER_FROM_BATCH */]: viem.parseAbiParameters([
    "AllowanceTransferDetails[] batchDetails",
    ABI_STRUCT_ALLOWANCE_TRANSFER_DETAILS
  ]),
  // swap actions
  [0 /* V3_SWAP_EXACT_IN */]: viem.parseAbiParameters(
    "address recipient, uint256 amountIn, uint256 amountOutMin, bytes path, bool payerIsUser"
  ),
  [1 /* V3_SWAP_EXACT_OUT */]: viem.parseAbiParameters(
    "address recipient, uint256 amountOut, uint256 amountInMax, bytes path, bool payerIsUser"
  ),
  [8 /* V2_SWAP_EXACT_IN */]: viem.parseAbiParameters(
    "address recipient, uint256 amountIn, uint256 amountOutMin, address[] path, bool payerIsUser"
  ),
  [9 /* V2_SWAP_EXACT_OUT */]: viem.parseAbiParameters(
    "address recipient, uint256 amountOut, uint256 amountInMax, address[] path, bool payerIsUser"
  ),
  [34 /* STABLE_SWAP_EXACT_IN */]: viem.parseAbiParameters(
    "address recipient, uint256 amountIn, uint256 amountOutMin, address[] path, uint256[] flag, bool payerIsUser"
  ),
  [35 /* STABLE_SWAP_EXACT_OUT */]: viem.parseAbiParameters(
    "address recipient, uint256 amountOut, uint256 amountInMax, address[] path, uint256[] flag, bool payerIsUser"
  ),
  // Token Actions and Checks
  [11 /* WRAP_ETH */]: viem.parseAbiParameters("address recipient, uint256 amountMin"),
  [12 /* UNWRAP_WETH */]: viem.parseAbiParameters("address recipient, uint256 amountMin"),
  [4 /* SWEEP */]: viem.parseAbiParameters("address token, address recipient, uint256 amountMin"),
  // [CommandType.SWEEP_ERC721]: parseAbiParameters('address token, address recipient, uint256 id'),
  // [CommandType.SWEEP_ERC1155]: parseAbiParameters('address token, address recipient, uint256 id, uint256 amount'),
  [5 /* TRANSFER */]: viem.parseAbiParameters("address token, address recipient, uint256 value"),
  [6 /* PAY_PORTION */]: viem.parseAbiParameters("address token, address recipient, uint256 bips"),
  [14 /* BALANCE_CHECK_ERC20 */]: viem.parseAbiParameters("address owner, address token, uint256 minBalance")
  // [CommandType.OWNER_CHECK_721]: parseAbiParameters('address owner, address token, uint256 id'),
  // [CommandType.OWNER_CHECK_1155]: parseAbiParameters('address owner, address token, uint256 id, uint256 minBalance'),
  // [CommandType.APPROVE_ERC20]: parseAbiParameters('address token, uint256 spender'),
  // NFT Markets
  // [CommandType.SEAPORT_V1_5]: parseAbiParameters('uint256 value, bytes data'),
  // [CommandType.SEAPORT_V1_4]: parseAbiParameters('uint256 value, bytes data'),
  // @fixme: contract not implemented
  // [CommandType.LOOKS_RARE_V2]: parseAbiParameters('uint256 value, bytes data'),
  // [CommandType.X2Y2_721]: parseAbiParameters('uint256 value, bytes data, address recipient, address token, uint256 id'),
  // [CommandType.X2Y2_1155]: parseAbiParameters(
  //   'uint256 value, bytes data, address recipient, address token, uint256 id, uint256 amount',
  // ),
  // [CommandType.PANCAKE_NFT_WBNB]: parseAbiParameters('address collection, uint256 tokenId, uint256 price'),
  // [CommandType.PANCAKE_NFT_BNB]: parseAbiParameters('address collection, uint256 tokenId, uint256 price'),
  // @notice: following marketplace not supported now
  // [CommandType.NFTX]: parseAbiParameters('uint256 value, bytes data'),
  // [CommandType.FOUNDATION]: parseAbiParameters(
  //   'uint256 value, bytes data, address recipient, address token, uint256 id'
  // ),
  // [CommandType.SUDOSWAP]: parseAbiParameters('uint256 value, bytes data'),
  // [CommandType.NFT20]: parseAbiParameters('uint256 value, bytes data'),
  // [CommandType.CRYPTOPUNKS]: parseAbiParameters('uint256 punkId, address recipient, uint256 value'),
  // [CommandType.ELEMENT_MARKET]: parseAbiParameters('uint256 value, bytes data'),
};
var RoutePlanner = class {
  constructor() {
    this.commands = "0x";
    this.inputs = [];
  }
  addSubPlan(subplan) {
    this.addCommand(32 /* EXECUTE_SUB_PLAN */, [subplan.commands, subplan.inputs], true);
  }
  addCommand(type, parameters, allowRevert = false) {
    const command = createCommand(type, parameters);
    this.inputs.push(command.encodedInput);
    if (allowRevert) {
      if (!REVERTIBLE_COMMANDS.has(command.type)) {
        throw new Error(`command type: ${command.type} cannot be allowed to revert`);
      }
      command.type |= ALLOW_REVERT_FLAG;
    }
    this.commands = this.commands.concat(command.type.toString(16).padStart(2, "0"));
  }
};
function createCommand(type, parameters) {
  const encodedInput = viem.encodeAbiParameters(ABI_PARAMETER[type], parameters);
  return { type, encodedInput };
}

// src/entities/Command.ts
var RouterTradeType = /* @__PURE__ */ ((RouterTradeType2) => {
  RouterTradeType2["PancakeSwapTrade"] = "PancakeSwapTrade";
  RouterTradeType2["UnwrapWETH"] = "UnwrapWETH";
  return RouterTradeType2;
})(RouterTradeType || {});

// src/entities/protocols/pancakeswap.ts
var PancakeSwapTrade = class {
  constructor(trade, options) {
    this.trade = trade;
    this.options = options;
    this.tradeType = "PancakeSwapTrade" /* PancakeSwapTrade */;
    this.type = this.trade.tradeType;
    if (options.fee && options.flatFee) {
      throw new Error("Cannot specify both fee and flatFee");
    }
  }
  encode(planner) {
    let payerIsUser = true;
    const { trade } = this;
    const numberOfTrades = trade.routes.length;
    if (trade.inputAmount.currency.isNative) {
      planner.addCommand(11 /* WRAP_ETH */, [
        ROUTER_AS_RECIPIENT,
        BigInt(
          smartRouter.SmartRouter.maximumAmountIn(trade, this.options.slippageTolerance, trade.inputAmount).quotient.toString()
        )
      ]);
      payerIsUser = false;
    }
    this.options.recipient = this.options.recipient ?? SENDER_AS_RECIPIENT;
    const inputIsNative = trade.inputAmount.currency.isNative;
    const outputIsNative = trade.outputAmount.currency.isNative;
    const performAggregatedSlippageCheck = trade.tradeType === sdk.TradeType.EXACT_INPUT && numberOfTrades > 2;
    const routerMustCustody = outputIsNative || !!this.options.fee || performAggregatedSlippageCheck;
    for (const route of trade.routes) {
      const singleRouteTrade = {
        ...trade,
        routes: [route],
        inputAmount: route.inputAmount,
        outputAmount: route.outputAmount
      };
      if (route.type === smartRouter.RouteType.V2) {
        addV2Swap(planner, singleRouteTrade, this.options, routerMustCustody, payerIsUser);
        continue;
      }
      if (route.type === smartRouter.RouteType.V3) {
        addV3Swap(planner, singleRouteTrade, this.options, routerMustCustody, payerIsUser);
        continue;
      }
      if (route.type === smartRouter.RouteType.STABLE) {
        addStableSwap(planner, singleRouteTrade, this.options, routerMustCustody, payerIsUser);
        continue;
      }
      if (route.type === smartRouter.RouteType.V4CL) {
        continue;
      }
      if (route.type === smartRouter.RouteType.V4BIN) {
        continue;
      }
      addMixedSwap(planner, singleRouteTrade, this.options, payerIsUser, routerMustCustody);
    }
    let minAmountOut = smartRouter.SmartRouter.minimumAmountOut(trade, this.options.slippageTolerance, trade.outputAmount);
    if (routerMustCustody) {
      if (this.options.fee) {
        const feeBips = BigInt(encodeFeeBips(this.options.fee.fee));
        planner.addCommand(6 /* PAY_PORTION */, [
          trade.outputAmount.currency.wrapped.address,
          this.options.fee.recipient,
          feeBips
        ]);
        if (this.type === sdk.TradeType.EXACT_OUTPUT) {
          minAmountOut = minAmountOut.subtract(minAmountOut.multiply(feeBips).divide(1e4));
        }
      }
      if (this.options.flatFee) {
        const fee = BigInt(this.options.flatFee.amount.toString());
        if (fee < minAmountOut.quotient)
          throw new Error("Flat fee can't be greater than minimum amount out");
        planner.addCommand(5 /* TRANSFER */, [
          trade.outputAmount.currency.wrapped.address,
          this.options.flatFee.recipient,
          fee
        ]);
        if (this.type === sdk.TradeType.EXACT_OUTPUT) {
          minAmountOut = sdk.CurrencyAmount.fromRawAmount(trade.outputAmount.currency, minAmountOut.quotient - fee);
        }
      }
      if (outputIsNative) {
        planner.addCommand(12 /* UNWRAP_WETH */, [this.options.recipient, minAmountOut.quotient]);
      } else {
        planner.addCommand(4 /* SWEEP */, [
          trade.outputAmount.currency.wrapped.address,
          this.options.recipient,
          minAmountOut.quotient
        ]);
      }
    }
    if (inputIsNative && (this.type === sdk.TradeType.EXACT_OUTPUT || riskOfPartialFill(trade))) {
      planner.addCommand(12 /* UNWRAP_WETH */, [this.options.recipient, 0n]);
    }
  }
};
function addV2Swap(planner, trade, options, routerMustCustody, payerIsUser) {
  const amountIn = BigInt(smartRouter.SmartRouter.maximumAmountIn(trade, options.slippageTolerance).quotient.toString());
  const amountOut = BigInt(smartRouter.SmartRouter.minimumAmountOut(trade, options.slippageTolerance).quotient.toString());
  invariant__default.default(trade.routes.length === 1 && trade.routes[0].type === smartRouter.RouteType.V2, "Only allow single route v2 trade");
  const [route] = trade.routes;
  const path = route.path.map((token) => token.wrapped.address);
  const recipient = routerMustCustody ? ROUTER_AS_RECIPIENT : sdk.validateAndParseAddress(options.recipient ?? SENDER_AS_RECIPIENT);
  if (trade.tradeType === sdk.TradeType.EXACT_INPUT) {
    planner.addCommand(8 /* V2_SWAP_EXACT_IN */, [
      // if native, we have to unwrap so keep in the router for now
      recipient,
      amountIn,
      amountOut,
      path,
      payerIsUser
    ]);
    return;
  }
  planner.addCommand(9 /* V2_SWAP_EXACT_OUT */, [recipient, amountOut, amountIn, path, payerIsUser]);
}
function addV3Swap(planner, trade, options, routerMustCustody, payerIsUser) {
  invariant__default.default(trade.routes.length === 1 && trade.routes[0].type === smartRouter.RouteType.V3, "Only allow single route v3 trade");
  const [route] = trade.routes;
  const { inputAmount, outputAmount } = route;
  const path = smartRouter.SmartRouter.encodeMixedRouteToPath(
    { ...route, input: inputAmount.currency, output: outputAmount.currency },
    trade.tradeType === sdk.TradeType.EXACT_OUTPUT
  );
  const amountIn = smartRouter.SmartRouter.maximumAmountIn(trade, options.slippageTolerance, inputAmount).quotient;
  const amountOut = smartRouter.SmartRouter.minimumAmountOut(trade, options.slippageTolerance, outputAmount).quotient;
  const recipient = routerMustCustody ? ROUTER_AS_RECIPIENT : sdk.validateAndParseAddress(options.recipient ?? SENDER_AS_RECIPIENT);
  if (trade.tradeType === sdk.TradeType.EXACT_INPUT) {
    const exactInputSingleParams = [
      recipient,
      amountIn,
      amountOut,
      path,
      payerIsUser
    ];
    planner.addCommand(0 /* V3_SWAP_EXACT_IN */, exactInputSingleParams);
    return;
  }
  const exactOutputSingleParams = [
    recipient,
    amountOut,
    amountIn,
    path,
    payerIsUser
  ];
  planner.addCommand(1 /* V3_SWAP_EXACT_OUT */, exactOutputSingleParams);
}
function addStableSwap(planner, trade, options, routerMustCustody, payerIsUser = false) {
  invariant__default.default(
    trade.routes.length === 1 && trade.routes[0].type === smartRouter.RouteType.STABLE,
    "Only allow single route stable trade"
  );
  const amountIn = smartRouter.SmartRouter.maximumAmountIn(trade, options.slippageTolerance).quotient;
  const amountOut = smartRouter.SmartRouter.minimumAmountOut(trade, options.slippageTolerance).quotient;
  const [route] = trade.routes;
  const path = route.path.map((token) => token.wrapped.address);
  const flags = route.pools.map((p) => BigInt(p.balances.length));
  const recipient = routerMustCustody ? ROUTER_AS_RECIPIENT : sdk.validateAndParseAddress(options.recipient ?? SENDER_AS_RECIPIENT);
  if (trade.tradeType === sdk.TradeType.EXACT_INPUT) {
    const exactInputParams = [
      recipient,
      amountIn,
      amountOut,
      path,
      flags,
      payerIsUser
    ];
    planner.addCommand(34 /* STABLE_SWAP_EXACT_IN */, exactInputParams);
    return;
  }
  const exactOutputParams = [
    recipient,
    amountOut,
    amountIn,
    path,
    flags,
    payerIsUser
  ];
  planner.addCommand(35 /* STABLE_SWAP_EXACT_OUT */, exactOutputParams);
}
function addMixedSwap(planner, trade, options, payerIsUser, routerMustCustody) {
  invariant__default.default(
    trade.routes.length === 1 && trade.routes[0].type === smartRouter.RouteType.MIXED,
    "Only allow single route mixed trade"
  );
  const [route] = trade.routes;
  const { inputAmount, outputAmount } = route;
  const amountIn = smartRouter.SmartRouter.maximumAmountIn(trade, options.slippageTolerance, inputAmount).quotient;
  const amountOut = smartRouter.SmartRouter.minimumAmountOut(trade, options.slippageTolerance, outputAmount).quotient;
  const recipient = routerMustCustody ? ROUTER_AS_RECIPIENT : sdk.validateAndParseAddress(options.recipient ?? SENDER_AS_RECIPIENT);
  const mixedRouteIsAllV3 = (r) => {
    return r.pools.every(smartRouter.SmartRouter.isV3Pool);
  };
  const mixedRouteIsAllV2 = (r) => {
    return r.pools.every(smartRouter.SmartRouter.isV2Pool);
  };
  const mixedRouteIsAllStable = (r) => {
    return r.pools.every(smartRouter.SmartRouter.isStablePool);
  };
  if (mixedRouteIsAllV3(route)) {
    addV3Swap(
      planner,
      {
        ...trade,
        routes: [
          {
            ...route,
            type: smartRouter.RouteType.V3
          }
        ],
        inputAmount,
        outputAmount
      },
      options,
      routerMustCustody,
      payerIsUser
    );
    return;
  }
  if (mixedRouteIsAllV2(route)) {
    addV2Swap(
      planner,
      {
        ...trade,
        routes: [
          {
            ...route,
            type: smartRouter.RouteType.V2
          }
        ],
        inputAmount,
        outputAmount
      },
      options,
      routerMustCustody,
      payerIsUser
    );
    return;
  }
  if (mixedRouteIsAllStable(route)) {
    addStableSwap(
      planner,
      {
        ...trade,
        routes: [
          {
            ...route,
            type: smartRouter.RouteType.STABLE
          }
        ],
        inputAmount,
        outputAmount
      },
      options,
      routerMustCustody,
      payerIsUser
    );
    return;
  }
  invariant__default.default(trade.tradeType === sdk.TradeType.EXACT_INPUT, "Exact output is not supported for mixed route trade");
  const sections = smartRouter.SmartRouter.partitionMixedRouteByProtocol(route);
  let outputToken;
  let inputToken = inputAmount.currency.wrapped;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const nextSection = sections[i + 1] ?? [];
    const isFirstSection = i === 0;
    const isLastSection = i === sections.length - 1;
    const nextIsV2 = nextSection.length && nextSection.every(smartRouter.SmartRouter.isV2Pool);
    const getRecipient = () => {
      if (isLastSection)
        return recipient;
      if (nextIsV2) {
        const address = smartRouter.getPoolAddress(nextSection[0]);
        if (!address)
          throw new Error("unknown v2 pool address");
        return address;
      }
      return ROUTER_AS_RECIPIENT;
    };
    const currentRecipient = getRecipient();
    outputToken = smartRouter.SmartRouter.getOutputOfPools(section, inputToken);
    const newRoute = smartRouter.SmartRouter.buildBaseRoute([...section], inputToken, outputToken);
    inputToken = outputToken.wrapped;
    const payByUser = payerIsUser && isFirstSection;
    const inAmount = isFirstSection ? amountIn : CONTRACT_BALANCE;
    const outAmount = isLastSection ? amountOut : 0n;
    switch (newRoute.type) {
      case smartRouter.RouteType.V3: {
        const path = smartRouter.SmartRouter.encodeMixedRouteToPath(newRoute, false);
        planner.addCommand(0 /* V3_SWAP_EXACT_IN */, [currentRecipient, inAmount, outAmount, path, payByUser]);
        break;
      }
      case smartRouter.RouteType.V2: {
        const path = newRoute.path.map((token) => token.wrapped.address);
        planner.addCommand(8 /* V2_SWAP_EXACT_IN */, [currentRecipient, inAmount, outAmount, path, payByUser]);
        break;
      }
      case smartRouter.RouteType.STABLE: {
        const path = newRoute.path.map((token) => token.wrapped.address);
        const flags = newRoute.pools.map((pool) => BigInt(pool.balances.length));
        planner.addCommand(34 /* STABLE_SWAP_EXACT_IN */, [
          currentRecipient,
          inAmount,
          outAmount,
          path,
          flags,
          payByUser
        ]);
        break;
      }
      default:
        throw new RangeError("Unexpected route type");
    }
  }
}
var REFUND_ETH_PRICE_IMPACT_THRESHOLD = new sdk.Percent(50, 100);
function riskOfPartialFill(trade) {
  return smartRouter.SmartRouter.getPriceImpact(trade).greaterThan(REFUND_ETH_PRICE_IMPACT_THRESHOLD);
}
function encodePermit(planner, permit2) {
  planner.addCommand(10 /* PERMIT2_PERMIT */, [permit2, permit2.signature]);
}
function encodeInputTokenOptions(planner, options) {
  if (!!options.approval && !!options.permit2Permit)
    invariant__default.default(options.approval.token === options.permit2Permit.details.token, `inconsistent token`);
  if (!!options.approval && !!options.permit2TransferFrom)
    invariant__default.default(options.approval.token === options.permit2TransferFrom.token, `inconsistent token`);
  if (!!options.permit2TransferFrom && !!options.permit2Permit)
    invariant__default.default(options.permit2TransferFrom.token === options.permit2Permit.details.token, `inconsistent token`);
  if (options.permit2Permit) {
    encodePermit(planner, options.permit2Permit);
  }
  if (options.permit2TransferFrom) {
    planner.addCommand(2 /* PERMIT2_TRANSFER_FROM */, [
      options.permit2TransferFrom.token,
      options.permit2TransferFrom.recipient ? options.permit2TransferFrom.recipient : ROUTER_AS_RECIPIENT,
      BigInt(options.permit2TransferFrom.amount)
    ]);
  }
}

// src/entities/protocols/unwrapWETH.ts
var UnwrapWETH = class {
  constructor(amount, chainId, permit2) {
    this.tradeType = "UnwrapWETH" /* UnwrapWETH */;
    this.wethAddress = sdk.WETH9[chainId].address;
    this.amount = amount;
    if (permit2) {
      invariant__default.default(
        permit2.details.token.toLowerCase() === this.wethAddress.toLowerCase(),
        `must be permitting WETH address: ${this.wethAddress}`
      );
      invariant__default.default(permit2.details.amount >= amount, `Did not permit enough WETH for unwrapWETH transaction`);
      this.permit2Data = permit2;
    }
  }
  encode(planner, _) {
    encodeInputTokenOptions(planner, {
      permit2Permit: this.permit2Data,
      permit2TransferFrom: {
        token: this.wethAddress,
        amount: this.amount.toString()
      }
    });
    planner.addCommand(12 /* UNWRAP_WETH */, [ROUTER_AS_RECIPIENT, BigInt(this.amount.toString())]);
  }
};

// src/abis/UniversalRouter.ts
var UniversalRouterABI = [
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "permit2",
            type: "address"
          },
          {
            internalType: "address",
            name: "weth9",
            type: "address"
          },
          {
            internalType: "address",
            name: "seaportV1_5",
            type: "address"
          },
          {
            internalType: "address",
            name: "seaportV1_4",
            type: "address"
          },
          {
            internalType: "address",
            name: "openseaConduit",
            type: "address"
          },
          {
            internalType: "address",
            name: "x2y2",
            type: "address"
          },
          {
            internalType: "address",
            name: "looksRareV2",
            type: "address"
          },
          {
            internalType: "address",
            name: "routerRewardsDistributor",
            type: "address"
          },
          {
            internalType: "address",
            name: "looksRareRewardsDistributor",
            type: "address"
          },
          {
            internalType: "address",
            name: "looksRareToken",
            type: "address"
          },
          {
            internalType: "address",
            name: "v2Factory",
            type: "address"
          },
          {
            internalType: "address",
            name: "v3Factory",
            type: "address"
          },
          {
            internalType: "address",
            name: "v3Deployer",
            type: "address"
          },
          {
            internalType: "bytes32",
            name: "v2InitCodeHash",
            type: "bytes32"
          },
          {
            internalType: "bytes32",
            name: "v3InitCodeHash",
            type: "bytes32"
          },
          {
            internalType: "address",
            name: "stableFactory",
            type: "address"
          },
          {
            internalType: "address",
            name: "stableInfo",
            type: "address"
          },
          {
            internalType: "address",
            name: "pancakeNFTMarket",
            type: "address"
          }
        ],
        internalType: "struct RouterParameters",
        name: "params",
        type: "tuple"
      }
    ],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    inputs: [],
    name: "BalanceTooLow",
    type: "error"
  },
  {
    inputs: [],
    name: "BuyPancakeNFTFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "BuyPunkFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "ContractLocked",
    type: "error"
  },
  {
    inputs: [],
    name: "ETHNotAccepted",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "commandIndex",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "message",
        type: "bytes"
      }
    ],
    name: "ExecutionFailed",
    type: "error"
  },
  {
    inputs: [],
    name: "FromAddressIsNotOwner",
    type: "error"
  },
  {
    inputs: [],
    name: "InsufficientETH",
    type: "error"
  },
  {
    inputs: [],
    name: "InsufficientToken",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidBips",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "commandType",
        type: "uint256"
      }
    ],
    name: "InvalidCommandType",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidOwnerERC1155",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidOwnerERC721",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidPath",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidPoolAddress",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidPoolLength",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidReserves",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSpender",
    type: "error"
  },
  {
    inputs: [],
    name: "LengthMismatch",
    type: "error"
  },
  {
    inputs: [],
    name: "SliceOutOfBounds",
    type: "error"
  },
  {
    inputs: [],
    name: "StableInvalidPath",
    type: "error"
  },
  {
    inputs: [],
    name: "StableTooLittleReceived",
    type: "error"
  },
  {
    inputs: [],
    name: "StableTooMuchRequested",
    type: "error"
  },
  {
    inputs: [],
    name: "TransactionDeadlinePassed",
    type: "error"
  },
  {
    inputs: [],
    name: "UnableToClaim",
    type: "error"
  },
  {
    inputs: [],
    name: "UnsafeCast",
    type: "error"
  },
  {
    inputs: [],
    name: "V2InvalidPath",
    type: "error"
  },
  {
    inputs: [],
    name: "V2TooLittleReceived",
    type: "error"
  },
  {
    inputs: [],
    name: "V2TooMuchRequested",
    type: "error"
  },
  {
    inputs: [],
    name: "V3InvalidAmountOut",
    type: "error"
  },
  {
    inputs: [],
    name: "V3InvalidCaller",
    type: "error"
  },
  {
    inputs: [],
    name: "V3InvalidSwap",
    type: "error"
  },
  {
    inputs: [],
    name: "V3TooLittleReceived",
    type: "error"
  },
  {
    inputs: [],
    name: "V3TooMuchRequested",
    type: "error"
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
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Paused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "RewardsSent",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "factory",
        type: "address"
      },
      {
        indexed: true,
        internalType: "address",
        name: "info",
        type: "address"
      }
    ],
    name: "SetStableSwap",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "account",
        type: "address"
      }
    ],
    name: "Unpaused",
    type: "event"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "looksRareClaim",
        type: "bytes"
      }
    ],
    name: "collectRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "commands",
        type: "bytes"
      },
      {
        internalType: "bytes[]",
        name: "inputs",
        type: "bytes[]"
      }
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "commands",
        type: "bytes"
      },
      {
        internalType: "bytes[]",
        name: "inputs",
        type: "bytes[]"
      },
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      }
    ],
    name: "execute",
    outputs: [],
    stateMutability: "payable",
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
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      },
      {
        internalType: "uint256[]",
        name: "",
        type: "uint256[]"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "onERC1155BatchReceived",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "pure",
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
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "onERC1155Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "pure",
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
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "onERC721Received",
    outputs: [
      {
        internalType: "bytes4",
        name: "",
        type: "bytes4"
      }
    ],
    stateMutability: "pure",
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
        internalType: "int256",
        name: "amount0Delta",
        type: "int256"
      },
      {
        internalType: "int256",
        name: "amount1Delta",
        type: "int256"
      },
      {
        internalType: "bytes",
        name: "data",
        type: "bytes"
      }
    ],
    name: "pancakeV3SwapCallback",
    outputs: [],
    stateMutability: "nonpayable",
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
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_factory",
        type: "address"
      },
      {
        internalType: "address",
        name: "_info",
        type: "address"
      }
    ],
    name: "setStableSwap",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "stableSwapFactory",
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
    name: "stableSwapInfo",
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
        internalType: "bytes4",
        name: "interfaceId",
        type: "bytes4"
      }
    ],
    name: "supportsInterface",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool"
      }
    ],
    stateMutability: "pure",
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
    name: "unpause",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    stateMutability: "payable",
    type: "receive"
  }
];

// src/swapRouter.ts
var PancakeSwapUniversalRouter = class {
  /**
   * Produces the on-chain method name to call and the hex encoded parameters to pass as arguments for a given trade.
   * @param trades to produce call parameters for
   * @param options options for the call parameters
   */
  static swapERC20CallParameters(trade, options) {
    const planner = new RoutePlanner();
    const tradeCommand = new PancakeSwapTrade(trade, options);
    const inputCurrency = tradeCommand.trade.inputAmount.currency;
    invariant__default.default(!(inputCurrency.isNative && !!options.inputTokenPermit), "NATIVE_INPUT_PERMIT");
    if (options.inputTokenPermit && typeof options.inputTokenPermit === "object") {
      encodePermit(planner, options.inputTokenPermit);
    }
    const nativeCurrencyValue = inputCurrency.isNative ? smartRouter.SmartRouter.maximumAmountIn(tradeCommand.trade, options.slippageTolerance, tradeCommand.trade.inputAmount).quotient : 0n;
    tradeCommand.encode(planner);
    return PancakeSwapUniversalRouter.encodePlan(planner, nativeCurrencyValue, {
      deadline: options.deadlineOrPreviousBlockhash ? BigInt(options.deadlineOrPreviousBlockhash.toString()) : void 0
    });
  }
  /**
   * Encodes a planned route into a method name and parameters for the Router contract.
   * @param planner the planned route
   * @param nativeCurrencyValue the native currency value of the planned route
   * @param config the router config
   */
  static encodePlan(planner, nativeCurrencyValue, config = {}) {
    const { commands, inputs } = planner;
    const calldata = config.deadline ? viem.encodeFunctionData({
      abi: UniversalRouterABI,
      args: [commands, inputs, BigInt(config.deadline)],
      functionName: "execute"
    }) : viem.encodeFunctionData({ abi: UniversalRouterABI, args: [commands, inputs], functionName: "execute" });
    return { calldata, value: viem.toHex(nativeCurrencyValue) };
  }
};

exports.PancakeSwapTrade = PancakeSwapTrade;
exports.PancakeSwapUniversalRouter = PancakeSwapUniversalRouter;
exports.ROUTER_AS_RECIPIENT = ROUTER_AS_RECIPIENT;
exports.RouterTradeType = RouterTradeType;
exports.UnwrapWETH = UnwrapWETH;
exports.getUniversalRouterAddress = getUniversalRouterAddress;
