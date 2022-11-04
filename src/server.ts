import express from "express";
import cors from "cors";
import userControllers from "./controller/user.controllers";
import { verifyToken } from "./middlewares/verifyToken";
import { userRouters } from "./routes/user.routes";
import { clientRoutes } from "./routes/client.routes";
import { productRoutes } from "./routes/product.routes";
import { stockRoutes } from "./routes/stock.routes";

const app = express();

app.use(cors());
app.use(express.json());

//  Login
app.post("/signIn", userControllers.signIn);
// Create user
app.post("/user", userControllers.create);

// Middleware to verify token
app.use(verifyToken);

// Get user
app.get("/me", userControllers.getMe);

// user routes
app.use("/user", userRouters);

// client routes
app.use("/client", clientRoutes);

// product routes
app.use("/product", productRoutes);

// stock routes
app.use("/stock", stockRoutes);

app.listen(3334, () => console.log("Api rodando na porta 3334 ~🚀"));
