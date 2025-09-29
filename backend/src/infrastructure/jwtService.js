import jwt from "jsonwebtoken";
const SECRET = process.env.JWT_SECRET;
if (!SECRET) throw new Error("Falta JWT_SECRET");

export const jwtService = {
  sign: (payload, options = { expiresIn: "7d" }) => jwt.sign(payload, SECRET, options),
  verify: (token) => jwt.verify(token, SECRET)
};
