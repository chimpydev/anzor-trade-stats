exports.id = "server";
exports.modules = {

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! framer-motion */ "framer-motion");
/* harmony import */ var framer_motion__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(framer_motion__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! classnames */ "classnames");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _views_Optimism__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/Optimism */ "./src/views/Optimism.js");
/* harmony import */ var _views_Referrals__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./views/Referrals */ "./src/views/Referrals.js");
/* harmony import */ var _views_Trading__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./views/Trading */ "./src/views/Trading.js");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./App.css */ "./src/App.css");
/* harmony import */ var _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./img/anzor-logo.png */ "./src/img/anzor-logo.png");
/* harmony import */ var _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-icons/fa */ "react-icons/fa");
/* harmony import */ var react_icons_fa__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-icons/fi */ "react-icons/fi");
/* harmony import */ var react_icons_fi__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(react_icons_fi__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-icons/ri */ "react-icons/ri");
/* harmony import */ var react_icons_ri__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_icons_ri__WEBPACK_IMPORTED_MODULE_11__);
var _jsxFileName = "C:\\Users\\jalve\\Documents\\GitHub\\chimpy-frontend\\anzor-trade-stats\\src\\App.js";
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }













function AppHeaderLinks({
  mode,
  small,
  clickCloseIcon
}) {
  return __jsx("div", {
    className: "App-header-links",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17,
      columnNumber: 5
    }
  }, small && __jsx("div", {
    className: "App-header-links-header",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19,
      columnNumber: 9
    }
  }, __jsx("div", {
    className: "App-header-menu-icon-block",
    onClick: () => clickCloseIcon(),
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20,
      columnNumber: 11
    }
  }, __jsx(react_icons_fi__WEBPACK_IMPORTED_MODULE_10__["FiX"], {
    className: "App-header-menu-icon",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21,
      columnNumber: 13
    }
  })), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    exact: true,
    activeClassName: "active",
    className: "App-header-link-main",
    to: "/",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23,
      columnNumber: 11
    }
  }, __jsx("img", {
    src: _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    alt: "SKULL Logo",
    style: {
      width: '40px',
      height: '40px'
    },
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 24,
      columnNumber: 13
    }
  }))), __jsx("div", {
    className: "App-header-link-container",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 28,
      columnNumber: 7
    }
  }, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["NavLink"], {
    to: "/",
    exact: true,
    className: "nav-link",
    activeClassName: "active",
    __self: this,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 29,
      columnNumber: 9
    }
  }, "Optimism")));
}
const App = () => {
  const {
    0: mode,
    1: setMode
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(null);
  const {
    0: isDrawerVisible,
    1: setIsDrawerVisible
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useState"])(undefined);
  const slideVariants = {
    hidden: {
      x: "-100%"
    },
    visible: {
      x: 0
    }
  };
  const fadeVariants = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  };
  Object(react__WEBPACK_IMPORTED_MODULE_0__["useEffect"])(() => {
    const savedMode = window.localStorage.getItem('mode');
    const targetMode = savedMode == 'light' ? 'light' : 'dark';
    document.querySelector('body').style.backgroundColor = targetMode == 'dark' ? '#000000' : '#f6f9ff';
    setMode(targetMode);
  }, []);
  return __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Switch"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 57,
      columnNumber: 5
    }
  }, mode && __jsx("div", {
    className: classnames__WEBPACK_IMPORTED_MODULE_3___default()("App", mode),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59,
      columnNumber: 17
    }
  }, isDrawerVisible && __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__["AnimatePresence"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 61,
      columnNumber: 13
    }
  }, isDrawerVisible && __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__["motion"].div, {
    className: "App-header-backdrop",
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: fadeVariants,
    transition: {
      duration: 0.2
    },
    onClick: () => setIsDrawerVisible(!isDrawerVisible),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 63,
      columnNumber: 17
    }
  })), __jsx("div", {
    className: "nav",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 75,
      columnNumber: 11
    }
  }, __jsx("div", {
    className: "nav-left",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 76,
      columnNumber: 13
    }
  }, __jsx("div", {
    className: "App-header-menu-icon-block",
    onClick: () => setIsDrawerVisible(!isDrawerVisible),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 77,
      columnNumber: 15
    }
  }, !isDrawerVisible && __jsx(react_icons_ri__WEBPACK_IMPORTED_MODULE_11__["RiMenuLine"], {
    className: "App-header-menu-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 78,
      columnNumber: 38
    }
  }), isDrawerVisible && __jsx(react_icons_fa__WEBPACK_IMPORTED_MODULE_9__["FaTimes"], {
    className: "App-header-menu-icon",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 79,
      columnNumber: 37
    }
  })), __jsx("a", {
    href: "https://masonjar.finance",
    target: "_blank",
    rel: "noreferrer",
    className: "nav-logo",
    style: {
      textDecoration: 'none',
      alignItems: 'center'
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 81,
      columnNumber: 15
    }
  }, __jsx("img", {
    style: {
      width: '40px',
      height: '40px'
    },
    src: mode == 'dark' ? _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8___default.a : _img_anzor_logo_png__WEBPACK_IMPORTED_MODULE_8___default.a,
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 82,
      columnNumber: 17
    }
  }), __jsx("p", {
    style: {
      textDecoration: 'none',
      fontSize: '1.3rem',
      fontWeight: '40px'
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 83,
      columnNumber: 17
    }
  }, "Mason Jar"))), __jsx("div", {
    className: "nav-right",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 87,
      columnNumber: 13
    }
  }, __jsx("a", {
    href: "https://docs.masonjar.finance",
    target: "_blank",
    rel: "noreferrer",
    className: "nav-link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 88,
      columnNumber: 15
    }
  }, "Docs"), __jsx("a", {
    href: "https://masonjar.finance",
    target: "_blank",
    rel: "noreferrer",
    className: "nav-link",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 89,
      columnNumber: 15
    }
  }, "Launch App"))), __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__["AnimatePresence"], {
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 92,
      columnNumber: 11
    }
  }, isDrawerVisible && __jsx(framer_motion__WEBPACK_IMPORTED_MODULE_2__["motion"].div, {
    onClick: () => setIsDrawerVisible(false),
    className: "App-header-links-container App-header-drawer",
    initial: "hidden",
    animate: "visible",
    exit: "hidden",
    variants: slideVariants,
    transition: {
      duration: 0.2
    },
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 94,
      columnNumber: 15
    }
  }, __jsx(AppHeaderLinks, {
    mode: mode,
    small: true,
    clickCloseIcon: () => setIsDrawerVisible(false),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 103,
      columnNumber: 17
    }
  }))), __jsx("div", {
    className: "content",
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 107,
      columnNumber: 11
    }
  }, __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "/",
    render: props => __jsx(_views_Optimism__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, props, {
      mode: mode,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 109,
        columnNumber: 15
      }
    })),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 108,
      columnNumber: 13
    }
  }), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "/referrals/:chainName",
    render: props => __jsx(_views_Referrals__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, props, {
      mode: mode,
      __self: undefined,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 112,
        columnNumber: 15
      }
    })),
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 111,
      columnNumber: 13
    }
  }), __jsx(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["Route"], {
    exact: true,
    path: "/trading",
    component: _views_Trading__WEBPACK_IMPORTED_MODULE_6__["default"],
    __self: undefined,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 114,
      columnNumber: 13
    }
  }))));
};
/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ })

};
//# sourceMappingURL=server.fe625b1c298a35d7c47e.hot-update.js.map