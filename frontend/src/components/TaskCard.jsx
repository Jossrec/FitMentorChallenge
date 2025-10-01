"use client";
import { FaBalanceScale } from "react-icons/fa";

export default function TaskCard({
  idTarea,
  title,
  description,
  prioridad,
  puntosHistoria,
  onClick,
}) {
  const colorPorPrioridad = {
    Alta: "bg-red-500",
    Media: "bg-orange-400",
    Baja: "bg-yellow-300",
  };

  return (
    <div
      onClick={onClick}
      className="p-3 bg-gray-50 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition h-22 flex flex-col justify-between"
    >
      {/* === Fila superior: título + puntos historia === */}
      <div className="flex items-start justify-between">
        <p className="font-semibold text-sm text-gray-700 line-clamp-2 pr-2 max-w-[70%]">
          {title}
        </p>
        {puntosHistoria !== undefined && (
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded flex items-center flex-shrink-0">
            <FaBalanceScale className="mr-1" size={12} />
            {Number(puntosHistoria).toFixed(0)}
          </span>
        )}
      </div>

      {/* === Fila inferior: descripción + prioridad === */}
      <div className="flex items-end justify-between">
        <p className="text-xs text-gray-500 line-clamp-2 pr-2 max-w-[70%]">
          {description}
        </p>
        {prioridad && (
          <div
            className={`px-2 py-0.5 text-xs text-white rounded-full font-semibold flex-shrink-0 ${
              colorPorPrioridad[prioridad] || "bg-gray-300"
            }`}
          >
            {prioridad}
          </div>
        )}
      </div>
    </div>
  );
}
