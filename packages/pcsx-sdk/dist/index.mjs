import { ChainId } from '@pancakeswap/chains';
import { getPermit2Address, SignatureTransfer, Permit2ABI } from '@pancakeswap/permit2-sdk';
import { parseAbiParameters, decodeAbiParameters, encodeAbiParameters, getContract, recoverAddress, keccak256, toHex, zeroAddress } from 'viem';
import { CurrencyAmount, Price } from '@pancakeswap/swap-sdk-core';
import dayjs from 'dayjs';

// src/constants.ts
var SupportedChainId = [
  ChainId.BSC,
  ChainId.BSC_TESTNET,
  ChainId.SEPOLIA,
  ChainId.ARBITRUM_ONE,
  ChainId.ETHEREUM
];
var PERMIT2_MAPPING = {
  [ChainId.BSC]: getPermit2Address(ChainId.BSC),
  [ChainId.BSC_TESTNET]: getPermit2Address(ChainId.BSC_TESTNET),
  [ChainId.SEPOLIA]: getPermit2Address(ChainId.SEPOLIA),
  [ChainId.ARBITRUM_ONE]: getPermit2Address(ChainId.ARBITRUM_ONE),
  [ChainId.ETHEREUM]: getPermit2Address(ChainId.ETHEREUM)
};
var ORDER_QUOTER_MAPPING = {
  [ChainId.BSC]: "0x369B57fE0Fab4d5a110e4F02b871979DE0300C18",
  [ChainId.BSC_TESTNET]: "0x6f73C295E70Cd87307dD73c4730c685Bb977bB70",
  [ChainId.SEPOLIA]: "0x180415ddfBeD6bf9a6C0fcE0EB23DE60B0157f58",
  [ChainId.ARBITRUM_ONE]: "0xF812A85c70b05Df76ff3bC802c0244307033Ccd0",
  [ChainId.ETHEREUM]: "0xF812A85c70b05Df76ff3bC802c0244307033Ccd0"
};
var OrderType = /* @__PURE__ */ ((OrderType2) => {
  OrderType2["ExclusiveDutchOrder"] = "ExclusiveDutchOrder";
  return OrderType2;
})(OrderType || {});
var REACTOR_ADDRESS_MAPPING = {
  [ChainId.BSC]: {
    ["ExclusiveDutchOrder" /* ExclusiveDutchOrder */]: "0xDB9D365b50E62fce747A90515D2bd1254A16EbB9"
  },
  [ChainId.BSC_TESTNET]: {
    ["ExclusiveDutchOrder" /* ExclusiveDutchOrder */]: "0xCfe2a565072f85381775Eb12644d297bf0F66773"
  },
  [ChainId.SEPOLIA]: {
    ["ExclusiveDutchOrder" /* ExclusiveDutchOrder */]: "0xbfCC755375250C1EA9722EB1B8d97076f681627C"
  },
  [ChainId.ARBITRUM_ONE]: {
    ["ExclusiveDutchOrder" /* ExclusiveDutchOrder */]: "0x35db01D1425685789dCc9228d47C7A5C049388d8"
  },
  [ChainId.ETHEREUM]: {
    ["ExclusiveDutchOrder" /* ExclusiveDutchOrder */]: "0x35db01D1425685789dCc9228d47C7A5C049388d8"
  }
};

// src/errors.ts
var MissingConfiguration = class extends Error {
  constructor(key, value) {
    super(`Missing configuration for ${key}: ${value}`);
    Object.setPrototypeOf(this, MissingConfiguration.prototype);
  }
};
var OrderValidation = /* @__PURE__ */ ((OrderValidation2) => {
  OrderValidation2[OrderValidation2["Expired"] = 0] = "Expired";
  OrderValidation2[OrderValidation2["NonceUsed"] = 1] = "NonceUsed";
  OrderValidation2[OrderValidation2["InsufficientFunds"] = 2] = "InsufficientFunds";
  OrderValidation2[OrderValidation2["InvalidSignature"] = 3] = "InvalidSignature";
  OrderValidation2[OrderValidation2["DeadlineBeforeEndTime"] = 4] = "DeadlineBeforeEndTime";
  OrderValidation2[OrderValidation2["InvalidReactor"] = 5] = "InvalidReactor";
  OrderValidation2[OrderValidation2["InputAndOutputDecay"] = 6] = "InputAndOutputDecay";
  OrderValidation2[OrderValidation2["IncorrectAmounts"] = 7] = "IncorrectAmounts";
  OrderValidation2[OrderValidation2["EndTimeBeforeStartTime"] = 8] = "EndTimeBeforeStartTime";
  OrderValidation2[OrderValidation2["OrderEndTimeBeforeStartTime"] = 9] = "OrderEndTimeBeforeStartTime";
  OrderValidation2[OrderValidation2["UnknownError"] = 10] = "UnknownError";
  OrderValidation2[OrderValidation2["ValidationFailed"] = 11] = "ValidationFailed";
  OrderValidation2[OrderValidation2["ExclusivityPeriod"] = 12] = "ExclusivityPeriod";
  OrderValidation2[OrderValidation2["NotSupportedChain"] = 13] = "NotSupportedChain";
  OrderValidation2[OrderValidation2["OK"] = 14] = "OK";
  return OrderValidation2;
})(OrderValidation || {});
var BASIC_ERROR = "0x08c379a0";
var KNOWN_ERRORS = {
  // "8baa579f": OrderValidation.InvalidSignature,
  // Base Reactor InvalidSigner
  "815e1d64": 3 /* InvalidSignature */,
  // Base Reactor InvalidNonce
  "756688fe": 1 /* NonceUsed */,
  // invalid dutch decay time
  // "302e5b7c": OrderValidation.InvalidOrderFields,
  // Dutch Order Reactor DeadlineBeforeEndTime
  "773a6187": 4 /* DeadlineBeforeEndTime */,
  // Resolved Order Lib InvalidReactor
  "4ddf4a64": 5 /* InvalidReactor */,
  // Dutch Order Reactor InputAndOutputDecay
  d303758b: 6 /* InputAndOutputDecay */,
  // Dutch Decay Lib IncorrectAmounts
  "7c1f8113": 7 /* IncorrectAmounts */,
  // Dutch Decay Lib EndTimeBeforeStartTime
  "43133453": 8 /* EndTimeBeforeStartTime */,
  // Exclusive Dutch Order Reactor OrderEndTimeBeforeStartTime
  "48fee69c": 9 /* OrderEndTimeBeforeStartTime */,
  // Resolved Order Lib DeadlinePassed
  "70f65caa": 0 /* Expired */,
  // ee3b3d4b: OrderValidation.NonceUsed,
  // "0a0b0d79": OrderValidation.ValidationFailed,
  // Exclusitivity Override Lib NoExclusiveOverride
  b9ec1e96: 12 /* ExclusivityPeriod */,
  // "062dec56": OrderValidation.ExclusivityPeriod,
  // Exclusive Filler Validation NotExclusiveFiller
  "75c1bb14": 12 /* ExclusivityPeriod */,
  // Usually did not approve permit2
  TRANSFER_FROM_FAILED: 2 /* InsufficientFunds */
};
function hashStruct({
  data,
  primaryType,
  types
}) {
  const encoded = encodeData({
    data,
    primaryType,
    types
  });
  return keccak256(encoded);
}
function encodeData({
  data,
  primaryType,
  types
}) {
  const encodedTypes = [{ type: "bytes32" }];
  const encodedValues = [hashType({ primaryType, types })];
  for (const field of types[primaryType]) {
    const [type, value] = encodeField({
      types,
      name: field.name,
      type: field.type,
      value: data[field.name]
    });
    encodedTypes.push(type);
    encodedValues.push(value);
  }
  return encodeAbiParameters(encodedTypes, encodedValues);
}
function encodeField({
  types,
  name,
  type,
  value
}) {
  if (types[type] !== void 0) {
    return [{ type: "bytes32" }, keccak256(encodeData({ data: value, primaryType: type, types }))];
  }
  if (type === "bytes") {
    const prepend = value.length % 2 ? "0" : "";
    value = `0x${prepend + value.slice(2)}`;
    return [{ type: "bytes32" }, keccak256(value)];
  }
  if (type === "string")
    return [{ type: "bytes32" }, keccak256(toHex(value))];
  if (type.lastIndexOf("]") === type.length - 1) {
    const parsedType = type.slice(0, type.lastIndexOf("["));
    const typeValuePairs = value.map(
      (item) => encodeField({
        name,
        type: parsedType,
        types,
        value: item
      })
    );
    return [
      { type: "bytes32" },
      keccak256(
        encodeAbiParameters(
          typeValuePairs.map(([t]) => t),
          typeValuePairs.map(([, v]) => v)
        )
      )
    ];
  }
  return [{ type }, value];
}
function hashType({ primaryType, types }) {
  const encodedHashType = toHex(encodeType({ primaryType, types }));
  return keccak256(encodedHashType);
}
function encodeType({ primaryType, types }) {
  let result = "";
  const unsortedDeps = findTypeDependencies({ primaryType, types });
  unsortedDeps.delete(primaryType);
  const deps = [primaryType, ...Array.from(unsortedDeps).sort()];
  for (const type of deps) {
    result += `${type}(${types[type].map(({ name, type: t }) => `${t} ${name}`).join(",")})`;
  }
  return result;
}
function findTypeDependencies({
  primaryType: primaryType_,
  types
}, results = /* @__PURE__ */ new Set()) {
  const match = primaryType_.match(/^\w*/u);
  const primaryType = match?.[0];
  if (results.has(primaryType) || types[primaryType] === void 0) {
    return results;
  }
  results.add(primaryType);
  for (const field of types[primaryType]) {
    findTypeDependencies({ primaryType: field.type, types }, results);
  }
  return results;
}

// src/orders/Order.ts
var OrderInfoStruct = "struct OrderInfo {address reactor; address swapper; uint256 nonce; uint256 deadline; address additionalValidationContract; bytes additionalValidationData; }";
var Order = class {
  // /**
  //  * Returns the resolved order with the given options
  //  * @return The resolved order
  //  */
  // abstract resolve(options: OrderResolutionOptions): ResolvedOrder;
  //
  // /**
  //  * Returns the parsed validation
  //  * @return The parsed validation data for the order
  //  */
  // get validation(): CustomOrderValidation {
  //     return parseValidation(this.info);
  // }
};

// src/orders/ExclusiveDutchOrder.ts
var EXCLUSIVE_DUTCH_ORDER_TYPES = {
  ExclusiveDutchOrder: [
    { name: "info", type: "OrderInfo" },
    { name: "decayStartTime", type: "uint256" },
    { name: "decayEndTime", type: "uint256" },
    { name: "exclusiveFiller", type: "address" },
    { name: "exclusivityOverrideBps", type: "uint256" },
    { name: "inputToken", type: "address" },
    { name: "inputStartAmount", type: "uint256" },
    { name: "inputEndAmount", type: "uint256" },
    { name: "outputs", type: "DutchOutput[]" }
  ],
  OrderInfo: [
    { name: "reactor", type: "address" },
    { name: "swapper", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" },
    { name: "additionalValidationContract", type: "address" },
    { name: "additionalValidationData", type: "bytes" }
  ],
  DutchOutput: [
    { name: "token", type: "address" },
    { name: "startAmount", type: "uint256" },
    { name: "endAmount", type: "uint256" },
    { name: "recipient", type: "address" }
  ]
};
var EXCLUSIVE_DUTCH_ORDER_ABI = parseAbiParameters([
  "((address,address,uint256,uint256,address,bytes),uint256,uint256,address,uint256,(address,uint256,uint256),(address,uint256,uint256,address)[])"
]);
var ExclusiveDutchOrder = class extends Order {
  constructor(info, chainId, _permit2Address) {
    super();
    this.info = info;
    this.chainId = chainId;
    this._permit2Address = _permit2Address;
    if (_permit2Address) {
      this.permit2Address = _permit2Address;
    } else if (PERMIT2_MAPPING[chainId]) {
      this.permit2Address = PERMIT2_MAPPING[chainId];
    } else {
      throw new MissingConfiguration("permit2", chainId.toString());
    }
  }
  static fromJSON(info, chainId, _permit2Address) {
    return new ExclusiveDutchOrder(
      {
        ...info,
        nonce: BigInt(info.nonce),
        deadline: BigInt(info.deadline),
        decayStartTime: BigInt(info.decayStartTime),
        decayEndTime: BigInt(info.decayEndTime),
        exclusivityOverrideBps: BigInt(info.exclusivityOverrideBps)
      },
      chainId,
      _permit2Address
    );
  }
  static parse(encoded, chainId) {
    const decoded = decodeAbiParameters(EXCLUSIVE_DUTCH_ORDER_ABI, encoded);
    const [
      [
        [reactor, swapper, nonce, deadline, additionalValidationContract, additionalValidationData],
        decayStartTime,
        decayEndTime,
        exclusiveFiller,
        exclusivityOverrideBps,
        [inputToken, inputStartAmount, inputEndAmount],
        outputs
      ]
    ] = decoded;
    return new ExclusiveDutchOrder(
      {
        reactor,
        swapper,
        nonce,
        deadline,
        additionalValidationContract,
        additionalValidationData,
        decayStartTime,
        decayEndTime,
        exclusiveFiller,
        exclusivityOverrideBps,
        input: {
          token: inputToken,
          startAmount: inputStartAmount,
          endAmount: inputEndAmount
        },
        outputs: outputs.map(([token, startAmount, endAmount, recipient]) => {
          return {
            token,
            startAmount,
            endAmount,
            recipient
          };
        })
      },
      chainId
    );
  }
  /**
   * @inheritdoc order
   */
  encode() {
    return encodeAbiParameters(EXCLUSIVE_DUTCH_ORDER_ABI, [
      [
        [
          this.info.reactor,
          this.info.swapper,
          this.info.nonce,
          this.info.deadline,
          this.info.additionalValidationContract,
          this.info.additionalValidationData
        ],
        this.info.decayStartTime,
        this.info.decayEndTime,
        this.info.exclusiveFiller,
        this.info.exclusivityOverrideBps,
        [this.info.input.token, this.info.input.startAmount, this.info.input.endAmount],
        this.info.outputs.map(
          (output) => [output.token, output.startAmount, output.endAmount, output.recipient]
        )
      ]
    ]);
  }
  hash() {
    return hashStruct({
      data: this.witnessInfo(),
      types: EXCLUSIVE_DUTCH_ORDER_TYPES,
      primaryType: "ExclusiveDutchOrder"
    });
  }
  /**
   * @inheritdoc Order
   */
  permitData() {
    return SignatureTransfer.getPermitData(
      this.toPermit(),
      this.permit2Address,
      this.chainId,
      this.witness()
    );
  }
  toPermit() {
    return {
      permitted: {
        token: this.info.input.token,
        amount: this.info.input.endAmount
      },
      spender: this.info.reactor,
      nonce: this.info.nonce,
      deadline: this.info.deadline
    };
  }
  witnessInfo() {
    return {
      info: {
        reactor: this.info.reactor,
        swapper: this.info.swapper,
        nonce: this.info.nonce,
        deadline: this.info.deadline,
        additionalValidationContract: this.info.additionalValidationContract,
        additionalValidationData: this.info.additionalValidationData
      },
      decayStartTime: this.info.decayStartTime,
      decayEndTime: this.info.decayEndTime,
      exclusiveFiller: this.info.exclusiveFiller,
      exclusivityOverrideBps: this.info.exclusivityOverrideBps,
      inputToken: this.info.input.token,
      inputStartAmount: this.info.input.startAmount,
      inputEndAmount: this.info.input.endAmount,
      outputs: this.info.outputs
    };
  }
  witness() {
    return {
      witness: this.witnessInfo(),
      witnessTypeName: "ExclusiveDutchOrder",
      witnessType: EXCLUSIVE_DUTCH_ORDER_TYPES
    };
  }
  decayInput(timestamp) {
    return {
      ...this.info.input,
      currentAmount: this.decay(this.info.input.startAmount, this.info.input.endAmount, timestamp)
    };
  }
  decayOutputs(timestamp) {
    return this.info.outputs.map((output) => {
      return {
        ...output,
        currentAmount: this.decay(output.startAmount, output.endAmount, timestamp)
      };
    });
  }
  decay(startAmount, endAmount, compareTime) {
    switch (true) {
      case this.info.decayEndTime < compareTime:
        return endAmount;
      case this.info.decayStartTime > compareTime:
        return startAmount;
      default: {
        const elapsed = compareTime - this.info.decayStartTime;
        const duration = this.info.decayEndTime - this.info.decayStartTime;
        if (endAmount < startAmount) {
          return startAmount - (startAmount - endAmount) * elapsed / duration;
        }
        return startAmount + (endAmount - startAmount) * elapsed / duration;
      }
    }
  }
};
function areCurrenciesEqual(currency, address, chainId) {
  if (currency.chainId !== chainId)
    return false;
  if (currency.isNative) {
    return address === zeroAddress;
  }
  return currency.address.toLowerCase() === address?.toLowerCase();
}

// src/trades/ExclusiveDutchOrderTrade.ts
function createExclusiveDutchOrderTrade({
  currencyIn,
  currenciesOut,
  orderInfo,
  tradeType
}) {
  if (orderInfo.outputs.length === 0) {
    throw new Error("there must be at least one output token");
  }
  const output = orderInfo.outputs[0];
  const currencyOut = currenciesOut.find(
    (currency) => areCurrenciesEqual(currency, output.token, currency.chainId)
  );
  if (!currencyOut) {
    throw new Error("currency output from order must exist in currenciesOut list");
  }
  const outputStartEndAmounts = {
    startAmount: CurrencyAmount.fromRawAmount(currencyOut, output.startAmount.toString()),
    endAmount: CurrencyAmount.fromRawAmount(currencyOut, output.endAmount.toString())
  };
  return {
    tradeType,
    inputAmount: CurrencyAmount.fromRawAmount(currencyIn, orderInfo.input.startAmount.toString()),
    outputAmount: outputStartEndAmounts.startAmount,
    get executionPrice() {
      return new Price(currencyIn, currencyOut, this.inputAmount.quotient, this.outputAmount.quotient);
    },
    get worstExecutionPrice() {
      return new Price(currencyIn, currencyOut, this.maximumAmountIn.quotient, this.minimumAmountOut.quotient);
    },
    priceImpact: null,
    maximumAmountIn: CurrencyAmount.fromRawAmount(currencyIn, orderInfo.input.endAmount.toString()),
    minimumAmountOut: outputStartEndAmounts.endAmount,
    orderInfo
  };
}
var NonceManager = class {
  constructor(client, chainId, permit2Address) {
    this.chainId = chainId;
    if (permit2Address) {
      this.contract = getContract({
        address: permit2Address,
        abi: Permit2ABI,
        client: {
          public: client
        }
      });
    } else if (PERMIT2_MAPPING[chainId]) {
      this.contract = getContract({
        address: PERMIT2_MAPPING[chainId],
        abi: Permit2ABI,
        client: {
          public: client
        }
      });
    } else {
      throw new MissingConfiguration("permit2", chainId.toString());
    }
  }
  async getSigner(order) {
    return recoverAddress({
      signature: order.signature,
      hash: SignatureTransfer.hash(
        order.order.toPermit(),
        this.contract.address,
        this.chainId,
        order.order.witness()
      )
    });
  }
  async isUsed(address, nonce) {
    const { word, bitPos } = NonceManager.splitNonce(nonce);
    const bitmap = await this.contract.read.nonceBitmap([address, word]);
    return bitmap / (2n * bitPos) % 2n === 1n;
  }
  static splitNonce(nonce) {
    const word = nonce / 256n;
    const bitPos = nonce % 256n;
    return { word, bitPos };
  }
};

// src/abi/OrderQuoter.ts
var orderQuoterAbi = [
  {
    inputs: [],
    name: "OrdersLengthIncorrect",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "order",
        type: "bytes"
      }
    ],
    name: "getReactor",
    outputs: [
      {
        internalType: "contract IReactor",
        name: "reactor",
        type: "address"
      }
    ],
    stateMutability: "pure",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "bytes",
        name: "order",
        type: "bytes"
      },
      {
        internalType: "bytes",
        name: "sig",
        type: "bytes"
      }
    ],
    name: "quote",
    outputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "contract IReactor",
                name: "reactor",
                type: "address"
              },
              {
                internalType: "address",
                name: "swapper",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
              },
              {
                internalType: "contract IValidationCallback",
                name: "additionalValidationContract",
                type: "address"
              },
              {
                internalType: "bytes",
                name: "additionalValidationData",
                type: "bytes"
              }
            ],
            internalType: "struct OrderInfo",
            name: "info",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "contract ERC20",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxAmount",
                type: "uint256"
              }
            ],
            internalType: "struct InputToken",
            name: "input",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "address",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct OutputToken[]",
            name: "outputs",
            type: "tuple[]"
          },
          {
            internalType: "bytes",
            name: "sig",
            type: "bytes"
          },
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32"
          }
        ],
        internalType: "struct ResolvedOrder",
        name: "result",
        type: "tuple"
      }
    ],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "contract IReactor",
                name: "reactor",
                type: "address"
              },
              {
                internalType: "address",
                name: "swapper",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256"
              },
              {
                internalType: "contract IValidationCallback",
                name: "additionalValidationContract",
                type: "address"
              },
              {
                internalType: "bytes",
                name: "additionalValidationData",
                type: "bytes"
              }
            ],
            internalType: "struct OrderInfo",
            name: "info",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "contract ERC20",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "uint256",
                name: "maxAmount",
                type: "uint256"
              }
            ],
            internalType: "struct InputToken",
            name: "input",
            type: "tuple"
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              },
              {
                internalType: "address",
                name: "recipient",
                type: "address"
              }
            ],
            internalType: "struct OutputToken[]",
            name: "outputs",
            type: "tuple[]"
          },
          {
            internalType: "bytes",
            name: "sig",
            type: "bytes"
          },
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32"
          }
        ],
        internalType: "struct ResolvedOrder[]",
        name: "resolvedOrders",
        type: "tuple[]"
      },
      {
        internalType: "bytes",
        name: "",
        type: "bytes"
      }
    ],
    name: "reactorCallback",
    outputs: [],
    stateMutability: "pure",
    type: "function"
  }
];

// src/utils/OrderQuoter.ts
var OrderQuoter = class {
  constructor(client, chainId, orderQuoterAddress) {
    this.client = client;
    this.chainId = chainId;
    if (orderQuoterAddress) {
      this.contract = getContract({
        address: orderQuoterAddress,
        abi: orderQuoterAbi,
        client: {
          public: client
        }
      });
    } else if (ORDER_QUOTER_MAPPING[chainId]) {
      this.contract = getContract({
        address: ORDER_QUOTER_MAPPING[chainId],
        abi: orderQuoterAbi,
        client: {
          public: client
        }
      });
    } else {
      throw new MissingConfiguration("orderQuoter", chainId.toString());
    }
  }
  async quote(order) {
    return (await this.quoteBatch([order]))[0];
  }
  async quoteBatch(orders) {
    const calls = orders.map((order) => {
      return [order.order.encode(), order.signature];
    });
    const results = await this.client.multicall({
      contracts: calls.map(
        (call) => ({
          abi: this.contract.abi,
          address: this.contract.address,
          functionName: "quote",
          args: call
        })
      ),
      allowFailure: true
    });
    const validations = await this.getValidations(orders, results);
    return results.map(({ status, result }, i) => {
      if (status === "failure") {
        return {
          validation: validations[i],
          quote: void 0
        };
      }
      return {
        validation: validations[i],
        quote: {
          input: result.input,
          outputs: [...result.outputs],
          sig: result.sig,
          hash: result.hash,
          info: result.info
        }
      };
    });
  }
  async getValidations(orders, results) {
    const validations = results.map((result) => {
      if (result.status === "success") {
        return 14 /* OK */;
      }
      const error = result.error.message;
      for (const key of Object.keys(KNOWN_ERRORS)) {
        if (error.includes(key)) {
          return KNOWN_ERRORS[key];
        }
      }
      return 10 /* UnknownError */;
    });
    return this.checkNonceOrDateExpiry(orders, validations);
  }
  // The quoter contract has a quirk that make validations inaccurate:
  // - checks expiry before anything else, so old but already filled orders will return as expired
  // so this function takes orders in expired state and double checks them
  async checkNonceOrDateExpiry(orders, validations) {
    return Promise.all(
      validations.map(async (validation, i) => {
        const order = orders[i];
        if (validation === 0 /* Expired */ || dayjs().isAfter(dayjs.unix(Number(order.order.info.deadline)))) {
          const nonceManager = new NonceManager(this.client, this.chainId);
          const signer = await nonceManager.getSigner(order);
          const nonceUsed = await nonceManager.isUsed(signer, order.order.info.nonce);
          return nonceUsed ? 1 /* NonceUsed */ : 0 /* Expired */;
        }
        return validation;
      })
    );
  }
};

export { BASIC_ERROR, ExclusiveDutchOrder, KNOWN_ERRORS, MissingConfiguration, NonceManager, ORDER_QUOTER_MAPPING, Order, OrderInfoStruct, OrderQuoter, OrderType, OrderValidation, PERMIT2_MAPPING, REACTOR_ADDRESS_MAPPING, SupportedChainId, createExclusiveDutchOrderTrade };
//# sourceMappingURL=out.js.map
//# sourceMappingURL=index.mjs.map