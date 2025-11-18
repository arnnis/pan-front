import invariant from 'tiny-invariant';
import { hashTypedData } from 'viem';
import { ChainId } from '@pancakeswap/chains';

// src/allowanceTransfer.ts
var PERMIT2_ADDRESSES = {
  [ChainId.ETHEREUM]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.GOERLI]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.SEPOLIA]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.BSC]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.BSC_TESTNET]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  // [ChainId.SCROLL]: '0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768',
  [ChainId.SCROLL_SEPOLIA]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.ARBITRUM_ONE]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.ARBITRUM_GOERLI]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.ARBITRUM_SEPOLIA]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.BASE]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.BASE_TESTNET]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.BASE_SEPOLIA]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.POLYGON_ZKEVM]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.POLYGON_ZKEVM_TESTNET]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.LINEA]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.LINEA_TESTNET]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.ZKSYNC]: "0x686FD50007EaA636F01154d660b96110B6bFe351",
  [ChainId.ZKSYNC_TESTNET]: "0xaf321b731E65715DdbFDa73A066E00BB28345709",
  [ChainId.OPBNB]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.OPBNB_TESTNET]: "0x31c2F6fcFf4F8759b3Bd5Bf0e1084A055615c768",
  [ChainId.MONAD_TESTNET]: "0xC51DA9473283695884AD536FFD180e618Bf6186e"
};
var getPermit2Address = (chainId) => {
  if (chainId === void 0)
    return PERMIT2_ADDRESSES[ChainId.BSC];
  if (!(chainId in PERMIT2_ADDRESSES))
    return void 0;
  return PERMIT2_ADDRESSES[chainId];
};
var MaxUint48 = BigInt("0xffffffffffff");
var MaxUint160 = BigInt("0xFFfFfFffFFfffFFfFFfFFFFFffFFFffffFfFFFfF");
var MaxUint256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
var MaxAllowanceTransferAmount = MaxUint160;
var MaxAllowanceExpiration = MaxUint48;
var MaxOrderedNonce = MaxUint48;
var MaxSignatureTransferAmount = MaxUint256;
var MaxUnorderedNonce = MaxUint256;
var MaxSigDeadline = MaxUint256;
var PERMIT_EXPIRATION = 2592e6;
var PERMIT_SIG_EXPIRATION = 18e5;
var InstantExpiration = BigInt("0");

// src/domain.ts
var PERMIT2_DOMAIN_NAME = "Permit2";
function permit2Domain(permit2Address, chainId) {
  return {
    name: PERMIT2_DOMAIN_NAME,
    chainId,
    verifyingContract: permit2Address
  };
}

// src/allowanceTransfer.ts
var PERMIT_DETAILS = [
  { name: "token", type: "address" },
  { name: "amount", type: "uint160" },
  { name: "expiration", type: "uint48" },
  { name: "nonce", type: "uint48" }
];
var PERMIT_TYPES = {
  PermitSingle: [
    { name: "details", type: "PermitDetails" },
    { name: "spender", type: "address" },
    { name: "sigDeadline", type: "uint256" }
  ],
  PermitDetails: PERMIT_DETAILS
};
var PERMIT_BATCH_TYPES = {
  PermitBatch: [
    { name: "details", type: "PermitDetails[]" },
    { name: "spender", type: "address" },
    { name: "sigDeadline", type: "uint256" }
  ],
  PermitDetails: PERMIT_DETAILS
};
function isPermit(permit) {
  return !Array.isArray(permit.details);
}
var AllowanceTransfer = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
  }
  // return the data to be sent in a eth_signTypedData RPC call
  // for signing the given permit data
  static getPermitData(permit, permit2Address, chainId) {
    invariant(MaxSigDeadline >= BigInt(permit.sigDeadline), "SIG_DEADLINE_OUT_OF_RANGE");
    const domain = permit2Domain(permit2Address, chainId);
    if (isPermit(permit)) {
      validatePermitDetails(permit.details);
      return {
        domain,
        types: PERMIT_TYPES,
        values: permit,
        primaryType: "PermitSingle"
      };
    }
    permit.details.forEach(validatePermitDetails);
    return {
      domain,
      types: PERMIT_BATCH_TYPES,
      values: permit,
      primaryType: "PermitBatch"
    };
  }
  static hash(permit, permit2Address, chainId) {
    const { domain, types, values, primaryType } = AllowanceTransfer.getPermitData(permit, permit2Address, chainId);
    return hashTypedData({
      message: values,
      domain,
      types,
      primaryType
    });
  }
};
function validatePermitDetails(details) {
  invariant(MaxOrderedNonce >= BigInt(details.nonce), "NONCE_OUT_OF_RANGE");
  invariant(MaxAllowanceTransferAmount >= BigInt(details.amount), "AMOUNT_OUT_OF_RANGE");
  invariant(MaxAllowanceExpiration >= BigInt(details.expiration), "EXPIRATION_OUT_OF_RANGE");
}
var TOKEN_PERMISSIONS = [
  { name: "token", type: "address" },
  { name: "amount", type: "uint256" }
];
var PERMIT_TRANSFER_FROM_TYPES = {
  PermitTransferFrom: [
    { name: "permitted", type: "TokenPermissions" },
    { name: "spender", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ],
  TokenPermissions: TOKEN_PERMISSIONS
};
var PERMIT_BATCH_TRANSFER_FROM_TYPES = {
  PermitBatchTransferFrom: [
    { name: "permitted", type: "TokenPermissions[]" },
    { name: "spender", type: "address" },
    { name: "nonce", type: "uint256" },
    { name: "deadline", type: "uint256" }
  ],
  TokenPermissions: TOKEN_PERMISSIONS
};
function permitTransferFromWithWitnessType(witness) {
  return {
    PermitWitnessTransferFrom: [
      { name: "permitted", type: "TokenPermissions" },
      { name: "spender", type: "address" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "witness", type: witness.witnessTypeName }
    ],
    TokenPermissions: TOKEN_PERMISSIONS,
    ...witness.witnessType
  };
}
function permitBatchTransferFromWithWitnessType(witness) {
  return {
    PermitBatchWitnessTransferFrom: [
      { name: "permitted", type: "TokenPermissions[]" },
      { name: "spender", type: "address" },
      { name: "nonce", type: "uint256" },
      { name: "deadline", type: "uint256" },
      { name: "witness", type: witness.witnessTypeName }
    ],
    TokenPermissions: TOKEN_PERMISSIONS,
    ...witness.witnessType
  };
}
function isPermitTransferFrom(permit) {
  return !Array.isArray(permit.permitted);
}
var SignatureTransfer = class {
  /**
   * Cannot be constructed.
   */
  // eslint-disable-next-line no-useless-constructor
  constructor() {
  }
  // return the data to be sent in a eth_signTypedData RPC call
  // for signing the given permit data
  static getPermitData(permit, permit2Address, chainId, witness) {
    invariant(MaxSigDeadline >= BigInt(permit.deadline), "SIG_DEADLINE_OUT_OF_RANGE");
    invariant(MaxUnorderedNonce >= BigInt(permit.nonce), "NONCE_OUT_OF_RANGE");
    const domain = permit2Domain(permit2Address, chainId);
    if (isPermitTransferFrom(permit)) {
      validateTokenPermissions(permit.permitted);
      const types2 = witness ? permitTransferFromWithWitnessType(witness) : PERMIT_TRANSFER_FROM_TYPES;
      const values2 = witness ? Object.assign(permit, { witness: witness.witness }) : permit;
      const primaryType2 = witness ? "PermitWitnessTransferFrom" : "PermitTransferFrom";
      return {
        domain,
        types: types2,
        values: values2,
        primaryType: primaryType2
      };
    }
    permit.permitted.forEach(validateTokenPermissions);
    const types = witness ? permitBatchTransferFromWithWitnessType(witness) : PERMIT_BATCH_TRANSFER_FROM_TYPES;
    const values = witness ? Object.assign(permit, { witness: witness.witness }) : permit;
    const primaryType = witness ? "PermitBatchWitnessTransferFrom" : "PermitBatchTransferFrom";
    return {
      domain,
      types,
      values,
      primaryType
    };
  }
  static hash(permit, permit2Address, chainId, witness) {
    const { domain, types, values, primaryType } = SignatureTransfer.getPermitData(
      permit,
      permit2Address,
      chainId,
      witness
    );
    return hashTypedData({
      domain,
      types,
      primaryType,
      message: values
    });
  }
};
function validateTokenPermissions(permissions) {
  invariant(MaxSignatureTransferAmount >= BigInt(permissions.amount), "AMOUNT_OUT_OF_RANGE");
}

// src/utils/utils.ts
var toDeadline = (expiration) => {
  return Math.floor((Date.now() + expiration) / 1e3);
};
var generatePermitTypedData = (token, nonce, spender) => {
  return {
    details: {
      token: token.address,
      amount: MaxAllowanceTransferAmount.toString(),
      expiration: toDeadline(PERMIT_EXPIRATION).toString(),
      nonce: nonce.toString()
    },
    spender,
    sigDeadline: toDeadline(PERMIT_SIG_EXPIRATION).toString()
  };
};

// src/abis/Permit2.ts
var Permit2ABI = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "deadline",
        type: "uint256"
      }
    ],
    name: "AllowanceExpired",
    type: "error"
  },
  {
    inputs: [],
    name: "ExcessiveInvalidation",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256"
      }
    ],
    name: "InsufficientAllowance",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "maxAmount",
        type: "uint256"
      }
    ],
    name: "InvalidAmount",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidContractSignature",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidNonce",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSignature",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSignatureLength",
    type: "error"
  },
  {
    inputs: [],
    name: "InvalidSigner",
    type: "error"
  },
  {
    inputs: [],
    name: "LengthMismatch",
    type: "error"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "signatureDeadline",
        type: "uint256"
      }
    ],
    name: "SignatureExpired",
    type: "error"
  },
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
        name: "token",
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
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "expiration",
        type: "uint48"
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
        name: "owner",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        indexed: false,
        internalType: "address",
        name: "spender",
        type: "address"
      }
    ],
    name: "Lockdown",
    type: "event"
  },
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
        name: "token",
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
        internalType: "uint48",
        name: "newNonce",
        type: "uint48"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "oldNonce",
        type: "uint48"
      }
    ],
    name: "NonceInvalidation",
    type: "event"
  },
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
        name: "token",
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
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "expiration",
        type: "uint48"
      },
      {
        indexed: false,
        internalType: "uint48",
        name: "nonce",
        type: "uint48"
      }
    ],
    name: "Permit",
    type: "event"
  },
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
        indexed: false,
        internalType: "uint256",
        name: "word",
        type: "uint256"
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "mask",
        type: "uint256"
      }
    ],
    name: "UnorderedNonceInvalidation",
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
        internalType: "address",
        name: "",
        type: "address"
      }
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        internalType: "uint48",
        name: "expiration",
        type: "uint48"
      },
      {
        internalType: "uint48",
        name: "nonce",
        type: "uint48"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        internalType: "uint48",
        name: "expiration",
        type: "uint48"
      }
    ],
    name: "approve",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address"
      },
      {
        internalType: "address",
        name: "spender",
        type: "address"
      },
      {
        internalType: "uint48",
        name: "newNonce",
        type: "uint48"
      }
    ],
    name: "invalidateNonces",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "wordPos",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "mask",
        type: "uint256"
      }
    ],
    name: "invalidateUnorderedNonces",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "token",
            type: "address"
          },
          {
            internalType: "address",
            name: "spender",
            type: "address"
          }
        ],
        internalType: "struct IAllowanceTransfer.TokenSpenderPair[]",
        name: "approvals",
        type: "tuple[]"
      }
    ],
    name: "lockdown",
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
      },
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "nonceBitmap",
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
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint160",
                name: "amount",
                type: "uint160"
              },
              {
                internalType: "uint48",
                name: "expiration",
                type: "uint48"
              },
              {
                internalType: "uint48",
                name: "nonce",
                type: "uint48"
              }
            ],
            internalType: "struct IAllowanceTransfer.PermitDetails[]",
            name: "details",
            type: "tuple[]"
          },
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "sigDeadline",
            type: "uint256"
          }
        ],
        internalType: "struct IAllowanceTransfer.PermitBatch",
        name: "permitBatch",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permit",
    outputs: [],
    stateMutability: "nonpayable",
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
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint160",
                name: "amount",
                type: "uint160"
              },
              {
                internalType: "uint48",
                name: "expiration",
                type: "uint48"
              },
              {
                internalType: "uint48",
                name: "nonce",
                type: "uint48"
              }
            ],
            internalType: "struct IAllowanceTransfer.PermitDetails",
            name: "details",
            type: "tuple"
          },
          {
            internalType: "address",
            name: "spender",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "sigDeadline",
            type: "uint256"
          }
        ],
        internalType: "struct IAllowanceTransfer.PermitSingle",
        name: "permitSingle",
        type: "tuple"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permit",
    outputs: [],
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
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions",
            name: "permitted",
            type: "tuple"
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
          }
        ],
        internalType: "struct ISignatureTransfer.PermitTransferFrom",
        name: "permit",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails",
        name: "transferDetails",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permitTransferFrom",
    outputs: [],
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
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions[]",
            name: "permitted",
            type: "tuple[]"
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
          }
        ],
        internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
        name: "permit",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
        name: "transferDetails",
        type: "tuple[]"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permitTransferFrom",
    outputs: [],
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
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions",
            name: "permitted",
            type: "tuple"
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
          }
        ],
        internalType: "struct ISignatureTransfer.PermitTransferFrom",
        name: "permit",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails",
        name: "transferDetails",
        type: "tuple"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "witness",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "witnessTypeString",
        type: "string"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permitWitnessTransferFrom",
    outputs: [],
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
                internalType: "address",
                name: "token",
                type: "address"
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256"
              }
            ],
            internalType: "struct ISignatureTransfer.TokenPermissions[]",
            name: "permitted",
            type: "tuple[]"
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
          }
        ],
        internalType: "struct ISignatureTransfer.PermitBatchTransferFrom",
        name: "permit",
        type: "tuple"
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "requestedAmount",
            type: "uint256"
          }
        ],
        internalType: "struct ISignatureTransfer.SignatureTransferDetails[]",
        name: "transferDetails",
        type: "tuple[]"
      },
      {
        internalType: "address",
        name: "owner",
        type: "address"
      },
      {
        internalType: "bytes32",
        name: "witness",
        type: "bytes32"
      },
      {
        internalType: "string",
        name: "witnessTypeString",
        type: "string"
      },
      {
        internalType: "bytes",
        name: "signature",
        type: "bytes"
      }
    ],
    name: "permitWitnessTransferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      {
        components: [
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
            internalType: "uint160",
            name: "amount",
            type: "uint160"
          },
          {
            internalType: "address",
            name: "token",
            type: "address"
          }
        ],
        internalType: "struct IAllowanceTransfer.AllowanceTransferDetails[]",
        name: "transferDetails",
        type: "tuple[]"
      }
    ],
    name: "transferFrom",
    outputs: [],
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
        internalType: "uint160",
        name: "amount",
        type: "uint160"
      },
      {
        internalType: "address",
        name: "token",
        type: "address"
      }
    ],
    name: "transferFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
];

export { AllowanceTransfer, InstantExpiration, MaxAllowanceExpiration, MaxAllowanceTransferAmount, MaxOrderedNonce, MaxSigDeadline, MaxSignatureTransferAmount, MaxUint160, MaxUint256, MaxUint48, MaxUnorderedNonce, PERMIT_EXPIRATION, PERMIT_SIG_EXPIRATION, Permit2ABI, SignatureTransfer, generatePermitTypedData, getPermit2Address, toDeadline };
