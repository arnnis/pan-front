'use strict';

var chains = require('@pancakeswap/chains');
var viem = require('viem');
var v3Sdk = require('@pancakeswap/v3-sdk');

var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __accessCheck = (obj, member, msg) => {
  if (!member.has(obj))
    throw TypeError("Cannot " + msg);
};
var __privateGet = (obj, member, getter) => {
  __accessCheck(obj, member, "read from private field");
  return getter ? getter.call(obj) : member.get(obj);
};
var __privateAdd = (obj, member, value) => {
  if (member.has(obj))
    throw TypeError("Cannot add the same private member more than once");
  member instanceof WeakSet ? member.add(obj) : member.set(obj, value);
};
var __privateSet = (obj, member, value, setter) => {
  __accessCheck(obj, member, "write to private field");
  setter ? setter.call(obj, value) : member.set(obj, value);
  return value;
};
var __privateWrapper = (obj, member, setter, getter) => ({
  set _(value) {
    __privateSet(obj, member, value, setter);
  },
  get _() {
    return __privateGet(obj, member, getter);
  }
});
var __privateMethod = (obj, member, method) => {
  __accessCheck(obj, member, "access private method");
  return method;
};

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js
var require_freeGlobal = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_freeGlobal.js"(exports, module) {
    var freeGlobal = typeof global == "object" && global && global.Object === Object && global;
    module.exports = freeGlobal;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js
var require_root = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_root.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeSelf = typeof self == "object" && self && self.Object === Object && self;
    var root = freeGlobal || freeSelf || Function("return this")();
    module.exports = root;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js
var require_Symbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Symbol.js"(exports, module) {
    var root = require_root();
    var Symbol2 = root.Symbol;
    module.exports = Symbol2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js
var require_getRawTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getRawTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var nativeObjectToString = objectProto.toString;
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function getRawTag(value) {
      var isOwn = hasOwnProperty.call(value, symToStringTag), tag = value[symToStringTag];
      try {
        value[symToStringTag] = void 0;
        var unmasked = true;
      } catch (e) {
      }
      var result = nativeObjectToString.call(value);
      if (unmasked) {
        if (isOwn) {
          value[symToStringTag] = tag;
        } else {
          delete value[symToStringTag];
        }
      }
      return result;
    }
    module.exports = getRawTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js
var require_objectToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_objectToString.js"(exports, module) {
    var objectProto = Object.prototype;
    var nativeObjectToString = objectProto.toString;
    function objectToString(value) {
      return nativeObjectToString.call(value);
    }
    module.exports = objectToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js
var require_baseGetTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var getRawTag = require_getRawTag();
    var objectToString = require_objectToString();
    var nullTag = "[object Null]";
    var undefinedTag = "[object Undefined]";
    var symToStringTag = Symbol2 ? Symbol2.toStringTag : void 0;
    function baseGetTag(value) {
      if (value == null) {
        return value === void 0 ? undefinedTag : nullTag;
      }
      return symToStringTag && symToStringTag in Object(value) ? getRawTag(value) : objectToString(value);
    }
    module.exports = baseGetTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js
var require_isObject = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObject.js"(exports, module) {
    function isObject(value) {
      var type = typeof value;
      return value != null && (type == "object" || type == "function");
    }
    module.exports = isObject;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js
var require_isFunction = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isFunction.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObject = require_isObject();
    var asyncTag = "[object AsyncFunction]";
    var funcTag = "[object Function]";
    var genTag = "[object GeneratorFunction]";
    var proxyTag = "[object Proxy]";
    function isFunction(value) {
      if (!isObject(value)) {
        return false;
      }
      var tag = baseGetTag(value);
      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
    }
    module.exports = isFunction;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js
var require_coreJsData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_coreJsData.js"(exports, module) {
    var root = require_root();
    var coreJsData = root["__core-js_shared__"];
    module.exports = coreJsData;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js
var require_isMasked = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isMasked.js"(exports, module) {
    var coreJsData = require_coreJsData();
    var maskSrcKey = function() {
      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || "");
      return uid ? "Symbol(src)_1." + uid : "";
    }();
    function isMasked(func) {
      return !!maskSrcKey && maskSrcKey in func;
    }
    module.exports = isMasked;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js
var require_toSource = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toSource.js"(exports, module) {
    var funcProto = Function.prototype;
    var funcToString = funcProto.toString;
    function toSource(func) {
      if (func != null) {
        try {
          return funcToString.call(func);
        } catch (e) {
        }
        try {
          return func + "";
        } catch (e) {
        }
      }
      return "";
    }
    module.exports = toSource;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js
var require_baseIsNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsNative.js"(exports, module) {
    var isFunction = require_isFunction();
    var isMasked = require_isMasked();
    var isObject = require_isObject();
    var toSource = require_toSource();
    var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    var reIsHostCtor = /^\[object .+?Constructor\]$/;
    var funcProto = Function.prototype;
    var objectProto = Object.prototype;
    var funcToString = funcProto.toString;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var reIsNative = RegExp(
      "^" + funcToString.call(hasOwnProperty).replace(reRegExpChar, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
    );
    function baseIsNative(value) {
      if (!isObject(value) || isMasked(value)) {
        return false;
      }
      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
      return pattern.test(toSource(value));
    }
    module.exports = baseIsNative;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js
var require_getValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getValue.js"(exports, module) {
    function getValue(object, key) {
      return object == null ? void 0 : object[key];
    }
    module.exports = getValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js
var require_getNative = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getNative.js"(exports, module) {
    var baseIsNative = require_baseIsNative();
    var getValue = require_getValue();
    function getNative(object, key) {
      var value = getValue(object, key);
      return baseIsNative(value) ? value : void 0;
    }
    module.exports = getNative;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js
var require_defineProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_defineProperty.js"(exports, module) {
    var getNative = require_getNative();
    var defineProperty = function() {
      try {
        var func = getNative(Object, "defineProperty");
        func({}, "", {});
        return func;
      } catch (e) {
      }
    }();
    module.exports = defineProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js
var require_baseAssignValue = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAssignValue.js"(exports, module) {
    var defineProperty = require_defineProperty();
    function baseAssignValue(object, key, value) {
      if (key == "__proto__" && defineProperty) {
        defineProperty(object, key, {
          "configurable": true,
          "enumerable": true,
          "value": value,
          "writable": true
        });
      } else {
        object[key] = value;
      }
    }
    module.exports = baseAssignValue;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayAggregator.js
var require_arrayAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayAggregator.js"(exports, module) {
    function arrayAggregator(array, setter, iteratee, accumulator) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        var value = array[index];
        setter(accumulator, value, iteratee(value), array);
      }
      return accumulator;
    }
    module.exports = arrayAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createBaseFor.js
var require_createBaseFor = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createBaseFor.js"(exports, module) {
    function createBaseFor(fromRight) {
      return function(object, iteratee, keysFunc) {
        var index = -1, iterable = Object(object), props = keysFunc(object), length = props.length;
        while (length--) {
          var key = props[fromRight ? length : ++index];
          if (iteratee(iterable[key], key, iterable) === false) {
            break;
          }
        }
        return object;
      };
    }
    module.exports = createBaseFor;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFor.js
var require_baseFor = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseFor.js"(exports, module) {
    var createBaseFor = require_createBaseFor();
    var baseFor = createBaseFor();
    module.exports = baseFor;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js
var require_baseTimes = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseTimes.js"(exports, module) {
    function baseTimes(n, iteratee) {
      var index = -1, result = Array(n);
      while (++index < n) {
        result[index] = iteratee(index);
      }
      return result;
    }
    module.exports = baseTimes;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js
var require_isObjectLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isObjectLike.js"(exports, module) {
    function isObjectLike(value) {
      return value != null && typeof value == "object";
    }
    module.exports = isObjectLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js
var require_baseIsArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsArguments.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    function baseIsArguments(value) {
      return isObjectLike(value) && baseGetTag(value) == argsTag;
    }
    module.exports = baseIsArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js
var require_isArguments = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArguments.js"(exports, module) {
    var baseIsArguments = require_baseIsArguments();
    var isObjectLike = require_isObjectLike();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var isArguments = baseIsArguments(function() {
      return arguments;
    }()) ? baseIsArguments : function(value) {
      return isObjectLike(value) && hasOwnProperty.call(value, "callee") && !propertyIsEnumerable.call(value, "callee");
    };
    module.exports = isArguments;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js
var require_isArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArray.js"(exports, module) {
    var isArray = Array.isArray;
    module.exports = isArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubFalse.js
var require_stubFalse = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubFalse.js"(exports, module) {
    function stubFalse() {
      return false;
    }
    module.exports = stubFalse;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js
var require_isBuffer = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isBuffer.js"(exports, module) {
    var root = require_root();
    var stubFalse = require_stubFalse();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var Buffer2 = moduleExports ? root.Buffer : void 0;
    var nativeIsBuffer = Buffer2 ? Buffer2.isBuffer : void 0;
    var isBuffer = nativeIsBuffer || stubFalse;
    module.exports = isBuffer;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js
var require_isIndex = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isIndex.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    var reIsUint = /^(?:0|[1-9]\d*)$/;
    function isIndex(value, length) {
      var type = typeof value;
      length = length == null ? MAX_SAFE_INTEGER : length;
      return !!length && (type == "number" || type != "symbol" && reIsUint.test(value)) && (value > -1 && value % 1 == 0 && value < length);
    }
    module.exports = isIndex;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js
var require_isLength = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isLength.js"(exports, module) {
    var MAX_SAFE_INTEGER = 9007199254740991;
    function isLength(value) {
      return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
    }
    module.exports = isLength;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsTypedArray.js
var require_baseIsTypedArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsTypedArray.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isLength = require_isLength();
    var isObjectLike = require_isObjectLike();
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var funcTag = "[object Function]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var objectTag = "[object Object]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var weakMapTag = "[object WeakMap]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var float32Tag = "[object Float32Array]";
    var float64Tag = "[object Float64Array]";
    var int8Tag = "[object Int8Array]";
    var int16Tag = "[object Int16Array]";
    var int32Tag = "[object Int32Array]";
    var uint8Tag = "[object Uint8Array]";
    var uint8ClampedTag = "[object Uint8ClampedArray]";
    var uint16Tag = "[object Uint16Array]";
    var uint32Tag = "[object Uint32Array]";
    var typedArrayTags = {};
    typedArrayTags[float32Tag] = typedArrayTags[float64Tag] = typedArrayTags[int8Tag] = typedArrayTags[int16Tag] = typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] = typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] = typedArrayTags[uint32Tag] = true;
    typedArrayTags[argsTag] = typedArrayTags[arrayTag] = typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] = typedArrayTags[dataViewTag] = typedArrayTags[dateTag] = typedArrayTags[errorTag] = typedArrayTags[funcTag] = typedArrayTags[mapTag] = typedArrayTags[numberTag] = typedArrayTags[objectTag] = typedArrayTags[regexpTag] = typedArrayTags[setTag] = typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;
    function baseIsTypedArray(value) {
      return isObjectLike(value) && isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
    }
    module.exports = baseIsTypedArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js
var require_baseUnary = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseUnary.js"(exports, module) {
    function baseUnary(func) {
      return function(value) {
        return func(value);
      };
    }
    module.exports = baseUnary;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js
var require_nodeUtil = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nodeUtil.js"(exports, module) {
    var freeGlobal = require_freeGlobal();
    var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
    var freeModule = freeExports && typeof module == "object" && module && !module.nodeType && module;
    var moduleExports = freeModule && freeModule.exports === freeExports;
    var freeProcess = moduleExports && freeGlobal.process;
    var nodeUtil = function() {
      try {
        var types = freeModule && freeModule.require && freeModule.require("util").types;
        if (types) {
          return types;
        }
        return freeProcess && freeProcess.binding && freeProcess.binding("util");
      } catch (e) {
      }
    }();
    module.exports = nodeUtil;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isTypedArray.js
var require_isTypedArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isTypedArray.js"(exports, module) {
    var baseIsTypedArray = require_baseIsTypedArray();
    var baseUnary = require_baseUnary();
    var nodeUtil = require_nodeUtil();
    var nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;
    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;
    module.exports = isTypedArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js
var require_arrayLikeKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayLikeKeys.js"(exports, module) {
    var baseTimes = require_baseTimes();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isIndex = require_isIndex();
    var isTypedArray = require_isTypedArray();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function arrayLikeKeys(value, inherited) {
      var isArr = isArray(value), isArg = !isArr && isArguments(value), isBuff = !isArr && !isArg && isBuffer(value), isType = !isArr && !isArg && !isBuff && isTypedArray(value), skipIndexes = isArr || isArg || isBuff || isType, result = skipIndexes ? baseTimes(value.length, String) : [], length = result.length;
      for (var key in value) {
        if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && // Safari 9 has enumerable `arguments.length` in strict mode.
        (key == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
        isBuff && (key == "offset" || key == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
        isType && (key == "buffer" || key == "byteLength" || key == "byteOffset") || // Skip index properties.
        isIndex(key, length)))) {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = arrayLikeKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js
var require_isPrototype = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isPrototype.js"(exports, module) {
    var objectProto = Object.prototype;
    function isPrototype(value) {
      var Ctor = value && value.constructor, proto = typeof Ctor == "function" && Ctor.prototype || objectProto;
      return value === proto;
    }
    module.exports = isPrototype;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overArg.js
var require_overArg = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_overArg.js"(exports, module) {
    function overArg(func, transform) {
      return function(arg) {
        return func(transform(arg));
      };
    }
    module.exports = overArg;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeys.js
var require_nativeKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeKeys.js"(exports, module) {
    var overArg = require_overArg();
    var nativeKeys = overArg(Object.keys, Object);
    module.exports = nativeKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeys.js
var require_baseKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseKeys.js"(exports, module) {
    var isPrototype = require_isPrototype();
    var nativeKeys = require_nativeKeys();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseKeys(object) {
      if (!isPrototype(object)) {
        return nativeKeys(object);
      }
      var result = [];
      for (var key in Object(object)) {
        if (hasOwnProperty.call(object, key) && key != "constructor") {
          result.push(key);
        }
      }
      return result;
    }
    module.exports = baseKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js
var require_isArrayLike = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isArrayLike.js"(exports, module) {
    var isFunction = require_isFunction();
    var isLength = require_isLength();
    function isArrayLike(value) {
      return value != null && isLength(value.length) && !isFunction(value);
    }
    module.exports = isArrayLike;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js
var require_keys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keys.js"(exports, module) {
    var arrayLikeKeys = require_arrayLikeKeys();
    var baseKeys = require_baseKeys();
    var isArrayLike = require_isArrayLike();
    function keys(object) {
      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
    }
    module.exports = keys;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseForOwn.js
var require_baseForOwn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseForOwn.js"(exports, module) {
    var baseFor = require_baseFor();
    var keys = require_keys();
    function baseForOwn(object, iteratee) {
      return object && baseFor(object, iteratee, keys);
    }
    module.exports = baseForOwn;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createBaseEach.js
var require_createBaseEach = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createBaseEach.js"(exports, module) {
    var isArrayLike = require_isArrayLike();
    function createBaseEach(eachFunc, fromRight) {
      return function(collection, iteratee) {
        if (collection == null) {
          return collection;
        }
        if (!isArrayLike(collection)) {
          return eachFunc(collection, iteratee);
        }
        var length = collection.length, index = fromRight ? length : -1, iterable = Object(collection);
        while (fromRight ? index-- : ++index < length) {
          if (iteratee(iterable[index], index, iterable) === false) {
            break;
          }
        }
        return collection;
      };
    }
    module.exports = createBaseEach;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseEach.js
var require_baseEach = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseEach.js"(exports, module) {
    var baseForOwn = require_baseForOwn();
    var createBaseEach = require_createBaseEach();
    var baseEach = createBaseEach(baseForOwn);
    module.exports = baseEach;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAggregator.js
var require_baseAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseAggregator.js"(exports, module) {
    var baseEach = require_baseEach();
    function baseAggregator(collection, setter, iteratee, accumulator) {
      baseEach(collection, function(value, key, collection2) {
        setter(accumulator, value, iteratee(value), collection2);
      });
      return accumulator;
    }
    module.exports = baseAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js
var require_listCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheClear.js"(exports, module) {
    function listCacheClear() {
      this.__data__ = [];
      this.size = 0;
    }
    module.exports = listCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js
var require_eq = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/eq.js"(exports, module) {
    function eq(value, other) {
      return value === other || value !== value && other !== other;
    }
    module.exports = eq;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js
var require_assocIndexOf = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_assocIndexOf.js"(exports, module) {
    var eq = require_eq();
    function assocIndexOf(array, key) {
      var length = array.length;
      while (length--) {
        if (eq(array[length][0], key)) {
          return length;
        }
      }
      return -1;
    }
    module.exports = assocIndexOf;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js
var require_listCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheDelete.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    var arrayProto = Array.prototype;
    var splice = arrayProto.splice;
    function listCacheDelete(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        return false;
      }
      var lastIndex = data.length - 1;
      if (index == lastIndex) {
        data.pop();
      } else {
        splice.call(data, index, 1);
      }
      --this.size;
      return true;
    }
    module.exports = listCacheDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js
var require_listCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheGet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheGet(key) {
      var data = this.__data__, index = assocIndexOf(data, key);
      return index < 0 ? void 0 : data[index][1];
    }
    module.exports = listCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js
var require_listCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheHas.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheHas(key) {
      return assocIndexOf(this.__data__, key) > -1;
    }
    module.exports = listCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js
var require_listCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_listCacheSet.js"(exports, module) {
    var assocIndexOf = require_assocIndexOf();
    function listCacheSet(key, value) {
      var data = this.__data__, index = assocIndexOf(data, key);
      if (index < 0) {
        ++this.size;
        data.push([key, value]);
      } else {
        data[index][1] = value;
      }
      return this;
    }
    module.exports = listCacheSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js
var require_ListCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_ListCache.js"(exports, module) {
    var listCacheClear = require_listCacheClear();
    var listCacheDelete = require_listCacheDelete();
    var listCacheGet = require_listCacheGet();
    var listCacheHas = require_listCacheHas();
    var listCacheSet = require_listCacheSet();
    function ListCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    ListCache.prototype.clear = listCacheClear;
    ListCache.prototype["delete"] = listCacheDelete;
    ListCache.prototype.get = listCacheGet;
    ListCache.prototype.has = listCacheHas;
    ListCache.prototype.set = listCacheSet;
    module.exports = ListCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackClear.js
var require_stackClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackClear.js"(exports, module) {
    var ListCache = require_ListCache();
    function stackClear() {
      this.__data__ = new ListCache();
      this.size = 0;
    }
    module.exports = stackClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackDelete.js
var require_stackDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackDelete.js"(exports, module) {
    function stackDelete(key) {
      var data = this.__data__, result = data["delete"](key);
      this.size = data.size;
      return result;
    }
    module.exports = stackDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackGet.js
var require_stackGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackGet.js"(exports, module) {
    function stackGet(key) {
      return this.__data__.get(key);
    }
    module.exports = stackGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackHas.js
var require_stackHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackHas.js"(exports, module) {
    function stackHas(key) {
      return this.__data__.has(key);
    }
    module.exports = stackHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js
var require_Map = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Map.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Map2 = getNative(root, "Map");
    module.exports = Map2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js
var require_nativeCreate = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_nativeCreate.js"(exports, module) {
    var getNative = require_getNative();
    var nativeCreate = getNative(Object, "create");
    module.exports = nativeCreate;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js
var require_hashClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashClear.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    function hashClear() {
      this.__data__ = nativeCreate ? nativeCreate(null) : {};
      this.size = 0;
    }
    module.exports = hashClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js
var require_hashDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashDelete.js"(exports, module) {
    function hashDelete(key) {
      var result = this.has(key) && delete this.__data__[key];
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = hashDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js
var require_hashGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashGet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashGet(key) {
      var data = this.__data__;
      if (nativeCreate) {
        var result = data[key];
        return result === HASH_UNDEFINED ? void 0 : result;
      }
      return hasOwnProperty.call(data, key) ? data[key] : void 0;
    }
    module.exports = hashGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js
var require_hashHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashHas.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function hashHas(key) {
      var data = this.__data__;
      return nativeCreate ? data[key] !== void 0 : hasOwnProperty.call(data, key);
    }
    module.exports = hashHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js
var require_hashSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hashSet.js"(exports, module) {
    var nativeCreate = require_nativeCreate();
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function hashSet(key, value) {
      var data = this.__data__;
      this.size += this.has(key) ? 0 : 1;
      data[key] = nativeCreate && value === void 0 ? HASH_UNDEFINED : value;
      return this;
    }
    module.exports = hashSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js
var require_Hash = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Hash.js"(exports, module) {
    var hashClear = require_hashClear();
    var hashDelete = require_hashDelete();
    var hashGet = require_hashGet();
    var hashHas = require_hashHas();
    var hashSet = require_hashSet();
    function Hash(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    Hash.prototype.clear = hashClear;
    Hash.prototype["delete"] = hashDelete;
    Hash.prototype.get = hashGet;
    Hash.prototype.has = hashHas;
    Hash.prototype.set = hashSet;
    module.exports = Hash;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js
var require_mapCacheClear = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheClear.js"(exports, module) {
    var Hash = require_Hash();
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    function mapCacheClear() {
      this.size = 0;
      this.__data__ = {
        "hash": new Hash(),
        "map": new (Map2 || ListCache)(),
        "string": new Hash()
      };
    }
    module.exports = mapCacheClear;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js
var require_isKeyable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKeyable.js"(exports, module) {
    function isKeyable(value) {
      var type = typeof value;
      return type == "string" || type == "number" || type == "symbol" || type == "boolean" ? value !== "__proto__" : value === null;
    }
    module.exports = isKeyable;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js
var require_getMapData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMapData.js"(exports, module) {
    var isKeyable = require_isKeyable();
    function getMapData(map, key) {
      var data = map.__data__;
      return isKeyable(key) ? data[typeof key == "string" ? "string" : "hash"] : data.map;
    }
    module.exports = getMapData;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js
var require_mapCacheDelete = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheDelete.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheDelete(key) {
      var result = getMapData(this, key)["delete"](key);
      this.size -= result ? 1 : 0;
      return result;
    }
    module.exports = mapCacheDelete;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js
var require_mapCacheGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheGet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheGet(key) {
      return getMapData(this, key).get(key);
    }
    module.exports = mapCacheGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js
var require_mapCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheHas.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheHas(key) {
      return getMapData(this, key).has(key);
    }
    module.exports = mapCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js
var require_mapCacheSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapCacheSet.js"(exports, module) {
    var getMapData = require_getMapData();
    function mapCacheSet(key, value) {
      var data = getMapData(this, key), size = data.size;
      data.set(key, value);
      this.size += data.size == size ? 0 : 1;
      return this;
    }
    module.exports = mapCacheSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js
var require_MapCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_MapCache.js"(exports, module) {
    var mapCacheClear = require_mapCacheClear();
    var mapCacheDelete = require_mapCacheDelete();
    var mapCacheGet = require_mapCacheGet();
    var mapCacheHas = require_mapCacheHas();
    var mapCacheSet = require_mapCacheSet();
    function MapCache(entries) {
      var index = -1, length = entries == null ? 0 : entries.length;
      this.clear();
      while (++index < length) {
        var entry = entries[index];
        this.set(entry[0], entry[1]);
      }
    }
    MapCache.prototype.clear = mapCacheClear;
    MapCache.prototype["delete"] = mapCacheDelete;
    MapCache.prototype.get = mapCacheGet;
    MapCache.prototype.has = mapCacheHas;
    MapCache.prototype.set = mapCacheSet;
    module.exports = MapCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackSet.js
var require_stackSet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stackSet.js"(exports, module) {
    var ListCache = require_ListCache();
    var Map2 = require_Map();
    var MapCache = require_MapCache();
    var LARGE_ARRAY_SIZE = 200;
    function stackSet(key, value) {
      var data = this.__data__;
      if (data instanceof ListCache) {
        var pairs = data.__data__;
        if (!Map2 || pairs.length < LARGE_ARRAY_SIZE - 1) {
          pairs.push([key, value]);
          this.size = ++data.size;
          return this;
        }
        data = this.__data__ = new MapCache(pairs);
      }
      data.set(key, value);
      this.size = data.size;
      return this;
    }
    module.exports = stackSet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js
var require_Stack = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Stack.js"(exports, module) {
    var ListCache = require_ListCache();
    var stackClear = require_stackClear();
    var stackDelete = require_stackDelete();
    var stackGet = require_stackGet();
    var stackHas = require_stackHas();
    var stackSet = require_stackSet();
    function Stack(entries) {
      var data = this.__data__ = new ListCache(entries);
      this.size = data.size;
    }
    Stack.prototype.clear = stackClear;
    Stack.prototype["delete"] = stackDelete;
    Stack.prototype.get = stackGet;
    Stack.prototype.has = stackHas;
    Stack.prototype.set = stackSet;
    module.exports = Stack;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheAdd.js
var require_setCacheAdd = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheAdd.js"(exports, module) {
    var HASH_UNDEFINED = "__lodash_hash_undefined__";
    function setCacheAdd(value) {
      this.__data__.set(value, HASH_UNDEFINED);
      return this;
    }
    module.exports = setCacheAdd;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheHas.js
var require_setCacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setCacheHas.js"(exports, module) {
    function setCacheHas(value) {
      return this.__data__.has(value);
    }
    module.exports = setCacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_SetCache.js
var require_SetCache = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_SetCache.js"(exports, module) {
    var MapCache = require_MapCache();
    var setCacheAdd = require_setCacheAdd();
    var setCacheHas = require_setCacheHas();
    function SetCache(values) {
      var index = -1, length = values == null ? 0 : values.length;
      this.__data__ = new MapCache();
      while (++index < length) {
        this.add(values[index]);
      }
    }
    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
    SetCache.prototype.has = setCacheHas;
    module.exports = SetCache;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arraySome.js
var require_arraySome = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arraySome.js"(exports, module) {
    function arraySome(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length;
      while (++index < length) {
        if (predicate(array[index], index, array)) {
          return true;
        }
      }
      return false;
    }
    module.exports = arraySome;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cacheHas.js
var require_cacheHas = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_cacheHas.js"(exports, module) {
    function cacheHas(cache, key) {
      return cache.has(key);
    }
    module.exports = cacheHas;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalArrays.js
var require_equalArrays = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalArrays.js"(exports, module) {
    var SetCache = require_SetCache();
    var arraySome = require_arraySome();
    var cacheHas = require_cacheHas();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, arrLength = array.length, othLength = other.length;
      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
        return false;
      }
      var arrStacked = stack.get(array);
      var othStacked = stack.get(other);
      if (arrStacked && othStacked) {
        return arrStacked == other && othStacked == array;
      }
      var index = -1, result = true, seen = bitmask & COMPARE_UNORDERED_FLAG ? new SetCache() : void 0;
      stack.set(array, other);
      stack.set(other, array);
      while (++index < arrLength) {
        var arrValue = array[index], othValue = other[index];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, arrValue, index, other, array, stack) : customizer(arrValue, othValue, index, array, other, stack);
        }
        if (compared !== void 0) {
          if (compared) {
            continue;
          }
          result = false;
          break;
        }
        if (seen) {
          if (!arraySome(other, function(othValue2, othIndex) {
            if (!cacheHas(seen, othIndex) && (arrValue === othValue2 || equalFunc(arrValue, othValue2, bitmask, customizer, stack))) {
              return seen.push(othIndex);
            }
          })) {
            result = false;
            break;
          }
        } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
          result = false;
          break;
        }
      }
      stack["delete"](array);
      stack["delete"](other);
      return result;
    }
    module.exports = equalArrays;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Uint8Array.js
var require_Uint8Array = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Uint8Array.js"(exports, module) {
    var root = require_root();
    var Uint8Array2 = root.Uint8Array;
    module.exports = Uint8Array2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapToArray.js
var require_mapToArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_mapToArray.js"(exports, module) {
    function mapToArray(map) {
      var index = -1, result = Array(map.size);
      map.forEach(function(value, key) {
        result[++index] = [key, value];
      });
      return result;
    }
    module.exports = mapToArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToArray.js
var require_setToArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_setToArray.js"(exports, module) {
    function setToArray(set) {
      var index = -1, result = Array(set.size);
      set.forEach(function(value) {
        result[++index] = value;
      });
      return result;
    }
    module.exports = setToArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalByTag.js
var require_equalByTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalByTag.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var Uint8Array2 = require_Uint8Array();
    var eq = require_eq();
    var equalArrays = require_equalArrays();
    var mapToArray = require_mapToArray();
    var setToArray = require_setToArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    var boolTag = "[object Boolean]";
    var dateTag = "[object Date]";
    var errorTag = "[object Error]";
    var mapTag = "[object Map]";
    var numberTag = "[object Number]";
    var regexpTag = "[object RegExp]";
    var setTag = "[object Set]";
    var stringTag = "[object String]";
    var symbolTag = "[object Symbol]";
    var arrayBufferTag = "[object ArrayBuffer]";
    var dataViewTag = "[object DataView]";
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolValueOf = symbolProto ? symbolProto.valueOf : void 0;
    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
      switch (tag) {
        case dataViewTag:
          if (object.byteLength != other.byteLength || object.byteOffset != other.byteOffset) {
            return false;
          }
          object = object.buffer;
          other = other.buffer;
        case arrayBufferTag:
          if (object.byteLength != other.byteLength || !equalFunc(new Uint8Array2(object), new Uint8Array2(other))) {
            return false;
          }
          return true;
        case boolTag:
        case dateTag:
        case numberTag:
          return eq(+object, +other);
        case errorTag:
          return object.name == other.name && object.message == other.message;
        case regexpTag:
        case stringTag:
          return object == other + "";
        case mapTag:
          var convert = mapToArray;
        case setTag:
          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
          convert || (convert = setToArray);
          if (object.size != other.size && !isPartial) {
            return false;
          }
          var stacked = stack.get(object);
          if (stacked) {
            return stacked == other;
          }
          bitmask |= COMPARE_UNORDERED_FLAG;
          stack.set(object, other);
          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
          stack["delete"](object);
          return result;
        case symbolTag:
          if (symbolValueOf) {
            return symbolValueOf.call(object) == symbolValueOf.call(other);
          }
      }
      return false;
    }
    module.exports = equalByTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js
var require_arrayPush = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayPush.js"(exports, module) {
    function arrayPush(array, values) {
      var index = -1, length = values.length, offset = array.length;
      while (++index < length) {
        array[offset + index] = values[index];
      }
      return array;
    }
    module.exports = arrayPush;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetAllKeys.js
var require_baseGetAllKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGetAllKeys.js"(exports, module) {
    var arrayPush = require_arrayPush();
    var isArray = require_isArray();
    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
      var result = keysFunc(object);
      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
    }
    module.exports = baseGetAllKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayFilter.js
var require_arrayFilter = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayFilter.js"(exports, module) {
    function arrayFilter(array, predicate) {
      var index = -1, length = array == null ? 0 : array.length, resIndex = 0, result = [];
      while (++index < length) {
        var value = array[index];
        if (predicate(value, index, array)) {
          result[resIndex++] = value;
        }
      }
      return result;
    }
    module.exports = arrayFilter;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubArray.js
var require_stubArray = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/stubArray.js"(exports, module) {
    function stubArray() {
      return [];
    }
    module.exports = stubArray;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js
var require_getSymbols = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getSymbols.js"(exports, module) {
    var arrayFilter = require_arrayFilter();
    var stubArray = require_stubArray();
    var objectProto = Object.prototype;
    var propertyIsEnumerable = objectProto.propertyIsEnumerable;
    var nativeGetSymbols = Object.getOwnPropertySymbols;
    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
      if (object == null) {
        return [];
      }
      object = Object(object);
      return arrayFilter(nativeGetSymbols(object), function(symbol) {
        return propertyIsEnumerable.call(object, symbol);
      });
    };
    module.exports = getSymbols;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeys.js
var require_getAllKeys = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getAllKeys.js"(exports, module) {
    var baseGetAllKeys = require_baseGetAllKeys();
    var getSymbols = require_getSymbols();
    var keys = require_keys();
    function getAllKeys(object) {
      return baseGetAllKeys(object, keys, getSymbols);
    }
    module.exports = getAllKeys;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalObjects.js
var require_equalObjects = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_equalObjects.js"(exports, module) {
    var getAllKeys = require_getAllKeys();
    var COMPARE_PARTIAL_FLAG = 1;
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
      var isPartial = bitmask & COMPARE_PARTIAL_FLAG, objProps = getAllKeys(object), objLength = objProps.length, othProps = getAllKeys(other), othLength = othProps.length;
      if (objLength != othLength && !isPartial) {
        return false;
      }
      var index = objLength;
      while (index--) {
        var key = objProps[index];
        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
          return false;
        }
      }
      var objStacked = stack.get(object);
      var othStacked = stack.get(other);
      if (objStacked && othStacked) {
        return objStacked == other && othStacked == object;
      }
      var result = true;
      stack.set(object, other);
      stack.set(other, object);
      var skipCtor = isPartial;
      while (++index < objLength) {
        key = objProps[index];
        var objValue = object[key], othValue = other[key];
        if (customizer) {
          var compared = isPartial ? customizer(othValue, objValue, key, other, object, stack) : customizer(objValue, othValue, key, object, other, stack);
        }
        if (!(compared === void 0 ? objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack) : compared)) {
          result = false;
          break;
        }
        skipCtor || (skipCtor = key == "constructor");
      }
      if (result && !skipCtor) {
        var objCtor = object.constructor, othCtor = other.constructor;
        if (objCtor != othCtor && ("constructor" in object && "constructor" in other) && !(typeof objCtor == "function" && objCtor instanceof objCtor && typeof othCtor == "function" && othCtor instanceof othCtor)) {
          result = false;
        }
      }
      stack["delete"](object);
      stack["delete"](other);
      return result;
    }
    module.exports = equalObjects;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_DataView.js
var require_DataView = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_DataView.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var DataView = getNative(root, "DataView");
    module.exports = DataView;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Promise.js
var require_Promise = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Promise.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Promise2 = getNative(root, "Promise");
    module.exports = Promise2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Set.js
var require_Set = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_Set.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var Set = getNative(root, "Set");
    module.exports = Set;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_WeakMap.js
var require_WeakMap = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_WeakMap.js"(exports, module) {
    var getNative = require_getNative();
    var root = require_root();
    var WeakMap2 = getNative(root, "WeakMap");
    module.exports = WeakMap2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js
var require_getTag = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getTag.js"(exports, module) {
    var DataView = require_DataView();
    var Map2 = require_Map();
    var Promise2 = require_Promise();
    var Set = require_Set();
    var WeakMap2 = require_WeakMap();
    var baseGetTag = require_baseGetTag();
    var toSource = require_toSource();
    var mapTag = "[object Map]";
    var objectTag = "[object Object]";
    var promiseTag = "[object Promise]";
    var setTag = "[object Set]";
    var weakMapTag = "[object WeakMap]";
    var dataViewTag = "[object DataView]";
    var dataViewCtorString = toSource(DataView);
    var mapCtorString = toSource(Map2);
    var promiseCtorString = toSource(Promise2);
    var setCtorString = toSource(Set);
    var weakMapCtorString = toSource(WeakMap2);
    var getTag = baseGetTag;
    if (DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag || Map2 && getTag(new Map2()) != mapTag || Promise2 && getTag(Promise2.resolve()) != promiseTag || Set && getTag(new Set()) != setTag || WeakMap2 && getTag(new WeakMap2()) != weakMapTag) {
      getTag = function(value) {
        var result = baseGetTag(value), Ctor = result == objectTag ? value.constructor : void 0, ctorString = Ctor ? toSource(Ctor) : "";
        if (ctorString) {
          switch (ctorString) {
            case dataViewCtorString:
              return dataViewTag;
            case mapCtorString:
              return mapTag;
            case promiseCtorString:
              return promiseTag;
            case setCtorString:
              return setTag;
            case weakMapCtorString:
              return weakMapTag;
          }
        }
        return result;
      };
    }
    module.exports = getTag;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqualDeep.js
var require_baseIsEqualDeep = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqualDeep.js"(exports, module) {
    var Stack = require_Stack();
    var equalArrays = require_equalArrays();
    var equalByTag = require_equalByTag();
    var equalObjects = require_equalObjects();
    var getTag = require_getTag();
    var isArray = require_isArray();
    var isBuffer = require_isBuffer();
    var isTypedArray = require_isTypedArray();
    var COMPARE_PARTIAL_FLAG = 1;
    var argsTag = "[object Arguments]";
    var arrayTag = "[object Array]";
    var objectTag = "[object Object]";
    var objectProto = Object.prototype;
    var hasOwnProperty = objectProto.hasOwnProperty;
    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
      var objIsArr = isArray(object), othIsArr = isArray(other), objTag = objIsArr ? arrayTag : getTag(object), othTag = othIsArr ? arrayTag : getTag(other);
      objTag = objTag == argsTag ? objectTag : objTag;
      othTag = othTag == argsTag ? objectTag : othTag;
      var objIsObj = objTag == objectTag, othIsObj = othTag == objectTag, isSameTag = objTag == othTag;
      if (isSameTag && isBuffer(object)) {
        if (!isBuffer(other)) {
          return false;
        }
        objIsArr = true;
        objIsObj = false;
      }
      if (isSameTag && !objIsObj) {
        stack || (stack = new Stack());
        return objIsArr || isTypedArray(object) ? equalArrays(object, other, bitmask, customizer, equalFunc, stack) : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
      }
      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
        var objIsWrapped = objIsObj && hasOwnProperty.call(object, "__wrapped__"), othIsWrapped = othIsObj && hasOwnProperty.call(other, "__wrapped__");
        if (objIsWrapped || othIsWrapped) {
          var objUnwrapped = objIsWrapped ? object.value() : object, othUnwrapped = othIsWrapped ? other.value() : other;
          stack || (stack = new Stack());
          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
        }
      }
      if (!isSameTag) {
        return false;
      }
      stack || (stack = new Stack());
      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
    }
    module.exports = baseIsEqualDeep;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqual.js
var require_baseIsEqual = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsEqual.js"(exports, module) {
    var baseIsEqualDeep = require_baseIsEqualDeep();
    var isObjectLike = require_isObjectLike();
    function baseIsEqual(value, other, bitmask, customizer, stack) {
      if (value === other) {
        return true;
      }
      if (value == null || other == null || !isObjectLike(value) && !isObjectLike(other)) {
        return value !== value && other !== other;
      }
      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
    }
    module.exports = baseIsEqual;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMatch.js
var require_baseIsMatch = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIsMatch.js"(exports, module) {
    var Stack = require_Stack();
    var baseIsEqual = require_baseIsEqual();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseIsMatch(object, source, matchData, customizer) {
      var index = matchData.length, length = index, noCustomizer = !customizer;
      if (object == null) {
        return !length;
      }
      object = Object(object);
      while (index--) {
        var data = matchData[index];
        if (noCustomizer && data[2] ? data[1] !== object[data[0]] : !(data[0] in object)) {
          return false;
        }
      }
      while (++index < length) {
        data = matchData[index];
        var key = data[0], objValue = object[key], srcValue = data[1];
        if (noCustomizer && data[2]) {
          if (objValue === void 0 && !(key in object)) {
            return false;
          }
        } else {
          var stack = new Stack();
          if (customizer) {
            var result = customizer(objValue, srcValue, key, object, source, stack);
          }
          if (!(result === void 0 ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack) : result)) {
            return false;
          }
        }
      }
      return true;
    }
    module.exports = baseIsMatch;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isStrictComparable.js
var require_isStrictComparable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isStrictComparable.js"(exports, module) {
    var isObject = require_isObject();
    function isStrictComparable(value) {
      return value === value && !isObject(value);
    }
    module.exports = isStrictComparable;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMatchData.js
var require_getMatchData = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_getMatchData.js"(exports, module) {
    var isStrictComparable = require_isStrictComparable();
    var keys = require_keys();
    function getMatchData(object) {
      var result = keys(object), length = result.length;
      while (length--) {
        var key = result[length], value = object[key];
        result[length] = [key, value, isStrictComparable(value)];
      }
      return result;
    }
    module.exports = getMatchData;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_matchesStrictComparable.js
var require_matchesStrictComparable = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_matchesStrictComparable.js"(exports, module) {
    function matchesStrictComparable(key, srcValue) {
      return function(object) {
        if (object == null) {
          return false;
        }
        return object[key] === srcValue && (srcValue !== void 0 || key in Object(object));
      };
    }
    module.exports = matchesStrictComparable;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatches.js
var require_baseMatches = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatches.js"(exports, module) {
    var baseIsMatch = require_baseIsMatch();
    var getMatchData = require_getMatchData();
    var matchesStrictComparable = require_matchesStrictComparable();
    function baseMatches(source) {
      var matchData = getMatchData(source);
      if (matchData.length == 1 && matchData[0][2]) {
        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
      }
      return function(object) {
        return object === source || baseIsMatch(object, source, matchData);
      };
    }
    module.exports = baseMatches;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js
var require_isSymbol = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/isSymbol.js"(exports, module) {
    var baseGetTag = require_baseGetTag();
    var isObjectLike = require_isObjectLike();
    var symbolTag = "[object Symbol]";
    function isSymbol(value) {
      return typeof value == "symbol" || isObjectLike(value) && baseGetTag(value) == symbolTag;
    }
    module.exports = isSymbol;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js
var require_isKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_isKey.js"(exports, module) {
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/;
    var reIsPlainProp = /^\w*$/;
    function isKey(value, object) {
      if (isArray(value)) {
        return false;
      }
      var type = typeof value;
      if (type == "number" || type == "symbol" || type == "boolean" || value == null || isSymbol(value)) {
        return true;
      }
      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) || object != null && value in Object(object);
    }
    module.exports = isKey;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/memoize.js
var require_memoize = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/memoize.js"(exports, module) {
    var MapCache = require_MapCache();
    var FUNC_ERROR_TEXT = "Expected a function";
    function memoize(func, resolver) {
      if (typeof func != "function" || resolver != null && typeof resolver != "function") {
        throw new TypeError(FUNC_ERROR_TEXT);
      }
      var memoized = function() {
        var args = arguments, key = resolver ? resolver.apply(this, args) : args[0], cache = memoized.cache;
        if (cache.has(key)) {
          return cache.get(key);
        }
        var result = func.apply(this, args);
        memoized.cache = cache.set(key, result) || cache;
        return result;
      };
      memoized.cache = new (memoize.Cache || MapCache)();
      return memoized;
    }
    memoize.Cache = MapCache;
    module.exports = memoize;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_memoizeCapped.js
var require_memoizeCapped = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_memoizeCapped.js"(exports, module) {
    var memoize = require_memoize();
    var MAX_MEMOIZE_SIZE = 500;
    function memoizeCapped(func) {
      var result = memoize(func, function(key) {
        if (cache.size === MAX_MEMOIZE_SIZE) {
          cache.clear();
        }
        return key;
      });
      var cache = result.cache;
      return result;
    }
    module.exports = memoizeCapped;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToPath.js
var require_stringToPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_stringToPath.js"(exports, module) {
    var memoizeCapped = require_memoizeCapped();
    var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;
    var reEscapeChar = /\\(\\)?/g;
    var stringToPath = memoizeCapped(function(string) {
      var result = [];
      if (string.charCodeAt(0) === 46) {
        result.push("");
      }
      string.replace(rePropName, function(match, number, quote, subString) {
        result.push(quote ? subString.replace(reEscapeChar, "$1") : number || match);
      });
      return result;
    });
    module.exports = stringToPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayMap.js
var require_arrayMap = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_arrayMap.js"(exports, module) {
    function arrayMap(array, iteratee) {
      var index = -1, length = array == null ? 0 : array.length, result = Array(length);
      while (++index < length) {
        result[index] = iteratee(array[index], index, array);
      }
      return result;
    }
    module.exports = arrayMap;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseToString.js
var require_baseToString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseToString.js"(exports, module) {
    var Symbol2 = require_Symbol();
    var arrayMap = require_arrayMap();
    var isArray = require_isArray();
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    var symbolProto = Symbol2 ? Symbol2.prototype : void 0;
    var symbolToString = symbolProto ? symbolProto.toString : void 0;
    function baseToString(value) {
      if (typeof value == "string") {
        return value;
      }
      if (isArray(value)) {
        return arrayMap(value, baseToString) + "";
      }
      if (isSymbol(value)) {
        return symbolToString ? symbolToString.call(value) : "";
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = baseToString;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toString.js
var require_toString = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/toString.js"(exports, module) {
    var baseToString = require_baseToString();
    function toString(value) {
      return value == null ? "" : baseToString(value);
    }
    module.exports = toString;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castPath.js
var require_castPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_castPath.js"(exports, module) {
    var isArray = require_isArray();
    var isKey = require_isKey();
    var stringToPath = require_stringToPath();
    var toString = require_toString();
    function castPath(value, object) {
      if (isArray(value)) {
        return value;
      }
      return isKey(value, object) ? [value] : stringToPath(toString(value));
    }
    module.exports = castPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js
var require_toKey = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_toKey.js"(exports, module) {
    var isSymbol = require_isSymbol();
    var INFINITY = 1 / 0;
    function toKey(value) {
      if (typeof value == "string" || isSymbol(value)) {
        return value;
      }
      var result = value + "";
      return result == "0" && 1 / value == -INFINITY ? "-0" : result;
    }
    module.exports = toKey;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGet.js
var require_baseGet = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseGet.js"(exports, module) {
    var castPath = require_castPath();
    var toKey = require_toKey();
    function baseGet(object, path) {
      path = castPath(path, object);
      var index = 0, length = path.length;
      while (object != null && index < length) {
        object = object[toKey(path[index++])];
      }
      return index && index == length ? object : void 0;
    }
    module.exports = baseGet;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/get.js
var require_get = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/get.js"(exports, module) {
    var baseGet = require_baseGet();
    function get(object, path, defaultValue) {
      var result = object == null ? void 0 : baseGet(object, path);
      return result === void 0 ? defaultValue : result;
    }
    module.exports = get;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js
var require_baseHasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseHasIn.js"(exports, module) {
    function baseHasIn(object, key) {
      return object != null && key in Object(object);
    }
    module.exports = baseHasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js
var require_hasPath = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_hasPath.js"(exports, module) {
    var castPath = require_castPath();
    var isArguments = require_isArguments();
    var isArray = require_isArray();
    var isIndex = require_isIndex();
    var isLength = require_isLength();
    var toKey = require_toKey();
    function hasPath(object, path, hasFunc) {
      path = castPath(path, object);
      var index = -1, length = path.length, result = false;
      while (++index < length) {
        var key = toKey(path[index]);
        if (!(result = object != null && hasFunc(object, key))) {
          break;
        }
        object = object[key];
      }
      if (result || ++index != length) {
        return result;
      }
      length = object == null ? 0 : object.length;
      return !!length && isLength(length) && isIndex(key, length) && (isArray(object) || isArguments(object));
    }
    module.exports = hasPath;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js
var require_hasIn = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/hasIn.js"(exports, module) {
    var baseHasIn = require_baseHasIn();
    var hasPath = require_hasPath();
    function hasIn(object, path) {
      return object != null && hasPath(object, path, baseHasIn);
    }
    module.exports = hasIn;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatchesProperty.js
var require_baseMatchesProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseMatchesProperty.js"(exports, module) {
    var baseIsEqual = require_baseIsEqual();
    var get = require_get();
    var hasIn = require_hasIn();
    var isKey = require_isKey();
    var isStrictComparable = require_isStrictComparable();
    var matchesStrictComparable = require_matchesStrictComparable();
    var toKey = require_toKey();
    var COMPARE_PARTIAL_FLAG = 1;
    var COMPARE_UNORDERED_FLAG = 2;
    function baseMatchesProperty(path, srcValue) {
      if (isKey(path) && isStrictComparable(srcValue)) {
        return matchesStrictComparable(toKey(path), srcValue);
      }
      return function(object) {
        var objValue = get(object, path);
        return objValue === void 0 && objValue === srcValue ? hasIn(object, path) : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
      };
    }
    module.exports = baseMatchesProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js
var require_identity = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/identity.js"(exports, module) {
    function identity2(value) {
      return value;
    }
    module.exports = identity2;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseProperty.js
var require_baseProperty = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseProperty.js"(exports, module) {
    function baseProperty(key) {
      return function(object) {
        return object == null ? void 0 : object[key];
      };
    }
    module.exports = baseProperty;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePropertyDeep.js
var require_basePropertyDeep = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_basePropertyDeep.js"(exports, module) {
    var baseGet = require_baseGet();
    function basePropertyDeep(path) {
      return function(object) {
        return baseGet(object, path);
      };
    }
    module.exports = basePropertyDeep;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/property.js
var require_property = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/property.js"(exports, module) {
    var baseProperty = require_baseProperty();
    var basePropertyDeep = require_basePropertyDeep();
    var isKey = require_isKey();
    var toKey = require_toKey();
    function property(path) {
      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
    }
    module.exports = property;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIteratee.js
var require_baseIteratee = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_baseIteratee.js"(exports, module) {
    var baseMatches = require_baseMatches();
    var baseMatchesProperty = require_baseMatchesProperty();
    var identity2 = require_identity();
    var isArray = require_isArray();
    var property = require_property();
    function baseIteratee(value) {
      if (typeof value == "function") {
        return value;
      }
      if (value == null) {
        return identity2;
      }
      if (typeof value == "object") {
        return isArray(value) ? baseMatchesProperty(value[0], value[1]) : baseMatches(value);
      }
      return property(value);
    }
    module.exports = baseIteratee;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createAggregator.js
var require_createAggregator = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/_createAggregator.js"(exports, module) {
    var arrayAggregator = require_arrayAggregator();
    var baseAggregator = require_baseAggregator();
    var baseIteratee = require_baseIteratee();
    var isArray = require_isArray();
    function createAggregator(setter, initializer) {
      return function(collection, iteratee) {
        var func = isArray(collection) ? arrayAggregator : baseAggregator, accumulator = initializer ? initializer() : {};
        return func(collection, setter, baseIteratee(iteratee, 2), accumulator);
      };
    }
    module.exports = createAggregator;
  }
});

// ../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keyBy.js
var require_keyBy = __commonJS({
  "../../node_modules/.pnpm/lodash@4.17.21/node_modules/lodash/keyBy.js"(exports, module) {
    var baseAssignValue = require_baseAssignValue();
    var createAggregator = require_createAggregator();
    var keyBy2 = createAggregator(function(result, value, key) {
      baseAssignValue(result, key, value);
    });
    module.exports = keyBy2;
  }
});

// src/abis/calcGaugesVoting.ts
var calcGaugesVotingABI = [
  {
    inputs: [],
    name: "gaugeVotingAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_gaugeAddr", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" },
      { internalType: "bool", name: "_inCap", type: "bool" }
    ],
    name: "getGaugeRelativeWeight",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_gaugeId", type: "uint256" },
      { internalType: "bool", name: "_inCap", type: "bool" }
    ],
    name: "getGaugeRelativeWeightById",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_gaugeAddr", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" },
      { internalType: "bool", name: "_inCap", type: "bool" }
    ],
    name: "getGaugeWeight",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_gaugeId", type: "uint256" }],
    name: "getGaugeWeightDetails",
    outputs: [
      { internalType: "uint256", name: "gaugeWeight", type: "uint256" },
      { internalType: "uint256", name: "gaugeTotalWeight", type: "uint256" },
      { internalType: "uint256", name: "gaugeRawPercent", type: "uint256" },
      { internalType: "uint256", name: "gaugeCappedPercent", type: "uint256" },
      { internalType: "uint256", name: "gaugeInCapWeight", type: "uint256" },
      { internalType: "uint256", name: "gaugeTotalFinalWeights", type: "uint256" },
      { internalType: "uint256", name: "gaugeFinalPercent", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_gaugeAddr", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" },
      { internalType: "bool", name: "_inCap", type: "bool" },
      { internalType: "uint256", name: "_gaugeTotalWeight", type: "uint256" },
      { internalType: "uint256", name: "_gaugeTotalCappedPercent", type: "uint256" },
      { internalType: "uint256", name: "_gaugeTotalFinalWeights", type: "uint256" }
    ],
    name: "getGaugeWeightMass",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_gaugeId", type: "uint256" },
      { internalType: "bool", name: "_inCap", type: "bool" }
    ],
    name: "getGaugeWeightbyId",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getRawTotalGaugeWeight",
    outputs: [{ internalType: "uint256", name: "gaugeTotalWeight", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalCappedPercent",
    outputs: [{ internalType: "uint256", name: "gaugeTotalCappedPercent", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "getTotalFinalWeights",
    outputs: [{ internalType: "uint256", name: "gaugeTotalFinalWeights", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bool", name: "_inCap", type: "bool" }],
    name: "getTotalWeight",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bool", name: "_inCap", type: "bool" }],
    name: "massGetGaugeWeight",
    outputs: [{ internalType: "uint256[]", name: "result", type: "uint256[]" }],
    stateMutability: "view",
    type: "function"
  }
];

// src/abis/gaugesVoting.ts
var gaugesVotingABI = [
  {
    inputs: [{ internalType: "address", name: "_votingEscrow", type: "address" }],
    stateMutability: "nonpayable",
    type: "constructor"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "string", name: "name", type: "string" },
      { indexed: false, internalType: "uint256", name: "type_id", type: "uint256" }
    ],
    name: "AddType",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "uint256", name: "allocation", type: "uint256" }
    ],
    name: "AdminAllocationChanged",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "uint256", name: "period", type: "uint256" }
    ],
    name: "AdminOnlyPeriodUpdated",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "gauage_addr", type: "address" },
      { indexed: false, internalType: "uint256", name: "chainId", type: "uint256" },
      { indexed: false, internalType: "bytes32", name: "hash", type: "bytes32" }
    ],
    name: "GaugeKilled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: true, internalType: "address", name: "gauage_addr", type: "address" },
      { indexed: false, internalType: "uint256", name: "chainId", type: "uint256" },
      { indexed: false, internalType: "bytes32", name: "hash", type: "bytes32" }
    ],
    name: "GaugeUnKilled",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes32", name: "hash", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "gauge_type", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "weight", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "pid", type: "uint256" },
      { indexed: false, internalType: "address", name: "masterChef", type: "address" },
      { indexed: false, internalType: "uint256", name: "chainId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "boostMultiplier", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "maxVoteCap", type: "uint256" }
    ],
    name: "NewGauge",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes32", name: "hash", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "time", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "weight", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "total_weight", type: "uint256" }
    ],
    name: "NewGaugeWeight",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "type_id", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "time", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "weight", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "total_weight", type: "uint256" }
    ],
    name: "NewTypeWeight",
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
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Paused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [{ indexed: false, internalType: "address", name: "account", type: "address" }],
    name: "Unpaused",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "bytes32", name: "hash", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "pid", type: "uint256" },
      { indexed: false, internalType: "address", name: "masterChef", type: "address" },
      { indexed: false, internalType: "uint256", name: "chainId", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "boostMultiplier", type: "uint256" },
      { indexed: false, internalType: "uint256", name: "maxVoteCap", type: "uint256" }
    ],
    name: "UpdateGaugeInfo",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "time", type: "uint256" },
      { indexed: false, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "bytes32", name: "hash", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "weight", type: "uint256" }
    ],
    name: "VoteForGauge",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: false, internalType: "uint256", name: "time", type: "uint256" },
      { indexed: false, internalType: "address", name: "user", type: "address" },
      { indexed: false, internalType: "bytes32", name: "hash", type: "bytes32" },
      { indexed: false, internalType: "uint256", name: "weight", type: "uint256" }
    ],
    name: "VoteForGaugeFromAdmin",
    type: "event"
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: "address", name: "sender", type: "address" },
      { indexed: false, internalType: "uint256", name: "delay", type: "uint256" }
    ],
    name: "WeightVoteDelayChanged",
    type: "event"
  },
  {
    inputs: [],
    name: "ADMIN_VOTE_PERIOD",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "WEIGHT_VOTE_DELAY",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "gauge_addr", type: "address" },
      { internalType: "uint256", name: "gauge_type", type: "uint256" },
      { internalType: "uint256", name: "_weight", type: "uint256" },
      { internalType: "uint256", name: "_pid", type: "uint256" },
      { internalType: "address", name: "_masterChef", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" },
      { internalType: "uint256", name: "_boostMultiplier", type: "uint256" },
      { internalType: "uint256", name: "_maxVoteCap", type: "uint256" }
    ],
    name: "addGauge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "string", name: "_name", type: "string" },
      { internalType: "uint256", name: "_weight", type: "uint256" }
    ],
    name: "addType",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [],
    name: "adminAllocation",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "adminSlopes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_numerator", type: "uint256" }],
    name: "changeAdminAllocation",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "gauge_addr", type: "address" },
      { internalType: "uint256", name: "weight", type: "uint256" },
      { internalType: "uint256", name: "_chainId", type: "uint256" }
    ],
    name: "changeGaugeWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "type_id", type: "uint256" },
      { internalType: "uint256", name: "weight", type: "uint256" }
    ],
    name: "changeTypeWeight",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_delay", type: "uint256" }],
    name: "changeWeightVoteDelay",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  { inputs: [], name: "checkpoint", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [
      { internalType: "address", name: "gauge_addr", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" }
    ],
    name: "checkpointGauge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "gaugeChangesWeight",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "gaugeCount",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "gaugeIndex_",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "gaugeIsKilled_",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "gaugeLastScheduled",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "gaugePointsTotal",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "bytes32", name: "", type: "bytes32" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "gaugePointsWeight",
    outputs: [
      { internalType: "uint256", name: "bias", type: "uint256" },
      { internalType: "uint256", name: "slope", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "gauge_addr", type: "address" },
      { internalType: "uint256", name: "time", type: "uint256" },
      { internalType: "uint256", name: "_chainId", type: "uint256" }
    ],
    name: "gaugeRelativeWeight",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "gauge_addr", type: "address" },
      { internalType: "uint256", name: "time", type: "uint256" },
      { internalType: "uint256", name: "_chainId", type: "uint256" }
    ],
    name: "gaugeRelativeWeight_write",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "gaugeTypeChangesSum",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "gaugeTypeLastScheduled",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "gaugeTypeNames",
    outputs: [{ internalType: "string", name: "", type: "string" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "gaugeTypePointsSum",
    outputs: [
      { internalType: "uint256", name: "bias", type: "uint256" },
      { internalType: "uint256", name: "slope", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "", type: "uint256" },
      { internalType: "uint256", name: "", type: "uint256" }
    ],
    name: "gaugeTypePointsWeight",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "gaugeTypeSumLastScheduled",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "gaugeTypes",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bytes32", name: "", type: "bytes32" }],
    name: "gaugeTypes_",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    name: "gauges",
    outputs: [
      { internalType: "uint256", name: "pid", type: "uint256" },
      { internalType: "address", name: "masterChef", type: "address" },
      { internalType: "uint256", name: "chainId", type: "uint256" },
      { internalType: "address", name: "pairAddress", type: "address" },
      { internalType: "uint256", name: "boostMultiplier", type: "uint256" },
      { internalType: "uint256", name: "maxVoteCap", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "gauge_addr", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" },
      { internalType: "bool", name: "inCap", type: "bool" }
    ],
    name: "getGaugeWeight",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "bool", name: "inCap", type: "bool" }],
    name: "getTotalWeight",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "uint256", name: "_typeId", type: "uint256" },
      { internalType: "uint256", name: "_chainId", type: "uint256" }
    ],
    name: "getTypeAndChainIdWeightCapped",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_typeId", type: "uint256" }],
    name: "getWeightsSumPerType",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_gauge_addr", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" }
    ],
    name: "killGauge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" }
    ],
    name: "lastUserVote",
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
    name: "paused",
    outputs: [{ internalType: "bool", name: "", type: "bool" }],
    stateMutability: "view",
    type: "function"
  },
  { inputs: [], name: "renounceOwnership", outputs: [], stateMutability: "nonpayable", type: "function" },
  {
    inputs: [],
    name: "totalLastScheduled",
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
    inputs: [
      { internalType: "address", name: "_gauge_addr", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" }
    ],
    name: "unkillGauge",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "uint256", name: "_newAdminOnlyPeriod", type: "uint256" }],
    name: "updateAdminOnlyPeriod",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "gauge_addr", type: "address" },
      { internalType: "uint256", name: "_pid", type: "uint256" },
      { internalType: "address", name: "_masterChef", type: "address" },
      { internalType: "uint256", name: "_chainId", type: "uint256" },
      { internalType: "uint256", name: "_boostMultiplier", type: "uint256" },
      { internalType: "uint256", name: "_maxVoteCap", type: "uint256" }
    ],
    name: "updateGaugeInfo",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_gauge_addr", type: "address" },
      { internalType: "uint256", name: "_user_weight", type: "uint256" },
      { internalType: "uint256", name: "_chainId", type: "uint256" },
      { internalType: "bool", name: "_skipNative", type: "bool" },
      { internalType: "bool", name: "_skipProxy", type: "bool" }
    ],
    name: "voteForGaugeWeights",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "_gauge_addrs", type: "address[]" },
      { internalType: "uint256[]", name: "_user_weights", type: "uint256[]" },
      { internalType: "uint256[]", name: "_chainIds", type: "uint256[]" },
      { internalType: "bool", name: "_skipNative", type: "bool" },
      { internalType: "bool", name: "_skipProxy", type: "bool" }
    ],
    name: "voteForGaugeWeightsBulk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "_gauge_addr", type: "address" },
      { internalType: "uint256", name: "_admin_weight", type: "uint256" },
      { internalType: "uint256", name: "_end", type: "uint256" },
      { internalType: "uint256", name: "_chainId", type: "uint256" }
    ],
    name: "voteFromAdmin",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address[]", name: "_gauge_addrs", type: "address[]" },
      { internalType: "uint256[]", name: "_admin_weights", type: "uint256[]" },
      { internalType: "uint256[]", name: "_ends", type: "uint256[]" },
      { internalType: "uint256[]", name: "_chainIds", type: "uint256[]" }
    ],
    name: "voteFromAdminBulk",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [{ internalType: "address", name: "", type: "address" }],
    name: "voteUserPower",
    outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { internalType: "address", name: "", type: "address" },
      { internalType: "bytes32", name: "", type: "bytes32" }
    ],
    name: "voteUserSlopes",
    outputs: [
      { internalType: "uint256", name: "slope", type: "uint256" },
      { internalType: "uint256", name: "power", type: "uint256" },
      { internalType: "uint256", name: "end", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "votingEscrow",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function"
  }
];
var GAUGES_SUPPORTED_CHAIN_IDS = [
  chains.ChainId.ETHEREUM,
  chains.ChainId.BSC,
  chains.ChainId.ZKSYNC,
  chains.ChainId.POLYGON_ZKEVM,
  chains.ChainId.ARBITRUM_ONE,
  chains.ChainId.LINEA,
  chains.ChainId.BASE,
  chains.ChainId.OPBNB
];
var GAUGES = "0xbCfBf7ED1756FE478B071687cb430C7B3eB682f1";
var GAUGES_TESTNET = "0x357b01894b21787B41A8FA4DCaFE92293470FaD9";
var GAUGES_ADDRESS = {
  [chains.ChainId.BSC]: GAUGES,
  [chains.ChainId.BSC_TESTNET]: GAUGES_TESTNET
};
var GAUGES_CALC_ADDRESS = {
  [chains.ChainId.BSC]: "0x4fF7C80Df31e5864776314D89220Ae18626a6D67",
  [chains.ChainId.BSC_TESTNET]: "0x88B02E6238fa6279281eeA600CBfcAd5dd3597A5"
};

// ../../node_modules/.pnpm/quick-lru@7.0.0/node_modules/quick-lru/index.js
var _size, _cache, _oldCache, _maxSize, _maxAge, _onEviction, _emitEvictions, emitEvictions_fn, _deleteIfExpired, deleteIfExpired_fn, _getOrDeleteIfExpired, getOrDeleteIfExpired_fn, _getItemValue, getItemValue_fn, _peek, peek_fn, _set, set_fn, _moveToRecent, moveToRecent_fn, _entriesAscending, entriesAscending_fn;
var QuickLRU = class extends Map {
  constructor(options = {}) {
    super();
    __privateAdd(this, _emitEvictions);
    __privateAdd(this, _deleteIfExpired);
    __privateAdd(this, _getOrDeleteIfExpired);
    __privateAdd(this, _getItemValue);
    __privateAdd(this, _peek);
    __privateAdd(this, _set);
    __privateAdd(this, _moveToRecent);
    __privateAdd(this, _entriesAscending);
    __privateAdd(this, _size, 0);
    __privateAdd(this, _cache, /* @__PURE__ */ new Map());
    __privateAdd(this, _oldCache, /* @__PURE__ */ new Map());
    __privateAdd(this, _maxSize, void 0);
    __privateAdd(this, _maxAge, void 0);
    __privateAdd(this, _onEviction, void 0);
    if (!(options.maxSize && options.maxSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    if (typeof options.maxAge === "number" && options.maxAge === 0) {
      throw new TypeError("`maxAge` must be a number greater than 0");
    }
    __privateSet(this, _maxSize, options.maxSize);
    __privateSet(this, _maxAge, options.maxAge || Number.POSITIVE_INFINITY);
    __privateSet(this, _onEviction, options.onEviction);
  }
  // For tests.
  get __oldCache() {
    return __privateGet(this, _oldCache);
  }
  get(key) {
    if (__privateGet(this, _cache).has(key)) {
      const item = __privateGet(this, _cache).get(key);
      return __privateMethod(this, _getItemValue, getItemValue_fn).call(this, key, item);
    }
    if (__privateGet(this, _oldCache).has(key)) {
      const item = __privateGet(this, _oldCache).get(key);
      if (__privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, item) === false) {
        __privateMethod(this, _moveToRecent, moveToRecent_fn).call(this, key, item);
        return item.value;
      }
    }
  }
  set(key, value, { maxAge = __privateGet(this, _maxAge) } = {}) {
    const expiry = typeof maxAge === "number" && maxAge !== Number.POSITIVE_INFINITY ? Date.now() + maxAge : void 0;
    if (__privateGet(this, _cache).has(key)) {
      __privateGet(this, _cache).set(key, {
        value,
        expiry
      });
    } else {
      __privateMethod(this, _set, set_fn).call(this, key, { value, expiry });
    }
    return this;
  }
  has(key) {
    if (__privateGet(this, _cache).has(key)) {
      return !__privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, __privateGet(this, _cache).get(key));
    }
    if (__privateGet(this, _oldCache).has(key)) {
      return !__privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, __privateGet(this, _oldCache).get(key));
    }
    return false;
  }
  peek(key) {
    if (__privateGet(this, _cache).has(key)) {
      return __privateMethod(this, _peek, peek_fn).call(this, key, __privateGet(this, _cache));
    }
    if (__privateGet(this, _oldCache).has(key)) {
      return __privateMethod(this, _peek, peek_fn).call(this, key, __privateGet(this, _oldCache));
    }
  }
  delete(key) {
    const deleted = __privateGet(this, _cache).delete(key);
    if (deleted) {
      __privateWrapper(this, _size)._--;
    }
    return __privateGet(this, _oldCache).delete(key) || deleted;
  }
  clear() {
    __privateGet(this, _cache).clear();
    __privateGet(this, _oldCache).clear();
    __privateSet(this, _size, 0);
  }
  resize(newSize) {
    if (!(newSize && newSize > 0)) {
      throw new TypeError("`maxSize` must be a number greater than 0");
    }
    const items = [...__privateMethod(this, _entriesAscending, entriesAscending_fn).call(this)];
    const removeCount = items.length - newSize;
    if (removeCount < 0) {
      __privateSet(this, _cache, new Map(items));
      __privateSet(this, _oldCache, /* @__PURE__ */ new Map());
      __privateSet(this, _size, items.length);
    } else {
      if (removeCount > 0) {
        __privateMethod(this, _emitEvictions, emitEvictions_fn).call(this, items.slice(0, removeCount));
      }
      __privateSet(this, _oldCache, new Map(items.slice(removeCount)));
      __privateSet(this, _cache, /* @__PURE__ */ new Map());
      __privateSet(this, _size, 0);
    }
    __privateSet(this, _maxSize, newSize);
  }
  *keys() {
    for (const [key] of this) {
      yield key;
    }
  }
  *values() {
    for (const [, value] of this) {
      yield value;
    }
  }
  *[Symbol.iterator]() {
    for (const item of __privateGet(this, _cache)) {
      const [key, value] = item;
      const deleted = __privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }
    for (const item of __privateGet(this, _oldCache)) {
      const [key, value] = item;
      if (!__privateGet(this, _cache).has(key)) {
        const deleted = __privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }
  *entriesDescending() {
    let items = [...__privateGet(this, _cache)];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      const deleted = __privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, value);
      if (deleted === false) {
        yield [key, value.value];
      }
    }
    items = [...__privateGet(this, _oldCache)];
    for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];
      const [key, value] = item;
      if (!__privateGet(this, _cache).has(key)) {
        const deleted = __privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, value);
        if (deleted === false) {
          yield [key, value.value];
        }
      }
    }
  }
  *entriesAscending() {
    for (const [key, value] of __privateMethod(this, _entriesAscending, entriesAscending_fn).call(this)) {
      yield [key, value.value];
    }
  }
  get size() {
    if (!__privateGet(this, _size)) {
      return __privateGet(this, _oldCache).size;
    }
    let oldCacheSize = 0;
    for (const key of __privateGet(this, _oldCache).keys()) {
      if (!__privateGet(this, _cache).has(key)) {
        oldCacheSize++;
      }
    }
    return Math.min(__privateGet(this, _size) + oldCacheSize, __privateGet(this, _maxSize));
  }
  get maxSize() {
    return __privateGet(this, _maxSize);
  }
  entries() {
    return this.entriesAscending();
  }
  forEach(callbackFunction, thisArgument = this) {
    for (const [key, value] of this.entriesAscending()) {
      callbackFunction.call(thisArgument, value, key, this);
    }
  }
  get [Symbol.toStringTag]() {
    return JSON.stringify([...this.entriesAscending()]);
  }
};
_size = new WeakMap();
_cache = new WeakMap();
_oldCache = new WeakMap();
_maxSize = new WeakMap();
_maxAge = new WeakMap();
_onEviction = new WeakMap();
_emitEvictions = new WeakSet();
emitEvictions_fn = function(cache) {
  if (typeof __privateGet(this, _onEviction) !== "function") {
    return;
  }
  for (const [key, item] of cache) {
    __privateGet(this, _onEviction).call(this, key, item.value);
  }
};
_deleteIfExpired = new WeakSet();
deleteIfExpired_fn = function(key, item) {
  if (typeof item.expiry === "number" && item.expiry <= Date.now()) {
    if (typeof __privateGet(this, _onEviction) === "function") {
      __privateGet(this, _onEviction).call(this, key, item.value);
    }
    return this.delete(key);
  }
  return false;
};
_getOrDeleteIfExpired = new WeakSet();
getOrDeleteIfExpired_fn = function(key, item) {
  const deleted = __privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, item);
  if (deleted === false) {
    return item.value;
  }
};
_getItemValue = new WeakSet();
getItemValue_fn = function(key, item) {
  return item.expiry ? __privateMethod(this, _getOrDeleteIfExpired, getOrDeleteIfExpired_fn).call(this, key, item) : item.value;
};
_peek = new WeakSet();
peek_fn = function(key, cache) {
  const item = cache.get(key);
  return __privateMethod(this, _getItemValue, getItemValue_fn).call(this, key, item);
};
_set = new WeakSet();
set_fn = function(key, value) {
  __privateGet(this, _cache).set(key, value);
  __privateWrapper(this, _size)._++;
  if (__privateGet(this, _size) >= __privateGet(this, _maxSize)) {
    __privateSet(this, _size, 0);
    __privateMethod(this, _emitEvictions, emitEvictions_fn).call(this, __privateGet(this, _oldCache));
    __privateSet(this, _oldCache, __privateGet(this, _cache));
    __privateSet(this, _cache, /* @__PURE__ */ new Map());
  }
};
_moveToRecent = new WeakSet();
moveToRecent_fn = function(key, item) {
  __privateGet(this, _oldCache).delete(key);
  __privateMethod(this, _set, set_fn).call(this, key, item);
};
_entriesAscending = new WeakSet();
entriesAscending_fn = function* () {
  for (const item of __privateGet(this, _oldCache)) {
    const [key, value] = item;
    if (!__privateGet(this, _cache).has(key)) {
      const deleted = __privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, value);
      if (deleted === false) {
        yield item;
      }
    }
  }
  for (const item of __privateGet(this, _cache)) {
    const [key, value] = item;
    const deleted = __privateMethod(this, _deleteIfExpired, deleteIfExpired_fn).call(this, key, value);
    if (deleted === false) {
      yield item;
    }
  }
};
function calcCacheKey(args, epoch) {
  const json = viem.stringify(args);
  const r = viem.keccak256(`0x${json}@${epoch}`);
  return r;
}
var identity = (args) => args;
var cacheByLRU = (fn, { ttl, key, maxCacheSize, persist }) => {
  const cache = new QuickLRU({
    maxAge: ttl,
    maxSize: maxCacheSize || 1e3
  });
  const fetchR2Cache = persist ? cacheByLRU(_fetchR2Cache, {
    ttl
  }) : void 0;
  function persistKey() {
    return `${persist?.name}-${persist?.version}`;
  }
  async function ensurePersist(promise) {
    if (fetchR2Cache && persist) {
      const t = Date.now();
      const r2Promise = fetchR2Cache(persistKey());
      const value = await Promise.race([r2Promise, promise]);
      console.log("*****time usage****", Date.now() - t);
      return value ?? promise;
    }
    return promise;
  }
  const keyFunction = key || identity;
  let startTime = 0;
  return async (...args) => {
    if (!startTime) {
      startTime = Date.now();
    }
    const epoch = (Date.now() - startTime) / ttl;
    const halfTTS = epoch % 1 > 0.5;
    const epochId = Math.floor(epoch);
    if (halfTTS) {
      const nextKey = calcCacheKey(keyFunction(args), epochId + 1);
      if (!cache.has(nextKey)) {
        const nextPromise = fn(...args);
        cache.set(nextKey, nextPromise);
      }
    }
    const cacheKey = calcCacheKey(keyFunction(args), epochId);
    if (cache.has(cacheKey)) {
      return ensurePersist(cache.get(cacheKey));
    }
    const promise = fn(...args);
    cache.set(cacheKey, promise);
    if (epochId > 0) {
      const prevKey = calcCacheKey(keyFunction(args), epochId - 1);
      if (cache.has(prevKey)) {
        return cache.get(prevKey);
      }
    }
    try {
      promise.then((result) => {
        const jsonResult = viem.stringify(result);
        if (persist && result && jsonResult !== "{}" && jsonResult !== "[]") {
          uploadR2(persistKey(), result).catch((ex) => {
            console.error("Failed to persist cache", ex);
          });
        }
      });
      return ensurePersist(promise);
    } catch (error) {
      cache.delete(cacheKey);
      throw error;
    }
  };
};
async function uploadR2(key, value) {
  console.info("update homepage cache", key);
  if (!process.env.OBJECT_CACHE_SECRET) {
    return;
  }
  await fetch(`https://obj-cache.pancakeswap.com`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OBJECT_CACHE_SECRET}`
    },
    body: JSON.stringify({ key, value })
  });
}
async function _fetchR2Cache(key) {
  const resp = await fetch(`https://proofs.pancakeswap.com/cache/${key}`);
  if (resp.status === 200) {
    return resp.json();
  }
  console.warn(`Failed to fetch cache:https://proofs.pancakeswap.com/cache/${key}`);
  return void 0;
}

// src/getAllGauges.ts
var import_keyBy = __toESM(require_keyBy());

// src/constants/config/endpoint.ts
var GAUGES_API = "https://configs.pancakeswap.com/api/data/cached/gauges";

// src/constants/config/getGauges.ts
var fetchGaugeConfig = async () => {
  try {
    const response = await fetch(GAUGES_API, {
      signal: AbortSignal.timeout(3e3)
    });
    if (response.ok) {
      const gauges = await response.json();
      if (!gauges) {
        throw new Error(`Unexpected empty gauges fetched from remote`);
      }
      return gauges;
    }
    throw new Error(`Fetch failed with status: ${response.status}`);
  } catch (e) {
    if (e instanceof Error) {
      throw new Error(`Fetch failed: ${e.message}`);
    } else {
      throw new Error(`Fetch failed: ${e}`);
    }
  }
};
var getGauges = cacheByLRU(fetchGaugeConfig, {
  ttl: 1e4
});

// src/types.ts
var GaugeType = /* @__PURE__ */ ((GaugeType2) => {
  GaugeType2[GaugeType2["StableSwap"] = -1] = "StableSwap";
  GaugeType2[GaugeType2["V2"] = 0] = "V2";
  GaugeType2[GaugeType2["V3"] = 1] = "V3";
  GaugeType2[GaugeType2["ALM"] = 2] = "ALM";
  GaugeType2[GaugeType2["VeCakePool"] = 3] = "VeCakePool";
  GaugeType2[GaugeType2["Aptos"] = 4] = "Aptos";
  return GaugeType2;
})(GaugeType || {});
var GAUGE_TYPE_NAMES = {
  [-1 /* StableSwap */]: "StableSwap",
  [0 /* V2 */]: "V2",
  [1 /* V3 */]: "V3",
  [2 /* ALM */]: "Position Manager",
  [3 /* VeCakePool */]: "VeCakePool",
  [4 /* Aptos */]: "Aptos"
};

// src/constants/config/testnet.ts
var CONFIG_TESTNET = [
  {
    gid: 0,
    address: "0x523405d3072368BEe373F04EE738f2Aa3e3718c6",
    chainId: chains.ChainId.BSC,
    type: 0 /* V2 */,
    token0Address: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82",
    token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    pairName: "CAKE-WBNB",
    feeTier: v3Sdk.FeeAmount.MEDIUM
  },
  {
    gid: 1,
    address: "0x05739503273DbFd72240C6d854675E1c67a75ce4",
    chainId: chains.ChainId.ARBITRUM_ONE,
    type: 0 /* V2 */,
    token0Address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    token1Address: "0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    pairName: "WETH-USDC",
    feeTier: v3Sdk.FeeAmount.MEDIUM
  },
  {
    gid: 2,
    address: "0x36696169C63e42cd08ce11f5deeBbCeBae652050",
    chainId: chains.ChainId.BSC,
    type: 1 /* V3 */,
    token0Address: "0x55d398326f99059fF775485246999027B3197955",
    token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c",
    pairName: "USDT-WBNB",
    feeTier: v3Sdk.FeeAmount.LOW
  },
  {
    gid: 3,
    address: "0x803036AC78752EF599EC75c500ac8B0Ac0bE67dF",
    chainId: chains.ChainId.BSC,
    type: 1 /* V3 */,
    token0Address: "0x4268B8F0B87b6Eae5d897996E6b845ddbD99Adf3",
    token1Address: "0x55d398326f99059fF775485246999027B3197955",
    pairName: "alxUSDC-USDT",
    feeTier: v3Sdk.FeeAmount.LOWEST
  },
  {
    gid: 4,
    address: "0x0BaCc7a9717e70EA0DA5Ac075889Bd87d4C81197",
    chainId: chains.ChainId.ARBITRUM_ONE,
    type: 1 /* V3 */,
    token0Address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    token1Address: "0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
    pairName: "WETH-USDC",
    feeTier: v3Sdk.FeeAmount.LOW
  },
  {
    gid: 5,
    address: "0x0d7c4b40018969f81750d0a164c3839a77353EFB",
    chainId: chains.ChainId.ARBITRUM_ONE,
    type: 1 /* V3 */,
    token0Address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    token1Address: "0x912CE59144191C1204E64559FE8253a0e49E6548",
    pairName: "WETH-ARB",
    feeTier: v3Sdk.FeeAmount.LOW
  },
  {
    gid: 6,
    address: "0x7524Fe020EDcD072EE98126b49Fa65Eb85F8C44C",
    chainId: chains.ChainId.ETHEREUM,
    type: 1 /* V3 */,
    token0Address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    token1Address: "0xAf5191B0De278C7286d6C7CC6ab6BB8A73bA2Cd6",
    pairName: "USDC-STG",
    feeTier: v3Sdk.FeeAmount.MEDIUM
  },
  {
    gid: 7,
    address: "0x799Ea58D15429fa7C42cc211e2181FD4EF54ec37",
    chainId: chains.ChainId.BSC,
    type: 2 /* ALM */,
    pairName: "USDT-WBNB (BRIL#2)",
    token0Address: "0x55d398326f99059fF775485246999027B3197955",
    token1Address: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
  },
  {
    gid: 8,
    address: "0xBfaa05CA3078912344491926Ff81F6a75AEFea8b",
    chainId: chains.ChainId.ETHEREUM,
    type: 2 /* ALM */,
    pairName: "USDC-USDT (RANGE#2)",
    token0Address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    token1Address: "0xdAC17F958D2ee523a2206206994597C13D831ec7"
  },
  {
    gid: 9,
    address: "0x589e8bC919fF18fbF62c7C3d8E3fD86ecD7549C3",
    chainId: chains.ChainId.ETHEREUM,
    type: 2 /* ALM */,
    pairName: "rETH-WETH (RANGE#1)",
    token0Address: "0xae78736Cd615f374D3085123A210448E74Fc6393",
    token1Address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"
  },
  {
    gid: 10,
    address: "0xa9B98C0cc70a7625aCB12B7dec5D278F317d4Cb0",
    chainId: chains.ChainId.ARBITRUM_ONE,
    type: 2 /* ALM */,
    pairName: "WETH-ARB (DEFIEDGE#1)",
    token0Address: "0x82aF49447D8a07e3bd95BD0d56f35241523fBab1",
    token1Address: "0x912CE59144191C1204E64559FE8253a0e49E6548"
  },
  {
    gid: 11,
    address: "0x881Ed694980A03EE653508aeb9EF3ffD9f56aC99",
    chainId: chains.ChainId.BSC,
    type: 3 /* VeCakePool */,
    pairName: "Testnet RevenueSharingPool"
  }
];
var getContract = (client) => {
  const chainId = client.chain?.id;
  if (!chainId || !Object.keys(GAUGES_ADDRESS).includes(String(chainId))) {
    throw new Error(`Invalid client chain ${client.chain?.id}`);
  }
  return viem.getContract({
    address: GAUGES_ADDRESS[chainId],
    abi: gaugesVotingABI,
    client
  });
};
var getCalcContract = (client) => {
  const chainId = client.chain?.id;
  if (!chainId || !Object.keys(GAUGES_CALC_ADDRESS).includes(String(chainId))) {
    throw new Error(`Invalid client chain ${client.chain?.id}`);
  }
  return viem.getContract({
    address: GAUGES_CALC_ADDRESS[chainId],
    abi: calcGaugesVotingABI,
    client
  });
};

// src/fetchGaugesCount.ts
var fetchGaugesCount = async (client, options) => {
  const contract = getContract(client);
  const count = await contract.read.gaugeCount(options);
  return Number(count || 0);
};
var getGaugeHash = (gaugeAddress = viem.zeroAddress, chainId = 0) => {
  return viem.keccak256(viem.encodePacked(["address", "uint256"], [gaugeAddress, BigInt(chainId || 0)]));
};

// src/fetchAllGauges.ts
var _fetchAllGauges = async (client, options) => {
  const contract = getContract(client);
  const counts = await fetchGaugesCount(client, options);
  const multicalls = [];
  for (let i = 0; i < counts; i++) {
    multicalls.push({
      ...contract,
      functionName: "gauges",
      args: [BigInt(i)]
    });
  }
  const response = await client.multicall({
    contracts: multicalls,
    allowFailure: false,
    ...options
  });
  return response.map((x, i) => {
    const [pid, masterChef, chainId, pairAddress, boostMultiplier, maxVoteCap] = x;
    return {
      gid: i,
      pid: Number(pid),
      hash: getGaugeHash(pairAddress, Number(chainId)),
      pairAddress,
      masterChef,
      chainId: Number(chainId),
      boostMultiplier: Number(boostMultiplier),
      maxVoteCap: Number(maxVoteCap)
    };
  });
};
var fetchAllGauges = cacheByLRU(_fetchAllGauges, {
  ttl: 1e4,
  key: (params) => {
    const [, options] = params;
    return [options?.blockNumber];
  }
});

// src/fetchAllKilledGauges.ts
var fetchAllKilledGauges = async (client, gauges, options) => {
  const contract = getContract(client);
  const multicalls = [];
  for (let i = 0; i < gauges.length; i++) {
    multicalls.push({
      ...contract,
      functionName: "gaugeIsKilled_",
      args: [gauges[i].hash]
    });
  }
  const response = await client.multicall({
    contracts: multicalls,
    allowFailure: false,
    ...options
  });
  return gauges.map((gauge, index) => {
    if (response[index] === true) {
      return {
        ...gauge,
        killed: response[index]
      };
    }
    return gauge;
  });
};

// src/fetchGaugeVoting.ts
var _fetchAllGaugesVoting = async (client, gaugeInfos, inCap = true, options) => {
  const contract = getCalcContract(client);
  const weights = await contract.read.massGetGaugeWeight([inCap], options);
  return gaugeInfos.map((gauge) => ({
    ...gauge,
    weight: weights[gauge.gid] ?? 0n
  }));
};
var fetchAllGaugesVoting = cacheByLRU(_fetchAllGaugesVoting, {
  ttl: 5e3,
  key: (params) => {
    const [, gaugeInfos, inCap, options] = params;
    return [gaugeInfos, inCap, options?.blockNumber];
  }
});

// src/getAllGauges.ts
var getAllGauges = async (client, options = {
  testnet: false,
  inCap: true,
  bothCap: false,
  killed: false
}) => {
  const { testnet, inCap, bothCap, killed, blockNumber } = options;
  const gaugesCMS = testnet ? CONFIG_TESTNET : await getGauges();
  gaugesCMS.sort((a, b) => a.gid < b.gid ? -1 : 1);
  const gaugesSC = await fetchGaugesSC(client, killed, blockNumber);
  const gaugesCMSMap = (0, import_keyBy.default)(gaugesCMS, "gid");
  const allGaugeInfoConfigs = (killed ? gaugesSC : gaugesSC.filter((g) => !g.killed)).map((config) => {
    const correspondingCMS = gaugesCMSMap[config.gid];
    const mergedConfig = { ...correspondingCMS, ...config };
    return mergedConfig;
  });
  if (!bothCap) {
    const allGaugesVoting = await fetchAllGaugesVoting(client, allGaugeInfoConfigs, inCap, options);
    return allGaugesVoting;
  }
  const inCapVoting = await fetchAllGaugesVoting(client, allGaugeInfoConfigs, true, options);
  const notInCapVoting = await fetchAllGaugesVoting(client, allGaugeInfoConfigs, false, options);
  return inCapVoting.reduce((prev, inCapGauge) => {
    const notInCapGauge = notInCapVoting.find((p) => p.hash === inCapGauge.hash);
    return [
      ...prev,
      {
        ...inCapGauge,
        weight: 0n,
        inCapWeight: inCapGauge.weight,
        notInCapWeight: notInCapGauge?.weight
      }
    ];
  }, []);
};
async function _fetchGaugesSC(client, killed, blockNumber) {
  let gaugesSC = await fetchAllGauges(client, {
    blockNumber
  });
  gaugesSC = await fetchAllKilledGauges(client, gaugesSC, { blockNumber });
  if (!killed)
    gaugesSC = gaugesSC.filter((gauge) => !gauge.killed);
  return gaugesSC;
}
var fetchGaugesSC = cacheByLRU(_fetchGaugesSC, {
  ttl: 15e3,
  key: (params) => {
    const [, killed, blockNumber] = params;
    return [killed, blockNumber];
  }
});

// src/getGaugesByChain.ts
function createGaugesByChainFetcher() {
  const gaugesByChain = {};
  return async function getGaugesByChain2(chainId) {
    if (!chainId)
      return [];
    const cache = gaugesByChain[chainId];
    if (cache)
      return cache;
    const gauges = await getGauges();
    const gaugesOnChain = gauges.filter((gauge) => gauge.chainId === chainId);
    gaugesByChain[chainId] = gaugesOnChain;
    return gaugesOnChain;
  };
}
var getGaugesByChain = createGaugesByChainFetcher();
async function safeGetGaugesByChain(chainId) {
  try {
    return await getGaugesByChain(chainId);
  } catch (e) {
    console.error(e);
    return [];
  }
}

exports.GAUGES_ADDRESS = GAUGES_ADDRESS;
exports.GAUGES_CALC_ADDRESS = GAUGES_CALC_ADDRESS;
exports.GAUGES_SUPPORTED_CHAIN_IDS = GAUGES_SUPPORTED_CHAIN_IDS;
exports.GAUGE_TYPE_NAMES = GAUGE_TYPE_NAMES;
exports.GaugeType = GaugeType;
exports.calcGaugesVotingABI = calcGaugesVotingABI;
exports.gaugesVotingABI = gaugesVotingABI;
exports.getAllGauges = getAllGauges;
exports.getGaugesByChain = getGaugesByChain;
exports.safeGetGaugesByChain = safeGetGaugesByChain;
