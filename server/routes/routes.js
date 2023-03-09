import express from "express";
const router = express.Router();
import { catchErrors } from '../handlers/errorHandler'
import ProductController from "../controller/ProductController";
import AdminController from "../controller/AdminController";
import TransactionController from "../controller/TransactionController";
import ServiceController from "../controller/ServiceController";
import MessageController from "../controller/MessageController";
import config from "../utils/config";
import RequestedServiceController from "../controller/RequestedServices";

// Product
router.post("/NewProduct", config.upload.single("image"), catchErrors(ProductController.CreateProduct));
router.get("/products", catchErrors(ProductController.GetProducts));
router.get("/product/:productId", catchErrors(ProductController.GetProduct));
router.delete("/DeleteProduct/:productId", catchErrors(ProductController.DeleteProduct));
router.put("/UpdateProduct/:productId", catchErrors(ProductController.UpdateProduct));
router.put("/UpdateProduct/image/:productId", config.upload.single("image"), catchErrors(ProductController.UpdateProductImage));

// Admin
router.post("/register", catchErrors(AdminController.NewAdmin));
router.post("/login", AdminController.LoginAdmin);
router.get("/admins", catchErrors(AdminController.GetAdmins));
router.get("/admin/:adminId", catchErrors(AdminController.GetAdmin));
router.delete("/admin/delete/:adminId", catchErrors(AdminController.DeleteAdmin));

// Transaction
router.post("/transaction", catchErrors(TransactionController.NewTransaction));
router.get("/transactions", catchErrors(TransactionController.Transactions));
router.get("/transaction/:id", catchErrors(TransactionController.GetTransaction));

// Service 
router.post("/NewService", config.upload.single("image"), catchErrors(ServiceController.CreateService));
router.get("/services", catchErrors(ServiceController.GetServices));
router.get("/service/:serviceId", catchErrors(ServiceController.GetService));
router.delete("/DeleteService/:serviceId", catchErrors(ServiceController.DeleteService));
router.put("/UpdateService/:serviceId", catchErrors(ServiceController.UpdateService));
router.put("/update/image/:serviceId", config.upload.single("image"), catchErrors(ServiceController.UpdateServiceImage));


// Messages
router.post("/message", catchErrors(MessageController.SendMessage));
router.get("/messages", catchErrors(MessageController.GetMessages));
router.get("/message/:messageId", catchErrors(MessageController.GetMessage));
router.delete("/message/delete/:messageId", catchErrors(MessageController.DeleteMessage));

//Requested Services
router.post("/NewRequest", config.upload.single("file"), catchErrors(RequestedServiceController.NewRequest));
router.get("/requests", catchErrors(RequestedServiceController.AllRequests));
router.get("/request/:requestId", catchErrors(RequestedServiceController.GetRequest));
router.delete("/request/delete/:requestId", catchErrors(RequestedServiceController.DeleteRequest));
router.put("/request/update/:requestId", catchErrors(RequestedServiceController.UpdateRequest));

export default router;
