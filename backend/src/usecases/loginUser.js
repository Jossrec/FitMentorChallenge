export async function loginUser(userRepo, authService, jwtService, { email, password }) {
  if (!email || !password) throw new Error("EMAIL_PASSWORD_REQUIRED");
  const user = await userRepo.findByEmail(email);
  if (!user) throw new Error("INVALID_CREDENTIALS");
  const ok = authService.comparePassword(password, user.password);
  if (!ok) throw new Error("INVALID_CREDENTIALS");
  const token = jwtService.sign({ id: user.id, email: user.email });
  return { token, user: { id: user.id, email: user.email } };
}
