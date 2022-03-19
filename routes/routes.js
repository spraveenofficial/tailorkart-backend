import { Router } from "express";
import Controller from "../controllers/controller.js";
import middleware from "../middlewares/middleware.js";
const app = Router();

app.post("/signup", Controller.signup);
app.post("/login", Controller.login);
app.get("/verify", middleware, Controller.verifyUser);
app.get("/categories/:category", Controller.categoryWiseProducts);
app.get("/product/:id", Controller.eachProduct);
app.post("/add-product", Controller.addProduct);
app.post("/update-address", middleware, Controller.addAddress);
export default app;
