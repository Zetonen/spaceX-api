import User from "../../models/User.js";
import bcrypt from "bcryptjs";
import { HttpError, sendEmail } from "../../helpers/index.js";
import { nanoid } from "nanoid";

const { JWT_SECRET } = process.env;

const signup = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw HttpError(409, "Email already exist");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const verificationToken = nanoid();

  const emailOptions = {
    to: email,
    subject: "Verify email",
    html: `<p>Hello,</p>
        <p>Follow the <a target="_blank" href="https://dragoon-spacex.netlify.app/verify/${verificationToken}">link</a> to confirm</p>
        <p>Best regards,<br>Dragon SpaceX</p>`
  };

  const newUser = await User.create({ ...req.body, password: hashPassword, verificationToken });
  // const { _id } = newUser;
  // const payload = {
  //   id: _id,
  // };

  // const token = jwt.sign(payload, JWT_SECRET, { expiresIn: "23h" });
  // await User.findByIdAndUpdate(_id, { token });

  await sendEmail(emailOptions);
  res.status(201).json({
    // token,
    // user: {
    //   userName: newUser.userName,
    //   email: newUser.email,
    //   favoriteRockets: newUser.favoriteRockets,
    // },
    message: "Confirmation letter sent to the specified e-mail address ",
  });
};
export default signup;
