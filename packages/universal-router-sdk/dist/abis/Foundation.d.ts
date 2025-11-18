export declare const foundationAb: readonly [{
    readonly inputs: readonly [{
        readonly internalType: "address payable";
        readonly name: "treasury";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "feth";
        readonly type: "address";
    }, {
        readonly internalType: "address";
        readonly name: "royaltyRegistry";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "duration";
        readonly type: "uint256";
    }];
    readonly stateMutability: "nonpayable";
    readonly type: "constructor";
}, {
    readonly inputs: {};
    readonly name: "FoundationTreasuryNode_Address_Is_Not_A_Contract";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "FoundationTreasuryNode_Caller_Not_Admin";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "buyPrice";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketBuyPrice_Cannot_Buy_At_Lower_Price";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketBuyPrice_Cannot_Buy_Unset_Price";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketBuyPrice_Cannot_Cancel_Unset_Price";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "NFTMarketBuyPrice_Only_Owner_Can_Cancel_Price";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "NFTMarketBuyPrice_Only_Owner_Can_Set_Price";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketBuyPrice_Price_Already_Set";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketBuyPrice_Price_Too_High";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "seller";
        readonly type: "address";
    }];
    readonly name: "NFTMarketBuyPrice_Seller_Mismatch";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketCore_FETH_Address_Is_Not_A_Contract";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketCore_Only_FETH_Can_Transfer_ETH";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketCore_Seller_Not_Found";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketFees_Address_Does_Not_Support_IRoyaltyRegistry";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketOffer_Cannot_Be_Made_While_In_Auction";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "currentOfferAmount";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketOffer_Offer_Below_Min_Amount";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "expiry";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketOffer_Offer_Expired";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "currentOfferFrom";
        readonly type: "address";
    }];
    readonly name: "NFTMarketOffer_Offer_From_Does_Not_Match";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "minOfferAmount";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketOffer_Offer_Must_Be_At_Least_Min_Amount";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketOffer_Provided_Contract_And_TokenId_Count_Must_Match";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketOffer_Reason_Required";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketReserveAuction_Already_Listed";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "minAmount";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketReserveAuction_Bid_Must_Be_At_Least_Min_Amount";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Cannot_Admin_Cancel_Without_Reason";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "reservePrice";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketReserveAuction_Cannot_Bid_Lower_Than_Reserve_Price";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "endTime";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketReserveAuction_Cannot_Bid_On_Ended_Auction";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Cannot_Bid_On_Nonexistent_Auction";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Cannot_Cancel_Nonexistent_Auction";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Cannot_Finalize_Already_Settled_Auction";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "endTime";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketReserveAuction_Cannot_Finalize_Auction_In_Progress";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Cannot_Rebid_Over_Outstanding_Bid";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Cannot_Update_Auction_In_Progress";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "maxDuration";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketReserveAuction_Exceeds_Max_Duration";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "extensionDuration";
        readonly type: "uint256";
    }];
    readonly name: "NFTMarketReserveAuction_Less_Than_Extension_Duration";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Must_Set_Non_Zero_Reserve_Price";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "seller";
        readonly type: "address";
    }];
    readonly name: "NFTMarketReserveAuction_Not_Matching_Seller";
    readonly type: "error";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly name: "NFTMarketReserveAuction_Only_Owner_Can_Update_Auction";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Price_Already_Set";
    readonly type: "error";
}, {
    readonly inputs: {};
    readonly name: "NFTMarketReserveAuction_Too_Much_Value_Provided";
    readonly type: "error";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "buyer";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "protocolFee";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "creatorFee";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "sellerRev";
        readonly type: "uint256";
    }];
    readonly name: "BuyPriceAccepted";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "BuyPriceCanceled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "BuyPriceInvalidated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "price";
        readonly type: "uint256";
    }];
    readonly name: "BuyPriceSet";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "buyReferrer";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "buyReferrerProtocolFee";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "buyReferrerSellerFee";
        readonly type: "uint256";
    }];
    readonly name: "BuyReferralPaid";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: false;
        readonly internalType: "uint8";
        readonly name: "version";
        readonly type: "uint8";
    }];
    readonly name: "Initialized";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "buyer";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "address";
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "protocolFee";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "creatorFee";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "sellerRev";
        readonly type: "uint256";
    }];
    readonly name: "OfferAccepted";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "OfferCanceledByAdmin";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "OfferInvalidated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "buyer";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "expiration";
        readonly type: "uint256";
    }];
    readonly name: "OfferMade";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "bidder";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "endTime";
        readonly type: "uint256";
    }];
    readonly name: "ReserveAuctionBidPlaced";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "ReserveAuctionCanceled";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "ReserveAuctionCanceledByAdmin";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "duration";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "extensionDuration";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "reservePrice";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "ReserveAuctionCreated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "bidder";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "protocolFee";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "creatorFee";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "sellerRev";
        readonly type: "uint256";
    }];
    readonly name: "ReserveAuctionFinalized";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "ReserveAuctionInvalidated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "reservePrice";
        readonly type: "uint256";
    }];
    readonly name: "ReserveAuctionUpdated";
    readonly type: "event";
}, {
    readonly anonymous: false;
    readonly inputs: readonly [{
        readonly indexed: true;
        readonly internalType: "address";
        readonly name: "user";
        readonly type: "address";
    }, {
        readonly indexed: false;
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "WithdrawalToFETH";
    readonly type: "event";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "address";
        readonly name: "offerFrom";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "minAmount";
        readonly type: "uint256";
    }];
    readonly name: "acceptOffer";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address[]";
        readonly name: "nftContracts";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "tokenIds";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "adminCancelOffers";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }, {
        readonly internalType: "string";
        readonly name: "reason";
        readonly type: "string";
    }];
    readonly name: "adminCancelReserveAuction";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "maxPrice";
        readonly type: "uint256";
    }];
    readonly name: "buy";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "maxPrice";
        readonly type: "uint256";
    }, {
        readonly internalType: "address payable";
        readonly name: "referrer";
        readonly type: "address";
    }];
    readonly name: "buyV2";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "cancelBuyPrice";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "cancelReserveAuction";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "reservePrice";
        readonly type: "uint256";
    }];
    readonly name: "createReserveAuction";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "finalizeReserveAuction";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "getBuyPrice";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "seller";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "price";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "price";
        readonly type: "uint256";
    }];
    readonly name: "getFeesAndRecipients";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "protocolFee";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "creatorRev";
        readonly type: "uint256";
    }, {
        readonly internalType: "address payable[]";
        readonly name: "creatorRecipients";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "creatorShares";
        readonly type: "uint256[]";
    }, {
        readonly internalType: "uint256";
        readonly name: "sellerRev";
        readonly type: "uint256";
    }, {
        readonly internalType: "address payable";
        readonly name: "owner";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "getFethAddress";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "fethAddress";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "getFoundationTreasury";
    readonly outputs: readonly [{
        readonly internalType: "address payable";
        readonly name: "treasuryAddress";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "getImmutableRoyalties";
    readonly outputs: readonly [{
        readonly internalType: "address payable[]";
        readonly name: "recipients";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "splitPerRecipientInBasisPoints";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "getMinBidAmount";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "minimum";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "getMinOfferAmount";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "minimum";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "address payable";
        readonly name: "creator";
        readonly type: "address";
    }];
    readonly name: "getMutableRoyalties";
    readonly outputs: readonly [{
        readonly internalType: "address payable[]";
        readonly name: "recipients";
        readonly type: "address[]";
    }, {
        readonly internalType: "uint256[]";
        readonly name: "splitPerRecipientInBasisPoints";
        readonly type: "uint256[]";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "getOffer";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "buyer";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "expiration";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "getOfferReferrer";
    readonly outputs: readonly [{
        readonly internalType: "address payable";
        readonly name: "referrer";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "getReserveAuction";
    readonly outputs: readonly [{
        readonly components: readonly [{
            readonly internalType: "address";
            readonly name: "nftContract";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "tokenId";
            readonly type: "uint256";
        }, {
            readonly internalType: "address payable";
            readonly name: "seller";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "duration";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "extensionDuration";
            readonly type: "uint256";
        }, {
            readonly internalType: "uint256";
            readonly name: "endTime";
            readonly type: "uint256";
        }, {
            readonly internalType: "address payable";
            readonly name: "bidder";
            readonly type: "address";
        }, {
            readonly internalType: "uint256";
            readonly name: "amount";
            readonly type: "uint256";
        }];
        readonly internalType: "struct NFTMarketReserveAuction.ReserveAuction";
        readonly name: "auction";
        readonly type: "tuple";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "getReserveAuctionBidReferrer";
    readonly outputs: readonly [{
        readonly internalType: "address payable";
        readonly name: "referrer";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "getReserveAuctionIdFor";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "getRoyaltyRegistry";
    readonly outputs: readonly [{
        readonly internalType: "address";
        readonly name: "registry";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }];
    readonly name: "getTokenCreator";
    readonly outputs: readonly [{
        readonly internalType: "address payable";
        readonly name: "creator";
        readonly type: "address";
    }];
    readonly stateMutability: "view";
    readonly type: "function";
}, {
    readonly inputs: {};
    readonly name: "initialize";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }];
    readonly name: "makeOffer";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "expiration";
        readonly type: "uint256";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "address payable";
        readonly name: "referrer";
        readonly type: "address";
    }];
    readonly name: "makeOfferV2";
    readonly outputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "expiration";
        readonly type: "uint256";
    }];
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }];
    readonly name: "placeBid";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "amount";
        readonly type: "uint256";
    }, {
        readonly internalType: "address payable";
        readonly name: "referrer";
        readonly type: "address";
    }];
    readonly name: "placeBidV2";
    readonly outputs: {};
    readonly stateMutability: "payable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "address";
        readonly name: "nftContract";
        readonly type: "address";
    }, {
        readonly internalType: "uint256";
        readonly name: "tokenId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "price";
        readonly type: "uint256";
    }];
    readonly name: "setBuyPrice";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly inputs: readonly [{
        readonly internalType: "uint256";
        readonly name: "auctionId";
        readonly type: "uint256";
    }, {
        readonly internalType: "uint256";
        readonly name: "reservePrice";
        readonly type: "uint256";
    }];
    readonly name: "updateReserveAuction";
    readonly outputs: {};
    readonly stateMutability: "nonpayable";
    readonly type: "function";
}, {
    readonly stateMutability: "payable";
    readonly type: "receive";
}];
//# sourceMappingURL=Foundation.d.ts.map