import express from "express";
export const rocketsRouter = express.Router();
rocketsRouter.get("/", async (req, res) => {
  const result = await fetch("https://api.spacexdata.com/v4/dragons");
  const data = await result.json();
  if (!data || data?.length === 0) {
    throw HttpError(404, "Rockets not found");
  }
  console.log(data);
  res.json([...data]);
});
