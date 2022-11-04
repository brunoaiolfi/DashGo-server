import { Router } from "express";
import stockController from "../controller/stock.controller";

const stockRoutes = Router();

// Create stock
stockRoutes.post("/", stockController.create);
// Edit stock
stockRoutes.put("/", stockController.edit);
// Get all stocks
stockRoutes.get("/all", stockController.getAll);
// Get stock by id
stockRoutes.get("/byId", stockController.getById);

export { stockRoutes };
