export declare const elementAbi: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "contract IEtherToken";
        readonly name: "weth";
        readonly type: "address";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "taker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "contract IERC20";
        readonly name: "erc20Token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "erc20TokenAmount";
        readonly type: "uint256";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly indexed: false;
        readonly internalType: "struct INFTOrdersFeature.Fee[]";
        readonly name: "fees";
        readonly type: "tuple[]";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "erc721Token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "erc721TokenId";
        readonly type: "uint256";
    }];
    readonly name: "ERC721BuyOrderFilled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "taker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "expiry";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "contract IERC20";
        readonly name: "erc20Token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "erc20TokenAmount";
        readonly type: "uint256";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "feeData";
            readonly type: "bytes";
        }];
        readonly indexed: false;
        readonly internalType: "struct LibNFTOrder.Fee[]";
        readonly name: "fees";
        readonly type: "tuple[]";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "erc721Token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "erc721TokenId";
        readonly type: "uint256";
    }, {
        readonly components: readonly [{
            readonly internalType: "contract IPropertyValidator";
            readonly name: "propertyValidator";
            readonly type: "address";
        }, {
            readonly internalType: "bytes";
            readonly name: "propertyData";
            readonly type: "bytes";
        }];
        readonly indexed: false;
        readonly internalType: "struct LibNFTOrder.Property[]";
        readonly name: "nftProperties";
        readonly type: "tuple[]";
    }];
    readonly name: "ERC721BuyOrderPreSigned";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "nonce";
        readonly type: "uint256";
    }];
    readonly name: "ERC721OrderCancelled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "taker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "contract IERC20";
        readonly name: "erc20Token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "erc20TokenAmount";
        readonly type: "uint256";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly indexed: false;
        readonly internalType: "struct INFTOrdersFeature.Fee[]";
        readonly name: "fees";
        readonly type: "tuple[]";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "erc721Token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "erc721TokenId";
        readonly type: "uint256";
    }];
    readonly name: "ERC721SellOrderFilled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "taker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "expiry";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "nonce";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "contract IERC20";
        readonly name: "erc20Token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "erc20TokenAmount";
        readonly type: "uint256";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "recipient";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }, {
            readonly internalType: "bytes";
            readonly name: "feeData";
            readonly type: "bytes";
        }];
        readonly indexed: false;
        readonly internalType: "struct LibNFTOrder.Fee[]";
        readonly name: "fees";
        readonly type: "tuple[]";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "erc721Token";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "erc721TokenId";
        readonly type: "uint256";
    }];
    readonly name: "ERC721SellOrderPreSigned";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "newHashNonce";
        readonly type: "uint256";
    }];
    readonly name: "HashNonceIncremented";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "bytes32";
        readonly name: "orderHash";
        readonly type: "bytes32";
    }, {
        readonly indexed: false;
        readonly internalType: "bytes";
        readonly name: "takerData";
        readonly type: "bytes";
    }];
    readonly name: "TakerDataEmitted";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder[]";
        readonly name: "sellOrders";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature[]";
        readonly name: "signatures";
        readonly type: "tuple[]";
    }, {
        readonly internalType: "bool";
        readonly name: "revertIfIncomplete";
        readonly type: "bool";
    }];
    readonly name: "batchBuyERC721s";
    readonly outputs: readonly [{
        readonly internalType: "bool[]";
        readonly name: "successes";
        readonly type: "bool[]";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder[]";
        readonly name: "sellOrders";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature[]";
        readonly name: "signatures";
        readonly type: "tuple[]";
    }, {
        readonly internalType: "address[]";
        readonly name: "takers";
        readonly type: "address[]";
    }, {
        readonly internalType: "bytes[]";
        readonly name: "takerDatas";
        readonly type: "bytes[]";
    }, {
        readonly internalType: "bool";
        readonly name: "revertIfIncomplete";
        readonly type: "bool";
    }];
    readonly name: "batchBuyERC721sEx";
    readonly outputs: readonly [{
        readonly internalType: "bool[]";
        readonly name: "successes";
        readonly type: "bool[]";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "orderNonces";
        readonly type: "uint256[]";
    }];
    readonly name: "batchCancelERC721Orders";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder[]";
        readonly name: "sellOrders";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IPropertyValidator";
                readonly name: "propertyValidator";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "propertyData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Property[]";
            readonly name: "nftProperties";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct LibNFTOrder.NFTBuyOrder[]";
        readonly name: "buyOrders";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature[]";
        readonly name: "sellOrderSignatures";
        readonly type: "tuple[]";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature[]";
        readonly name: "buyOrderSignatures";
        readonly type: "tuple[]";
    }];
    readonly name: "batchMatchERC721Orders";
    readonly outputs: readonly [{
        readonly internalType: "uint256[]";
        readonly name: "profits";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "bool[]";
        readonly name: "successes";
        readonly type: "bool[]";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "sellOrder";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "signature";
        readonly type: "tuple";
    }];
    readonly name: "buyERC721";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "sellOrder";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "signature";
        readonly type: "tuple";
    }, {
        readonly internalType: "address";
        readonly name: "taker";
        readonly type: "address";
    }, {
        readonly internalType: "bytes";
        readonly name: "takerData";
        readonly type: "bytes";
    }];
    readonly name: "buyERC721Ex";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "sellOrder";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "signature";
        readonly type: "tuple";
    }, {
        readonly internalType: "address";
        readonly name: "taker";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "ethAvailable";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "takerData";
        readonly type: "bytes";
    }];
    readonly name: "buyERC721ExFromProxy";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "sellOrder";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "signature";
        readonly type: "tuple";
    }];
    readonly name: "buyERC721FromProxy";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "orderNonce";
        readonly type: "uint256";
    }];
    readonly name: "cancelERC721Order";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IPropertyValidator";
                readonly name: "propertyValidator";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "propertyData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Property[]";
            readonly name: "nftProperties";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct LibNFTOrder.NFTBuyOrder";
        readonly name: "order";
        readonly type: "tuple";
    }];
    readonly name: "getERC721BuyOrderHash";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IPropertyValidator";
                readonly name: "propertyValidator";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "propertyData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Property[]";
            readonly name: "nftProperties";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct LibNFTOrder.NFTBuyOrder";
        readonly name: "order";
        readonly type: "tuple";
    }];
    readonly name: "getERC721BuyOrderStatus";
    readonly outputs: readonly [{
        readonly internalType: "enum LibNFTOrder.OrderStatus";
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }, {
        readonly internalType: "uint248";
        readonly name: "nonceRange";
        readonly type: "uint248";
    }];
    readonly name: "getERC721OrderStatusBitVector";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "order";
        readonly type: "tuple";
    }];
    readonly name: "getERC721SellOrderHash";
    readonly outputs: readonly [{
        readonly internalType: "bytes32";
        readonly name: "";
        readonly type: "bytes32";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "order";
        readonly type: "tuple";
    }];
    readonly name: "getERC721SellOrderStatus";
    readonly outputs: readonly [{
        readonly internalType: "enum LibNFTOrder.OrderStatus";
        readonly name: "";
        readonly type: "uint8";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "maker";
        readonly type: "address";
    }];
    readonly name: "getHashNonce";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "incrementHashNonce";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "sellOrder";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IPropertyValidator";
                readonly name: "propertyValidator";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "propertyData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Property[]";
            readonly name: "nftProperties";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct LibNFTOrder.NFTBuyOrder";
        readonly name: "buyOrder";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "sellOrderSignature";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "buyOrderSignature";
        readonly type: "tuple";
    }];
    readonly name: "matchERC721Orders";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "profit";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "operator";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bytes";
        readonly name: "data";
        readonly type: "bytes";
    }];
    readonly name: "onERC721Received";
    readonly outputs: readonly [{
        readonly internalType: "bytes4";
        readonly name: "success";
        readonly type: "bytes4";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IPropertyValidator";
                readonly name: "propertyValidator";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "propertyData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Property[]";
            readonly name: "nftProperties";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct LibNFTOrder.NFTBuyOrder";
        readonly name: "order";
        readonly type: "tuple";
    }];
    readonly name: "preSignERC721BuyOrder";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "order";
        readonly type: "tuple";
    }];
    readonly name: "preSignERC721SellOrder";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IPropertyValidator";
                readonly name: "propertyValidator";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "propertyData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Property[]";
            readonly name: "nftProperties";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct LibNFTOrder.NFTBuyOrder";
        readonly name: "buyOrder";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "signature";
        readonly type: "tuple";
    }, {
        readonly internalType: "uint256";
        readonly name: "erc721TokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "bool";
        readonly name: "unwrapNativeToken";
        readonly type: "bool";
    }, {
        readonly internalType: "bytes";
        readonly name: "takerData";
        readonly type: "bytes";
    }];
    readonly name: "sellERC721";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "contract IPropertyValidator";
                readonly name: "propertyValidator";
                readonly type: "address";
            }, {
                readonly internalType: "bytes";
                readonly name: "propertyData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Property[]";
            readonly name: "nftProperties";
            readonly type: "tuple[]";
        }];
        readonly internalType: "struct LibNFTOrder.NFTBuyOrder";
        readonly name: "order";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "signature";
        readonly type: "tuple";
    }];
    readonly name: "validateERC721BuyOrderSignature";
    readonly outputs: {};
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "maker";
            readonly type: "address";
        }, {
            readonly internalType: "address";
            readonly name: "taker";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "expiry";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "nonce";
            readonly type: "uint256";
        }, {
            readonly internalType: "contract IERC20";
            readonly name: "erc20Token";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "erc20TokenAmount";
            readonly type: "uint256";
        }, {
            readonly components: readonly [{
                readonly internalType: "address";
                readonly name: "recipient";
                readonly type: "address";
            }, {
                readonly internalType: "uint256";
                readonly name: "amount";
                readonly type: "uint256";
            }, {
                readonly internalType: "bytes";
                readonly name: "feeData";
                readonly type: "bytes";
            }];
            readonly internalType: "struct LibNFTOrder.Fee[]";
            readonly name: "fees";
            readonly type: "tuple[]";
        }, {
            readonly internalType: "address";
            readonly name: "nft";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "nftId";
            readonly type: "uint256";
        }];
        readonly internalType: "struct LibNFTOrder.NFTSellOrder";
        readonly name: "order";
        readonly type: "tuple";
    }, {
        readonly components: readonly [{
            readonly internalType: "enum LibSignature.SignatureType";
            readonly name: "signatureType";
            readonly type: "uint8";
        }, {
            readonly internalType: "uint8";
            readonly name: "v";
            readonly type: "uint8";
        }, {
            readonly internalType: "bytes32";
            readonly name: "r";
            readonly type: "bytes32";
        }, {
            readonly internalType: "bytes32";
            readonly name: "s";
            readonly type: "bytes32";
        }];
        readonly internalType: "struct LibSignature.Signature";
        readonly name: "signature";
        readonly type: "tuple";
    }];
    readonly name: "validateERC721SellOrderSignature";
    readonly outputs: {};
    readonly stateMutability: "view";
    readonly type: "function";
}];
//# sourceMappingURL=Element.d.ts.map