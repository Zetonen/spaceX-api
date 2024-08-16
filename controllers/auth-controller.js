import { ctrlWrapper } from "../decorators/index.js";
import {
  signup,
  signin,
  logout,
  addFavorite,
  deleteFavorite,
  getCurrent,
} from "./auth/index.js";
export default {
  signup: ctrlWrapper(signup),
  signin: ctrlWrapper(signin),
  logout: ctrlWrapper(logout),
  addFavorite: ctrlWrapper(addFavorite),
  deleteFavorite: ctrlWrapper(deleteFavorite),
  getCurrent: ctrlWrapper(getCurrent),
};
