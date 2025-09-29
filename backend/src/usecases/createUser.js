import { User } from "../domain/User.js";

export async function createUser(userRepo, authService, { email, password }) {
  const u = new User(email, password);
  const exists = await userRepo.findByEmail(u.email);
  if (exists) throw new Error("EMAIL_ALREADY_IN_USE");
  const hash = authService.hashPassword(u.passwordPlain);
  const saved = await userRepo.create({ email: u.email, password: hash });
  return { id: saved.id, email: saved.email };
}
