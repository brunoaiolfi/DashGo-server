import { Router } from "express";
import productController from "../controller/product.controller";

const productRoutes = Router();

// Create client
productRoutes.post("/", productController.create);
// Edit client
productRoutes.put("/", productController.edit);
// Delete client
productRoutes.delete("/", productController.delete);
// Get all clients
productRoutes.get("/all", productController.getAll);
// Get client by id
productRoutes.get("/byId", productController.getById);

export { productRoutes };
