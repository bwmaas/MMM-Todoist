"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SocketNotification = void 0;
let SocketNotification = exports.SocketNotification = /*#__PURE__*/function (SocketNotification) {
  SocketNotification["INIT"] = "INIT";
  SocketNotification["POST_INIT"] = "POST_INIT";
  SocketNotification["FETCH_COLLABORATORS"] = "FETCH_COLLABORATORS";
  SocketNotification["HANDLE_COLLABORATORS"] = "HANDLE_COLLABORATORS";
  SocketNotification["FETCH_LABELS"] = "FETCH_LABELS";
  SocketNotification["HANDLE_LABELS"] = "HANDLE_LABELS";
  SocketNotification["FETCH_PROJECTS"] = "FETCH_PROJECTS";
  SocketNotification["HANDLE_PROJECTS"] = "HANDLE_PROJECTS";
  SocketNotification["FETCH_TASKS"] = "FETCH_TASKS";
  SocketNotification["HANDLE_TASKS"] = "HANDLE_TASKS";
  return SocketNotification;
}({});