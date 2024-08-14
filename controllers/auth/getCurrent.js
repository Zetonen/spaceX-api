const getCurrent = async (req, res) => {
  const { userName, email, favoriteRockets } = req.user;
  res.json({
    userName,
    email,
    favoriteRockets,
  });
};
export default getCurrent;
