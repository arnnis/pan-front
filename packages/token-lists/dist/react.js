'use strict';

var chunkYOAEDKQH_js = require('./chunk-YOAEDKQH.js');
var toolkit = require('@reduxjs/toolkit');
var jotai = require('jotai');
var utils = require('jotai/utils');
var localForage = require('localforage');
var react = require('react');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var localForage__default = /*#__PURE__*/_interopDefault(localForage);

var fetchTokenList = {
  pending: toolkit.createAction("lists/fetchTokenList/pending"),
  fulfilled: toolkit.createAction("lists/fetchTokenList/fulfilled"),
  rejected: toolkit.createAction("lists/fetchTokenList/rejected")
};
var addList = toolkit.createAction("lists/addList");
var removeList = toolkit.createAction("lists/removeList");
var enableList = toolkit.createAction("lists/enableList");
var disableList = toolkit.createAction("lists/disableList");
var acceptListUpdate = toolkit.createAction("lists/acceptListUpdate");
var rejectVersionUpdate = toolkit.createAction("lists/rejectVersionUpdate");
var updateListVersion = toolkit.createAction("lists/updateListVersion");

// ../utils/uriToHttp.ts
function uriToHttp(uri) {
  var _a, _b;
  const protocol = uri.split(":")[0].toLowerCase();
  switch (protocol) {
    case "https":
      return [uri];
    case "http":
      return [`https${uri.substring(4)}`, uri];
    case "ipfs":
      const hash = (_a = uri.match(/^ipfs:(\/\/)?(.*)$/i)) == null ? void 0 : _a[2];
      return [`https://cloudflare-ipfs.com/ipfs/${hash}/`, `https://ipfs.io/ipfs/${hash}/`];
    case "ipns":
      const name = (_b = uri.match(/^ipns:(\/\/)?(.*)$/i)) == null ? void 0 : _b[2];
      return [`https://cloudflare-ipfs.com/ipns/${name}/`, `https://ipfs.io/ipns/${name}/`];
    default:
      return [];
  }
}

// schema/pancakeswap.json
var pancakeswap_default = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $id: "pancakeswap",
  title: "PancakeSwap Token List",
  description: "Schema for lists of tokens compatible with the PancakeSwap Interface, including Uniswap standard and PancakeSwap Aptos",
  definitions: {
    Version: {
      type: "object",
      description: "The version of the list, used in change detection",
      examples: [
        {
          major: 1,
          minor: 0,
          patch: 0
        }
      ],
      additionalProperties: false,
      properties: {
        major: {
          type: "integer",
          description: "The major version of the list. Must be incremented when tokens are removed from the list or token addresses are changed.",
          minimum: 0,
          examples: [1, 2]
        },
        minor: {
          type: "integer",
          description: "The minor version of the list. Must be incremented when tokens are added to the list.",
          minimum: 0,
          examples: [0, 1]
        },
        patch: {
          type: "integer",
          description: "The patch version of the list. Must be incremented for any changes to the list.",
          minimum: 0,
          examples: [0, 1]
        }
      },
      required: ["major", "minor", "patch"]
    },
    TagIdentifier: {
      type: "string",
      description: "The unique identifier of a tag",
      minLength: 1,
      maxLength: 10,
      pattern: "^[\\w]+$",
      examples: ["compound", "stablecoin"]
    },
    ExtensionIdentifier: {
      type: "string",
      description: "The name of a token extension property",
      minLength: 1,
      maxLength: 40,
      pattern: "^[\\w]+$",
      examples: ["color", "is_fee_on_transfer", "aliases"]
    },
    ExtensionMap: {
      type: "object",
      description: "An object containing any arbitrary or vendor-specific token metadata",
      maxProperties: 10,
      propertyNames: {
        $ref: "#/definitions/ExtensionIdentifier"
      },
      additionalProperties: {
        $ref: "#/definitions/ExtensionValue"
      },
      examples: [
        {
          color: "#000000",
          is_verified_by_me: true
        },
        {
          "x-bridged-addresses-by-chain": {
            "1": {
              bridgeAddress: "0x4200000000000000000000000000000000000010",
              tokenAddress: "0x4200000000000000000000000000000000000010"
            }
          }
        }
      ]
    },
    ExtensionPrimitiveValue: {
      anyOf: [
        {
          type: "string",
          minLength: 1,
          maxLength: 42,
          examples: ["#00000"]
        },
        {
          type: "boolean",
          examples: [true]
        },
        {
          type: "number",
          examples: [15]
        },
        {
          type: "null"
        }
      ]
    },
    ExtensionValue: {
      anyOf: [
        {
          $ref: "#/definitions/ExtensionPrimitiveValue"
        },
        {
          type: "object",
          maxProperties: 10,
          propertyNames: {
            $ref: "#/definitions/ExtensionIdentifier"
          },
          additionalProperties: {
            $ref: "#/definitions/ExtensionValueInner0"
          }
        }
      ]
    },
    ExtensionValueInner0: {
      anyOf: [
        {
          $ref: "#/definitions/ExtensionPrimitiveValue"
        },
        {
          type: "object",
          maxProperties: 10,
          propertyNames: {
            $ref: "#/definitions/ExtensionIdentifier"
          },
          additionalProperties: {
            $ref: "#/definitions/ExtensionValueInner1"
          }
        }
      ]
    },
    ExtensionValueInner1: {
      anyOf: [
        {
          $ref: "#/definitions/ExtensionPrimitiveValue"
        }
      ]
    },
    TagDefinition: {
      type: "object",
      description: "Definition of a tag that can be associated with a token via its identifier",
      additionalProperties: false,
      properties: {
        name: {
          type: "string",
          description: "The name of the tag",
          pattern: "^[ \\w]+$",
          minLength: 1,
          maxLength: 20
        },
        description: {
          type: "string",
          description: "A user-friendly description of the tag",
          pattern: "^[ \\w\\.,:]+$",
          minLength: 1,
          maxLength: 200
        }
      },
      required: ["name", "description"],
      examples: [
        {
          name: "Stablecoin",
          description: "A token with value pegged to another asset"
        }
      ]
    },
    TokenInfo: {
      type: "object",
      description: "Metadata for a single token in a token list",
      additionalProperties: false,
      properties: {
        chainId: {
          type: "integer",
          description: "The chain ID of the Ethereum network where this token is deployed",
          minimum: 1,
          examples: [1, 42]
        },
        address: {
          type: "string",
          description: "The checksummed address of the token on the specified chain ID",
          pattern: "^0x[a-fA-F0-9]{40}$",
          examples: ["0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"]
        },
        decimals: {
          type: "integer",
          description: "The number of decimals for the token balance",
          minimum: 0,
          maximum: 255,
          examples: [18]
        },
        name: {
          type: "string",
          description: "The name of the token",
          minLength: 1,
          maxLength: 40,
          pattern: "^[ \\w.'+\\-%/\xC0-\xD6\xD8-\xF6\xF8-\xFF:&\\[\\]\\(\\)]+$",
          examples: ["USD Coin"]
        },
        symbol: {
          type: "string",
          description: "The symbol for the token; must be alphanumeric",
          pattern: "^[a-zA-Z0-9+\\-%/$.\\s]+$",
          minLength: 1,
          maxLength: 20,
          examples: ["USDC"]
        },
        logoURI: {
          type: "string",
          description: "A URI to the token logo asset; if not set, interface will attempt to find a logo based on the token address; suggest SVG or PNG of size 64x64",
          format: "uri",
          examples: ["ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"]
        },
        tags: {
          type: "array",
          description: "An array of tag identifiers associated with the token; tags are defined at the list level",
          items: {
            $ref: "#/definitions/TagIdentifier"
          },
          maxItems: 10,
          examples: ["stablecoin", "compound"]
        },
        extensions: {
          $ref: "#/definitions/ExtensionMap"
        }
      },
      required: ["chainId", "address", "decimals", "name", "symbol"]
    },
    AptosTokenInfo: {
      type: "object",
      description: "Metadata for a single token in a token list",
      additionalProperties: false,
      properties: {
        chainId: {
          type: "integer",
          description: "The chain ID of the Aptos network where this token is deployed, 0 is devent",
          minimum: 0,
          examples: [1, 42]
        },
        address: {
          type: "string",
          description: "The address of the coin on the specified chain ID",
          examples: ["0x1::aptos_coin::AptosCoin"]
        },
        decimals: {
          type: "integer",
          description: "The number of decimals for the token balance",
          minimum: 0,
          maximum: 255,
          examples: [18]
        },
        name: {
          type: "string",
          description: "The name of the token",
          minLength: 1,
          maxLength: 40,
          pattern: "^[ \\w.'+\\-%/\xC0-\xD6\xD8-\xF6\xF8-\xFF:&\\[\\]\\(\\)]+$",
          examples: ["USD Coin"]
        },
        symbol: {
          type: "string",
          description: "The symbol for the token; must be alphanumeric",
          pattern: "^[a-zA-Z0-9+\\-%/$.]+$",
          minLength: 1,
          maxLength: 20,
          examples: ["USDC"]
        },
        logoURI: {
          type: "string",
          description: "A URI to the token logo asset; if not set, interface will attempt to find a logo based on the token address; suggest SVG or PNG of size 64x64",
          format: "uri",
          examples: ["ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"]
        },
        tags: {
          type: "array",
          description: "An array of tag identifiers associated with the token; tags are defined at the list level",
          items: {
            $ref: "#/definitions/TagIdentifier"
          },
          maxItems: 10,
          examples: ["stablecoin", "compound"]
        },
        extensions: {
          $ref: "#/definitions/ExtensionMap"
        }
      },
      required: ["chainId", "address", "decimals", "name", "symbol"]
    }
  },
  type: "object",
  additionalProperties: false,
  properties: {
    name: {
      type: "string",
      description: "The name of the token list",
      minLength: 1,
      maxLength: 30,
      pattern: "^[\\w ]+$",
      examples: ["My Token List"]
    },
    timestamp: {
      type: "string",
      format: "date-time",
      description: "The timestamp of this list version; i.e. when this immutable version of the list was created"
    },
    schema: {
      type: "string"
    },
    version: {
      $ref: "#/definitions/Version"
    },
    tokens: {
      type: "array",
      description: "The list of tokens included in the list",
      minItems: 1,
      maxItems: 1e4
    },
    keywords: {
      type: "array",
      description: "Keywords associated with the contents of the list; may be used in list discoverability",
      items: {
        type: "string",
        description: "A keyword to describe the contents of the list",
        minLength: 1,
        maxLength: 20,
        pattern: "^[\\w ]+$",
        examples: ["compound", "lending", "personal tokens"]
      },
      maxItems: 20,
      uniqueItems: true
    },
    tags: {
      type: "object",
      description: "A mapping of tag identifiers to their name and description",
      propertyNames: {
        $ref: "#/definitions/TagIdentifier"
      },
      additionalProperties: {
        $ref: "#/definitions/TagDefinition"
      },
      maxProperties: 20,
      examples: [
        {
          stablecoin: {
            name: "Stablecoin",
            description: "A token with value pegged to another asset"
          }
        }
      ]
    },
    logoURI: {
      type: "string",
      description: "A URI for the logo of the token list; prefer SVG or PNG of size 256x256",
      format: "uri",
      examples: ["ipfs://QmXfzKRvjZz3u5JRgC4v5mGVbm9ahrUiB4DgzHBsnWbTMM"]
    }
  },
  if: {
    properties: { schema: { const: "aptos" } },
    required: ["name", "timestamp", "version", "tokens", "schema"]
  },
  then: {
    properties: {
      tokens: {
        items: {
          $ref: "#/definitions/AptosTokenInfo"
        },
        type: "array",
        description: "The list of tokens included in the list",
        minItems: 1,
        maxItems: 1e4
      }
    }
  },
  else: {
    properties: {
      tokens: {
        items: {
          $ref: "#/definitions/TokenInfo"
        },
        type: "array",
        description: "The list of tokens included in the list",
        minItems: 1,
        maxItems: 1e4
      }
    }
  },
  required: ["name", "timestamp", "version", "tokens"]
};

// react/getTokenList.ts
function getTokenList(listUrl) {
  return chunkYOAEDKQH_js.__async(this, null, function* () {
    const urls = uriToHttp(listUrl);
    const { default: Ajv } = yield import('ajv');
    const validator = new Ajv({ allErrors: true }).compile(pancakeswap_default);
    for (const [i, url] of urls.entries()) {
      try {
        const json = yield fetchJson(url);
        if (!validator(json)) {
          const preFilterErrors = validator.errors;
          json.tokens = json.tokens.filter((token) => validator(chunkYOAEDKQH_js.__spreadProps(chunkYOAEDKQH_js.__spreadValues({}, json), { tokens: [token] })));
          if (!validator(json)) {
            const errors = validator.errors;
            throw new Error(`Validation failed after filtering: ${JSON.stringify(errors)}`);
          }
          console.warn(`Pre-filter validation errors: ${JSON.stringify(preFilterErrors)}`);
        }
        return json;
      } catch (error) {
        if (i === urls.length - 1) {
          throw new Error(`Failed to download list ${listUrl}`);
        }
      }
    }
    throw new Error("Unrecognized list URL protocol.");
  });
}
function fetchJson(url) {
  return chunkYOAEDKQH_js.__async(this, null, function* () {
    const res = yield fetch(url);
    if (!res.ok)
      throw new Error(`Failed to fetch: ${url}`);
    return res.json();
  });
}
function noop() {
}
var noopStorage = {
  getItem: () => Promise.resolve(noop()),
  setItem: () => Promise.resolve(noop()),
  removeItem: () => Promise.resolve(noop())
};
var EMPTY = Symbol();
var createListsAtom = (storeName, reducer, initialState) => {
  function IndexedDBStorage(dbName) {
    if (typeof window !== "undefined") {
      const db = localForage__default.default.createInstance({
        name: dbName,
        storeName
      });
      return {
        getItem: (key) => chunkYOAEDKQH_js.__async(this, null, function* () {
          const value = yield db.getItem(key);
          if (value) {
            return value;
          }
          return initialState;
        }),
        setItem: (k, v) => chunkYOAEDKQH_js.__async(this, null, function* () {
          if (v === EMPTY)
            return;
          yield db.setItem(k, v);
        }),
        removeItem: db.removeItem
      };
    }
    return noopStorage;
  }
  const listsStorageAtom = utils.atomWithStorage("lists", EMPTY, IndexedDBStorage("lists"));
  const defaultStateAtom = jotai.atom(
    (get) => {
      const value = get(utils.loadable(listsStorageAtom));
      if (value.state === "hasData" && value.data !== EMPTY) {
        return value.data;
      }
      return initialState;
    },
    (get, set, action) => chunkYOAEDKQH_js.__async(void 0, null, function* () {
      set(listsStorageAtom, reducer(yield get(defaultStateAtom), action));
    })
  );
  const isReadyAtom = utils.loadable(listsStorageAtom);
  function useListState() {
    return jotai.useAtom(defaultStateAtom);
  }
  function useListStateReady() {
    const value = jotai.useAtomValue(isReadyAtom);
    return value.state === "hasData" && value.data !== EMPTY;
  }
  return {
    listsAtom: defaultStateAtom,
    useListStateReady,
    useListState
  };
};
var NEW_LIST_STATE = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null
};
var createTokenListReducer = (initialState, DEFAULT_LIST_OF_LISTS, DEFAULT_ACTIVE_LIST_URLS) => toolkit.createReducer(
  initialState,
  (builder) => builder.addCase(fetchTokenList.pending, (state, { payload: { requestId, url } }) => {
    var _a, _b, _c, _d;
    const current = (_b = (_a = state.byUrl[url]) == null ? void 0 : _a.current) != null ? _b : null;
    const pendingUpdate = (_d = (_c = state.byUrl[url]) == null ? void 0 : _c.pendingUpdate) != null ? _d : null;
    state.byUrl[url] = {
      current,
      pendingUpdate,
      loadingRequestId: requestId,
      error: null
    };
  }).addCase(fetchTokenList.fulfilled, (state, { payload: { requestId, tokenList, url } }) => {
    var _a, _b;
    const current = (_a = state.byUrl[url]) == null ? void 0 : _a.current;
    const loadingRequestId = (_b = state.byUrl[url]) == null ? void 0 : _b.loadingRequestId;
    if (current) {
      const upgradeType = chunkYOAEDKQH_js.getVersionUpgrade(current.version, tokenList.version);
      if (upgradeType === 0 /* NONE */)
        return;
      if (loadingRequestId === null || loadingRequestId === requestId) {
        state.byUrl[url] = chunkYOAEDKQH_js.__spreadProps(chunkYOAEDKQH_js.__spreadValues({}, state.byUrl[url]), {
          loadingRequestId: null,
          error: null,
          current,
          pendingUpdate: tokenList
        });
      }
    } else {
      if (DEFAULT_ACTIVE_LIST_URLS.includes(url) && state.activeListUrls && !state.activeListUrls.includes(url)) {
        state.activeListUrls.push(url);
      }
      state.byUrl[url] = chunkYOAEDKQH_js.__spreadProps(chunkYOAEDKQH_js.__spreadValues({}, state.byUrl[url]), {
        loadingRequestId: null,
        error: null,
        current: tokenList,
        pendingUpdate: null
      });
    }
  }).addCase(fetchTokenList.rejected, (state, { payload: { url, requestId, errorMessage } }) => {
    var _a;
    if (((_a = state.byUrl[url]) == null ? void 0 : _a.loadingRequestId) !== requestId) {
      return;
    }
    state.byUrl[url] = chunkYOAEDKQH_js.__spreadProps(chunkYOAEDKQH_js.__spreadValues({}, state.byUrl[url]), {
      loadingRequestId: null,
      error: errorMessage,
      current: null,
      pendingUpdate: null
    });
  }).addCase(addList, (state, { payload: url }) => {
    if (!state.byUrl[url]) {
      state.byUrl[url] = NEW_LIST_STATE;
    }
  }).addCase(removeList, (state, { payload: url }) => {
    if (state.byUrl[url]) {
      delete state.byUrl[url];
    }
    if (state.activeListUrls && state.activeListUrls.includes(url)) {
      state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
    }
  }).addCase(enableList, (state, { payload: url }) => {
    if (!state.byUrl[url]) {
      state.byUrl[url] = NEW_LIST_STATE;
    }
    if (state.activeListUrls && !state.activeListUrls.includes(url)) {
      state.activeListUrls.push(url);
    }
    if (!state.activeListUrls) {
      state.activeListUrls = [url];
    }
  }).addCase(disableList, (state, { payload: url }) => {
    if (state.activeListUrls && state.activeListUrls.includes(url)) {
      state.activeListUrls = state.activeListUrls.filter((u) => u !== url);
    }
  }).addCase(acceptListUpdate, (state, { payload: url }) => {
    var _a;
    if (!((_a = state.byUrl[url]) == null ? void 0 : _a.pendingUpdate)) {
      throw new Error("accept list update called without pending update");
    }
    state.byUrl[url] = chunkYOAEDKQH_js.__spreadProps(chunkYOAEDKQH_js.__spreadValues({}, state.byUrl[url]), {
      pendingUpdate: null,
      current: state.byUrl[url].pendingUpdate
    });
  }).addCase(updateListVersion, (state) => {
    if (!state.lastInitializedDefaultListOfLists) {
      state.byUrl = initialState.byUrl;
      state.activeListUrls = initialState.activeListUrls;
    } else if (state.lastInitializedDefaultListOfLists) {
      const lastInitializedSet = state.lastInitializedDefaultListOfLists.reduce(
        (s, l) => s.add(l),
        /* @__PURE__ */ new Set()
      );
      const newListOfListsSet = DEFAULT_LIST_OF_LISTS.reduce((s, l) => s.add(l), /* @__PURE__ */ new Set());
      DEFAULT_LIST_OF_LISTS.forEach((listUrl) => {
        if (!lastInitializedSet.has(listUrl)) {
          state.byUrl[listUrl] = NEW_LIST_STATE;
        }
      });
      state.lastInitializedDefaultListOfLists.forEach((listUrl) => {
        if (!newListOfListsSet.has(listUrl)) {
          delete state.byUrl[listUrl];
        }
      });
    }
    state.lastInitializedDefaultListOfLists = DEFAULT_LIST_OF_LISTS;
    if (!state.activeListUrls) {
      state.activeListUrls = DEFAULT_ACTIVE_LIST_URLS;
      DEFAULT_ACTIVE_LIST_URLS.forEach((listUrl) => {
        if (!state.byUrl[listUrl]) {
          state.byUrl[listUrl] = NEW_LIST_STATE;
        }
        return true;
      });
    }
  })
);
function useFetchListCallback(dispatch) {
  return react.useCallback(
    (listUrl, sendDispatch = true) => chunkYOAEDKQH_js.__async(this, null, function* () {
      const requestId = toolkit.nanoid();
      if (sendDispatch) {
        dispatch(fetchTokenList.pending({ requestId, url: listUrl }));
      }
      return getTokenList(listUrl).then((tokenList) => {
        if (sendDispatch) {
          dispatch(fetchTokenList.fulfilled({ url: listUrl, tokenList, requestId }));
        }
        return tokenList;
      }).catch((error) => {
        console.error(`Failed to get list at url ${listUrl}`, error);
        if (sendDispatch) {
          dispatch(fetchTokenList.rejected({ url: listUrl, requestId, errorMessage: error.message }));
        }
        throw error;
      });
    }),
    [dispatch]
  );
}
var useFetchListCallback_default = useFetchListCallback;

exports.NEW_LIST_STATE = NEW_LIST_STATE;
exports.acceptListUpdate = acceptListUpdate;
exports.addList = addList;
exports.createListsAtom = createListsAtom;
exports.createTokenListReducer = createTokenListReducer;
exports.disableList = disableList;
exports.enableList = enableList;
exports.fetchTokenList = fetchTokenList;
exports.getTokenList = getTokenList;
exports.rejectVersionUpdate = rejectVersionUpdate;
exports.removeList = removeList;
exports.updateListVersion = updateListVersion;
exports.useFetchListCallback = useFetchListCallback_default;
