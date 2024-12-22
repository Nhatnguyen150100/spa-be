"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import profileController from "../controllers/profileController";
const profileRouter = express.Router();

profileRouter.put(
  "/:id",
  tokenMiddleware.verifyToken,
  profileController.updateProfile
);

profileRouter.get(
  "/:id",
  tokenMiddleware.verifyToken,
  profileController.getProfile
);

export default profileRouter;
