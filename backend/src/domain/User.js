export class User {
  constructor(email, passwordPlain) {
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!rx.test(email)) throw new Error("INVALID_EMAIL");
    if (!passwordPlain || passwordPlain.length < 6) throw new Error("WEAK_PASSWORD");
    this.email = email;
    this.passwordPlain = passwordPlain;
  }
}
