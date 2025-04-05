"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.verifyToken = exports.verifyRole = void 0;
var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
// Verify JWT
var verifyToken = exports.verifyToken = function verifyToken(req, res, next) {
  var _req$headers$authoriz;
  var token = (_req$headers$authoriz = req.headers.authorization) === null || _req$headers$authoriz === void 0 ? void 0 : _req$headers$authoriz.split(' ')[1];
  if (!token) return res.status(403).json({
    message: 'Access denied'
  });
  try {
    var decoded = _jsonwebtoken["default"].verify(token, 'YOUR_SECRET_KEY'); // Replace with your secret
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({
      message: 'Invalid token'
    });
  }
};

// Check role
var verifyRole = exports.verifyRole = function verifyRole(roles) {
  return function (req, res, next) {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Permission denied'
      });
    }
    next();
  };
};