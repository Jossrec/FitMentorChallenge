"use client";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import Topbar from "../../components/Topbar";
import TaskModal from "../../components/TaskModal";
import TaskCard from "../../components/TaskCard";
import {
  fetchTasksServer,
  createTaskServer,
  updateTaskServer,
  deleteTaskServer
} from "../../usecases/taskService";
import { loadLocalTasks, saveLocalTasks } from "../../utils/storage";

export default function DashboardPage() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create"); // "create" o "edit"
  const [selectedTask, setSelectedTask] = useState(null);

  // cargar local
  useEffect(() => {
    setTasks(loadLocalTasks());
  }, []);

  //guardar cambios en localStorage
  useEffect(() => {
    saveLocalTasks(tasks);
  }, [tasks]);

  //hidratar desde el server
  useEffect(() => {
    (async () => {
      try {
        const serverTasks = await fetchTasksServer();
        setTasks(serverTasks);
      } catch (err) {
        console.warn("No se pudo traer desde server:", err.message);
      }
    })();
  }, []);

  // === Crear tarea (local + backend)
    const addTask = async (task) => {
    // Optimistic UI
    const tempId = `tmp-${Date.now()}`;
    const optimisticTask = { ...task, id: tempId };
    setTasks((prev) => [optimisticTask, ...prev]);

    try {
        // Limpiar el payload para que coincida con tu modelo
        const { title, description, priority, storyPoints, status } = task;
        const payload = {
        title,
        description: description ?? null,
        priority,
        storyPoints: Number(storyPoints),
        status,
        // si quieres relacionarlo con el usuario logueado
        // userId: user.id  
        };

        const created = await createTaskServer(payload);

        // Reemplazar el tmp por lo que devuelva el server
        setTasks((prev) =>
        prev.map((t) => (t.id === tempId ? created : t))
        );
    } catch (err) {
        console.error("Error creando en server:", err.message);
    }
    };

  // === Editar tarea
    const updateTask = async (task) => {
    setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    try {
        const { id, title, description, priority, storyPoints, status } = task;

        // Solo mandar lo que Prisma acepta
        const cleanPatch = {
        title,
        description: description ?? null,
        priority,
        storyPoints: Number(storyPoints),
        status,
        };

        await updateTaskServer(id, cleanPatch);
    } catch (err) {
        console.error("Error actualizando en server:", err.message);
    }
    };

    // === Eliminar tarea
  const deleteTask = async (id) => {
    // Optimistic UI (quitamos del estado inmediatamente)
    setTasks((prev) => prev.filter((t) => t.id !== id));

    try {
      await deleteTaskServer(id);
    } catch (err) {
      console.error("Error eliminando en server:", err.message);
    }
  };


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
        <div className="bg-white shadow rounded-lg p-4">
          <h3 className="font-bold mb-3 text-red-600">Pendiente</h3>
          <div className="space-y-2">
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
          onDelete={deleteTask}
        />
      )}
    </div>
  );
}
