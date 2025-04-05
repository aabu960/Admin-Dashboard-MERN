"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _authMiddleware = require("../middleware/authMiddleware.js");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
var router = _express["default"].Router();

// Admin-only route
router.get('/admin', _authMiddleware.verifyToken, (0, _authMiddleware.verifyRole)(['admin']), function (req, res) {
  res.status(200).json({
    message: 'Welcome Admin!'
  });
});

// User route
router.get('/user', _authMiddleware.verifyToken, (0, _authMiddleware.verifyRole)(['user', 'admin']), function (req, res) {
  res.status(200).json({
    message: 'Welcome User!'
  });
});
var _default = exports["default"] = router;