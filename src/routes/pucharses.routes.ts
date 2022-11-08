import { Router } from "express";
import purchasesControllers from "../controller/pucharses.controllers";

const purchasesRoutes = Router();

purchasesRoutes.post("/", purchasesControllers.create);
purchasesRoutes.get("/all", purchasesControllers.getAll);

export { purchasesRoutes as pucharseRoutes };
