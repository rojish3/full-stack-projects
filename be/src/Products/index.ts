import { Router } from "express";

import * as ProductContorller from "./Controller";
import { verifyToken } from "../middlewares";

const router = Router();

const routes = () => {
  router.get("/", ProductContorller.listProduct);
  router.post("/add-product", ProductContorller.addProduct);
  router.get("/single-product/:id", ProductContorller.singleProduct);
  router.put("/update-product/:id", ProductContorller.updateProduct);
  router.delete("/delete-product/:id", ProductContorller.deleteProduct);
  return router;
};

export default routes;
