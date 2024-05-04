import jwt from "jsonwebtoken";

export const generateAccessToken = (id: string, role: string) => {
  const secretKey = process.env.SECRET_KEY ?? "";
  const limitAccessToken = process.env.ACCESS_TIME ?? "";
  return jwt.sign({ id, role }, secretKey, { expiresIn: limitAccessToken });
};

export const generateRefreshToken = (id: string, role: string) => {
  const secretKey = process.env.REFRESH_SECRET_KEY ?? "";
  const limitRefreshToken = process.env.REFRESH_TIME ?? "";
  return jwt.sign({ id, role }, secretKey, { expiresIn: limitRefreshToken });
};
