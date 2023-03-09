"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _errorHandler = require("../handlers/errorHandler");

var _ProductController = require("../controller/ProductController");

var _ProductController2 = _interopRequireDefault(_ProductController);

var _AdminController = require("../controller/AdminController");

var _AdminController2 = _interopRequireDefault(_AdminController);

var _TransactionController = require("../controller/TransactionController");

var _TransactionController2 = _interopRequireDefault(_TransactionController);

var _ServiceController = require("../controller/ServiceController");

var _ServiceController2 = _interopRequireDefault(_ServiceController);

var _MessageController = require("../controller/MessageController");

var _MessageController2 = _interopRequireDefault(_MessageController);

var _config = require("../utils/config");

var _config2 = _interopRequireDefault(_config);

var _RequestedServices = require("../controller/RequestedServices");

var _RequestedServices2 = _interopRequireDefault(_RequestedServices);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();


// Product
router.post("/NewProduct", _config2.default.upload.single("image"), (0, _errorHandler.catchErrors)(_ProductController2.default.CreateProduct));
router.get("/products", (0, _errorHandler.catchErrors)(_ProductController2.default.GetProducts));
router.get("/product/:productId", (0, _errorHandler.catchErrors)(_ProductController2.default.GetProduct));
router.delete("/DeleteProduct/:productId", (0, _errorHandler.catchErrors)(_ProductController2.default.DeleteProduct));
router.put("/UpdateProduct/:productId", (0, _errorHandler.catchErrors)(_ProductController2.default.UpdateProduct));
router.put("/UpdateProduct/image/:productId", _config2.default.upload.single("image"), (0, _errorHandler.catchErrors)(_ProductController2.default.UpdateProductImage));

// Admin
router.post("/register", (0, _errorHandler.catchErrors)(_AdminController2.default.NewAdmin));
router.post("/login", _AdminController2.default.LoginAdmin);
router.get("/admins", (0, _errorHandler.catchErrors)(_AdminController2.default.GetAdmins));
router.get("/admin/:adminId", (0, _errorHandler.catchErrors)(_AdminController2.default.GetAdmin));
router.delete("/admin/delete/:adminId", (0, _errorHandler.catchErrors)(_AdminController2.default.DeleteAdmin));

// Transaction
router.post("/transaction", (0, _errorHandler.catchErrors)(_TransactionController2.default.NewTransaction));
router.get("/transactions", (0, _errorHandler.catchErrors)(_TransactionController2.default.Transactions));
router.get("/transaction/:id", (0, _errorHandler.catchErrors)(_TransactionController2.default.GetTransaction));

// Service 
router.post("/NewService", _config2.default.upload.single("image"), (0, _errorHandler.catchErrors)(_ServiceController2.default.CreateService));
router.get("/services", (0, _errorHandler.catchErrors)(_ServiceController2.default.GetServices));
router.get("/service/:serviceId", (0, _errorHandler.catchErrors)(_ServiceController2.default.GetService));
router.delete("/DeleteService/:serviceId", (0, _errorHandler.catchErrors)(_ServiceController2.default.DeleteService));
router.put("/UpdateService/:serviceId", (0, _errorHandler.catchErrors)(_ServiceController2.default.UpdateService));
router.put("/update/image/:serviceId", _config2.default.upload.single("image"), (0, _errorHandler.catchErrors)(_ServiceController2.default.UpdateServiceImage));

// Messages
router.post("/message", (0, _errorHandler.catchErrors)(_MessageController2.default.SendMessage));
router.get("/messages", (0, _errorHandler.catchErrors)(_MessageController2.default.GetMessages));
router.get("/message/:messageId", (0, _errorHandler.catchErrors)(_MessageController2.default.GetMessage));
router.delete("/message/delete/:messageId", (0, _errorHandler.catchErrors)(_MessageController2.default.DeleteMessage));

//Requested Services
router.post("/NewRequest", _config2.default.upload.single("file"), (0, _errorHandler.catchErrors)(_RequestedServices2.default.NewRequest));
router.get("/requests", (0, _errorHandler.catchErrors)(_RequestedServices2.default.AllRequests));
router.get("/request/:requestId", (0, _errorHandler.catchErrors)(_RequestedServices2.default.GetRequest));
router.delete("/request/delete/:requestId", (0, _errorHandler.catchErrors)(_RequestedServices2.default.DeleteRequest));
router.put("/request/update/:requestId", (0, _errorHandler.catchErrors)(_RequestedServices2.default.UpdateRequest));

exports.default = router;
//# sourceMappingURL=routes.js.map