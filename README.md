

### Backend
- **Django 5.2.7** - Framework web
- **Django REST Framework** - API REST
- **Simple JWT** - Autenticación con tokens
- **SQLite** - Base de datos

### Frontend
- **React 19** - UI Library
- **Vite** - Build tool
- **TypeScript** - Type safety
- **Tailwind CSS** - Estilos
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP
- **Zustand** - Estado global

## 🔧 Instalación y Configuración

### Requisitos Previos
- Python 3.10 o superior
- Node.js 18 o superior
- npm o yarn

### Configuración del Backend

1. **Navegar a la carpeta del backend:**
```bash
cd BACKEND
```

2. **Crear y activar entorno virtual:**
```bash
# Windows
python -m venv env
.\env\Scripts\Activate.ps1

# Linux/Mac
python3 -m venv env
source env/bin/activate
```

3. **Instalar dependencias:**
```bash
pip install -r requirements.txt
```

4. **Aplicar migraciones:**
```bash
python manage.py migrate
```

5. **Crear superusuario (opcional):**
```bash
python manage.py createsuperuser
```

6. **Iniciar servidor:**
```bash
python manage.py runserver
```

✅ El backend estará disponible en: **http://127.0.0.1:8000/**

---

### Configuración del Frontend

1. **Abrir nueva terminal y navegar a la carpeta del frontend:**
```bash
cd FRONTEND
```

2. **Instalar dependencias:**
```bash
npm install
```

3. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

✅ El frontend estará disponible en: **http://localhost:5173/**

---

### Acceso a la Aplicación

1. Abre tu navegador en `http://localhost:5173/`
2. Regístrate con un nuevo usuario
3. ¡Comienza a rastrear tu huella de carbono!

---

## 🎯 Uso Rápido

### Comandos Backend (desde carpeta BACKEND)
```bash
# Activar entorno virtual
.\env\Scripts\Activate.ps1  # Windows
source env/bin/activate     # Linux/Mac

# Iniciar servidor
python manage.py runserver

# Crear migraciones
python manage.py makemigrations

# Aplicar migraciones
python manage.py migrate

# Crear superusuario
python manage.py createsuperuser
```

### Comandos Frontend (desde carpeta FRONTEND)
```bash
# Iniciar desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

---
