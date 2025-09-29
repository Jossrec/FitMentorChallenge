"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Topbar from "../../components/Topbar";
import TaskModal from "../../components/TaskModal";

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // cargar del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // guardar en localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />

      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Bienvenido <span className="text-blue-600">{user?.email}</span>
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nueva tarea
        </button>
      </div>

      {/* Kanban base */}
      <div className="grid grid-cols-3 gap-4 p-6">
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-3 text-red-600">Pendiente</h3>
          {tasks
            .filter((t) => t.status === "PENDIENTE")
            .map((t) => (
              <div
                key={t.id}
                className="p-2 bg-red-100 rounded text-red-800 font-medium"
              >
                {t.title} ({t.priority}) • {t.storyPoints} pts
              </div>
            ))}
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-3 text-yellow-600">En curso</h3>
        </div>

        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-3 text-green-600">Finalizado</h3>
        </div>
      </div>

      {showModal && (
        <TaskModal onClose={() => setShowModal(false)} onSave={addTask} />
      )}
    </div>
  );
}
