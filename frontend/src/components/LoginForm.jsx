"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { loginUser } from "../usecases/loginUser";
import { useRouter } from "next/navigation";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Loader from "./Loader";

export default function LoginForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { token, user } = await loginUser(email, password);
      login(user, token);
      router.push("/dashboard");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas");
    } finally {
    setLoading(false);
    }
  };

  // Placeholder para Google login
  const handleGoogleLogin = () => {
    console.log("Login con Google (pendiente de implementar)");
  };

  if (loading) {
    return <Loader />;
  }
  
  return (
    <div className="flex h-screen bg-white">
      {/* Columna izquierda: formulario */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo y nombre */}
          <div className="flex items-center ">
            <img 
              src="/kanbanLogo.png" 
              alt="Logo" 
              className="w-30 h-20 mr-30 object-contain" 
            />
          </div>
          <h1 className="text-2xl font-bold text-black mb-6">
            Iniciar sesión
          </h1>

          {/* Error */}
          {error && (
            <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
              {error}
            </p>
          )}

          {/* FORMULARIO */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label className="block text-gray-700">Usuario o correo</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />

            {/* Password */}
            <label className="block text-gray-700 mt-4">
              Ingresa tu contraseña
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Ingresa tu contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>

            {/* Botones */}
            <button
              type="submit"
              className="w-full bg-orange-500 text-white p-2 rounded mt-6 hover:bg-orange-600 transition"
            >
              Iniciar sesión
            </button>
            <button
              type="button"
              onClick={() => router.push("/register")}
              className="w-full border border-orange-500 text-orange-500 p-2 rounded mt-4 hover:bg-orange-50 transition"
            >
              ¿No tienes cuenta? Regístrate
            </button>
          </form>
        </div>
      </div>

      {/* Columna derecha: imagen (oculta en mobile) */}
      <div className="hidden md:block md:w-1/2 h-64 md:h-full relative">
        <div className="overflow-hidden h-full">
          <img
            src="/FondoLoginKanBan.png"
            alt="Fondo"
            className="w-full h-full object-cover object-center scale-125"
          />
        </div>
      </div>
    </div>
  );
}
