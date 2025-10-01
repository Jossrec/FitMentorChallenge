"use client";
import { useState } from "react";

export default function AddTaskInline({ status, onAdd }) {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return;
    onAdd({
      title: title.trim(),
      description: "",
      priority: "Media",
      storyPoints: 1,
      status,
    });
    setTitle("");
    setIsAdding(false);
  };

  return (
    <div className="mt-2">
      {isAdding ? (
        <div className="bg-gray-50 border rounded p-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleSubmit();
              }
            }}
            placeholder="Título de la tarea"
            className="w-full border p-2 rounded mb-2 text-sm text-gray-400"
            autoFocus
          />
          <div className="flex space-x-2">
            <button
              onClick={handleSubmit}
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Añadir
            </button>
            <button
              onClick={() => {
                setIsAdding(false);
                setTitle("");
              }}
              className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-200 rounded"
            >
              Cancelar
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full flex items-center justify-center  bg-gray-100 rounded py-2 text-sm text-gray-700 hover:bg-gray-200 transition"
        >
          <span className="mr-1 text-lg">＋</span>Añadir una tarjeta
        </button>
      )}
    </div>
  );
}
