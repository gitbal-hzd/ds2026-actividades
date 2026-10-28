# Librería UTN - Clase 23 (Deploy y Entornos)

## URLs de Producción
- **Frontend (Render Static Site):** https://ds2026-actividades-1.onrender.com
- **Backend API (Render Web Service):** https://ds2026-actividades-p588.onrender.com
- **Base de Datos:** Neon PostgreSQL (`AWS us-east-1`)

## Usuarios de Prueba (Seed)
- **Administrador:** `admin@libreria.test` / `Admin1234`
- **Cliente:** `cliente@libreria.test` / `Cliente1234`

## Variables de Entorno

### Backend (`backend/.env`)
- `PORT`: Puerto del servidor (ej. `3000`, en producción inyectado por Render).
- `FRONTEND_URL`: URL del cliente permitida por CORS (sin barra final).
- `DATABASE_URL`: Cadena de conexión a PostgreSQL (`?sslmode=require` en producción).
- `JWT_SECRET`: Clave secreta para firma de tokens JWT.

### Frontend (`frontend/.env`)
- `VITE_API_URL`: URL base de la API del backend terminada en `/api`.

## Ejecución Local (Docker)
```bash
docker compose up --build
```

## Migraciones y Carga de Datos Iniciales (Seed)
```bash
cd backend
npx prisma migrate deploy
npx prisma db seed
```
