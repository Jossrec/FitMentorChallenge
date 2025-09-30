import { api } from "../infrastructure/api";

export async function registerUser(email, password) {
  try {
    const res = await api.post("/register", { email, password });
    return {
      token: res.data.token,
      user: res.data.user,
    };
  } catch (err) {
    console.error("Error en registerUser:", err);

    if (err.response?.status === 409) {
      throw new Error("EMAIL_ALREADY_IN_USE");
    }
    if (err.response?.status === 400 && err.response?.data?.error?.includes("Contraseña")) {
      throw new Error("WEAK_PASSWORD");
    }
    if (err.response?.status === 400 && err.response?.data?.error?.includes("Email inválido")) {
      throw new Error("INVALID_EMAIL");
    }

    throw new Error("REGISTER_FAILED");
  }
}
