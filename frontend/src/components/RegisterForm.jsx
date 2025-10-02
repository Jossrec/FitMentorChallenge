"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { registerUser } from "../usecases/registerUser";
import { useRouter } from "next/navigation";
import { LuEye, LuEyeOff } from "react-icons/lu";
import Loader from "./Loader";

export default function RegisterForm() {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); 
  const [loading, setLoading] = useState(false);
  const passwordsMatch = password === confirmPassword;

  // Validaciones
  const validations = {
    length: password.length >= 8,
    number: /\d/.test(password),
    uppercase: /[A-Z]/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  const allValid =
    validations.length &&
    validations.number &&
    validations.uppercase &&
    validations.special;

  const canSubmit = allValid && passwordsMatch;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!canSubmit) return;
    try {
      const { token, user } = await registerUser(email, password);
      login(user, token);
      router.push("/dashboard");
    } catch (err) {
      console.error("Error en registro:", err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader fullscreen/>;
  }

  return (
    <div className="flex h-screen bg-white">
      {/* Columna izquierda */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-8 min-h-screen">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="/kanbanLogo.png"
              alt="Logo"
              className="w-30 h-20 mr-30 object-contain"
            />
          </div>

          <h1 className="text-2xl font-bold text-black mb-6">Registro</h1>

          {/* Error general */}
          {error && (
            <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <label className="block text-gray-700">Correo</label>
            <input
              type="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
              required
            />

            {/* Password */}
            <label className="block text-gray-700 mt-4">Contraseña</label>
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

            {/* Checklist de contraseña */}
            {password && (
              <ul className="text-sm mt-2 space-y-1">
                <li className={validations.length ? "text-green-600" : "text-red-500"}>
                  • Al menos 8 caracteres
                </li>
                <li className={validations.number ? "text-green-600" : "text-red-500"}>
                  • Al menos un número
                </li>
                <li className={validations.uppercase ? "text-green-600" : "text-red-500"}>
                  • Al menos una mayúscula
                </li>
                <li className={validations.special ? "text-green-600" : "text-red-500"}>
                  • Al menos un caracter especial
                </li>
              </ul>
            )}

            {/* Confirmar contraseña */}
            <label className="block text-gray-700 mt-4">
              Confirmar contraseña
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Repite tu contraseña"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded mt-1 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <LuEyeOff /> : <LuEye />}
              </button>
            </div>

            {!passwordsMatch && confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                Las contraseñas no coinciden
              </p>
            )}

            {/* Botón */}
            <button
              type="submit"
              disabled={!canSubmit}
              className={`w-full p-2 rounded mt-6 transition ${
                canSubmit
                  ? "bg-orange-500 text-white hover:bg-orange-600"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Registrarse
            </button>

            {/* Link a login */}
            <p className="text-sm text-gray-600 mt-4 text-center">
              ¿Ya tienes cuenta?{" "}
              <button
                type="button"
                onClick={() => router.push("/login")}
                className="text-orange-500 hover:underline"
              >
                Inicia Sesión
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Columna derecha */}
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
