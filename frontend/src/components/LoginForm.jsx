"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../usecases/loginUser";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(email, password);
      login(user, token); // Guardar en contexto + localStorage
      //   alert("Login exitoso ");
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto mt-20 bg-white shadow-md rounded p-6"
    >
      <h2 className="text-xl font-bold mb-4 text-gray-700">Iniciar Sesión</h2>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full border p-2 rounded mb-3 placeholder-gray-500 text-gray-800"
        required
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full border p-2 rounded mb-3 placeholder-gray-500 text-gray-800"
        required
      />

      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
      >
        Entrar
      </button>
    </form>
  );
}
