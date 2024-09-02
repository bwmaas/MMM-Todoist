"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TaskElement;
var _React = _interopRequireDefault(require("React"));
require("../css/TaskElement.scss");
var _jsxRuntime = require("react/jsx-runtime");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { default: e }; }
function TaskElement(props) {
  return /*#__PURE__*/(0, _jsxRuntime.jsx)("tr", {
    className: "taskElement",
    children: /*#__PURE__*/(0, _jsxRuntime.jsx)("td", {
      className: "taskElement__cell"
    })
  });
}