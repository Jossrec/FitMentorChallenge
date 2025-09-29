import { api } from "../insfrastructure/api";

export async function loginUser(email, password) {
  const res = await api.post("/login", { email, password });
  return res.data; // { token, user }
}
