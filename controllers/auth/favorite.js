import User from "../../models/User.js";
import {HttpError} from "../../helpers/index.js";

const favorite = async (req, res) => {
  const { favoriteRockets } = req.user;
  const { rocketId } = req.body;
  console.log(rocketId);
  if (favoriteRockets.includes(rocketId)) {
    throw HttpError(409, "Rocket already exist");
  }
  favoriteRockets.push(rocketId);
  await User.findByIdAndUpdate(req.user._id, { favoriteRockets });
  res.status(201).json({ message: "Rocket added" });
};
export default favorite;
