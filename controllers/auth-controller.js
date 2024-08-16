import { ctrlWrapper } from "../decorators/index.js";
import { signup, signin, logout, favorite, getCurrent } from "./auth/index.js";
export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
  favorite: ctrlWrapper(favorite),
  getCurrent: ctrlWrapper(getCurrent),
};
