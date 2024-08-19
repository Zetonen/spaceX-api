import User from "../../models/User.js";
import { HttpError, sendEmail } from "../../helpers/index.js";
import { nanoid } from "nanoid";

const resendVerify = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw HttpError(401, "Email not found");
  }
  if (user.verify) {
    throw HttpError(400, "Email already verify");
  }
  const verificationToken = nanoid();
  await User.findByIdAndUpdate(user._id, { verificationToken });

  const emailOptions = {
    to: email,
    subject: "Verify email",
    html: `<p>Hello,</p>
        <p>Follow the <a target="_blank" href="https://dragoon-spacex.netlify.app/verify/${verificationToken}">link</a> to confirm</p>
        <p>Best regards,<br>Dragon SpaceX</p>`
  };

  await sendEmail(emailOptions);
  res.json({
    message: "Email send success",
  });
};
export default resendVerify;
