'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cloudinary = require('cloudinary');

var _cloudinary2 = _interopRequireDefault(_cloudinary);

var _multer = require('multer');

var _multer2 = _interopRequireDefault(_multer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_cloudinary2.default.config({
  cloud_name: 'dwiisilga',
  api_key: 924275739994991,
  api_secret: 'CAdmiGzr3ikfmP9NW1odC04fcLg'
});

var storage = _multer2.default.diskStorage({
  filename: function filename(req, file, cb) {
    cb(null, Date.now() + file.originalname);
  }
});

var imageFilter = function imageFilter(req, file, cb) {
  if (!file.originalname.match(/\.(jpeg|jpg|heic|jpg|bmp|png|zip|rar|)$/i)) {
    return cb('Only image files or zip are allowed', false);
  } else {
    cb(null, true);
  }
};

var upload = (0, _multer2.default)({
  storage: storage,
  fileFilter: imageFilter
});

var storager = _multer2.default.diskStorage({
  destination: function destination(req, file, cb) {

    // Uploads is the Upload_folder_name
    cb(null, "uploads");
  },
  filename: function filename(req, file, cb) {
    cb(null, file.fieldname + "-" + Date.now());
  }
});
var fileUploader = (0, _multer2.default)({ storage: storager });

var databaseConnection = {
  db_username: "otitoju",
  password: "abcd1234",
  cluster: "cluster0.joqfv",
  dbName: "Slammyphotography"
};

exports.default = {
  LOCAL_DATABASE: "mongodb://localhost:27017/Slammy",
  ONLINE_DATABASE: 'mongodb+srv://' + databaseConnection.db_username + ':' + databaseConnection.password + '@' + databaseConnection.cluster + '.mongodb.net/' + databaseConnection.dbName + '?retryWrites=true&w=majority',
  LOGIN_SECRET: "diceyguysmiracleboy",
  cloud_name: "dwiisilga",
  api_key: 924275739994991,
  api_secret: "CAdmiGzr3ikfmP9NW1odC04fcLg",
  upload: upload,
  fileUploader: fileUploader
};
//# sourceMappingURL=config.js.map