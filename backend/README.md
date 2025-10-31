# Backend de desarrollo (FastAPI + SQLite)

Este directorio contiene una API mínima en FastAPI que usa SQLite (SQLModel) para soportar:

- Registro y login por usuario (endpoint `/register` y `/login`).
- CRUD básico de viajes (`/trips`).

Instrucciones rápidas:

1. Crear/activar un entorno Python (opcional pero recomendado).
2. Instalar dependencias:

   pip install -r requirements.txt

3. Inicializar la base de datos y crear un usuario de prueba:

   python init_db.py

   Usuario de ejemplo: `test` / `testpass`

4. Ejecutar la API:

   uvicorn main:app --reload

Endpoints básicos:
- POST /register -> form fields: `username`, `password`
- POST /login -> form fields (OAuth2 password flow): `username`, `password` (devuelve access_token)
- GET /trips -> requiere Authorization: Bearer <token>
- POST /trips -> requiere token. Campos: `title`, `start`, `end`, `distance_km`, `notes`

Notas:
- Cambia `SECRET_KEY` en `main.py` antes de usar en producción.
