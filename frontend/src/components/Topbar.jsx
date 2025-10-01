"use client";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useRouter } from "next/navigation";

export default function Topbar() {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-3 flex justify-between items-center">
      {/* Logo / título */}
      <img
            src="/kanbanLogo.png"
            alt="Fondo"
            className="w-30 h-10 object-cover object-center scale-125"
          />

      {/* Avatar */}
      <div className="relative">
        <button
          className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-bold text-gray-700"
          onClick={() => setOpen(!open)}
        >
          {typeof user?.email === "string" && user.email.length > 0
          ? user.email[0].toUpperCase()
          : "U"}

        </button>

        {/* Mini menú */}
        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Cerrar sesión
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
