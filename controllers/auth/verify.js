import User from "../../models/User.js";
import jwt from "jsonwebtoken";
import { HttpError } from "../../helpers/index.js";

const { JWT_SECRET } = process.env;

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
    token,
  });
  res.json({
    message: "Verification successful",
    token,
    user: {
      email: user.email,
      userName: user.userName,
      favoriteRockets: user.favoriteRockets,
    },
  });
};
export default verify;
