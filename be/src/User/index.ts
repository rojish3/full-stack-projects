import { Router } from "express";
import {
  list,
  create,
  login,
  profile,
  forgotPassword,
  resetPassword,
  remove,
  userDetails,
} from "./Controller";
import { verifyToken, verifyUser } from "../middlewares";

const router = Router();

const routes = () => {
  router.get("/user", list);
  router.post("/signup", create);
  router.get("/user/user-profile/:id", userDetails);
  router.delete("/user/delete-user/:id", remove);
  router.post("/login", login);
  router.post("/forgot-password", forgotPassword);
  router.post("/reset-password", resetPassword);
  // router.get("/profile", verifyToken, profile);
  return router;
};

export default routes;
