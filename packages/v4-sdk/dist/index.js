'use strict';

var swapSdkCore = require('@pancakeswap/swap-sdk-core');
var invariant = require('tiny-invariant');
var viem = require('viem');
var v3Sdk = require('@pancakeswap/v3-sdk');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var invariant__default = /*#__PURE__*/_interopDefault(invariant);

// src/constants/binPool.ts
var SCALE_OFFSET = 128n;
var SCALE = 1n << SCALE_OFFSET;
var PRECISION = BigInt(1e18);
var SQUARED_PRECISION = BigInt(1e36);
var BASIS_POINT_MAX = 10000n;
var REAL_ID_SHIFT = 1n << 23n;

// src/constants/fee.ts
var ONE_HUNDRED_PERCENT_FEE = 1000000n;
var TEN_PERCENT_FEE = 100000n;
var MAX_PROTOCOL_FEE = 1000n;
var DYNAMIC_FEE_FLAG = 8388608;

// src/constants/index.ts
var MAX_TICK_SPACING = 32768n;
var MIN_TICK_SPACING = 1n;
var MIN_BIN_STEP = 1n;
var MAX_BIN_STEP = 100n;
var createBinPool = ({
  currencyA,
  currencyB,
  activeId,
  binStep,
  lpFee,
  protocolFees = [0n, 0n],
  lmPool,
  tree,
  reserveOfBin
}) => {
  invariant__default.default(Number.isInteger(lpFee) && BigInt(lpFee) >= 0 && BigInt(lpFee) <= TEN_PERCENT_FEE, "SWAP_FEE");
  invariant__default.default(
    protocolFees.every(
      (protocolFee) => Number.isInteger(protocolFee) && BigInt(protocolFee) >= 0 && BigInt(protocolFee) <= MAX_PROTOCOL_FEE
    ),
    "PROTOCOL_FEE"
  );
  invariant__default.default(Number.isInteger(binStep) && BigInt(binStep) >= MIN_BIN_STEP && BigInt(binStep) <= MAX_BIN_STEP, "BIN_STEP");
  invariant__default.default(Number.isInteger(activeId), "ACTIVE_ID");
  const [currencyX, currencyY] = swapSdkCore.sortCurrencies([currencyA, currencyB]);
  return {
    currencyX,
    currencyY,
    activeId: BigInt(activeId),
    binStep: BigInt(binStep),
    lpFee: BigInt(lpFee),
    protocolFees: [BigInt(protocolFees[0]), BigInt(protocolFees[1])],
    lmPool,
    reserveOfBin: reserveOfBin || {},
    tree
  };
};

// src/utils/calculateSwapFee.ts
var calculateSwapFee = (protocolFee, lpFee) => {
  return protocolFee + lpFee - protocolFee * lpFee / 1000000n;
};
var mulShiftRoundUp = (x, y, offset) => {
  let result = mulShiftRoundDown(x, y, offset);
  if (x * y % (1n << offset) !== 0n) {
    result++;
  }
  return result;
};
var mulShiftRoundDown = (x, y, offset) => {
  const [prod0, prod1] = _getMulProds(x, y);
  let result = 0n;
  if (prod0 !== 0n) {
    result = prod0 >> offset;
  }
  if (prod1 !== 0n) {
    invariant__default.default(offset < 1n << offset, "MUL_SHIFT_OVERFLOW");
    result += prod1 << 256n - offset;
  }
  return result;
};
var _getMulProds = (x, y) => {
  const mm = x * y % viem.maxUint256;
  const prod0 = x * y;
  const prod1 = mm - prod0 - (mm < prod0 ? 1n : 0n);
  return [prod0, prod1];
};
var shiftDivRoundDown = (x, offset, denominator) => {
  const prod0 = x << BigInt(offset);
  const prod1 = x >> 256n - BigInt(offset);
  return _getEndOfDivRoundDown(x, 1n << BigInt(offset), denominator, prod0, prod1);
};
var shiftDivRoundUp = (x, offset, denominator) => {
  let result = shiftDivRoundDown(x, offset, denominator);
  if (x * (1n << BigInt(offset)) % denominator !== 0n) {
    result++;
  }
  return result;
};
var _getEndOfDivRoundDown = (x, y, denominator, prod0, prod1) => {
  if (prod1 === 0n) {
    return prod0 / denominator;
  }
  invariant__default.default(prod1 < denominator, "MUL_DIV_OVERFLOW");
  const remainder = x * y % denominator;
  prod1 = prod1 - remainder > prod0 ? 1n : 0n;
  prod0 -= remainder;
  let lpotdod = denominator & ~denominator + 1n;
  denominator /= lpotdod;
  prod0 /= lpotdod;
  lpotdod = -lpotdod / lpotdod + 1n;
  prod0 |= prod1 * lpotdod;
  let inverse = 3n * denominator ^ 2n;
  let n = 0;
  while (n < 5) {
    inverse *= 2n - denominator * inverse;
    n++;
  }
  return prod0 * inverse;
};

// src/functions/bin/getFeeAmount.ts
var getFeeAmount = (amount, feeBips) => {
  const totalFee = feeBips * BigInt(1e12);
  const denominator = PRECISION - totalFee;
  return (amount * totalFee + denominator - 1n) / denominator;
};

// src/functions/bin/getFeeAmountFrom.ts
var getFeeAmountFrom = (amountWithFees, feeBips) => {
  const totalFee = feeBips * BigInt(1e12);
  return (amountWithFees * totalFee + PRECISION - 1n) / PRECISION;
};
var getBase = (binStep) => {
  return SCALE + (binStep << SCALE_OFFSET) / BASIS_POINT_MAX;
};
var Q128 = 2n ** 128n;
var Q20 = 2n ** 20n;
var getPriceFromId = (activeId, binStep) => {
  const base = getBase(binStep);
  let exponent = activeId - REAL_ID_SHIFT;
  let invert = false;
  if (exponent === 0n) {
    return SCALE;
  }
  if (exponent < 0n) {
    exponent = -exponent;
    invert = true;
  }
  invariant__default.default(exponent < Q20, "EXPONENT");
  let squared = base;
  let result = SCALE;
  if (base > viem.maxUint128) {
    squared = viem.maxUint256 / squared;
    invert = invert === false;
  }
  for (let i = 0; i < 20; i++) {
    if (exponent & 2n ** BigInt(i)) {
      result = result * squared / Q128;
    }
    squared = squared * squared / Q128;
  }
  return invert ? viem.maxUint256 / result : result;
};

// src/functions/bin/getAmounts.ts
var getAmounts = (binPool, swapForY, amountIn) => {
  let amountInWithFee = amountIn;
  let amountOutOfBin = 0n;
  let totalFee = 0n;
  const binReserves = binPool.reserveOfBin[Number(binPool.activeId)];
  const price = getPriceFromId(binPool.activeId, binPool.binStep);
  const binReserveOut = swapForY ? binReserves.reserveY : binReserves.reserveX;
  let maxAmountIn = swapForY ? shiftDivRoundUp(binReserveOut, SCALE_OFFSET, price) : mulShiftRoundUp(binReserveOut, price, SCALE_OFFSET);
  const protocolFee = binPool.protocolFees[swapForY ? 0 : 1];
  const swapFee = calculateSwapFee(protocolFee, binPool.lpFee);
  const maxFee = getFeeAmount(maxAmountIn, swapFee);
  maxAmountIn += maxFee;
  if (amountIn >= maxAmountIn) {
    totalFee = maxFee;
    amountInWithFee = maxAmountIn;
    amountOutOfBin = binReserveOut;
  } else {
    totalFee = getFeeAmountFrom(amountIn, swapFee);
    const amountsInWithoutFee = amountIn - totalFee;
    amountOutOfBin = swapForY ? mulShiftRoundDown(amountsInWithoutFee, price, SCALE_OFFSET) : shiftDivRoundDown(amountsInWithoutFee, SCALE_OFFSET, price);
    if (amountOutOfBin > binReserveOut) {
      amountOutOfBin = binReserveOut;
    }
  }
  return {
    amountsInWithFee: swapForY ? [amountInWithFee, 0n] : [0n, amountInWithFee],
    amountsOutOfBin: swapForY ? [0n, amountOutOfBin] : [amountOutOfBin, 0n],
    totalFees: swapForY ? [totalFee, 0n] : [0n, totalFee]
  };
};

// src/functions/bin/getExternalFeeAmt.ts
var getExternalFeeAmt = (amounts, protocolFees, swapFee) => {
  if (swapFee === 0n || protocolFees.every((fee) => fee === 0n)) {
    return [0n, 0n];
  }
  const [feeX, feeY] = protocolFees;
  const [amountX, amountY] = amounts;
  const feeXAmt = feeX === 0n ? 0n : amountX * feeX / swapFee;
  const feeYAmt = feeY === 0n ? 0n : amountY * feeY / swapFee;
  return [feeXAmt, feeYAmt];
};

// src/functions/bin/getIdFromPrice.ts
var getIdFromPrice = (price, binStep) => {
  return Math.trunc(Math.log(price) / Math.log(1 + binStep / 1e4)) + 2 ** 23;
};
var toHex32 = (value) => {
  return viem.toHex(BigInt(value) & viem.maxUint256, { size: 32 });
};
var contains = (tree, id) => {
  const key2 = Number(id >> 8n);
  const leaves = BigInt(tree.level2[key2] || "0");
  return (leaves & 1n << (id & viem.maxUint8)) !== 0n;
};
var add = (tree, id) => {
  const key2 = Number(id >> 8n);
  let leaves = BigInt(tree.level2[key2] || "0");
  const newLeaves = leaves | 1n << (id & viem.maxUint8);
  if (leaves !== newLeaves) {
    tree.level2[key2] = toHex32(newLeaves);
    if (leaves === 0n) {
      const key1 = Number(id >> 16n);
      leaves = BigInt(tree.level1[key1] || "0");
      tree.level1[key1] = toHex32(leaves | 1n << (BigInt(key2) & viem.maxUint8));
      if (leaves === 0n) {
        tree.level0 = toHex32(BigInt(tree.level0) | 1n << (BigInt(key1) & viem.maxUint8));
      }
    }
    return true;
  }
  return false;
};
var remove = (tree, id) => {
  const key2 = Number(id >> 8n);
  const leaves = BigInt(tree.level2[key2] || "0");
  let newLeaves = leaves & ~(1n << (id & viem.maxUint8));
  if (leaves !== newLeaves) {
    tree.level2[key2] = toHex32(newLeaves);
    if (newLeaves === 0n) {
      const key1 = Number(id >> 16n);
      newLeaves = BigInt(tree.level1[key1]) & ~(1n << (BigInt(key2) & viem.maxUint8));
      tree.level1[key1] = toHex32(newLeaves);
      if (newLeaves === 0n) {
        tree.level0 = toHex32(BigInt(tree.level0) & ~(1n << (BigInt(key1) & viem.maxUint8)));
      }
    }
    return true;
  }
  return false;
};
var mostSignificantBit = (value) => {
  return BigInt(BigInt(value).toString(2).length - 1);
};
var leastSignificantBit = (value = 0n) => {
  value = BigInt(value);
  if (value === 0n)
    return 255n;
  let bitPosition = 0n;
  while ((value & 1n) === 0n) {
    value >>= 1n;
    bitPosition++;
  }
  return bitPosition;
};
var closestBitLeft = (leaves, bit) => {
  bit += 1n;
  const l = BigInt(leaves) >> bit;
  return l === 0n ? viem.maxUint256 : leastSignificantBit(l) + bit;
};
var closestBitRight = (leaves, bit) => {
  const shift = 255n - (bit - 1n);
  const r = toHex32(BigInt(leaves) << shift);
  return BigInt(r) === 0n ? viem.maxUint256 : mostSignificantBit(r) - shift;
};
var findFirstRight = (tree, id) => {
  let leaves;
  let key2 = Number(id >> 8n);
  let bit = id & viem.maxUint8;
  if (bit !== 0n) {
    leaves = tree.level2[key2];
    const closestBit = closestBitRight(leaves, bit);
    if (closestBit !== viem.maxUint256) {
      return BigInt(key2) << 8n | closestBit;
    }
  }
  let key1 = Number(id >> 16n);
  bit = BigInt(key2) & viem.maxUint8;
  if (bit !== 0n) {
    leaves = tree.level1[key1];
    const closestBit = closestBitRight(leaves, bit);
    if (closestBit !== viem.maxUint256) {
      key2 = Number(BigInt(key1) << 8n | closestBit);
      leaves = tree.level2[key2];
      return BigInt(key2) << 8n | mostSignificantBit(leaves);
    }
  }
  bit = BigInt(key1) & viem.maxUint8;
  if (bit !== 0n) {
    leaves = tree.level0;
    const closestBit = closestBitRight(leaves, bit);
    if (closestBit !== viem.maxUint256) {
      key1 = Number(closestBit);
      leaves = tree.level1[key1];
      key2 = Number(BigInt(key1) << 8n | mostSignificantBit(leaves));
      leaves = tree.level2[key2];
      return BigInt(key2) << 8n | mostSignificantBit(leaves);
    }
  }
  return viem.maxUint24;
};
var findFirstLeft = (tree, id) => {
  let leaves;
  let key2 = Number(id >> 8n);
  let bit = id & viem.maxUint8;
  if (bit !== 255n) {
    leaves = tree.level2[key2];
    const closestBit = closestBitLeft(leaves, bit);
    if (closestBit !== viem.maxUint256) {
      return BigInt(key2) << 8n | closestBit;
    }
  }
  let key1 = Number(id >> 16n);
  bit = BigInt(key2) & viem.maxUint8;
  if (bit !== 255n) {
    leaves = tree.level1[key1];
    const closestBit = closestBitLeft(leaves, bit);
    if (closestBit !== viem.maxUint256) {
      key2 = Number(BigInt(key1) << 8n | closestBit);
      leaves = tree.level2[key2];
      return BigInt(key2) << 8n | leastSignificantBit(leaves);
    }
  }
  bit = BigInt(key1) & viem.maxUint8;
  if (bit !== 255n) {
    leaves = tree.level0;
    const closestBit = closestBitLeft(leaves, bit);
    if (closestBit !== viem.maxUint256) {
      key1 = Number(closestBit);
      leaves = tree.level1[key1] ?? "";
      key2 = Number(BigInt(key1) << 8n | leastSignificantBit(leaves));
      leaves = tree.level2[key2] ?? "";
      return BigInt(key2) << 8n | leastSignificantBit(leaves);
    }
  }
  return 0n;
};
var TreeMath = {
  contains,
  add,
  remove,
  findFirstLeft,
  findFirstRight
};

// src/functions/bin/getNextNonEmptyBin.ts
var getNextNonEmptyBin = (binPool, activeId, swapForY) => {
  invariant__default.default(binPool.tree, "EMPTY_BIN_POOL");
  return swapForY ? TreeMath.findFirstRight(binPool.tree, BigInt(activeId)) : TreeMath.findFirstLeft(binPool.tree, BigInt(activeId));
};
var swap = (binPool, amountIn, swapForY) => {
  invariant__default.default(amountIn > 0n, "INSUFFICIENT_AMOUNT_IN");
  const inside = swapForY ? "0" : "1";
  const outside = swapForY ? "1" : "0";
  const { protocolFees } = binPool;
  let { activeId } = binPool;
  let amountLeft = amountIn;
  let amountOut = 0n;
  let feeForProtocol = 0n;
  const swapFee = calculateSwapFee(protocolFees[swapForY ? 0 : 1], binPool.lpFee);
  while (true) {
    const binReserves = binPool.reserveOfBin[Number(activeId)];
    const binReserveTarget = swapForY ? binReserves.reserveY : binReserves.reserveX;
    if (binReserveTarget) {
      const { amountsInWithFee, amountsOutOfBin, totalFees } = getAmounts(
        { ...binPool, activeId },
        swapForY,
        amountLeft
      );
      if (amountsInWithFee[0] + amountsInWithFee[1] > 0n) {
        amountLeft -= amountsInWithFee[inside];
        amountOut += amountsOutOfBin[outside];
        const pFees = getExternalFeeAmt(totalFees, protocolFees, swapFee);
        feeForProtocol += pFees[inside];
        const amountInWithFee = amountsInWithFee[inside] - pFees[inside];
        binPool.reserveOfBin[Number(activeId)][`reserve${swapForY ? "X" : "Y"}`] += amountInWithFee;
        binPool.reserveOfBin[Number(activeId)][`reserve${swapForY ? "Y" : "X"}`] -= amountsOutOfBin[inside];
      }
    }
    if (amountLeft === 0n) {
      break;
    } else {
      const nextId = getNextNonEmptyBin(binPool, activeId, swapForY);
      if (nextId === 0n || nextId === viem.maxUint24) {
        throw new Error("OUT_OF_LIQUIDITY");
      }
      activeId = nextId;
    }
  }
  if (amountOut === 0n) {
    throw new Error("INSUFFICIENT_AMOUNT_OUT");
  }
  binPool.activeId = activeId;
  let result = [0n, 0n];
  const consumed = amountIn - amountLeft;
  result = swapForY ? [consumed, -amountOut] : [-amountOut, consumed];
  return {
    binPool,
    feeForProtocol,
    result
  };
};
var getSwapIn = (binPool, amountOut, swapForY) => {
  let id = binPool.activeId;
  let amountOutLeft = amountOut;
  let amountIn = 0n;
  let fee = 0n;
  const swapFee = calculateSwapFee(binPool.protocolFees[swapForY ? 0 : 1], binPool.lpFee);
  while (true) {
    const { reserveX, reserveY } = binPool.reserveOfBin[Number(id)];
    const reserve = swapForY ? reserveY : reserveX;
    if (reserve > 0n) {
      const price = getPriceFromId(id, binPool.binStep);
      const amountOutOfBin = reserve > amountOutLeft ? amountOutLeft : reserve;
      const amountInWithoutFee = swapForY ? shiftDivRoundUp(amountOutOfBin, SCALE_OFFSET, price) : mulShiftRoundUp(amountOutOfBin, price, SCALE_OFFSET);
      const feeAmount = getFeeAmount(amountInWithoutFee, swapFee);
      amountIn += amountInWithoutFee + feeAmount;
      amountOutLeft -= amountOutOfBin;
      fee += feeAmount;
    }
    if (amountOutLeft === 0n) {
      break;
    } else {
      const nextId = getNextNonEmptyBin(binPool, id, swapForY);
      if (nextId === 0n || nextId === viem.maxUint24)
        break;
      id = nextId;
    }
  }
  return {
    amountIn,
    fee,
    amountOutLeft
  };
};
var getSwapOut = (binPool, amountIn, swapForY) => {
  let id = binPool.activeId;
  let amountInLeft = amountIn;
  let amountOut = 0n;
  let fee = 0n;
  while (true) {
    const { reserveX, reserveY } = binPool.reserveOfBin[Number(id)];
    const reserve = swapForY ? reserveY : reserveX;
    if (reserve > 0n) {
      const { amountsInWithFee, amountsOutOfBin, totalFees } = getAmounts(
        {
          ...binPool,
          activeId: id
        },
        swapForY,
        amountInLeft
      );
      const inside = swapForY ? "0" : "1";
      const outside = swapForY ? "1" : "0";
      if (amountsInWithFee[inside] > 0) {
        amountInLeft -= amountsInWithFee[inside];
        amountOut += amountsOutOfBin[outside];
        fee += totalFees[inside];
      }
    }
    if (amountInLeft === 0n) {
      break;
    } else {
      const nextId = getNextNonEmptyBin(binPool, id, swapForY);
      if (nextId === 0n || nextId === viem.maxUint24)
        break;
      id = nextId;
    }
  }
  return {
    amountOut,
    fee,
    amountInLeft
  };
};

// src/abis/CLPoolManager.ts
var CLPoolManager = [
  {
    type: "constructor",
    inputs: [
      {
        name: "_vault",
        type: "address",
        internalType: "contract IVault"
      },
      {
        name: "controllerGasLimit",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "MAX_TICK_SPACING",
    inputs: [],
    outputs: [{ name: "", type: "int24", internalType: "int24" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "MIN_PROTOCOL_FEE_DENOMINATOR",
    inputs: [],
    outputs: [{ name: "", type: "uint8", internalType: "uint8" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "MIN_TICK_SPACING",
    inputs: [],
    outputs: [{ name: "", type: "int24", internalType: "int24" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "collectProtocolFees",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "currency", type: "address", internalType: "Currency" },
      { name: "amount", type: "uint256", internalType: "uint256" }
    ],
    outputs: [
      {
        name: "amountCollected",
        type: "uint256",
        internalType: "uint256"
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "donate",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          {
            name: "currency0",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "currency1",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "hooks",
            type: "address",
            internalType: "contract IHooks"
          },
          {
            name: "poolManager",
            type: "address",
            internalType: "contract IPoolManager"
          },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "amount0", type: "uint256", internalType: "uint256" },
      { name: "amount1", type: "uint256", internalType: "uint256" },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "delta", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "extsload",
    inputs: [{ name: "slot", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "val", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "extsload",
    inputs: [{ name: "slots", type: "bytes32[]", internalType: "bytes32[]" }],
    outputs: [{ name: "", type: "bytes32[]", internalType: "bytes32[]" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getLiquidity",
    inputs: [
      { name: "id", type: "bytes32", internalType: "PoolId" },
      { name: "_owner", type: "address", internalType: "address" },
      { name: "tickLower", type: "int24", internalType: "int24" },
      { name: "tickUpper", type: "int24", internalType: "int24" }
    ],
    outputs: [{ name: "liquidity", type: "uint128", internalType: "uint128" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getLiquidity",
    inputs: [{ name: "id", type: "bytes32", internalType: "PoolId" }],
    outputs: [{ name: "liquidity", type: "uint128", internalType: "uint128" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getLmPool",
    inputs: [{ name: "id", type: "bytes32", internalType: "PoolId" }],
    outputs: [{ name: "lmPool", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getPosition",
    inputs: [
      { name: "id", type: "bytes32", internalType: "PoolId" },
      { name: "owner", type: "address", internalType: "address" },
      { name: "tickLower", type: "int24", internalType: "int24" },
      { name: "tickUpper", type: "int24", internalType: "int24" }
    ],
    outputs: [
      {
        name: "position",
        type: "tuple",
        internalType: "struct CLPosition.Info",
        components: [
          { name: "liquidity", type: "uint128", internalType: "uint128" },
          {
            name: "feeGrowthInside0LastX128",
            type: "uint256",
            internalType: "uint256"
          },
          {
            name: "feeGrowthInside1LastX128",
            type: "uint256",
            internalType: "uint256"
          }
        ]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getSlot0",
    inputs: [{ name: "id", type: "bytes32", internalType: "PoolId" }],
    outputs: [
      { name: "sqrtPriceX96", type: "uint160", internalType: "uint160" },
      { name: "tick", type: "int24", internalType: "int24" },
      { name: "protocolFee", type: "uint16", internalType: "uint16" },
      { name: "swapFee", type: "uint24", internalType: "uint24" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          {
            name: "currency0",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "currency1",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "hooks",
            type: "address",
            internalType: "contract IHooks"
          },
          {
            name: "poolManager",
            type: "address",
            internalType: "contract IPoolManager"
          },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "sqrtPriceX96", type: "uint160", internalType: "uint160" },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "tick", type: "int24", internalType: "int24" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "masterChef",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "modifyLiquidity",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          {
            name: "currency0",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "currency1",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "hooks",
            type: "address",
            internalType: "contract IHooks"
          },
          {
            name: "poolManager",
            type: "address",
            internalType: "contract IPoolManager"
          },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      {
        name: "params",
        type: "tuple",
        internalType: "struct ICLPoolManager.ModifyLiquidityParams",
        components: [
          { name: "tickLower", type: "int24", internalType: "int24" },
          { name: "tickUpper", type: "int24", internalType: "int24" },
          {
            name: "liquidityDelta",
            type: "int256",
            internalType: "int256"
          }
        ]
      },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "delta", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "pools",
    inputs: [{ name: "id", type: "bytes32", internalType: "PoolId" }],
    outputs: [
      {
        name: "slot0",
        type: "tuple",
        internalType: "struct CLPool.Slot0",
        components: [
          {
            name: "sqrtPriceX96",
            type: "uint160",
            internalType: "uint160"
          },
          { name: "tick", type: "int24", internalType: "int24" },
          { name: "protocolFee", type: "uint16", internalType: "uint16" },
          { name: "swapFee", type: "uint24", internalType: "uint24" }
        ]
      },
      {
        name: "feeGrowthGlobal0X128",
        type: "uint256",
        internalType: "uint256"
      },
      {
        name: "feeGrowthGlobal1X128",
        type: "uint256",
        internalType: "uint256"
      },
      { name: "liquidity", type: "uint128", internalType: "uint128" },
      {
        name: "lmPool",
        type: "address",
        internalType: "contract ICLLmPool"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "protocolFeeController",
    inputs: [],
    outputs: [
      {
        name: "",
        type: "address",
        internalType: "contract IProtocolFeeController"
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "protocolFeesAccrued",
    inputs: [{ name: "currency", type: "address", internalType: "Currency" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "renounceOwnership",
    inputs: [],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setLmPool",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          {
            name: "currency0",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "currency1",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "hooks",
            type: "address",
            internalType: "contract IHooks"
          },
          {
            name: "poolManager",
            type: "address",
            internalType: "contract IPoolManager"
          },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "lmPool", type: "address", internalType: "address" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setMasterChef",
    inputs: [{ name: "_masterChef", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setProtocolFee",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          {
            name: "currency0",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "currency1",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "hooks",
            type: "address",
            internalType: "contract IHooks"
          },
          {
            name: "poolManager",
            type: "address",
            internalType: "contract IPoolManager"
          },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setProtocolFeeController",
    inputs: [
      {
        name: "controller",
        type: "address",
        internalType: "contract IProtocolFeeController"
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "swap",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          {
            name: "currency0",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "currency1",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "hooks",
            type: "address",
            internalType: "contract IHooks"
          },
          {
            name: "poolManager",
            type: "address",
            internalType: "contract IPoolManager"
          },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      {
        name: "params",
        type: "tuple",
        internalType: "struct ICLPoolManager.SwapParams",
        components: [
          { name: "zeroForOne", type: "bool", internalType: "bool" },
          {
            name: "amountSpecified",
            type: "int256",
            internalType: "int256"
          },
          {
            name: "sqrtPriceLimitX96",
            type: "uint160",
            internalType: "uint160"
          }
        ]
      },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "delta", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "updateDynamicSwapFee",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          {
            name: "currency0",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "currency1",
            type: "address",
            internalType: "Currency"
          },
          {
            name: "hooks",
            type: "address",
            internalType: "contract IHooks"
          },
          {
            name: "poolManager",
            type: "address",
            internalType: "contract IPoolManager"
          },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "vault",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IVault" }],
    stateMutability: "view"
  },
  {
    type: "event",
    name: "Donate",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "PoolId"
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "amount0",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      },
      {
        name: "amount1",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      },
      {
        name: "tick",
        type: "int24",
        indexed: false,
        internalType: "int24"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "DynamicSwapFeeUpdated",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "PoolId"
      },
      {
        name: "dynamicSwapFee",
        type: "uint24",
        indexed: false,
        internalType: "uint24"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Initialize",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "PoolId"
      },
      {
        name: "currency0",
        type: "address",
        indexed: true,
        internalType: "Currency"
      },
      {
        name: "currency1",
        type: "address",
        indexed: true,
        internalType: "Currency"
      },
      {
        name: "fee",
        type: "uint24",
        indexed: false,
        internalType: "uint24"
      },
      {
        name: "tickSpacing",
        type: "int24",
        indexed: false,
        internalType: "int24"
      },
      {
        name: "hooks",
        type: "address",
        indexed: false,
        internalType: "contract ICLHooks"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "ModifyLiquidity",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "PoolId"
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "tickLower",
        type: "int24",
        indexed: false,
        internalType: "int24"
      },
      {
        name: "tickUpper",
        type: "int24",
        indexed: false,
        internalType: "int24"
      },
      {
        name: "liquidityDelta",
        type: "int256",
        indexed: false,
        internalType: "int256"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      {
        name: "previousOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "newOwner",
        type: "address",
        indexed: true,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "ProtocolFeeControllerUpdated",
    inputs: [
      {
        name: "protocolFeeController",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "ProtocolFeeUpdated",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "PoolId"
      },
      {
        name: "protocolFee",
        type: "uint16",
        indexed: false,
        internalType: "uint16"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "SetLmPool",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "PoolId"
      },
      {
        name: "lmPool",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "SetMasterChef",
    inputs: [
      {
        name: "masterChef",
        type: "address",
        indexed: false,
        internalType: "address"
      }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Swap",
    inputs: [
      {
        name: "id",
        type: "bytes32",
        indexed: true,
        internalType: "PoolId"
      },
      {
        name: "sender",
        type: "address",
        indexed: true,
        internalType: "address"
      },
      {
        name: "amount0",
        type: "int128",
        indexed: false,
        internalType: "int128"
      },
      {
        name: "amount1",
        type: "int128",
        indexed: false,
        internalType: "int128"
      },
      {
        name: "sqrtPriceX96",
        type: "uint160",
        indexed: false,
        internalType: "uint160"
      },
      {
        name: "liquidity",
        type: "uint128",
        indexed: false,
        internalType: "uint128"
      },
      {
        name: "tick",
        type: "int24",
        indexed: false,
        internalType: "int24"
      },
      {
        name: "fee",
        type: "uint24",
        indexed: false,
        internalType: "uint24"
      },
      {
        name: "protocolFee",
        type: "uint256",
        indexed: false,
        internalType: "uint256"
      }
    ],
    anonymous: false
  },
  { type: "error", name: "CannotUpdateEmptyPosition", inputs: [] },
  { type: "error", name: "CurrenciesInitializedOutOfOrder", inputs: [] },
  { type: "error", name: "FeeNotDynamic", inputs: [] },
  { type: "error", name: "FeeTooLarge", inputs: [] },
  { type: "error", name: "HookConfigValidationError", inputs: [] },
  { type: "error", name: "InvalidHookResponse", inputs: [] },
  { type: "error", name: "InvalidPrice", inputs: [] },
  { type: "error", name: "InvalidPriceOrLiquidity", inputs: [] },
  { type: "error", name: "InvalidProtocolFeeCollector", inputs: [] },
  {
    type: "error",
    name: "InvalidSqrtPriceLimit",
    inputs: [
      {
        name: "sqrtPriceCurrentX96",
        type: "uint160",
        internalType: "uint160"
      },
      {
        name: "sqrtPriceLimitX96",
        type: "uint160",
        internalType: "uint160"
      }
    ]
  },
  { type: "error", name: "InvalidSqrtRatio", inputs: [] },
  { type: "error", name: "InvalidTick", inputs: [] },
  { type: "error", name: "NoLiquidityToReceiveFees", inputs: [] },
  { type: "error", name: "NoOpHookMissingBeforeCall", inputs: [] },
  { type: "error", name: "NotEnoughLiquidity", inputs: [] },
  { type: "error", name: "PoolAlreadyInitialized", inputs: [] },
  { type: "error", name: "PoolManagerMismatch", inputs: [] },
  { type: "error", name: "PoolNotInitialized", inputs: [] },
  { type: "error", name: "PoolNotInitialized", inputs: [] },
  { type: "error", name: "PriceOverflow", inputs: [] },
  { type: "error", name: "ProtocolFeeCannotBeFetched", inputs: [] },
  {
    type: "error",
    name: "ProtocolFeeControllerCallFailedOrInvalidResult",
    inputs: []
  },
  { type: "error", name: "SafeCastOverflow", inputs: [] },
  { type: "error", name: "SwapAmountCannotBeZero", inputs: [] },
  {
    type: "error",
    name: "TickLiquidityOverflow",
    inputs: [{ name: "tick", type: "int24", internalType: "int24" }]
  },
  {
    type: "error",
    name: "TickLowerOutOfBounds",
    inputs: [{ name: "tickLower", type: "int24", internalType: "int24" }]
  },
  {
    type: "error",
    name: "TickMisaligned",
    inputs: [
      { name: "tick", type: "int24", internalType: "int24" },
      { name: "tickSpacing", type: "int24", internalType: "int24" }
    ]
  },
  { type: "error", name: "TickSpacingTooLarge", inputs: [] },
  { type: "error", name: "TickSpacingTooSmall", inputs: [] },
  {
    type: "error",
    name: "TickUpperOutOfBounds",
    inputs: [{ name: "tickUpper", type: "int24", internalType: "int24" }]
  },
  {
    type: "error",
    name: "TicksMisordered",
    inputs: [
      { name: "tickLower", type: "int24", internalType: "int24" },
      { name: "tickUpper", type: "int24", internalType: "int24" }
    ]
  },
  { type: "error", name: "UnauthorizedCaller", inputs: [] }
];

// src/utils/convertBinIdsToRelative.ts
var convertBinIdsToRelative = (absoluteIds, activeId) => {
  return absoluteIds.map((id) => id - activeId);
};

// src/utils/encodeHooksRegistration.ts
var HOOKS_REGISTRATION_OFFSET = {
  beforeInitialize: 0,
  afterInitialize: 1,
  beforeAddLiquidity: 2,
  afterAddLiquidity: 3,
  beforeRemoveLiquidity: 4,
  afterRemoveLiquidity: 5,
  beforeSwap: 6,
  afterSwap: 7,
  beforeDonate: 8,
  afterDonate: 9
};
var encodeHooksRegistration = (hooksRegistration) => {
  let registration = 0;
  if (hooksRegistration) {
    for (const key in hooksRegistration) {
      if (hooksRegistration[key]) {
        registration |= 1 << HOOKS_REGISTRATION_OFFSET[key];
      }
    }
  }
  return `0x${registration.toString(16).padStart(4, "0")}`;
};
var encodeCLPoolParameters = (params) => {
  const hooks = encodeHooksRegistration(params?.hooksRegistration);
  const tickSpacing = viem.encodePacked(["int24"], [params.tickSpacing]);
  return viem.pad(viem.concat([tickSpacing, hooks]));
};
var encodeBinPoolParameters = (params) => {
  const hooks = encodeHooksRegistration(params?.hooksRegistration);
  const binStep = viem.encodePacked(["uint16"], [params.binStep]);
  return viem.pad(viem.concat([binStep, hooks]));
};
var encodePoolParameters = (params) => {
  if ("tickSpacing" in params) {
    return encodeCLPoolParameters(params);
  }
  return encodeBinPoolParameters(params);
};

// src/utils/encodePoolKey.ts
var encodePoolKey = (poolKey) => {
  return {
    ...poolKey,
    hooks: poolKey.hooks ?? viem.zeroAddress,
    parameters: encodePoolParameters(poolKey.parameters)
  };
};

// src/utils/getAddLiquidityParameters.ts
var getAddBinParams = ({
  poolKey,
  binIds,
  amount0,
  amount0Min = 0n,
  amount1,
  amount1Min = 0n,
  activeId,
  isSlippage = 0n,
  recipient,
  deadline
}) => {
  const { numBinY, numBinX } = binIds.reduce(
    (acc, id) => {
      if (id <= activeId)
        acc.numBinY += 1n;
      if (id >= activeId)
        acc.numBinX += 1n;
      return acc;
    },
    {
      numBinY: 0n,
      numBinX: 0n
    }
  );
  const { distributionX, distributionY } = binIds.reduce(
    (acc, id) => {
      acc.distributionX.push(id >= activeId && numBinX > 0 ? BigInt(1e18) / numBinX : 0n);
      acc.distributionY.push(id <= activeId && numBinY > 0 ? BigInt(1e18) / numBinY : 0n);
      return acc;
    },
    {
      distributionX: [],
      distributionY: []
    }
  );
  const params = {
    poolKey,
    amount0,
    amount1,
    amount0Min,
    amount1Min,
    isSlippage,
    activeIdDesired: activeId,
    deltaIds: convertBinIdsToRelative(binIds, activeId),
    distributionX,
    distributionY,
    to: recipient,
    deadline
  };
  return params;
};

// src/utils/getBinIds.ts
var getBinIds = (activeId, numBins, relative = false) => {
  let startId = activeId - numBins / 2n;
  const binIds = [];
  for (let index = 0; index < numBins; index++) {
    binIds.push(startId);
    startId++;
  }
  return relative ? convertBinIdsToRelative(binIds, activeId) : binIds;
};
var getPoolId = ({
  currency0,
  currency1,
  hooks = viem.zeroAddress,
  poolManager,
  fee,
  parameters
}) => {
  const poolParameter = encodePoolParameters(parameters);
  return viem.keccak256(
    viem.encodeAbiParameters(viem.parseAbiParameters("address, address, address, address, uint24, bytes32"), [
      currency0,
      currency1,
      hooks,
      poolManager,
      fee,
      poolParameter
    ])
  );
};

// src/functions/clamm/calldatas/swap.ts
var clPoolSwapCalldata = (poolKey, swapParams, hookData = "0x") => {
  return viem.encodeFunctionData({
    abi: CLPoolManager,
    functionName: "swap",
    args: [encodePoolKey(poolKey), swapParams, hookData]
  });
};

// src/abis/BinPoolManager.ts
var BinPoolManager = [
  {
    type: "constructor",
    inputs: [
      { name: "vault", type: "address", internalType: "contract IVault" },
      { name: "controllerGasLimit", type: "uint256", internalType: "uint256" }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "MAX_BIN_STEP",
    inputs: [],
    outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "MIN_BIN_STEP",
    inputs: [],
    outputs: [{ name: "", type: "uint16", internalType: "uint16" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "burn",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      {
        name: "params",
        type: "tuple",
        internalType: "struct IBinPoolManager.BurnParams",
        components: [
          { name: "ids", type: "uint256[]", internalType: "uint256[]" },
          { name: "amountsToBurn", type: "uint256[]", internalType: "uint256[]" },
          { name: "salt", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "delta", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "collectProtocolFees",
    inputs: [
      { name: "recipient", type: "address", internalType: "address" },
      { name: "currency", type: "address", internalType: "Currency" },
      { name: "amount", type: "uint256", internalType: "uint256" }
    ],
    outputs: [{ name: "amountCollected", type: "uint256", internalType: "uint256" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "donate",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "amount0", type: "uint128", internalType: "uint128" },
      { name: "amount1", type: "uint128", internalType: "uint128" },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [
      { name: "delta", type: "int256", internalType: "BalanceDelta" },
      { name: "binId", type: "uint24", internalType: "uint24" }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "extsload",
    inputs: [{ name: "slot", type: "bytes32", internalType: "bytes32" }],
    outputs: [{ name: "", type: "bytes32", internalType: "bytes32" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "extsload",
    inputs: [{ name: "slots", type: "bytes32[]", internalType: "bytes32[]" }],
    outputs: [{ name: "", type: "bytes32[]", internalType: "bytes32[]" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getBin",
    inputs: [
      { name: "id", type: "bytes32", internalType: "PoolId" },
      { name: "binId", type: "uint24", internalType: "uint24" }
    ],
    outputs: [
      { name: "binReserveX", type: "uint128", internalType: "uint128" },
      { name: "binReserveY", type: "uint128", internalType: "uint128" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getNextNonEmptyBin",
    inputs: [
      { name: "id", type: "bytes32", internalType: "PoolId" },
      { name: "swapForY", type: "bool", internalType: "bool" },
      { name: "binId", type: "uint24", internalType: "uint24" }
    ],
    outputs: [{ name: "nextId", type: "uint24", internalType: "uint24" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getPosition",
    inputs: [
      { name: "id", type: "bytes32", internalType: "PoolId" },
      { name: "owner", type: "address", internalType: "address" },
      { name: "binId", type: "uint24", internalType: "uint24" },
      { name: "salt", type: "bytes32", internalType: "bytes32" }
    ],
    outputs: [
      {
        name: "position",
        type: "tuple",
        internalType: "struct BinPosition.Info",
        components: [{ name: "share", type: "uint256", internalType: "uint256" }]
      }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getSlot0",
    inputs: [{ name: "id", type: "bytes32", internalType: "PoolId" }],
    outputs: [
      { name: "activeId", type: "uint24", internalType: "uint24" },
      { name: "protocolFee", type: "uint24", internalType: "uint24" },
      { name: "lpFee", type: "uint24", internalType: "uint24" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getSwapIn",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "swapForY", type: "bool", internalType: "bool" },
      { name: "amountOut", type: "uint128", internalType: "uint128" }
    ],
    outputs: [
      { name: "amountIn", type: "uint128", internalType: "uint128" },
      { name: "amountOutLeft", type: "uint128", internalType: "uint128" },
      { name: "fee", type: "uint128", internalType: "uint128" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "getSwapOut",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "swapForY", type: "bool", internalType: "bool" },
      { name: "amountIn", type: "uint128", internalType: "uint128" }
    ],
    outputs: [
      { name: "amountInLeft", type: "uint128", internalType: "uint128" },
      { name: "amountOut", type: "uint128", internalType: "uint128" },
      { name: "fee", type: "uint128", internalType: "uint128" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "grantPausableRole",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "hasPausableRole",
    inputs: [{ name: "", type: "address", internalType: "address" }],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "initialize",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "activeId", type: "uint24", internalType: "uint24" },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "mint",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      {
        name: "params",
        type: "tuple",
        internalType: "struct IBinPoolManager.MintParams",
        components: [
          { name: "liquidityConfigs", type: "bytes32[]", internalType: "bytes32[]" },
          { name: "amountIn", type: "bytes32", internalType: "bytes32" },
          { name: "salt", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [
      { name: "delta", type: "int256", internalType: "BalanceDelta" },
      {
        name: "mintArray",
        type: "tuple",
        internalType: "struct BinPool.MintArrays",
        components: [
          { name: "ids", type: "uint256[]", internalType: "uint256[]" },
          { name: "amounts", type: "bytes32[]", internalType: "bytes32[]" },
          { name: "liquidityMinted", type: "uint256[]", internalType: "uint256[]" }
        ]
      }
    ],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "owner",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "address" }],
    stateMutability: "view"
  },
  { type: "function", name: "pause", inputs: [], outputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "paused",
    inputs: [],
    outputs: [{ name: "", type: "bool", internalType: "bool" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "pools",
    inputs: [{ name: "id", type: "bytes32", internalType: "PoolId" }],
    outputs: [
      {
        name: "slot0",
        type: "tuple",
        internalType: "struct BinPool.Slot0",
        components: [
          { name: "activeId", type: "uint24", internalType: "uint24" },
          { name: "protocolFee", type: "uint24", internalType: "uint24" },
          { name: "lpFee", type: "uint24", internalType: "uint24" }
        ]
      },
      { name: "level0", type: "bytes32", internalType: "bytes32" }
    ],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "protocolFeeController",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IProtocolFeeController" }],
    stateMutability: "view"
  },
  {
    type: "function",
    name: "protocolFeesAccrued",
    inputs: [{ name: "currency", type: "address", internalType: "Currency" }],
    outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
    stateMutability: "view"
  },
  { type: "function", name: "renounceOwnership", inputs: [], outputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "revokePausableRole",
    inputs: [{ name: "account", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setMaxBinStep",
    inputs: [{ name: "maxBinStep", type: "uint16", internalType: "uint16" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setProtocolFee",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "newProtocolFee", type: "uint24", internalType: "uint24" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "setProtocolFeeController",
    inputs: [{ name: "controller", type: "address", internalType: "contract IProtocolFeeController" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "swap",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "swapForY", type: "bool", internalType: "bool" },
      { name: "amountIn", type: "uint128", internalType: "uint128" },
      { name: "hookData", type: "bytes", internalType: "bytes" }
    ],
    outputs: [{ name: "delta", type: "int256", internalType: "BalanceDelta" }],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "transferOwnership",
    inputs: [{ name: "newOwner", type: "address", internalType: "address" }],
    outputs: [],
    stateMutability: "nonpayable"
  },
  { type: "function", name: "unpause", inputs: [], outputs: [], stateMutability: "nonpayable" },
  {
    type: "function",
    name: "updateDynamicLPFee",
    inputs: [
      {
        name: "key",
        type: "tuple",
        internalType: "struct PoolKey",
        components: [
          { name: "currency0", type: "address", internalType: "Currency" },
          { name: "currency1", type: "address", internalType: "Currency" },
          { name: "hooks", type: "address", internalType: "contract IHooks" },
          { name: "poolManager", type: "address", internalType: "contract IPoolManager" },
          { name: "fee", type: "uint24", internalType: "uint24" },
          { name: "parameters", type: "bytes32", internalType: "bytes32" }
        ]
      },
      { name: "newDynamicLPFee", type: "uint24", internalType: "uint24" }
    ],
    outputs: [],
    stateMutability: "nonpayable"
  },
  {
    type: "function",
    name: "vault",
    inputs: [],
    outputs: [{ name: "", type: "address", internalType: "contract IVault" }],
    stateMutability: "view"
  },
  {
    type: "event",
    name: "Burn",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "PoolId" },
      { name: "sender", type: "address", indexed: true, internalType: "address" },
      { name: "ids", type: "uint256[]", indexed: false, internalType: "uint256[]" },
      { name: "salt", type: "bytes32", indexed: false, internalType: "bytes32" },
      { name: "amounts", type: "bytes32[]", indexed: false, internalType: "bytes32[]" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Donate",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "PoolId" },
      { name: "sender", type: "address", indexed: true, internalType: "address" },
      { name: "amount0", type: "int128", indexed: false, internalType: "int128" },
      { name: "amount1", type: "int128", indexed: false, internalType: "int128" },
      { name: "binId", type: "uint24", indexed: false, internalType: "uint24" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "DynamicLPFeeUpdated",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "PoolId" },
      { name: "dynamicLPFee", type: "uint24", indexed: false, internalType: "uint24" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Initialize",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "PoolId" },
      { name: "currency0", type: "address", indexed: true, internalType: "Currency" },
      { name: "currency1", type: "address", indexed: true, internalType: "Currency" },
      { name: "fee", type: "uint24", indexed: false, internalType: "uint24" },
      { name: "binStep", type: "uint16", indexed: false, internalType: "uint16" },
      { name: "hooks", type: "address", indexed: false, internalType: "contract IHooks" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Mint",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "PoolId" },
      { name: "sender", type: "address", indexed: true, internalType: "address" },
      { name: "ids", type: "uint256[]", indexed: false, internalType: "uint256[]" },
      { name: "salt", type: "bytes32", indexed: false, internalType: "bytes32" },
      { name: "amounts", type: "bytes32[]", indexed: false, internalType: "bytes32[]" },
      { name: "compositionFee", type: "bytes32", indexed: false, internalType: "bytes32" },
      { name: "pFee", type: "bytes32", indexed: false, internalType: "bytes32" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "OwnershipTransferred",
    inputs: [
      { name: "previousOwner", type: "address", indexed: true, internalType: "address" },
      { name: "newOwner", type: "address", indexed: true, internalType: "address" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "PausableRoleGranted",
    inputs: [{ name: "account", type: "address", indexed: true, internalType: "address" }],
    anonymous: false
  },
  {
    type: "event",
    name: "PausableRoleRevoked",
    inputs: [{ name: "account", type: "address", indexed: true, internalType: "address" }],
    anonymous: false
  },
  {
    type: "event",
    name: "Paused",
    inputs: [{ name: "account", type: "address", indexed: false, internalType: "address" }],
    anonymous: false
  },
  {
    type: "event",
    name: "ProtocolFeeControllerUpdated",
    inputs: [{ name: "protocolFeeController", type: "address", indexed: false, internalType: "address" }],
    anonymous: false
  },
  {
    type: "event",
    name: "ProtocolFeeUpdated",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "PoolId" },
      { name: "protocolFee", type: "uint24", indexed: false, internalType: "uint24" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "SetMaxBinStep",
    inputs: [{ name: "maxBinStep", type: "uint16", indexed: false, internalType: "uint16" }],
    anonymous: false
  },
  {
    type: "event",
    name: "Swap",
    inputs: [
      { name: "id", type: "bytes32", indexed: true, internalType: "PoolId" },
      { name: "sender", type: "address", indexed: true, internalType: "address" },
      { name: "amount0", type: "int128", indexed: false, internalType: "int128" },
      { name: "amount1", type: "int128", indexed: false, internalType: "int128" },
      { name: "activeId", type: "uint24", indexed: false, internalType: "uint24" },
      { name: "fee", type: "uint24", indexed: false, internalType: "uint24" },
      { name: "protocolFee", type: "uint24", indexed: false, internalType: "uint24" }
    ],
    anonymous: false
  },
  {
    type: "event",
    name: "Unpaused",
    inputs: [{ name: "account", type: "address", indexed: false, internalType: "address" }],
    anonymous: false
  },
  {
    type: "error",
    name: "BinHelper__CompositionFactorFlawed",
    inputs: [{ name: "id", type: "uint24", internalType: "uint24" }]
  },
  { type: "error", name: "BinPool__BurnZeroAmount", inputs: [{ name: "id", type: "uint24", internalType: "uint24" }] },
  { type: "error", name: "BinPool__EmptyLiquidityConfigs", inputs: [] },
  { type: "error", name: "BinPool__InsufficientAmountOut", inputs: [] },
  { type: "error", name: "BinPool__InvalidBurnInput", inputs: [] },
  { type: "error", name: "BinPool__NoLiquidityToReceiveFees", inputs: [] },
  { type: "error", name: "BinPool__ZeroAmountsOut", inputs: [{ name: "id", type: "uint24", internalType: "uint24" }] },
  { type: "error", name: "BinPool__ZeroShares", inputs: [{ name: "id", type: "uint24", internalType: "uint24" }] },
  { type: "error", name: "BinStepTooLarge", inputs: [] },
  { type: "error", name: "BinStepTooSmall", inputs: [] },
  { type: "error", name: "CurrenciesInitializedOutOfOrder", inputs: [] },
  { type: "error", name: "FeeTooLarge", inputs: [] },
  { type: "error", name: "FeeTooLarge", inputs: [] },
  { type: "error", name: "HookConfigValidationError", inputs: [] },
  { type: "error", name: "HookPermissionsValidationError", inputs: [] },
  { type: "error", name: "InsufficientAmountIn", inputs: [] },
  { type: "error", name: "InvalidCaller", inputs: [] },
  { type: "error", name: "InvalidHookResponse", inputs: [] },
  { type: "error", name: "LiquidityConfigurations__InvalidConfig", inputs: [] },
  {
    type: "error",
    name: "MaxBinStepTooSmall",
    inputs: [{ name: "maxBinStep", type: "uint16", internalType: "uint16" }]
  },
  { type: "error", name: "NoPausableRole", inputs: [] },
  { type: "error", name: "PackedUint128Math__AddOverflow", inputs: [] },
  { type: "error", name: "PackedUint128Math__SubUnderflow", inputs: [] },
  { type: "error", name: "PoolAlreadyInitialized", inputs: [] },
  { type: "error", name: "PoolManagerMismatch", inputs: [] },
  { type: "error", name: "PoolNotInitialized", inputs: [] },
  { type: "error", name: "ProtocolFeeCannotBeFetched", inputs: [] },
  {
    type: "error",
    name: "Uint128x128Math__PowUnderflow",
    inputs: [
      { name: "x", type: "uint256", internalType: "uint256" },
      { name: "y", type: "int256", internalType: "int256" }
    ]
  },
  { type: "error", name: "Uint256x256Math__MulDivOverflow", inputs: [] },
  { type: "error", name: "Uint256x256Math__MulShiftOverflow", inputs: [] },
  { type: "error", name: "UnauthorizedDynamicLPFeeUpdate", inputs: [] },
  { type: "error", name: "UnusedBitsNonZero", inputs: [] }
];

Object.defineProperty(exports, 'createCLPool', {
  enumerable: true,
  get: function () { return v3Sdk.getPool; }
});
Object.defineProperty(exports, 'getInputAmount', {
  enumerable: true,
  get: function () { return v3Sdk.getInputAmount; }
});
Object.defineProperty(exports, 'getOutputAmount', {
  enumerable: true,
  get: function () { return v3Sdk.getOutputAmount; }
});
exports.BASIS_POINT_MAX = BASIS_POINT_MAX;
exports.BinPoolManager = BinPoolManager;
exports.CLPoolManager = CLPoolManager;
exports.DYNAMIC_FEE_FLAG = DYNAMIC_FEE_FLAG;
exports.MAX_BIN_STEP = MAX_BIN_STEP;
exports.MAX_PROTOCOL_FEE = MAX_PROTOCOL_FEE;
exports.MAX_TICK_SPACING = MAX_TICK_SPACING;
exports.MIN_BIN_STEP = MIN_BIN_STEP;
exports.MIN_TICK_SPACING = MIN_TICK_SPACING;
exports.ONE_HUNDRED_PERCENT_FEE = ONE_HUNDRED_PERCENT_FEE;
exports.PRECISION = PRECISION;
exports.REAL_ID_SHIFT = REAL_ID_SHIFT;
exports.SCALE = SCALE;
exports.SCALE_OFFSET = SCALE_OFFSET;
exports.SQUARED_PRECISION = SQUARED_PRECISION;
exports.TEN_PERCENT_FEE = TEN_PERCENT_FEE;
exports.TreeMath = TreeMath;
exports.clPoolSwapCalldata = clPoolSwapCalldata;
exports.convertBinIdsToRelative = convertBinIdsToRelative;
exports.createBinPool = createBinPool;
exports.encodeBinPoolParameters = encodeBinPoolParameters;
exports.encodeCLPoolParameters = encodeCLPoolParameters;
exports.encodeHooksRegistration = encodeHooksRegistration;
exports.encodePoolKey = encodePoolKey;
exports.encodePoolParameters = encodePoolParameters;
exports.getAddBinParams = getAddBinParams;
exports.getAmounts = getAmounts;
exports.getBinIds = getBinIds;
exports.getExternalFeeAmt = getExternalFeeAmt;
exports.getFeeAmount = getFeeAmount;
exports.getFeeAmountFrom = getFeeAmountFrom;
exports.getIdFromPrice = getIdFromPrice;
exports.getNextNonEmptyBin = getNextNonEmptyBin;
exports.getPoolId = getPoolId;
exports.getPriceFromId = getPriceFromId;
exports.getSwapIn = getSwapIn;
exports.getSwapOut = getSwapOut;
exports.mulShiftRoundDown = mulShiftRoundDown;
exports.mulShiftRoundUp = mulShiftRoundUp;
exports.shiftDivRoundDown = shiftDivRoundDown;
exports.shiftDivRoundUp = shiftDivRoundUp;
exports.swap = swap;
