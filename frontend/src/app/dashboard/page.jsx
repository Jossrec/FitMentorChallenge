"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
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
import { fetchBoardsServer } from "../../usecases/boardService";
import { loadLocalTasks, saveLocalTasks } from "../../utils/storage";
import Loader from "@/components/Loader";


export default function DashboardPage() {
  const { user, token, loading } = useAuth();
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mode, setMode] = useState("create"); // "create" o "edit"
  const [selectedTask, setSelectedTask] = useState(null);
  const [boards, setBoards] = useState([]);
  const [selectedBoardId, setSelectedBoardId] = useState(null);

  

  // si no hay sesión → login
  useEffect(() => {
    if (!loading && (!token || !user)) {
      router.push("/login");
    }
  }, [loading, token, user, router]);

  // Guardar cambios en localStorage
  useEffect(() => {
    if (selectedBoardId) {
      saveLocalTasks(selectedBoardId, tasks);
    }
  }, [selectedBoardId, tasks]);

  // Cargar boards al iniciar
  useEffect(() => {
    (async () => {
      try {
        const b = await fetchBoardsServer();
        setBoards(b);
        if (b.length > 0) {
          setSelectedBoardId(b[0].id);
        }
      } catch (err) {
        console.error("Error cargando boards:", err.message);
      }
    })();
  }, []);


  // Cargar tareas: primero local, luego server
  useEffect(() => {
    if (!selectedBoardId) return;

    // 1. hidratar desde localStorage
    const localTasks = loadLocalTasks(selectedBoardId);
    setTasks(localTasks);

    // 2. luego traer desde el server y reemplazar
    (async () => {
      try {
        const serverTasks = await fetchTasksServer(selectedBoardId);
        setTasks(serverTasks);
      } catch (err) {
        console.warn("No se pudo traer tareas del server:", err.message);
      }
    })();
  }, [selectedBoardId]);


  

  // === Crear tarea
  const addTask = async (task) => {
    if (!selectedBoardId) return;

    const tempId = `tmp-${Date.now()}`;
    const optimisticTask = { ...task, id: tempId };
    setTasks((prev) => [optimisticTask, ...prev]);

    try {
      const { title, description, priority, storyPoints, status } = task;
      const payload = {
        title,
        description: description ?? null,
        priority,
        storyPoints: Number(storyPoints),
        status,
      };

      const created = await createTaskServer(selectedBoardId, payload);

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
    setTasks((prev) => prev.filter((t) => t.id !== id));
    try {
      await deleteTaskServer(id);
    } catch (err) {
      console.error("Error eliminando en server:", err.message);
    }
  };

  // === Drag & Drop
  const onDragEnd = async (result) => {
    const { destination, source, draggableId } = result;
    if (!destination) return;

    const from = source.droppableId;
    const to = destination.droppableId;
    if (from === to) return;

    const task = tasks.find((t) => String(t.id) === String(draggableId));
    if (!task) return;

    const updated = { ...task, status: to };
    setTasks((prev) => prev.map((t) => (t.id === task.id ? updated : t)));

    try {
      if (typeof task.id === "number") {
        const patch = {
          title: updated.title,
          description: updated.description ?? null,
          priority: updated.priority ?? "Media",
          storyPoints: Number(updated.storyPoints) || 1,
          status: updated.status,
        };
        await updateTaskServer(task.id, patch);
      }
    } catch (e) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === task.id ? { ...t, status: from } : t
        )
      );
      console.error("Error actualizando status en server:", e.message);
    }
  };


  
  if (loading||!user || !token) {
  return <Loader/>
}



  return (
    <div className="min-h-screen bg-gray-100">
      <Topbar />
      <div className="p-6 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Bienvenido <span className="text-blue-600">{user?.email}</span>
        </h2>
        <div className="flex items-center space-x-4">
          <select
            value={selectedBoardId ?? ""}
            onChange={(e) => setSelectedBoardId(Number(e.target.value))}
            className="border rounded px-2 py-1 text-gray-500"
          >
            {boards.map((b) => (
              <option key={b.id} value={b.id}>
                {b.name}
              </option>
            ))}
          </select>
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
      </div>
  {/* Kanban con Drag & Drop */}
  <DragDropContext onDragEnd={onDragEnd}>
    <div className="grid grid-cols-3 gap-4 p-6 items-start">
      {/* Pendiente */}
      <Droppable droppableId="PENDIENTE">
        {(provided, snapshot) => (
          <div className="bg-white shadow rounded-lg p-4 h-auto">
            <h3 className="font-bold mb-3 text-red-600">Pendiente</h3>
            {/* Contenedor scrollable */}
            <div
              className={`space-y-2 overflow-y-auto max-h-[62vh] p-2 border-2 border-dashed rounded  ${
                snapshot.isDraggingOver ? "bg-blue-50" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.filter((t) => t.status === "PENDIENTE").length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  Sin tareas, arrastra para cambiar de estado
                </p>
              ) : (
                tasks
                  .filter((t) => t.status === "PENDIENTE")
                  .map((t, index) => (
                    <Draggable
                      key={t.id}
                      draggableId={String(t.id)}
                      index={index}
                    >
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                        >
                          <TaskCard
                            idTarea={`T-${t.id}`}
                            title={t.title}
                            prioridad={t.priority}
                            puntosHistoria={t.storyPoints}
                            onClick={() => {
                              setSelectedTask(t);
                              setMode("edit");
                              setShowModal(true);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      {/* En curso */}
      <Droppable droppableId="EN_CURSO">
        {(provided, snapshot) => (
          <div className="bg-white shadow rounded-lg p-4 h-auto">
            <h3 className="font-bold mb-3 text-yellow-600">En curso</h3>

            {/* Contenedor scrollable */}
            <div
              className={`space-y-2 overflow-y-auto max-h-[calc(100vh-30vh)] p-2 border-2 border-dashed rounded transition-colors ${
                snapshot.isDraggingOver ? "bg-blue-50" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.filter((t) => t.status === "EN_CURSO").length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  Sin tareas, arrastra para cambiar de estado
                </p>
              ) : (
                tasks
                  .filter((t) => t.status === "EN_CURSO")
                  .map((t, index) => (
                    <Draggable
                      key={t.id}
                      draggableId={String(t.id)}
                      index={index}
                    >
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                        >
                          <TaskCard
                            idTarea={`T-${t.id}`}
                            title={t.title}
                            prioridad={t.priority}
                            puntosHistoria={t.storyPoints}
                            onClick={() => {
                              setSelectedTask(t);
                              setMode("edit");
                              setShowModal(true);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>

      {/* Finalizado */}
      <Droppable droppableId="FINALIZADO">
        {(provided, snapshot) => (
          <div className="bg-white shadow rounded-lg p-4 flex flex-col">
            <h3 className="font-bold mb-3 text-green-600">Finalizado</h3>

            {/* Contenedor scrollable */}
            <div
              className={`space-y-2 overflow-y-auto max-h-[calc(100vh-30vh)] p-2 border-2 border-dashed rounded transition-colors ${
                snapshot.isDraggingOver ? "bg-blue-50" : ""
              }`}
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {tasks.filter((t) => t.status === "FINALIZADO").length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">
                  Sin tareas, arrastra para cambiar de estado
                </p>
              ) : (
                tasks
                  .filter((t) => t.status === "FINALIZADO")
                  .map((t, index) => (
                    <Draggable
                      key={t.id}
                      draggableId={String(t.id)}
                      index={index}
                    >
                      {(prov) => (
                        <div
                          ref={prov.innerRef}
                          {...prov.draggableProps}
                          {...prov.dragHandleProps}
                        >
                          <TaskCard
                            idTarea={`T-${t.id}`}
                            title={t.title}
                            prioridad={t.priority}
                            puntosHistoria={t.storyPoints}
                            onClick={() => {
                              setSelectedTask(t);
                              setMode("edit");
                              setShowModal(true);
                            }}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))
              )}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  </DragDropContext>


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
