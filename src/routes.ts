import { Router } from "express";
import userControllers from "./controller/user.controllers";
import { verifyToken } from "./middlewares/verifyToken";

const router = Router();

//  Login
router.post("/signIn", userControllers.signIn);

// Middleware to verify token
router.use(verifyToken);

// Create user
router.post("/user", userControllers.create);
// Edit user
router.put("/user", userControllers.edit);
// Edit user
router.patch("/user/editPassword", userControllers.editPassword);
// Delete user
router.delete("/user", userControllers.delete)
// Get all users
router.get("/user/all", userControllers.getAll);
// Get user by id
router.get("/user/byId", userControllers.getById);
// Get user by email
router.get("/user/byEmail", userControllers.getByEmail);

export { router };
