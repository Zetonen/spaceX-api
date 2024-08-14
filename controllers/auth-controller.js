import { ctrlWrapper } from "../decorators/index.js";
import { signup, signin, logout, getCurrent } from "./auth/index.js";
export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
  getCurrent: ctrlWrapper(getCurrent),
};
