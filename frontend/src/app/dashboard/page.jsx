"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Topbar from "../../components/Topbar";
import TaskModal from "../../components/TaskModal";
import TaskCard from "../../components/TaskCard";

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create"); // "create" o "edit"
  const [selectedTask, setSelectedTask] = useState(null);

  // cargar del localStorage
  useEffect(() => {
    const saved = localStorage.getItem("tasks");
    if (saved) setTasks(JSON.parse(saved));
  }, []);

  // guardar en localStorage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Crear tarea
  const addTask = (task) => setTasks([...tasks, task]);

  // Actualizar tarea
  const updateTask = (updatedTask) =>
    setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));

  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />

      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Bienvenido <span className="text-blue-600">{user?.email}</span>
        </h2>
        <button
          onClick={() => {
            setSelectedTask(null);
            setMode("create");
            setShowModal(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Nueva tarea
        </button>
      </div>

      {/* Kanban con TaskCard */}
      <div className="grid grid-cols-3 gap-4 p-6">
        {/* Pendiente */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-3 text-red-600">Pendiente</h3>
          {tasks
            .filter((t) => t.status === "PENDIENTE")
            .map((t) => (
              <TaskCard
                key={t.id}
                idTarea={`T-${t.id}`}
                title={t.title}
                asignadoA={t.asignadoA}
                prioridad={t.priority}
                puntosHistoria={t.storyPoints}
                onClick={() => {
                  setSelectedTask(t);
                  setMode("edit");
                  setShowModal(true);
                }}
              />
            ))}
        </div>

        {/* En curso */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-3 text-yellow-600">En curso</h3>
          {tasks
            .filter((t) => t.status === "EN_CURSO")
            .map((t) => (
              <TaskCard
                key={t.id}
                idTarea={`T-${t.id}`}
                title={t.title}
                asignadoA={t.asignadoA}
                prioridad={t.priority}
                puntosHistoria={t.storyPoints}
                onClick={() => {
                  setSelectedTask(t);
                  setMode("edit");
                  setShowModal(true);
                }}
              />
            ))}
        </div>

        {/* Finalizado */}
        <div className="bg-white shadow rounded p-4">
          <h3 className="font-bold mb-3 text-green-600">Finalizado</h3>
          {tasks
            .filter((t) => t.status === "FINALIZADO")
            .map((t) => (
              <TaskCard
                key={t.id}
                idTarea={`T-${t.id}`}
                title={t.title}
                asignadoA={t.asignadoA}
                prioridad={t.priority}
                puntosHistoria={t.storyPoints}
                onClick={() => {
                  setSelectedTask(t);
                  setMode("edit");
                  setShowModal(true);
                }}
              />
            ))}
        </div>
      </div>

      {showModal && (
        <TaskModal
          mode={mode}
          task={selectedTask}
          onClose={() => setShowModal(false)}
          onSave={addTask}
          onUpdate={updateTask}
        />
      )}
    </div>
  );
}
