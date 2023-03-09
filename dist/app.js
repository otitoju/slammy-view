"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _Logger = require("./utils/Logger");

var _config = require("./utils/config");

var _config2 = _interopRequireDefault(_config);

var _routes = require("./routes/routes");

var _routes2 = _interopRequireDefault(_routes);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var app = (0, _express2.default)();


var PORT = process.env.PORT || 9000;


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

app.use((0, _cors2.default)());
app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: true }));
app.use("/api/v1", _routes2.default);

// app.get("/", (req, res) => {
//   res.send("<h1>SlammyPhotography Server</h1>");
// });

app.use(_express2.default.static(_path2.default.join(__dirname, '../client/dist/client')));

app.get('/*', function (req, res) {
  res.sendFile(_path2.default.join(__dirname, '../client/dist/client', 'index.html'));
});

app.listen(PORT, function () {
  _mongoose2.default.connect(_config2.default.ONLINE_DATABASE);
  (0, _Logger.Logger)("APP LISTENER", "Server started on port " + PORT);
});

//const uri = `mongodb+srv://${config.db_username}:${config.password}@${config.cluster}.mongodb.net/${config.dbname}?retryWrites=true&w=majority`;
//# sourceMappingURL=app.js.map