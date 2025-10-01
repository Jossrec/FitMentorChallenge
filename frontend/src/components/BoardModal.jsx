// src/components/BoardModal.jsx
"use client";
import { useState } from "react";

export default function BoardModal({ onClose, onCreate }) {
  const [title, setTitle] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreate(title.trim());
    setTitle("");
    onClose();
  };

  return (
    <div className="fixed inset-0 backdrop-brightness-60 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-600">
          Crear tablero
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Input */}
          <div>
            <label className="block mb-2 font-semibold text-gray-600">Título del tablero</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Mi nuevo tablero"
              className="w-full border rounded px-3 py-2 focus:ring-2 focus:ring-blue-500 text-gray-600 placeholder-gray-400"
              required
            />
          </div>

          {/* Rectángulo con imagen */}
          <div className="rounded-md flex items-center justify-center w-full h-32">
            <img
              src="/ImagenCrearTablero.png" 
              alt="Ejemplo tablero"
              className="max-h-full max-w-full object-contain scale-110"
            />
          </div>

          {/* Botones */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-400 text-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Crear tablero
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
