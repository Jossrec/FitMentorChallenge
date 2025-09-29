import bcrypt from "bcryptjs";
export const authService = {
  hashPassword: (plain) => bcrypt.hashSync(plain, 10),
  comparePassword: (plain, hash) => bcrypt.compareSync(plain, hash)
};
