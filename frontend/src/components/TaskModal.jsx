"use client";
import { useState } from "react";

export default function TaskModal({ onClose, onSave }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Media");
  const [storyPoints, setStoryPoints] = useState(1);

  const handleSave = () => {
    if (!title.trim()) return;
    onSave({
      id: Date.now(),
      title,
      description,
      priority,
      storyPoints,
      status: "PENDIENTE",
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-600">Crear nueva Tarea</h2>

        <label className="block mb-2 font-semibold text-gray-600">Título</label>
        <input
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded mb-3 text-gray-600 placeholder-gray-400"
        />
        <label className="block mb-2 font-semibold text-gray-600">Descripción</label>
        <textarea
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded mb-3 placeholder-gray-400 text-gray-600"
        />

        <label className="block mb-2 font-semibold text-gray-600">Prioridad</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border p-2 rounded mb-3 text-gray-600"
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
          className="w-full border p-2 rounded mb-4 text-gray-600"
        />

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border border-gray-400 text-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Crear tarea
          </button>
        </div>
      </div>
    </div>
  );
}
