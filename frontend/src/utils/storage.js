export function saveToken(token) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
  }
}

export function getToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token");
  }
  return null;
}

export function clearToken() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
  }
}


// Guardar y leer tareas de un board específico
export const loadLocalTasks = (boardId) => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(`tasks_${boardId}`) || "[]");
  } catch {
    return [];
  }
};

export const saveLocalTasks = (boardId, tasks) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(`tasks_${boardId}`, JSON.stringify(tasks));
  }
};
