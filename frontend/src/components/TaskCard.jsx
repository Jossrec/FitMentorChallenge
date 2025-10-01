"use client";
import { FaBalanceScale, FaUser } from "react-icons/fa";

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
      className="relative p-3 bg-gray-50 border rounded-lg shadow-sm cursor-pointer hover:bg-gray-100 transition h-22"
    >
      {/* Peso o puntos historia */}
      {puntosHistoria !== undefined && (
        <span className="absolute top-2 right-2 bg-blue-100 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded flex items-center">
          <FaBalanceScale className="mr-1" size={14} />
          {Number(puntosHistoria).toFixed(0)}
        </span>
      )}

      {/* Título */}
      <p className="font-semibold text-sm mb-1 line-clamp-2 text-gray-700">{title}</p>

      {/*descripción*/}
      <p className="font-normal text-sm mb-1 line-clamp-2 text-gray-400 ">{description}</p>

      {/* Prioridad */}
      {prioridad && (
        <div
          className={`absolute bottom-2 right-2 px-2 py-0.5 text-xs text-white rounded-full font-semibold ${
            colorPorPrioridad[prioridad] || "bg-gray-300"
          }`}
        >
          {prioridad}
        </div>
      )}
    </div>
  );
}
