"use client";

export default function Loader({ fullscreen = false }) {
  if (fullscreen) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-600 border-solid"></div>
      </div>
    );
  }

  // versión compacta (solo spinner)
  return (
    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-orange-600 border-solid"></div>
  );
}
