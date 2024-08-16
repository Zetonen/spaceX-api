import { HttpError } from "../../helpers/index.js";
import User from "../../models/User.js";

const deleteFavorite = async (req, res) => {
  const { favoriteRockets, _id } = req.user;
  const { rocketId } = req.body;
  const idx = favoriteRockets.indexOf(rocketId);
  if (idx === -1) {
    throw HttpError(404, `Rocket not found with this id = ${rocketId}`);
  }
  favoriteRockets.splice(idx, 1);
  await User.findByIdAndUpdate(req.user._id, { favoriteRockets });

  res.json({ message: "Delete success", rocketId });
};
export default deleteFavorite;
