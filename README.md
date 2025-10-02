# Kanban Board – Reto Técnico Full Stack

Este proyecto es una aplicación **full stack Kanban** desarrollada como parte de un reto técnico.  
El objetivo fue construir un tablero similar al de Jira, con autenticación, persistencia en base de datos y una interfaz funcional y estilizada.

🔗 **Demo en producción**: [fitmentorchallenge.pages.dev](https://fitmentorchallenge.pages.dev/login)

---

## ✨ Características principales
- **Autenticación de usuarios** mediante JWT (con persistencia de sesión).  
- **Backend en Express** con **Prisma** como ORM y base de datos **MySQL**.  
- **Frontend en Next.js** con **Tailwind CSS**.  
- **Tablero Kanban con 3 columnas fijas**: Pendiente, En curso y Finalizado.  
- **Funciones implementadas**:
  - Crear tareas (con validaciones de duplicados y vacíos).  
  - Mover tareas entre columnas con **drag & drop**, persistiendo cambios en la base de datos.  
  - Eliminar tareas con actualización inmediata en la base.
  - Crear tablero, un mismo usuario puede tener varios tableros.
  - Estado del tablero se reconstruye al recargar desde la DB.
  

## 🛠️ Tecnologías utilizadas
- **Frontend**: Next.js, React, TailwindCSS  
- **Backend**: Node.js, Express  
- **ORM**: Prisma  
- **Base de datos**: MySQL → Aiven
- **Infraestructura**:  
  - Backend → Render  
  - Frontend → Cloudflare Pages  

## 🚀 Instalación y ejecución

### 1. Clonar repositorio
Clona el repositorio y entra al proyecto

### 2. Instalar dependencias
Instala las dependencias tanto en el backend como en el frontend ejecutando en cada carpeta.
```bash
npm install
```

### 3. Configurar variables de entorno
Crea un archivo .env en el backend con el siguiente contenido:
```bash
DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE"
JWT_SECRET="super_secret_key"
PORT:3000
```
Crea también un archivo .env.local dentro de la carpeta frontend con:
```
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```
### 4. Ejecutar en modo desarrollo
Desde la carpeta backend, genera el cliente de Prisma y aplica las migraciones para crear la base de datos.
#### Backend
```bash
cd backend
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```
#### Frontend
En otra terminal:
```
cd frontend
npm run dev
```
Backend disponible en: http://localhost:3000/api
Frontend disponible en: http://localhost:3001


