import { Router } from "express";
import * as RequestController from "./Controller";

const router = Router();

const routes = () => {
  router.get("/", RequestController.listRequest);
  router.post("/add-request", RequestController.addRequest);
  router.patch("/update-request/:id", RequestController.updateRequest);
  router.delete("/delete-request/:id", RequestController.deleteProduct);
  return router;
};
export default routes;
