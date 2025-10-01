export class User {
  constructor(email, passwordPlain) {
    const rx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    this.email = email;
    this.passwordPlain = passwordPlain;
  }
}
