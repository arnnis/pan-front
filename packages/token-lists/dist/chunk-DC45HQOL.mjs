import { Token } from '@pancakeswap/swap-sdk-core';

var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};
var WrappedTokenInfo = class extends Token {
  constructor(tokenInfo) {
    super(tokenInfo.chainId, tokenInfo.address, tokenInfo.decimals, tokenInfo.symbol, tokenInfo.name);
    this.logoURI = tokenInfo.logoURI;
  }
  get serialize() {
    return {
      address: this.address,
      chainId: this.chainId,
      decimals: this.decimals,
      symbol: this.symbol,
      name: this.name,
      projectLink: this.projectLink,
      logoURI: this.logoURI
    };
  }
};
function deserializeToken(serializedToken) {
  if (serializedToken.logoURI) {
    return new WrappedTokenInfo({
      chainId: serializedToken.chainId,
      address: serializedToken.address,
      decimals: serializedToken.decimals,
      symbol: serializedToken.symbol || "Unknown",
      name: serializedToken.name || "Unknown",
      logoURI: serializedToken.logoURI
    });
  }
  return new Token(
    serializedToken.chainId,
    serializedToken.address,
    serializedToken.decimals,
    serializedToken.symbol,
    serializedToken.name,
    serializedToken.projectLink
  );
}

// src/getVersionUpgrade.ts
var VersionUpgrade = /* @__PURE__ */ ((VersionUpgrade2) => {
  VersionUpgrade2[VersionUpgrade2["NONE"] = 0] = "NONE";
  VersionUpgrade2[VersionUpgrade2["PATCH"] = 1] = "PATCH";
  VersionUpgrade2[VersionUpgrade2["MINOR"] = 2] = "MINOR";
  VersionUpgrade2[VersionUpgrade2["MAJOR"] = 3] = "MAJOR";
  return VersionUpgrade2;
})(VersionUpgrade || {});
function getVersionUpgrade(base, update) {
  if (update.major > base.major) {
    return 3 /* MAJOR */;
  }
  if (update.major < base.major) {
    return 0 /* NONE */;
  }
  if (update.minor > base.minor) {
    return 2 /* MINOR */;
  }
  if (update.minor < base.minor) {
    return 0 /* NONE */;
  }
  return update.patch > base.patch ? 1 /* PATCH */ : 0 /* NONE */;
}

// src/filtering.ts
function createFilterToken(search, isAddress) {
  if (isAddress(search)) {
    const address = search.toLowerCase();
    return (t) => "address" in t && address === t.address.toLowerCase();
  }
  const lowerSearchParts = search.toLowerCase().split(/\s+/).filter((s) => s.length > 0);
  if (lowerSearchParts.length === 0) {
    return () => true;
  }
  const matchesSearch = (s) => {
    const sParts = s.toLowerCase().split(/\s+/).filter((s_) => s_.length > 0);
    return lowerSearchParts.every((p) => p.length === 0 || sParts.some((sp) => sp.startsWith(p) || sp.endsWith(p)));
  };
  return (token) => {
    const { symbol, name } = token;
    return Boolean(symbol && matchesSearch(symbol) || name && matchesSearch(name));
  };
}

export { VersionUpgrade, WrappedTokenInfo, __async, __spreadProps, __spreadValues, createFilterToken, deserializeToken, getVersionUpgrade };
