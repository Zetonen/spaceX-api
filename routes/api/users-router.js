import express from "express";
import { authenticate, isEmptyBody } from "../../middlewares/index.js";
import {
  userSigninSchema,
  userSignupSchema,
} from "../../models/User.js";
import usersController from "../../controllers/auth-controller.js";
import { validateBody } from "../../decorators/index.js";
const usersRouter = express.Router();

usersRouter.post(
  "/signup",
  isEmptyBody,
  validateBody(userSignupSchema),
  usersController.signup
);

usersRouter.post(
  "/signin",
  isEmptyBody,
  validateBody(userSigninSchema),
  usersController.signin
);

usersRouter.post("/logout", authenticate, usersController.logout);

usersRouter.post(
  "/favorite/:rocketId",
  authenticate,
  usersController.addFavorite
);
usersRouter.delete(
  "/favorite/:rocketId",
  authenticate,
  usersController.deleteFavorite
);
usersRouter.get("/current", authenticate, usersController.getCurrent);

export default usersRouter;
