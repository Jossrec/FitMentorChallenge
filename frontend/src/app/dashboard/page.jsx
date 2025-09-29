"use client";
import { useAuth } from "../../context/AuthContext";
import Topbar from "../../components/Topbar";

export default function DashboardPage() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />
      <div className="p-6">
        <h2 className="text-xl mb-6 font-semibold text-gray-800">
          Bienvenido <span className="text-blue-600">{user?.email}</span>
        </h2>

        {/* Kanban base */}
        <div className="grid grid-cols-3 gap-4">
          {/* Pendiente */}
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-bold mb-3 text-red-600">Pendiente</h3>
            <div className="p-2 bg-red-100 rounded text-red-800 font-medium">
              Tarea 1
            </div>
            <div className="p-2 bg-red-100 rounded text-red-800 font-medium">
              Tarea 2
            </div>
          </div>

          {/* En curso */}
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-bold mb-3 text-yellow-600">En curso</h3>
            <div className="p-2 bg-yellow-100 rounded text-yellow-800 font-medium">
              Tarea 3
            </div>
          </div>

          {/* Finalizado */}
          <div className="bg-white shadow rounded p-4">
            <h3 className="font-bold mb-3 text-green-600">Finalizado</h3>
            <div className="p-2 bg-green-100 rounded text-green-800 font-medium">
              Tarea 4
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
