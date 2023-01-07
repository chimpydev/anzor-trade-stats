exports.id = "server";
exports.modules = {

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js":
/*!************************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/cssWithMappingToString.js ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (!cssMapping) {
    return content;
  }

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== "string") {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }

  return url;
};

/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _fonts_philosopher_Philosopher_BoldItalic_ttf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./fonts/philosopher/Philosopher-BoldItalic.ttf */ "./src/fonts/philosopher/Philosopher-BoldItalic.ttf");
/* harmony import */ var _fonts_philosopher_Philosopher_BoldItalic_ttf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_fonts_philosopher_Philosopher_BoldItalic_ttf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _fonts_philosopher_Philosopher_Italic_ttf__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fonts/philosopher/Philosopher-Italic.ttf */ "./src/fonts/philosopher/Philosopher-Italic.ttf");
/* harmony import */ var _fonts_philosopher_Philosopher_Italic_ttf__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_fonts_philosopher_Philosopher_Italic_ttf__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _fonts_philosopher_Philosopher_Regular_ttf__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./fonts/philosopher/Philosopher-Regular.ttf */ "./src/fonts/philosopher/Philosopher-Regular.ttf");
/* harmony import */ var _fonts_philosopher_Philosopher_Regular_ttf__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_fonts_philosopher_Philosopher_Regular_ttf__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _fonts_philosopher_Philosopher_Bold_ttf__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./fonts/philosopher/Philosopher-Bold.ttf */ "./src/fonts/philosopher/Philosopher-Bold.ttf");
/* harmony import */ var _fonts_philosopher_Philosopher_Bold_ttf__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_fonts_philosopher_Philosopher_Bold_ttf__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_Regular_ttf__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-Regular.ttf */ "./src/fonts/comfortaa/Comfortaa-Regular.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_Regular_ttf__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_Regular_ttf__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_Bold_ttf__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-Bold.ttf */ "./src/fonts/comfortaa/Comfortaa-Bold.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_Bold_ttf__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_Bold_ttf__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_SemiBold_ttf__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-SemiBold.ttf */ "./src/fonts/comfortaa/Comfortaa-SemiBold.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_SemiBold_ttf__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_SemiBold_ttf__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_Light_ttf__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-Light.ttf */ "./src/fonts/comfortaa/Comfortaa-Light.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_Light_ttf__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_Light_ttf__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _fonts_comfortaa_Comfortaa_Medium_ttf__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./fonts/comfortaa/Comfortaa-Medium.ttf */ "./src/fonts/comfortaa/Comfortaa-Medium.ttf");
/* harmony import */ var _fonts_comfortaa_Comfortaa_Medium_ttf__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(_fonts_comfortaa_Comfortaa_Medium_ttf__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _fonts_relative_relative_book_pro_eot__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./fonts/relative/relative-book-pro.eot */ "./src/fonts/relative/relative-book-pro.eot");
/* harmony import */ var _fonts_relative_relative_book_pro_eot__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_fonts_relative_relative_book_pro_eot__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _fonts_relative_relative_book_pro_woff2__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./fonts/relative/relative-book-pro.woff2 */ "./src/fonts/relative/relative-book-pro.woff2");
/* harmony import */ var _fonts_relative_relative_book_pro_woff2__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_fonts_relative_relative_book_pro_woff2__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _fonts_relative_relative_book_pro_woff__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./fonts/relative/relative-book-pro.woff */ "./src/fonts/relative/relative-book-pro.woff");
/* harmony import */ var _fonts_relative_relative_book_pro_woff__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_fonts_relative_relative_book_pro_woff__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _fonts_relative_relative_book_pro_ttf__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./fonts/relative/relative-book-pro.ttf */ "./src/fonts/relative/relative-book-pro.ttf");
/* harmony import */ var _fonts_relative_relative_book_pro_ttf__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_fonts_relative_relative_book_pro_ttf__WEBPACK_IMPORTED_MODULE_15__);
/* harmony import */ var _fonts_relative_relative_bold_pro_eot__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./fonts/relative/relative-bold-pro.eot */ "./src/fonts/relative/relative-bold-pro.eot");
/* harmony import */ var _fonts_relative_relative_bold_pro_eot__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(_fonts_relative_relative_bold_pro_eot__WEBPACK_IMPORTED_MODULE_16__);
/* harmony import */ var _fonts_relative_relative_bold_pro_woff2__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./fonts/relative/relative-bold-pro.woff2 */ "./src/fonts/relative/relative-bold-pro.woff2");
/* harmony import */ var _fonts_relative_relative_bold_pro_woff2__WEBPACK_IMPORTED_MODULE_17___default = /*#__PURE__*/__webpack_require__.n(_fonts_relative_relative_bold_pro_woff2__WEBPACK_IMPORTED_MODULE_17__);
/* harmony import */ var _fonts_relative_relative_bold_pro_woff__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./fonts/relative/relative-bold-pro.woff */ "./src/fonts/relative/relative-bold-pro.woff");
/* harmony import */ var _fonts_relative_relative_bold_pro_woff__WEBPACK_IMPORTED_MODULE_18___default = /*#__PURE__*/__webpack_require__.n(_fonts_relative_relative_bold_pro_woff__WEBPACK_IMPORTED_MODULE_18__);
/* harmony import */ var _fonts_relative_relative_bold_pro_ttf__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./fonts/relative/relative-bold-pro.ttf */ "./src/fonts/relative/relative-bold-pro.ttf");
/* harmony import */ var _fonts_relative_relative_bold_pro_ttf__WEBPACK_IMPORTED_MODULE_19___default = /*#__PURE__*/__webpack_require__.n(_fonts_relative_relative_bold_pro_ttf__WEBPACK_IMPORTED_MODULE_19__);
/* harmony import */ var _fonts_inter_Inter_Black_woff2__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./fonts/inter/Inter-Black.woff2 */ "./src/fonts/inter/Inter-Black.woff2");
/* harmony import */ var _fonts_inter_Inter_Black_woff2__WEBPACK_IMPORTED_MODULE_20___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Black_woff2__WEBPACK_IMPORTED_MODULE_20__);
/* harmony import */ var _fonts_inter_Inter_Black_woff__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./fonts/inter/Inter-Black.woff */ "./src/fonts/inter/Inter-Black.woff");
/* harmony import */ var _fonts_inter_Inter_Black_woff__WEBPACK_IMPORTED_MODULE_21___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Black_woff__WEBPACK_IMPORTED_MODULE_21__);
/* harmony import */ var _fonts_inter_Inter_Bold_woff2__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./fonts/inter/Inter-Bold.woff2 */ "./src/fonts/inter/Inter-Bold.woff2");
/* harmony import */ var _fonts_inter_Inter_Bold_woff2__WEBPACK_IMPORTED_MODULE_22___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Bold_woff2__WEBPACK_IMPORTED_MODULE_22__);
/* harmony import */ var _fonts_inter_Inter_Bold_woff__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./fonts/inter/Inter-Bold.woff */ "./src/fonts/inter/Inter-Bold.woff");
/* harmony import */ var _fonts_inter_Inter_Bold_woff__WEBPACK_IMPORTED_MODULE_23___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Bold_woff__WEBPACK_IMPORTED_MODULE_23__);
/* harmony import */ var _fonts_inter_Inter_ExtraBold_woff2__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./fonts/inter/Inter-ExtraBold.woff2 */ "./src/fonts/inter/Inter-ExtraBold.woff2");
/* harmony import */ var _fonts_inter_Inter_ExtraBold_woff2__WEBPACK_IMPORTED_MODULE_24___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_ExtraBold_woff2__WEBPACK_IMPORTED_MODULE_24__);
/* harmony import */ var _fonts_inter_Inter_ExtraBold_woff__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./fonts/inter/Inter-ExtraBold.woff */ "./src/fonts/inter/Inter-ExtraBold.woff");
/* harmony import */ var _fonts_inter_Inter_ExtraBold_woff__WEBPACK_IMPORTED_MODULE_25___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_ExtraBold_woff__WEBPACK_IMPORTED_MODULE_25__);
/* harmony import */ var _fonts_inter_Inter_Light_woff2__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./fonts/inter/Inter-Light.woff2 */ "./src/fonts/inter/Inter-Light.woff2");
/* harmony import */ var _fonts_inter_Inter_Light_woff2__WEBPACK_IMPORTED_MODULE_26___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Light_woff2__WEBPACK_IMPORTED_MODULE_26__);
/* harmony import */ var _fonts_inter_Inter_Light_woff__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./fonts/inter/Inter-Light.woff */ "./src/fonts/inter/Inter-Light.woff");
/* harmony import */ var _fonts_inter_Inter_Light_woff__WEBPACK_IMPORTED_MODULE_27___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Light_woff__WEBPACK_IMPORTED_MODULE_27__);
/* harmony import */ var _fonts_inter_Inter_SemiBold_woff2__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./fonts/inter/Inter-SemiBold.woff2 */ "./src/fonts/inter/Inter-SemiBold.woff2");
/* harmony import */ var _fonts_inter_Inter_SemiBold_woff2__WEBPACK_IMPORTED_MODULE_28___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_SemiBold_woff2__WEBPACK_IMPORTED_MODULE_28__);
/* harmony import */ var _fonts_inter_Inter_SemiBold_woff__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./fonts/inter/Inter-SemiBold.woff */ "./src/fonts/inter/Inter-SemiBold.woff");
/* harmony import */ var _fonts_inter_Inter_SemiBold_woff__WEBPACK_IMPORTED_MODULE_29___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_SemiBold_woff__WEBPACK_IMPORTED_MODULE_29__);
/* harmony import */ var _fonts_inter_Inter_Medium_woff2__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./fonts/inter/Inter-Medium.woff2 */ "./src/fonts/inter/Inter-Medium.woff2");
/* harmony import */ var _fonts_inter_Inter_Medium_woff2__WEBPACK_IMPORTED_MODULE_30___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Medium_woff2__WEBPACK_IMPORTED_MODULE_30__);
/* harmony import */ var _fonts_inter_Inter_Medium_woff__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./fonts/inter/Inter-Medium.woff */ "./src/fonts/inter/Inter-Medium.woff");
/* harmony import */ var _fonts_inter_Inter_Medium_woff__WEBPACK_IMPORTED_MODULE_31___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Medium_woff__WEBPACK_IMPORTED_MODULE_31__);
/* harmony import */ var _fonts_inter_Inter_Thin_woff2__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./fonts/inter/Inter-Thin.woff2 */ "./src/fonts/inter/Inter-Thin.woff2");
/* harmony import */ var _fonts_inter_Inter_Thin_woff2__WEBPACK_IMPORTED_MODULE_32___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Thin_woff2__WEBPACK_IMPORTED_MODULE_32__);
/* harmony import */ var _fonts_inter_Inter_Thin_woff__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./fonts/inter/Inter-Thin.woff */ "./src/fonts/inter/Inter-Thin.woff");
/* harmony import */ var _fonts_inter_Inter_Thin_woff__WEBPACK_IMPORTED_MODULE_33___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Thin_woff__WEBPACK_IMPORTED_MODULE_33__);
/* harmony import */ var _fonts_inter_Inter_Regular_woff2__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ./fonts/inter/Inter-Regular.woff2 */ "./src/fonts/inter/Inter-Regular.woff2");
/* harmony import */ var _fonts_inter_Inter_Regular_woff2__WEBPACK_IMPORTED_MODULE_34___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Regular_woff2__WEBPACK_IMPORTED_MODULE_34__);
/* harmony import */ var _fonts_inter_Inter_Regular_woff__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! ./fonts/inter/Inter-Regular.woff */ "./src/fonts/inter/Inter-Regular.woff");
/* harmony import */ var _fonts_inter_Inter_Regular_woff__WEBPACK_IMPORTED_MODULE_35___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_Regular_woff__WEBPACK_IMPORTED_MODULE_35__);
/* harmony import */ var _fonts_inter_Inter_ExtraLight_woff2__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ./fonts/inter/Inter-ExtraLight.woff2 */ "./src/fonts/inter/Inter-ExtraLight.woff2");
/* harmony import */ var _fonts_inter_Inter_ExtraLight_woff2__WEBPACK_IMPORTED_MODULE_36___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_ExtraLight_woff2__WEBPACK_IMPORTED_MODULE_36__);
/* harmony import */ var _fonts_inter_Inter_ExtraLight_woff__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ./fonts/inter/Inter-ExtraLight.woff */ "./src/fonts/inter/Inter-ExtraLight.woff");
/* harmony import */ var _fonts_inter_Inter_ExtraLight_woff__WEBPACK_IMPORTED_MODULE_37___default = /*#__PURE__*/__webpack_require__.n(_fonts_inter_Inter_ExtraLight_woff__WEBPACK_IMPORTED_MODULE_37__);
/* harmony import */ var _fonts_SkullFont_ttf__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! ./fonts/SkullFont.ttf */ "./src/fonts/SkullFont.ttf");
/* harmony import */ var _fonts_SkullFont_ttf__WEBPACK_IMPORTED_MODULE_38___default = /*#__PURE__*/__webpack_require__.n(_fonts_SkullFont_ttf__WEBPACK_IMPORTED_MODULE_38__);
// Imports







































var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_philosopher_Philosopher_BoldItalic_ttf__WEBPACK_IMPORTED_MODULE_3___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_philosopher_Philosopher_Italic_ttf__WEBPACK_IMPORTED_MODULE_4___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_2___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_philosopher_Philosopher_Regular_ttf__WEBPACK_IMPORTED_MODULE_5___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_philosopher_Philosopher_Bold_ttf__WEBPACK_IMPORTED_MODULE_6___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_Regular_ttf__WEBPACK_IMPORTED_MODULE_7___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_5___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_Bold_ttf__WEBPACK_IMPORTED_MODULE_8___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_6___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_SemiBold_ttf__WEBPACK_IMPORTED_MODULE_9___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_7___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_Light_ttf__WEBPACK_IMPORTED_MODULE_10___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_8___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_comfortaa_Comfortaa_Medium_ttf__WEBPACK_IMPORTED_MODULE_11___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_9___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_book_pro_eot__WEBPACK_IMPORTED_MODULE_12___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_10___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_book_pro_eot__WEBPACK_IMPORTED_MODULE_12___default.a, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_11___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_book_pro_woff2__WEBPACK_IMPORTED_MODULE_13___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_12___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_book_pro_woff__WEBPACK_IMPORTED_MODULE_14___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_13___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_book_pro_ttf__WEBPACK_IMPORTED_MODULE_15___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_14___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_bold_pro_eot__WEBPACK_IMPORTED_MODULE_16___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_15___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_bold_pro_eot__WEBPACK_IMPORTED_MODULE_16___default.a, { hash: "?#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_16___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_bold_pro_woff2__WEBPACK_IMPORTED_MODULE_17___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_17___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_bold_pro_woff__WEBPACK_IMPORTED_MODULE_18___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_18___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_relative_relative_bold_pro_ttf__WEBPACK_IMPORTED_MODULE_19___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_19___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Black_woff2__WEBPACK_IMPORTED_MODULE_20___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_20___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Black_woff__WEBPACK_IMPORTED_MODULE_21___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_21___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Bold_woff2__WEBPACK_IMPORTED_MODULE_22___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_22___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Bold_woff__WEBPACK_IMPORTED_MODULE_23___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_23___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_ExtraBold_woff2__WEBPACK_IMPORTED_MODULE_24___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_24___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_ExtraBold_woff__WEBPACK_IMPORTED_MODULE_25___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_25___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Light_woff2__WEBPACK_IMPORTED_MODULE_26___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_26___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Light_woff__WEBPACK_IMPORTED_MODULE_27___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_27___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_SemiBold_woff2__WEBPACK_IMPORTED_MODULE_28___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_28___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_SemiBold_woff__WEBPACK_IMPORTED_MODULE_29___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_29___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Medium_woff2__WEBPACK_IMPORTED_MODULE_30___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_30___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Medium_woff__WEBPACK_IMPORTED_MODULE_31___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_31___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Thin_woff2__WEBPACK_IMPORTED_MODULE_32___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_32___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Thin_woff__WEBPACK_IMPORTED_MODULE_33___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_33___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Regular_woff2__WEBPACK_IMPORTED_MODULE_34___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_34___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_Regular_woff__WEBPACK_IMPORTED_MODULE_35___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_35___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_ExtraLight_woff2__WEBPACK_IMPORTED_MODULE_36___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_36___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_inter_Inter_ExtraLight_woff__WEBPACK_IMPORTED_MODULE_37___default.a);
var ___CSS_LOADER_URL_REPLACEMENT_37___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(_fonts_SkullFont_ttf__WEBPACK_IMPORTED_MODULE_38___default.a);
// Module
___CSS_LOADER_EXPORT___.push([module.i, "@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('truetype');\r\n  font-weight: bold;\r\n  font-style: italic;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format('truetype');\r\n  font-weight: normal;\r\n  font-style: italic;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format('truetype');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format('truetype');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format('truetype');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_5___ + ") format('truetype');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_6___ + ") format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_7___ + ") format('truetype');\r\n  font-weight: 300;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_8___ + ") format('truetype');\r\n  font-weight: 500;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n\r\n\r\n\r\n@font-face {\r\n  font-family: 'RelativeMono';\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_9___ + "); /* IE9 Compat Modes */\r\n  src: local(''),\r\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_10___ + ") format('embedded-opentype'), /* IE6-IE8 */\r\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_11___ + ") format('woff2'), /* Super Modern Browsers */\r\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_12___ + ") format('woff'), /* Modern Browsers */\r\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_13___ + ") format('truetype'); /* Safari, Android, iOS */\r\n}\r\n\r\n@font-face {\r\n  font-family: 'RelativeMono';\r\n  font-style: bold;\r\n  font-weight: 500;\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_14___ + "); /* IE9 Compat Modes */\r\n  src: local(''),\r\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_15___ + ") format('embedded-opentype'), /* IE6-IE8 */\r\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_16___ + ") format('woff2'), /* Super Modern Browsers */\r\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_17___ + ") format('woff'), /* Modern Browsers */\r\n       url(" + ___CSS_LOADER_URL_REPLACEMENT_18___ + ") format('truetype'); /* Safari, Android, iOS */\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_19___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_20___ + ") format('woff');\r\n  font-weight: 900;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_21___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_22___ + ") format('woff');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_23___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_24___ + ") format('woff');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_25___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_26___ + ") format('woff');\r\n  font-weight: 300;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_27___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_28___ + ") format('woff');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_29___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_30___ + ") format('woff');\r\n  font-weight: 500;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_31___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_32___ + ") format('woff');\r\n  font-weight: 100;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_33___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_34___ + ") format('woff');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url(" + ___CSS_LOADER_URL_REPLACEMENT_35___ + ") format('woff2'),\r\n      url(" + ___CSS_LOADER_URL_REPLACEMENT_36___ + ") format('woff');\r\n  font-weight: 200;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: \"SkullFont\";\r\n  src: local(\"SkullFont\"),\r\n   url(" + ___CSS_LOADER_URL_REPLACEMENT_37___ + ") format(\"truetype\");\r\n  font-weight: bold;\r\n}\r\n\r\nbody {\r\n  font-size: 0.9rem;\r\n  /* background: #f6f9ff; */\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'Inter', sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n}\r\n\r\n.recharts-wrapper {\r\n  font-size: 0.8rem;\r\n  font-family: 'Inter', monospace;\r\n}\r\n\r\n.recharts-legend-item-text {\r\n  display: inline-block;\r\n  max-width: 150px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  vertical-align: middle;\r\n}\r\n\r\n.App {\r\n  color: #000;\r\n  background: #fcfcfc;\r\n  line-height: 1.15;\r\n  padding: 1rem;\r\n  padding-top: 0;\r\n}\r\n\r\n.App.dark {\r\n  background: #000000;\r\n  color: #FFF;\r\n  line-height: 1.15;\r\n  box-sizing: border-box;\r\n  min-height: 100vh;\r\n}\r\n\r\nh3, h2 {\r\n  color: #444;\r\n  margin: 1rem 0 1.5rem;\r\n}\r\n\r\n.App.dark h3, .App.dark h2 {\r\n  color: white;\r\n}\r\n\r\nh3 {\r\n  margin: 1rem 0;\r\n  font-weight: normal;\r\n  font-size: 1.2rem;\r\n}\r\n\r\nh2 {\r\n  font-size: 1.6rem;\r\n  font-weight: normal\r\n}\r\n\r\nlabel {\r\n  cursor: pointer;\r\n}\r\n\r\ninput + label,\r\nlabel + input {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n.chart-subtitle, .stats {\r\n  margin: 1.5rem 0 1rem;\r\n}\r\n\r\n.chart-description {\r\n  margin: 1rem 0 0;\r\n  max-width: 600px;\r\n  /* color: #ffffff; */\r\n}\r\n\r\n.App.dark .chart-description {\r\n  color: #ffffff;\r\n}\r\n\r\n.chart-description p:first-child {\r\n  margin-top: 0;\r\n}\r\n\r\n.chart-description p:last-child {\r\n  margin-bottom: 0;\r\n}\r\n\r\n.chart-description ul {\r\n  margin: 0;\r\n  padding-left: 20px;\r\n}\r\n\r\n.chart-description li {\r\n  margin-top: 5px;\r\n}\r\n\r\n.chart-grid {\r\n  color: #16182E;\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n  gap: 1rem;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.chart-grid-subtitle {\r\n  grid-column-start: 1;\r\n  grid-column-end: 9;\r\n  margin-bottom: 0;\r\n  margin-top: 2rem;\r\n}\r\n\r\n.total-stat-value {\r\n  font-size: 1.5rem;\r\n  overflow: hidden;\r\n  white-space: pre-wrap;\r\n}\r\n\r\n.total-stat-delta {\r\n  font-size: 0.875rem;\r\n  line-height: 1.125rem;\r\n  display: block;\r\n}\r\n\r\n.total-stat-delta.plus {\r\n  color: #46E3AE;\r\n}\r\n.App.light .total-stat-delta.plus {\r\n  color: rgb(34 199 97);\r\n}\r\n.total-stat-delta.minus {\r\n  color: #727171;\r\n}\r\n\r\n.App.dark .chart-cell {\r\n  background: #181818;\r\n  border: none;\r\n  color: white;\r\n}\r\n\r\n.App.dark .chart-cell.stats {\r\n  border: 1px solid #FFFFFF14;\r\n}\r\n\r\n.chart-cell {\r\n  margin: 0;\r\n  border-radius: 15px;\r\n  border: 1px solid #FFFFFF14;\r\n  background: #181818;\r\n  position: relative;\r\n  padding: 1rem;\r\n  grid-column-start: span 5;\r\n}\r\n\r\n.chart-cell.stats {\r\n  min-height: 60px;\r\n  grid-column-start: span 2;\r\n  text-align: center;\r\n}\r\n\r\n.chart-cell.experiment {\r\n  border-color: #fbb;\r\n}\r\n.chart-cell.experiment:after {\r\n  color: #f55;\r\n  top: 1rem;\r\n  right: 1rem;\r\n  position: absolute;\r\n  content: '(experimental)';\r\n}\r\n\r\n.chart-cell h3 {\r\n  margin-top: 0;\r\n  letter-spacing: 0px;\r\n  font-size: 1.125rem;\r\n  line-height: 1.4375rem;\r\n}\r\n\r\n.chart-cell .csv-link {\r\n  cursor: pointer;\r\n  font-size: 0.9rem;\r\n  margin-left: 0.3rem;\r\n  opacity: 0.5;\r\n  display: inline-flex;\r\n  vertical-align: middle;\r\n}\r\n.chart-cell:hover .csv-link {\r\n  opacity: 0.5;\r\n}\r\n.chart-cell .csv-link:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.form input[type=\"date\"],\r\n.form input[type=\"text\"] {\r\n  border: 1px solid #aaa;\r\n  border-radius: 3px;\r\n  appearance: none !important;\r\n  box-sizing: border-box;\r\n  padding: 3px;\r\n}\r\n\r\n.form button {\r\n  border: none;\r\n  appearance: none !important;\r\n  color: #000;\r\n  border: 1px solid #FFFFFF0F;\r\n  box-sizing: border-box;\r\n  background: #b39a31;\r\n  cursor: pointer;\r\n  margin-left: 10px;\r\n  height: 28px;\r\n  border-radius: 3px;\r\n  padding: 3px 7px;\r\n}\r\n.form button:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@keyframes loader {\r\n  from {\r\n    transform: rotate(0);\r\n  }\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.loader {\r\n  animation: loader 1.5s infinite;\r\n  opacity: 0.3;\r\n}\r\n.chart-cell .loader {\r\n  position: absolute;\r\n  margin-left: -1.5em;\r\n  margin-top: -1.5em;\r\n  font-size: 0.7rem;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: 2;\r\n}\r\n\r\n\r\n.warning, .warning a {\r\n  color: #e46b00;\r\n}\r\n\r\n.nav {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 -1rem 0;\r\n  height: 55px;\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n  border-bottom: 1px solid #ffffff;\r\n  background-color: white;\r\n}\r\n\r\n.App.dark .nav {\r\n  background: #000000;\r\n  border-bottom: 1px solid #FFFFFF29;\r\n}\r\n\r\n.nav-logo {\r\n  /* width: 87px; */\r\n  vertical-align: middle;\r\n  margin: 0px 0.5rem 0 0;\r\n  display: inline-flex;\r\n  font-family: 'Philosopher';\r\n  letter-spacing: 3px;\r\n}\r\n\r\n.nav-logo img {\r\n  width: 87px;\r\n}\r\n\r\na, a:active, a:visited {\r\n  color: #16182E;\r\n}\r\n\r\n.nav-link {\r\n  letter-spacing: 0.47px;\r\n  color: #ffffff;\r\n  /* color: #000; */\r\n  text-decoration: none;\r\n  padding: 0.5rem 1rem;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  font-size: 15px;\r\n  line-height: 1.125rem;\r\n  letter-spacing: 0.47px;\r\n}\r\n\r\n.nav-link:active, .nav-link:visited {\r\n  color: #ffffff;\r\n}\r\n\r\n.nav-link.active {\r\n  color: #444;\r\n}\r\n\r\n.App.dark a, .App.dark a:active, .App.dark a:visited {\r\n  color: #FFFFFF;\r\n}\r\n\r\n.App.dark .nav-link {\r\n  color: #ffffff;\r\n}\r\n\r\n.App.dark .nav-link:active, .App.dark .nav-link:visited {\r\n  color: #ffffff;\r\n}\r\n\r\n.App.dark .nav-link.active {\r\n  color: white;\r\n}\r\n\r\n.App.dark .nav-link:hover {\r\n  color: white;\r\n}\r\n\r\n.nav-link:hover {\r\n  color: #444;\r\n}\r\n\r\n.nav-right {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.modeselect {\r\n  width: 30px;\r\n  height: 26px;\r\n  background: #16182E 0% 0% no-repeat padding-box;\r\n  border: 1px solid #FFFFFF0F;\r\n  border-radius: 4px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.App.dark .modeselect {\r\n  background: #FFFFFF 0% 0% no-repeat padding-box;\r\n}\r\n\r\n.modeselect svg {\r\n  fill: #ffffff;\r\n}\r\n\r\n.App.dark .modeselect svg {\r\n  fill: #FFFFFF0F;\r\n}\r\n\r\n.page-title {\r\n  font-size: 1.8125rem;\r\n  line-height: 2.3125rem;\r\n}\r\n\r\n.recharts-cartesian-axis-tick-value {\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.App.dark .recharts-cartesian-axis-tick-value {\r\n  fill: #fff;\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.App.dark .recharts-cartesian-grid-horizontal line, .App.dark .recharts-cartesian-grid-vertical line {\r\n  stroke: #FFFFFF0F;\r\n}\r\n\r\n.recharts-tooltip-wrapper .recharts-default-tooltip {\r\n  padding: 5px 12px!important;\r\n}\r\n\r\n.recharts-tooltip-wrapper ul.recharts-tooltip-item-list li {\r\n  padding: 0px!important;\r\n  font-size: 12px!important;\r\n  line-height: 15px!important;\r\n}\r\n\r\n.recharts-tooltip-wrapper ul.recharts-tooltip-item-list li + li {\r\n  margin-top: 1px!important;\r\n}\r\n\r\n.App.dark .recharts-tooltip-wrapper .recharts-default-tooltip {\r\n  background-color: #00000029!important;\r\n  box-shadow: 0px 3px 6px #0000005C;\r\n  border: 1px solid #484B6E!important;\r\n  border-radius: 4px;\r\n}\r\n\r\n.App-header-drawer {\r\n  background: #000000 0% 0% no-repeat padding-box;\r\n  box-shadow: 8px 3px 6px #00000029;\r\n  opacity: 1;\r\n  backdrop-filter: blur(27px);\r\n  position: fixed;\r\n  z-index: 11;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  height: 100vh;\r\n  width: 304px;\r\n}\r\n\r\n.App-header-drawer .App-header-link-container a {\r\n  font-size: 14px;\r\n  line-height: 18px;\r\n  font-weight: normal;\r\n  letter-spacing: 0.1px;\r\n  color: #ffffff;\r\n  padding: 15px 16px;\r\n  text-decoration: none;\r\n  display: block;\r\n}\r\n\r\n.App-header-drawer .App-header-link-container a:hover,\r\n.App-header-drawer .App-header-link-container a:focus,\r\n.App-header-drawer .App-header-link-container a.active {\r\n  background: #181818;\r\n  color: white;\r\n}\r\n\r\n.App-header-drawer .App-header-menu-icon {\r\n  color: white;\r\n  margin: unset;\r\n  font-size: 2rem;\r\n}\r\n\r\n.App-header-drawer .App-header-link-main {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.App-header-links-header {\r\n  height: 62px;\r\n  display: flex;\r\n  align-items: center;\r\n  z-index: 3;\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n}\r\n\r\n.App-header-menu-icon {\r\n  color: black;\r\n  font-size: 1.3rem;\r\n  cursor: pointer;\r\n  opacity: 0.7;\r\n  margin: 9px 10px;\r\n}\r\n\r\n.App.dark .App-header-menu-icon {\r\n  color: white;\r\n}\r\n\r\n.App-header-menu-icon:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@media all and (max-width: 1000px) {\r\n  .chart-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n\r\n  .chart-cell {\r\n    grid-column-start: span 2;\r\n    grid-column-end: auto;\r\n  }\r\n  .chart-cell.stats {\r\n    grid-column-start: span 1;\r\n  }\r\n}\r\n\r\n.content {\r\n  margin-top: 1rem;\r\n}\r\n\r\n.App-header-menu-icon-block {\r\n  display: none;\r\n}\r\n\r\n.App-header-backdrop {\r\n  position: fixed;\r\n  z-index: 10;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n\r\n@media all and (max-width: 600px) {\r\n  .chart-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .chart-cell {\r\n    grid-column-start: unset!important;\r\n    grid-column-end: unset!important;\r\n  }\r\n\r\n  .App-header-menu-icon-block {\r\n    display: flex;\r\n    align-items: center;\r\n    margin-right: 0.5rem;\r\n  }\r\n\r\n  .nav-left {\r\n    display: flex;\r\n    align-items: center;\r\n  }\r\n\r\n  .nav-logo {\r\n    display: flex;\r\n  }\r\n\r\n  .nav-left .nav-link {\r\n    display: none;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/App.css"],"names":[],"mappings":"AAAA;EACE,0BAA0B;EAC1B,+DAA6E;EAC7E,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;EAC1B,+DAAyE;EACzE,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;EAC1B,+DAA0E;EAC1E,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,0BAA0B;EAC1B,+DAAuE;EACvE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAsE;EACtE,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAmE;EACnE,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAuE;EACvE,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAoE;EACpE,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB,+DAAqE;EACrE,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;;;;AAKA;EACE,2BAA2B;EAC3B,kBAAkB;EAClB,gBAAgB;EAChB,4CAAkD,EAAE,qBAAqB;EACzE;;;;kEAIqE,EAAE,yBAAyB;AAClG;;AAEA;EACE,2BAA2B;EAC3B,gBAAgB;EAChB,gBAAgB;EAChB,6CAAkD,EAAE,qBAAqB;EACzE;;;;kEAIqE,EAAE,yBAAyB;AAClG;;AAEA;EACE,oBAAoB;EACpB;6DACwD;EACxD,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB;6DACuD;EACvD,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB;6DAC4D;EAC5D,iBAAiB;EACjB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB;6DACwD;EACxD,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB;6DAC2D;EAC3D,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB;6DACyD;EACzD,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB;6DACuD;EACvD,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB;6DAC0D;EAC1D,mBAAmB;EACnB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,oBAAoB;EACpB;6DAC6D;EAC7D,gBAAgB;EAChB,kBAAkB;EAClB,kBAAkB;AACpB;;AAEA;EACE,wBAAwB;EACxB;8DACgD;EAChD,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB,yBAAyB;EACzB,SAAS;EACT,UAAU;EACV,gCAAgC;EAChC,mCAAmC;AACrC;;AAEA;EACE,iBAAiB;EACjB,+BAA+B;AACjC;;AAEA;EACE,qBAAqB;EACrB,gBAAgB;EAChB,gBAAgB;EAChB,uBAAuB;EACvB,sBAAsB;AACxB;;AAEA;EACE,WAAW;EACX,mBAAmB;EACnB,iBAAiB;EACjB,aAAa;EACb,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,WAAW;EACX,iBAAiB;EACjB,sBAAsB;EACtB,iBAAiB;AACnB;;AAEA;EACE,WAAW;EACX,qBAAqB;AACvB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,cAAc;EACd,mBAAmB;EACnB,iBAAiB;AACnB;;AAEA;EACE,iBAAiB;EACjB;AACF;;AAEA;EACE,eAAe;AACjB;;AAEA;;EAEE,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;AACvB;;AAEA;EACE,gBAAgB;EAChB,gBAAgB;EAChB,oBAAoB;AACtB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,cAAc;EACd,aAAa;EACb,sCAAsC;EACtC,SAAS;EACT,gBAAgB;AAClB;;AAEA;EACE,oBAAoB;EACpB,kBAAkB;EAClB,gBAAgB;EAChB,gBAAgB;AAClB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,qBAAqB;AACvB;;AAEA;EACE,mBAAmB;EACnB,qBAAqB;EACrB,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;AACA;EACE,qBAAqB;AACvB;AACA;EACE,cAAc;AAChB;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,YAAY;AACd;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,SAAS;EACT,mBAAmB;EACnB,2BAA2B;EAC3B,mBAAmB;EACnB,kBAAkB;EAClB,aAAa;EACb,yBAAyB;AAC3B;;AAEA;EACE,gBAAgB;EAChB,yBAAyB;EACzB,kBAAkB;AACpB;;AAEA;EACE,kBAAkB;AACpB;AACA;EACE,WAAW;EACX,SAAS;EACT,WAAW;EACX,kBAAkB;EAClB,yBAAyB;AAC3B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,YAAY;EACZ,oBAAoB;EACpB,sBAAsB;AACxB;AACA;EACE,YAAY;AACd;AACA;EACE,UAAU;AACZ;;AAEA;;EAEE,sBAAsB;EACtB,kBAAkB;EAClB,2BAA2B;EAC3B,sBAAsB;EACtB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,2BAA2B;EAC3B,WAAW;EACX,2BAA2B;EAC3B,sBAAsB;EACtB,mBAAmB;EACnB,eAAe;EACf,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,gBAAgB;AAClB;AACA;EACE,YAAY;AACd;;AAEA;EACE;IACE,oBAAoB;EACtB;EACA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,+BAA+B;EAC/B,YAAY;AACd;AACA;EACE,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;EAClB,iBAAiB;EACjB,QAAQ;EACR,SAAS;EACT,UAAU;AACZ;;;AAGA;EACE,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,iBAAiB;EACjB,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,gCAAgC;EAChC,uBAAuB;AACzB;;AAEA;EACE,mBAAmB;EACnB,kCAAkC;AACpC;;AAEA;EACE,iBAAiB;EACjB,sBAAsB;EACtB,sBAAsB;EACtB,oBAAoB;EACpB,0BAA0B;EAC1B,mBAAmB;AACrB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,sBAAsB;EACtB,cAAc;EACd,iBAAiB;EACjB,qBAAqB;EACrB,oBAAoB;EACpB,qBAAqB;EACrB,sBAAsB;EACtB,eAAe;EACf,qBAAqB;EACrB,sBAAsB;AACxB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,+CAA+C;EAC/C,2BAA2B;EAC3B,kBAAkB;EAClB,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,eAAe;AACjB;;AAEA;EACE,+CAA+C;AACjD;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,oBAAoB;EACpB,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,kBAAkB;AACpB;;AAEA;EACE,iBAAiB;AACnB;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,sBAAsB;EACtB,yBAAyB;EACzB,2BAA2B;AAC7B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,qCAAqC;EACrC,iCAAiC;EACjC,mCAAmC;EACnC,kBAAkB;AACpB;;AAEA;EACE,+CAA+C;EAC/C,iCAAiC;EACjC,UAAU;EACV,2BAA2B;EAC3B,eAAe;EACf,WAAW;EACX,OAAO;EACP,QAAQ;EACR,MAAM;EACN,aAAa;EACb,YAAY;AACd;;AAEA;EACE,eAAe;EACf,iBAAiB;EACjB,mBAAmB;EACnB,qBAAqB;EACrB,cAAc;EACd,kBAAkB;EAClB,qBAAqB;EACrB,cAAc;AAChB;;AAEA;;;EAGE,mBAAmB;EACnB,YAAY;AACd;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,UAAU;EACV,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,YAAY;EACZ,iBAAiB;EACjB,eAAe;EACf,YAAY;EACZ,gBAAgB;AAClB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,YAAY;AACd;;AAEA;EACE;IACE,aAAa;IACb,qCAAqC;EACvC;;EAEA;IACE,yBAAyB;IACzB,qBAAqB;EACvB;EACA;IACE,yBAAyB;EAC3B;AACF;;AAEA;EACE,gBAAgB;AAClB;;AAEA;EACE,aAAa;AACf;;AAEA;EACE,eAAe;EACf,WAAW;EACX,MAAM;EACN,SAAS;EACT,OAAO;EACP,QAAQ;AACV;;AAEA;EACE;IACE,aAAa;IACb,0BAA0B;EAC5B;;EAEA;IACE,kCAAkC;IAClC,gCAAgC;EAClC;;EAEA;IACE,aAAa;IACb,mBAAmB;IACnB,oBAAoB;EACtB;;EAEA;IACE,aAAa;IACb,mBAAmB;EACrB;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,aAAa;EACf;AACF","sourcesContent":["@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url('./fonts/philosopher/Philosopher-BoldItalic.ttf') format('truetype');\r\n  font-weight: bold;\r\n  font-style: italic;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url('./fonts/philosopher/Philosopher-Italic.ttf') format('truetype');\r\n  font-weight: normal;\r\n  font-style: italic;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url('./fonts/philosopher/Philosopher-Regular.ttf') format('truetype');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Philosopher';\r\n  src: url('./fonts/philosopher/Philosopher-Bold.ttf') format('truetype');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-Regular.ttf') format('truetype');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-Bold.ttf') format('truetype');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-SemiBold.ttf') format('truetype');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-Light.ttf') format('truetype');\r\n  font-weight: 300;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Comfortaa';\r\n  src: url('./fonts/comfortaa/Comfortaa-Medium.ttf') format('truetype');\r\n  font-weight: 500;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n\r\n\r\n\r\n@font-face {\r\n  font-family: 'RelativeMono';\r\n  font-style: normal;\r\n  font-weight: 400;\r\n  src: url('./fonts/relative/relative-book-pro.eot'); /* IE9 Compat Modes */\r\n  src: local(''),\r\n       url('./fonts/relative/relative-book-pro.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */\r\n       url('./fonts/relative/relative-book-pro.woff2') format('woff2'), /* Super Modern Browsers */\r\n       url('./fonts/relative/relative-book-pro.woff') format('woff'), /* Modern Browsers */\r\n       url('./fonts/relative/relative-book-pro.ttf') format('truetype'); /* Safari, Android, iOS */\r\n}\r\n\r\n@font-face {\r\n  font-family: 'RelativeMono';\r\n  font-style: bold;\r\n  font-weight: 500;\r\n  src: url('./fonts/relative/relative-bold-pro.eot'); /* IE9 Compat Modes */\r\n  src: local(''),\r\n       url('./fonts/relative/relative-bold-pro.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */\r\n       url('./fonts/relative/relative-bold-pro.woff2') format('woff2'), /* Super Modern Browsers */\r\n       url('./fonts/relative/relative-bold-pro.woff') format('woff'), /* Modern Browsers */\r\n       url('./fonts/relative/relative-bold-pro.ttf') format('truetype'); /* Safari, Android, iOS */\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-Black.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-Black.woff') format('woff');\r\n  font-weight: 900;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-Bold.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-Bold.woff') format('woff');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-ExtraBold.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-ExtraBold.woff') format('woff');\r\n  font-weight: bold;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-Light.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-Light.woff') format('woff');\r\n  font-weight: 300;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-SemiBold.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-SemiBold.woff') format('woff');\r\n  font-weight: 600;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-Medium.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-Medium.woff') format('woff');\r\n  font-weight: 500;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-Thin.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-Thin.woff') format('woff');\r\n  font-weight: 100;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-Regular.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-Regular.woff') format('woff');\r\n  font-weight: normal;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: 'Inter';\r\n  src: url('./fonts/inter/Inter-ExtraLight.woff2') format('woff2'),\r\n      url('./fonts/inter/Inter-ExtraLight.woff') format('woff');\r\n  font-weight: 200;\r\n  font-style: normal;\r\n  font-display: swap;\r\n}\r\n\r\n@font-face {\r\n  font-family: \"SkullFont\";\r\n  src: local(\"SkullFont\"),\r\n   url(\"./fonts/SkullFont.ttf\") format(\"truetype\");\r\n  font-weight: bold;\r\n}\r\n\r\nbody {\r\n  font-size: 0.9rem;\r\n  /* background: #f6f9ff; */\r\n  margin: 0;\r\n  padding: 0;\r\n  font-family: 'Inter', sans-serif;\r\n  -webkit-font-smoothing: antialiased;\r\n}\r\n\r\n.recharts-wrapper {\r\n  font-size: 0.8rem;\r\n  font-family: 'Inter', monospace;\r\n}\r\n\r\n.recharts-legend-item-text {\r\n  display: inline-block;\r\n  max-width: 150px;\r\n  overflow: hidden;\r\n  text-overflow: ellipsis;\r\n  vertical-align: middle;\r\n}\r\n\r\n.App {\r\n  color: #000;\r\n  background: #fcfcfc;\r\n  line-height: 1.15;\r\n  padding: 1rem;\r\n  padding-top: 0;\r\n}\r\n\r\n.App.dark {\r\n  background: #000000;\r\n  color: #FFF;\r\n  line-height: 1.15;\r\n  box-sizing: border-box;\r\n  min-height: 100vh;\r\n}\r\n\r\nh3, h2 {\r\n  color: #444;\r\n  margin: 1rem 0 1.5rem;\r\n}\r\n\r\n.App.dark h3, .App.dark h2 {\r\n  color: white;\r\n}\r\n\r\nh3 {\r\n  margin: 1rem 0;\r\n  font-weight: normal;\r\n  font-size: 1.2rem;\r\n}\r\n\r\nh2 {\r\n  font-size: 1.6rem;\r\n  font-weight: normal\r\n}\r\n\r\nlabel {\r\n  cursor: pointer;\r\n}\r\n\r\ninput + label,\r\nlabel + input {\r\n  margin-left: 0.5rem;\r\n}\r\n\r\n.chart-subtitle, .stats {\r\n  margin: 1.5rem 0 1rem;\r\n}\r\n\r\n.chart-description {\r\n  margin: 1rem 0 0;\r\n  max-width: 600px;\r\n  /* color: #ffffff; */\r\n}\r\n\r\n.App.dark .chart-description {\r\n  color: #ffffff;\r\n}\r\n\r\n.chart-description p:first-child {\r\n  margin-top: 0;\r\n}\r\n\r\n.chart-description p:last-child {\r\n  margin-bottom: 0;\r\n}\r\n\r\n.chart-description ul {\r\n  margin: 0;\r\n  padding-left: 20px;\r\n}\r\n\r\n.chart-description li {\r\n  margin-top: 5px;\r\n}\r\n\r\n.chart-grid {\r\n  color: #16182E;\r\n  display: grid;\r\n  grid-template-columns: repeat(10, 1fr);\r\n  gap: 1rem;\r\n  margin-top: 1rem;\r\n}\r\n\r\n.chart-grid-subtitle {\r\n  grid-column-start: 1;\r\n  grid-column-end: 9;\r\n  margin-bottom: 0;\r\n  margin-top: 2rem;\r\n}\r\n\r\n.total-stat-value {\r\n  font-size: 1.5rem;\r\n  overflow: hidden;\r\n  white-space: pre-wrap;\r\n}\r\n\r\n.total-stat-delta {\r\n  font-size: 0.875rem;\r\n  line-height: 1.125rem;\r\n  display: block;\r\n}\r\n\r\n.total-stat-delta.plus {\r\n  color: #46E3AE;\r\n}\r\n.App.light .total-stat-delta.plus {\r\n  color: rgb(34 199 97);\r\n}\r\n.total-stat-delta.minus {\r\n  color: #727171;\r\n}\r\n\r\n.App.dark .chart-cell {\r\n  background: #181818;\r\n  border: none;\r\n  color: white;\r\n}\r\n\r\n.App.dark .chart-cell.stats {\r\n  border: 1px solid #FFFFFF14;\r\n}\r\n\r\n.chart-cell {\r\n  margin: 0;\r\n  border-radius: 15px;\r\n  border: 1px solid #FFFFFF14;\r\n  background: #181818;\r\n  position: relative;\r\n  padding: 1rem;\r\n  grid-column-start: span 5;\r\n}\r\n\r\n.chart-cell.stats {\r\n  min-height: 60px;\r\n  grid-column-start: span 2;\r\n  text-align: center;\r\n}\r\n\r\n.chart-cell.experiment {\r\n  border-color: #fbb;\r\n}\r\n.chart-cell.experiment:after {\r\n  color: #f55;\r\n  top: 1rem;\r\n  right: 1rem;\r\n  position: absolute;\r\n  content: '(experimental)';\r\n}\r\n\r\n.chart-cell h3 {\r\n  margin-top: 0;\r\n  letter-spacing: 0px;\r\n  font-size: 1.125rem;\r\n  line-height: 1.4375rem;\r\n}\r\n\r\n.chart-cell .csv-link {\r\n  cursor: pointer;\r\n  font-size: 0.9rem;\r\n  margin-left: 0.3rem;\r\n  opacity: 0.5;\r\n  display: inline-flex;\r\n  vertical-align: middle;\r\n}\r\n.chart-cell:hover .csv-link {\r\n  opacity: 0.5;\r\n}\r\n.chart-cell .csv-link:hover {\r\n  opacity: 1;\r\n}\r\n\r\n.form input[type=\"date\"],\r\n.form input[type=\"text\"] {\r\n  border: 1px solid #aaa;\r\n  border-radius: 3px;\r\n  appearance: none !important;\r\n  box-sizing: border-box;\r\n  padding: 3px;\r\n}\r\n\r\n.form button {\r\n  border: none;\r\n  appearance: none !important;\r\n  color: #000;\r\n  border: 1px solid #FFFFFF0F;\r\n  box-sizing: border-box;\r\n  background: #b39a31;\r\n  cursor: pointer;\r\n  margin-left: 10px;\r\n  height: 28px;\r\n  border-radius: 3px;\r\n  padding: 3px 7px;\r\n}\r\n.form button:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@keyframes loader {\r\n  from {\r\n    transform: rotate(0);\r\n  }\r\n  to {\r\n    transform: rotate(360deg);\r\n  }\r\n}\r\n\r\n.loader {\r\n  animation: loader 1.5s infinite;\r\n  opacity: 0.3;\r\n}\r\n.chart-cell .loader {\r\n  position: absolute;\r\n  margin-left: -1.5em;\r\n  margin-top: -1.5em;\r\n  font-size: 0.7rem;\r\n  top: 50%;\r\n  left: 50%;\r\n  z-index: 2;\r\n}\r\n\r\n\r\n.warning, .warning a {\r\n  color: #e46b00;\r\n}\r\n\r\n.nav {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  margin: 0 -1rem 0;\r\n  height: 55px;\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n  border-bottom: 1px solid #ffffff;\r\n  background-color: white;\r\n}\r\n\r\n.App.dark .nav {\r\n  background: #000000;\r\n  border-bottom: 1px solid #FFFFFF29;\r\n}\r\n\r\n.nav-logo {\r\n  /* width: 87px; */\r\n  vertical-align: middle;\r\n  margin: 0px 0.5rem 0 0;\r\n  display: inline-flex;\r\n  font-family: 'Philosopher';\r\n  letter-spacing: 3px;\r\n}\r\n\r\n.nav-logo img {\r\n  width: 87px;\r\n}\r\n\r\na, a:active, a:visited {\r\n  color: #16182E;\r\n}\r\n\r\n.nav-link {\r\n  letter-spacing: 0.47px;\r\n  color: #ffffff;\r\n  /* color: #000; */\r\n  text-decoration: none;\r\n  padding: 0.5rem 1rem;\r\n  display: inline-block;\r\n  vertical-align: middle;\r\n  font-size: 15px;\r\n  line-height: 1.125rem;\r\n  letter-spacing: 0.47px;\r\n}\r\n\r\n.nav-link:active, .nav-link:visited {\r\n  color: #ffffff;\r\n}\r\n\r\n.nav-link.active {\r\n  color: #444;\r\n}\r\n\r\n.App.dark a, .App.dark a:active, .App.dark a:visited {\r\n  color: #FFFFFF;\r\n}\r\n\r\n.App.dark .nav-link {\r\n  color: #ffffff;\r\n}\r\n\r\n.App.dark .nav-link:active, .App.dark .nav-link:visited {\r\n  color: #ffffff;\r\n}\r\n\r\n.App.dark .nav-link.active {\r\n  color: white;\r\n}\r\n\r\n.App.dark .nav-link:hover {\r\n  color: white;\r\n}\r\n\r\n.nav-link:hover {\r\n  color: #444;\r\n}\r\n\r\n.nav-right {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.modeselect {\r\n  width: 30px;\r\n  height: 26px;\r\n  background: #16182E 0% 0% no-repeat padding-box;\r\n  border: 1px solid #FFFFFF0F;\r\n  border-radius: 4px;\r\n  display: flex;\r\n  justify-content: center;\r\n  align-items: center;\r\n  cursor: pointer;\r\n}\r\n\r\n.App.dark .modeselect {\r\n  background: #FFFFFF 0% 0% no-repeat padding-box;\r\n}\r\n\r\n.modeselect svg {\r\n  fill: #ffffff;\r\n}\r\n\r\n.App.dark .modeselect svg {\r\n  fill: #FFFFFF0F;\r\n}\r\n\r\n.page-title {\r\n  font-size: 1.8125rem;\r\n  line-height: 2.3125rem;\r\n}\r\n\r\n.recharts-cartesian-axis-tick-value {\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.App.dark .recharts-cartesian-axis-tick-value {\r\n  fill: #fff;\r\n  font-size: 0.75rem;\r\n}\r\n\r\n.App.dark .recharts-cartesian-grid-horizontal line, .App.dark .recharts-cartesian-grid-vertical line {\r\n  stroke: #FFFFFF0F;\r\n}\r\n\r\n.recharts-tooltip-wrapper .recharts-default-tooltip {\r\n  padding: 5px 12px!important;\r\n}\r\n\r\n.recharts-tooltip-wrapper ul.recharts-tooltip-item-list li {\r\n  padding: 0px!important;\r\n  font-size: 12px!important;\r\n  line-height: 15px!important;\r\n}\r\n\r\n.recharts-tooltip-wrapper ul.recharts-tooltip-item-list li + li {\r\n  margin-top: 1px!important;\r\n}\r\n\r\n.App.dark .recharts-tooltip-wrapper .recharts-default-tooltip {\r\n  background-color: #00000029!important;\r\n  box-shadow: 0px 3px 6px #0000005C;\r\n  border: 1px solid #484B6E!important;\r\n  border-radius: 4px;\r\n}\r\n\r\n.App-header-drawer {\r\n  background: #000000 0% 0% no-repeat padding-box;\r\n  box-shadow: 8px 3px 6px #00000029;\r\n  opacity: 1;\r\n  backdrop-filter: blur(27px);\r\n  position: fixed;\r\n  z-index: 11;\r\n  left: 0;\r\n  right: 0;\r\n  top: 0;\r\n  height: 100vh;\r\n  width: 304px;\r\n}\r\n\r\n.App-header-drawer .App-header-link-container a {\r\n  font-size: 14px;\r\n  line-height: 18px;\r\n  font-weight: normal;\r\n  letter-spacing: 0.1px;\r\n  color: #ffffff;\r\n  padding: 15px 16px;\r\n  text-decoration: none;\r\n  display: block;\r\n}\r\n\r\n.App-header-drawer .App-header-link-container a:hover,\r\n.App-header-drawer .App-header-link-container a:focus,\r\n.App-header-drawer .App-header-link-container a.active {\r\n  background: #181818;\r\n  color: white;\r\n}\r\n\r\n.App-header-drawer .App-header-menu-icon {\r\n  color: white;\r\n  margin: unset;\r\n  font-size: 2rem;\r\n}\r\n\r\n.App-header-drawer .App-header-link-main {\r\n  display: flex;\r\n  align-items: center;\r\n}\r\n\r\n.App-header-links-header {\r\n  height: 62px;\r\n  display: flex;\r\n  align-items: center;\r\n  z-index: 3;\r\n  padding-left: 1rem;\r\n  padding-right: 1rem;\r\n}\r\n\r\n.App-header-menu-icon {\r\n  color: black;\r\n  font-size: 1.3rem;\r\n  cursor: pointer;\r\n  opacity: 0.7;\r\n  margin: 9px 10px;\r\n}\r\n\r\n.App.dark .App-header-menu-icon {\r\n  color: white;\r\n}\r\n\r\n.App-header-menu-icon:hover {\r\n  opacity: 0.9;\r\n}\r\n\r\n@media all and (max-width: 1000px) {\r\n  .chart-grid {\r\n    display: grid;\r\n    grid-template-columns: repeat(2, 1fr);\r\n  }\r\n\r\n  .chart-cell {\r\n    grid-column-start: span 2;\r\n    grid-column-end: auto;\r\n  }\r\n  .chart-cell.stats {\r\n    grid-column-start: span 1;\r\n  }\r\n}\r\n\r\n.content {\r\n  margin-top: 1rem;\r\n}\r\n\r\n.App-header-menu-icon-block {\r\n  display: none;\r\n}\r\n\r\n.App-header-backdrop {\r\n  position: fixed;\r\n  z-index: 10;\r\n  top: 0;\r\n  bottom: 0;\r\n  left: 0;\r\n  right: 0;\r\n}\r\n\r\n@media all and (max-width: 600px) {\r\n  .chart-grid {\r\n    display: grid;\r\n    grid-template-columns: 1fr;\r\n  }\r\n\r\n  .chart-cell {\r\n    grid-column-start: unset!important;\r\n    grid-column-end: unset!important;\r\n  }\r\n\r\n  .App-header-menu-icon-block {\r\n    display: flex;\r\n    align-items: center;\r\n    margin-right: 0.5rem;\r\n  }\r\n\r\n  .nav-left {\r\n    display: flex;\r\n    align-items: center;\r\n  }\r\n\r\n  .nav-logo {\r\n    display: flex;\r\n  }\r\n\r\n  .nav-left .nav-link {\r\n    display: none;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./src/fonts/SkullFont.ttf":
/*!*********************************!*\
  !*** ./src/fonts/SkullFont.ttf ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/SkullFont.32862168.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-Bold.ttf":
/*!************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-Bold.ttf ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-Bold.2df2dd0e.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-Light.ttf":
/*!*************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-Light.ttf ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-Light.a32b6e45.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-Medium.ttf":
/*!**************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-Medium.ttf ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-Medium.cca5f204.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-Regular.ttf":
/*!***************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-Regular.ttf ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-Regular.26795cfa.ttf";

/***/ }),

/***/ "./src/fonts/comfortaa/Comfortaa-SemiBold.ttf":
/*!****************************************************!*\
  !*** ./src/fonts/comfortaa/Comfortaa-SemiBold.ttf ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Comfortaa-SemiBold.170d22d9.ttf";

/***/ }),

/***/ "./src/fonts/inter/Inter-Black.woff":
/*!******************************************!*\
  !*** ./src/fonts/inter/Inter-Black.woff ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Black.1ede3792.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-Black.woff2":
/*!*******************************************!*\
  !*** ./src/fonts/inter/Inter-Black.woff2 ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Black.edf1baa0.woff2";

/***/ }),

/***/ "./src/fonts/inter/Inter-Bold.woff":
/*!*****************************************!*\
  !*** ./src/fonts/inter/Inter-Bold.woff ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Bold.a0e8358d.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-Bold.woff2":
/*!******************************************!*\
  !*** ./src/fonts/inter/Inter-Bold.woff2 ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Bold.231f444d.woff2";

/***/ }),

/***/ "./src/fonts/inter/Inter-ExtraBold.woff":
/*!**********************************************!*\
  !*** ./src/fonts/inter/Inter-ExtraBold.woff ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-ExtraBold.5bcb7989.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-ExtraBold.woff2":
/*!***********************************************!*\
  !*** ./src/fonts/inter/Inter-ExtraBold.woff2 ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-ExtraBold.27153fbc.woff2";

/***/ }),

/***/ "./src/fonts/inter/Inter-ExtraLight.woff":
/*!***********************************************!*\
  !*** ./src/fonts/inter/Inter-ExtraLight.woff ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-ExtraLight.89a33fa2.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-ExtraLight.woff2":
/*!************************************************!*\
  !*** ./src/fonts/inter/Inter-ExtraLight.woff2 ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-ExtraLight.096d2525.woff2";

/***/ }),

/***/ "./src/fonts/inter/Inter-Light.woff":
/*!******************************************!*\
  !*** ./src/fonts/inter/Inter-Light.woff ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Light.4217570c.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-Light.woff2":
/*!*******************************************!*\
  !*** ./src/fonts/inter/Inter-Light.woff2 ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Light.46884d02.woff2";

/***/ }),

/***/ "./src/fonts/inter/Inter-Medium.woff":
/*!*******************************************!*\
  !*** ./src/fonts/inter/Inter-Medium.woff ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Medium.6b5a42f0.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-Medium.woff2":
/*!********************************************!*\
  !*** ./src/fonts/inter/Inter-Medium.woff2 ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Medium.943a6775.woff2";

/***/ }),

/***/ "./src/fonts/inter/Inter-Regular.woff":
/*!********************************************!*\
  !*** ./src/fonts/inter/Inter-Regular.woff ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Regular.ea2c76b5.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-Regular.woff2":
/*!*********************************************!*\
  !*** ./src/fonts/inter/Inter-Regular.woff2 ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Regular.a90c493e.woff2";

/***/ }),

/***/ "./src/fonts/inter/Inter-SemiBold.woff":
/*!*********************************************!*\
  !*** ./src/fonts/inter/Inter-SemiBold.woff ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-SemiBold.0b003282.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-SemiBold.woff2":
/*!**********************************************!*\
  !*** ./src/fonts/inter/Inter-SemiBold.woff2 ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-SemiBold.920533dd.woff2";

/***/ }),

/***/ "./src/fonts/inter/Inter-Thin.woff":
/*!*****************************************!*\
  !*** ./src/fonts/inter/Inter-Thin.woff ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Thin.b9326ea9.woff";

/***/ }),

/***/ "./src/fonts/inter/Inter-Thin.woff2":
/*!******************************************!*\
  !*** ./src/fonts/inter/Inter-Thin.woff2 ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Inter-Thin.273c722a.woff2";

/***/ }),

/***/ "./src/fonts/philosopher/Philosopher-Bold.ttf":
/*!****************************************************!*\
  !*** ./src/fonts/philosopher/Philosopher-Bold.ttf ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Philosopher-Bold.a3aed8ba.ttf";

/***/ }),

/***/ "./src/fonts/philosopher/Philosopher-BoldItalic.ttf":
/*!**********************************************************!*\
  !*** ./src/fonts/philosopher/Philosopher-BoldItalic.ttf ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Philosopher-BoldItalic.fa16e091.ttf";

/***/ }),

/***/ "./src/fonts/philosopher/Philosopher-Italic.ttf":
/*!******************************************************!*\
  !*** ./src/fonts/philosopher/Philosopher-Italic.ttf ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Philosopher-Italic.b9e3037c.ttf";

/***/ }),

/***/ "./src/fonts/philosopher/Philosopher-Regular.ttf":
/*!*******************************************************!*\
  !*** ./src/fonts/philosopher/Philosopher-Regular.ttf ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/Philosopher-Regular.af6ea627.ttf";

/***/ }),

/***/ "./src/fonts/relative/relative-bold-pro.eot":
/*!**************************************************!*\
  !*** ./src/fonts/relative/relative-bold-pro.eot ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/relative-bold-pro.d785e2df.eot";

/***/ }),

/***/ "./src/fonts/relative/relative-bold-pro.ttf":
/*!**************************************************!*\
  !*** ./src/fonts/relative/relative-bold-pro.ttf ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/relative-bold-pro.cb95c2b7.ttf";

/***/ }),

/***/ "./src/fonts/relative/relative-bold-pro.woff":
/*!***************************************************!*\
  !*** ./src/fonts/relative/relative-bold-pro.woff ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/relative-bold-pro.b64cc288.woff";

/***/ }),

/***/ "./src/fonts/relative/relative-bold-pro.woff2":
/*!****************************************************!*\
  !*** ./src/fonts/relative/relative-bold-pro.woff2 ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/relative-bold-pro.27c9225c.woff2";

/***/ }),

/***/ "./src/fonts/relative/relative-book-pro.eot":
/*!**************************************************!*\
  !*** ./src/fonts/relative/relative-book-pro.eot ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/relative-book-pro.6c6fdee7.eot";

/***/ }),

/***/ "./src/fonts/relative/relative-book-pro.ttf":
/*!**************************************************!*\
  !*** ./src/fonts/relative/relative-book-pro.ttf ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/relative-book-pro.c52403f4.ttf";

/***/ }),

/***/ "./src/fonts/relative/relative-book-pro.woff":
/*!***************************************************!*\
  !*** ./src/fonts/relative/relative-book-pro.woff ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/relative-book-pro.fc1b5057.woff";

/***/ }),

/***/ "./src/fonts/relative/relative-book-pro.woff2":
/*!****************************************************!*\
  !*** ./src/fonts/relative/relative-book-pro.woff2 ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/relative-book-pro.99b8a3eb.woff2";

/***/ })

};
//# sourceMappingURL=server.3e6eab735775ee810cbb.hot-update.js.map