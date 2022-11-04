import { Router } from "express";
import clientControllers from "../controller/client.controllers";

const clientRoutes = Router();

// Create client
clientRoutes.post("/", clientControllers.create);
// Edit client
clientRoutes.put("/", clientControllers.edit);
// Delete client
clientRoutes.delete("/", clientControllers.delete);
// Get all clients
clientRoutes.get("/all", clientControllers.getAll);
// Get client by id
clientRoutes.get("/byId", clientControllers.getById);

export { clientRoutes };
