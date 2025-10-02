"use client";
import { useState, useEffect } from "react";
import Loader from "./Loader"; // tu componente loader

export default function TaskModal({
  onClose,
  onSave,
  onDelete,
  onUpdate,
  mode = "create",
  task = {},
  tasks = [],
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Media");
  const [storyPoints, setStoryPoints] = useState(1);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Si es edición, rellenamos con datos de la tarea
  useEffect(() => {
    if (mode === "edit" && task) {
      setTitle(task.title || "");
      setDescription(task.description || "");
      setPriority(task.priority || "Media");
      setStoryPoints(task.storyPoints || 1);

      // si el id es temporal → bloquear
      if (String(task.id).startsWith("tmp-")) {
        setIsPending(true);
      } else {
        setIsPending(false);
      }
    }
  }, [mode, task]);

  // watcher: cuando llegue el id real desde tasks, desbloquear
  useEffect(() => {
    if (isPending && task?.id && !String(task.id).startsWith("tmp-")) {
      setIsPending(false);
    }
  }, [tasks, task, isPending]);

  const handleAction = () => {
    if (isPending) return; // no hacer nada mientras está pendiente
    if (!title.trim()) return;

    const exists = tasks.some(
      (t) =>
        t.title.trim().toLowerCase() === title.trim().toLowerCase() &&
        t.id !== task?.id
    );
    if (exists) {
      setError("Ya existe una tarea con ese nombre en este tablero.");
      return;
    }

    setError(null);

    const newTask = {
      ...task,
      id: mode === "create" ? Date.now() : task.id,
      title,
      description,
      priority,
      storyPoints,
      status: task?.status || "PENDIENTE",
    };

    if (mode === "create") {
      onSave(newTask);
    } else {
      onUpdate(newTask);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        {isPending && (
          <div className="absolute inset-0 flex items-center justify-center bg-white/70 z-10">
            <Loader />
          </div>
        )}
        <h2 className="text-lg font-bold mb-4 text-gray-600">
          {mode === "create" ? "Crear nueva Tarea" : "Editar Tarea"}
        </h2>
        {error && (
          <p className="bg-red-100 text-red-600 text-sm p-2 rounded mb-4">
            {error}
          </p>
        )}

        <label className="block mb-2 font-semibold text-gray-600">
          Título *<span className="text-red-500 text-xs "> (campo obligatorio)</span>
        </label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          disabled={isPending}
          className="w-full border p-2 rounded mb-3 text-gray-600 placeholder-gray-400 disabled:bg-gray-100"
        />

        <label className="block mb-2 font-semibold text-gray-600">Descripción</label>
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isPending}
          className="w-full border p-2 rounded mb-3 text-gray-600 placeholder-gray-400 disabled:bg-gray-100"
        />

        <label className="block mb-2 font-semibold text-gray-600">Prioridad</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          disabled={isPending}
          className="w-full border p-2 rounded mb-3 text-gray-600 disabled:bg-gray-100"
        >
          <option>Alta</option>
          <option>Media</option>
          <option>Baja</option>
        </select>

        <label className="block mb-2 font-semibold text-gray-600">Puntos de historia</label>
        <input
          type="number"
          value={storyPoints}
          min="1"
          onChange={(e) => setStoryPoints(Number(e.target.value))}
          disabled={isPending}
          className="w-full border p-2 rounded mb-4 text-gray-600 disabled:bg-gray-100"
        />

        <div className="flex justify-between items-center">
          {mode === "edit" && (
            <button
              onClick={() => {
                if (!isPending) {
                  onDelete(task.id);
                  onClose();
                }
              }}
              disabled={isPending}
              className="px-4 py-2 rounded border border-red-600 bg-red-100 text-red-600 hover:bg-red-200 disabled:opacity-50"
            >
              Eliminar
            </button>
          )}

          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-400 text-gray-600"
            >
              Cancelar
            </button>
            <button
              onClick={handleAction}
              disabled={isPending}
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {mode === "create" ? "Crear tarea" : "Guardar cambios"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
