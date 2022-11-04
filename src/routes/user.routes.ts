import { Router } from "express";
import userControllers from "../controller/user.controllers";

const userRouters = Router();

// Edit user
userRouters.put("/", userControllers.edit);
// Edit user
userRouters.patch("/editPassword", userControllers.editPassword);
// Delete user
userRouters.delete("/", userControllers.delete);
// Get all users
userRouters.get("/all", userControllers.getAll);
// Get user by id
userRouters.get("/byId", userControllers.getById);
// Get user by email
userRouters.get("/byEmail", userControllers.getByEmail);
// Get user
userRouters.get("/me", userControllers.getMe);

// Clients routes

export { userRouters };
