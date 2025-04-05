"use strict";

var _express = _interopRequireDefault(require("express"));
var _mongoose = _interopRequireDefault(require("mongoose"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _authRoutes = _interopRequireDefault(require("./routers/authRoutes.js"));
var _protectedRoutes = _interopRequireDefault(require("./routers/protectedRoutes.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
_dotenv["default"].config();
var app = (0, _express["default"])();
app.use((0, _cors["default"])({
  origin: 'http://localhost:5173'
}));
app.use(_express["default"].json());

// Connect to MongoDB
_mongoose["default"].connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connected to MongoDB');
})["catch"](function (err) {
  return console.error(err);
});

// Routes
app.use('/auth', _authRoutes["default"]);
app.use('/protected', _protectedRoutes["default"]);
var PORT = process.env.PORT || 5000;
app.listen(PORT, function () {
  return console.log("Server running on port ".concat(PORT));
});