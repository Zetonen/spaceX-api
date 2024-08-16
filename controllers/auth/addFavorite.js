import User from "../../models/User.js";
import { HttpError } from "../../helpers/index.js";

const addFavorite = async (req, res) => {
  const { favoriteRockets } = req.user;
  const { rocketId } = req.params;

  if (favoriteRockets.includes(rocketId)) {
    throw HttpError(409, "Rocket already exist");
  }
  favoriteRockets.push(rocketId);
  await User.findByIdAndUpdate(req.user._id, { favoriteRockets });
  res.status(201).json({ message: "Rocket added", rocketId });
};
export default addFavorite;
