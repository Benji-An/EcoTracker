# 🌱 EkoTraker - Aplicación de Rastreo de Huella de Carbono

Aplicación web completa para ayudar a los usuarios a rastrear, entender y reducir su huella de carbono diaria a través del registro de comidas, transporte y consumo de energía.

## 🚀 Stack Tecnológico

### Backend
- **Django 5.2.7** - Framework web
- **Django REST Framework 3.16.1** - API REST
- **Simple JWT 5.5.1** - Autenticación con tokens
- **Django CORS Headers 4.9.0** - Manejo de CORS
- **Pillow 12.0.0** - Procesamiento de imágenes
- **SQLite** - Base de datos (listo para PostgreSQL)

### Frontend
- **React 19.1.1** - UI Library
- **Vite 7.1.12** - Build tool
- **TypeScript 5.9.3** - Type safety
- **Tailwind CSS 4.1.16** - Estilos
- **React Router DOM** - Navegación
- **Axios** - Cliente HTTP
- **Zustand** - Estado global

## 📁 Estructura del Proyecto

```
EKOTRAKER/
├── BACKEND/
│   ├── core/                      # Utilidades compartidas
│   │   ├── models/
│   │   │   └── M_BaseModel.py     # Modelo base con timestamps
│   │   └── utils/
│   │       ├── carbon_calculator.py  # Lógica de cálculo CO2
│   │       └── constants.py       # Factores de emisión y constantes
│   ├── app/
│   │   ├── users/                 # Autenticación y perfiles
│   │   │   ├── models/
│   │   │   │   └── M_UserProfile.py
│   │   │   ├── serializers/
│   │   │   │   ├── SZ_User.py
│   │   │   │   └── SZ_UserProfile.py
│   │   │   ├── views/
│   │   │   │   ├── V_Auth.py
│   │   │   │   └── V_Profile.py
│   │   │   └── urls.py
│   │   ├── meals/                 # Registro de comidas
│   │   │   ├── models/M_Meal.py
│   │   │   ├── serializers/SZ_Meal.py
│   │   │   ├── views/V_Meal.py
│   │   │   └── urls.py
│   │   ├── transport/             # Registro de transporte
│   │   │   ├── models/M_Transport.py
│   │   │   ├── serializers/SZ_Transport.py
│   │   │   ├── views/V_Transport.py
│   │   │   └── urls.py
│   │   ├── energy/                # Consumo de energía (pendiente)
│   │   ├── dashboard/             # Estadísticas (pendiente)
│   │   └── social/                # Competencia amigos (pendiente)
│   └── setting/
│       ├── settings.py
│       └── urls.py
└── FRONTEND/
    └── src/
        ├── api/                   # Servicios API
        │   ├── client.ts          # Cliente Axios con interceptores
        │   ├── auth.ts
        │   ├── meals.ts
        │   └── transport.ts
        ├── components/
        │   └── Layout.tsx         # Layout con navbar
        ├── context/
        │   └── AuthContext.tsx    # Store de autenticación (Zustand)
        ├── pages/
        │   ├── Login.tsx
        │   ├── Register.tsx
        │   ├── Dashboard.tsx
        │   ├── Meals.tsx
        │   ├── Transport.tsx
        │   ├── Profile.tsx
        │   └── Social.tsx
        ├── types/
        │   └── index.ts           # Tipos TypeScript
        └── App.tsx
```

## 🎨 Características Implementadas

### ✅ Autenticación
- [x] Registro de usuarios con validación
- [x] Login con JWT
- [x] Refresh token automático
- [x] Persistencia de sesión
- [x] Logout

### ✅ Perfil de Usuario
- [x] Visualización de perfil
- [x] Edición de información personal
- [x] Carga de foto de perfil
- [x] Sistema de puntos y niveles
- [x] Racha de días consecutivos
- [x] Estadísticas personales

### ✅ Registro de Comidas
- [x] Formulario con ingredientes dinámicos
- [x] Cálculo automático de CO2
- [x] Detección de comidas vegetarianas/veganas
- [x] Listado con filtros
- [x] Eliminación de registros
- [x] Puntos por comidas sostenibles

### ✅ Registro de Transporte
- [x] 10 tipos de transporte (coche, bici, bus, etc.)
- [x] Cálculo automático de CO2
- [x] Origen y destino opcionales
- [x] Detección de transporte sostenible
- [x] Listado con iconos
- [x] Puntos por transporte eco-friendly

### ✅ Dashboard
- [x] Resumen de estadísticas
- [x] Accesos rápidos
- [x] Tips ecológicos
- [x] Niveles y puntos

### ✅ Social
- [x] Ranking de usuarios (UI lista - Backend pendiente)
- [x] Sistema de logros
- [x] Desafíos semanales
- [x] Comparación con amigos

## 🔧 Instalación y Configuración

### Backend

1. **Crear y activar entorno virtual:**
```bash
cd BACKEND
python -m venv env
.\env\Scripts\Activate.ps1  # Windows PowerShell
```

2. **Instalar dependencias:**
```bash
pip install -r requirements.txt
```

3. **Aplicar migraciones:**
```bash
python manage.py makemigrations
python manage.py migrate
```

4. **Crear superusuario (opcional):**
```bash
python manage.py createsuperuser
```

5. **Iniciar servidor:**
```bash
python manage.py runserver
```

El backend estará disponible en: `http://127.0.0.1:8000/`

### Frontend

1. **Instalar dependencias:**
```bash
cd FRONTEND
npm install
```

2. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

El frontend estará disponible en: `http://localhost:5173/`

## 📡 Endpoints API

### Autenticación
- `POST /api/users/auth/register/` - Registro
- `POST /api/users/auth/login/` - Login
- `POST /api/users/auth/logout/` - Logout
- `POST /api/token/refresh/` - Refresh token

### Perfil
- `GET /api/users/profile/` - Ver perfil
- `PUT /api/users/profile/update/` - Actualizar perfil

### Comidas
- `GET /api/meals/` - Listar comidas
- `POST /api/meals/create/` - Crear comida
- `GET /api/meals/<id>/` - Detalle comida
- `DELETE /api/meals/<id>/delete/` - Eliminar comida

### Transporte
- `GET /api/transport/` - Listar transportes
- `POST /api/transport/create/` - Crear transporte
- `GET /api/transport/<id>/` - Detalle transporte
- `DELETE /api/transport/<id>/delete/` - Eliminar transporte

## 🎯 Convenciones de Código

### Backend (Django)
- **Modelos:** `M_NombreModelo` (ej: `M_Meal`, `M_Transport`)
- **Vistas:** `V_NombreVista` (ej: `V_MealList`, `V_UserProfile`)
- **Serializers:** `SZ_NombreSerializer` (ej: `SZ_Meal`, `SZ_User`)

### Estructura de Apps
Cada app tiene la siguiente estructura:
```
app/
├── models/
│   ├── __init__.py
│   └── M_ModelName.py
├── serializers/
│   ├── __init__.py
│   └── SZ_SerializerName.py
└── views/
    ├── __init__.py
    └── V_ViewName.py
```

## 📊 Sistema de Puntos

### Acciones que Otorgan Puntos:
- Registrar comida: **10 puntos**
- Registrar transporte: **10 puntos**
- Comida vegetariana: **+20 puntos**
- Comida vegana: **+30 puntos**
- Usar bicicleta/caminar: **+30 puntos**
- Día bajo en CO2 (<5kg): **100 puntos**
- Objetivo diario cumplido: **50 puntos**
- Objetivo semanal: **200 puntos**

### Sistema de Niveles:
- **1 nivel = 1000 puntos**
- Los niveles se actualizan automáticamente

## 🌍 Factores de Emisión de CO2

### Transporte (kg CO2/km)
- Auto: 0.192
- Auto eléctrico: 0.053
- Autobús: 0.089
- Metro: 0.041
- Bicicleta/Caminar: 0.0

### Comidas (kg CO2/kg)
- Carne de res: 27.0
- Pollo: 6.9
- Pescado: 6.1
- Verduras: 0.4
- Tofu: 2.0

## 🚧 Próximas Funcionalidades

### Backend
- [ ] App Energy (consumo de energía)
- [ ] App Dashboard (estadísticas avanzadas, gráficos)
- [ ] App Social completa (amigos, leaderboard real)
- [ ] Migración a PostgreSQL
- [ ] API de tips personalizados
- [ ] Notificaciones

### Frontend
- [ ] Gráficos con Recharts
- [ ] Página de Energy
- [ ] Dashboard con estadísticas reales
- [ ] Sistema de amigos funcional
- [ ] Comparación de alternativas de transporte
- [ ] Calculadora de CO2 interactiva
- [ ] Modo oscuro
- [ ] PWA (Progressive Web App)

## 🎨 Personalización

El diseño actual es **temporal y sencillo**. Para implementar tu diseño personalizado:

1. Los componentes están en `FRONTEND/src/pages/`
2. Los estilos usan Tailwind CSS
3. Modifica los archivos `.tsx` según tu diseño
4. Usa las clases de Tailwind o agrega CSS custom

## 🤝 Contribuir

Este es un proyecto educativo. Para agregar funcionalidades:

1. Crea una nueva rama
2. Implementa la funcionalidad
3. Prueba localmente
4. Haz commit con mensajes descriptivos

## 📝 Licencia

Proyecto educativo - Uso libre

## 👨‍💻 Desarrolladores

- Equipo EkoTraker

---

**¡Juntos por un planeta más verde! 🌱**
