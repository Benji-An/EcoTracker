/**
 * Página de Registro
 */
import { useState, type FormEvent } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

export default function Register() {
  const navigate = useNavigate();
  const { register, error, isLoading, clearError } = useAuthStore();
  const toast = useToast();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    clearError();

    if (formData.password !== formData.password_confirm) {
      toast.error('Las contraseñas no coinciden');
      return;
    }

    try {
      await register(formData);
      toast.success('¡Cuenta creada exitosamente! Bienvenido a EcoTracker 🌱');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Error al crear la cuenta. Intenta con otro usuario o email');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 px-4 py-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8">
        {/* Header con logo circular */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-500 rounded-full mb-4">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="w-8 h-8 text-white"
            >
              <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800 mb-1">
            EcoTracker
          </h1>
          <p className="text-gray-500 text-sm">Monitorea tu huella de carbono</p>
        </div>

        {/* Tabs */}
        <div className="relative flex mb-6 bg-gray-100 rounded-lg p-1">
          {/* Indicador deslizante */}
          <div 
            className="absolute top-1 left-1 w-[calc(50%-0.25rem)] h-[calc(100%-0.5rem)] bg-white rounded-md shadow-sm transition-transform duration-300 ease-out"
            style={{ transform: 'translateX(calc(100% + 0.5rem))' }}
          />
          
          <Link
            to="/login"
            className="relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-md text-gray-600 hover:text-gray-900 text-center transition-colors duration-200"
          >
            Iniciar Sesión
          </Link>
          <button
            type="button"
            className="relative z-10 flex-1 py-2 px-4 text-sm font-medium rounded-md text-gray-900 transition-colors duration-200"
          >
            Registrarse
          </button>
        </div>

        {/* Bienvenido */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            Crea tu cuenta
          </h2>
          <p className="text-gray-500 text-sm">
            Completa el formulario para registrarte
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nombre
              </label>
              <input
                type="text"
                required
                value={formData.first_name}
                onChange={(e) =>
                  setFormData({ ...formData, first_name: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition"
                placeholder="Nombre"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Apellido
              </label>
              <input
                type="text"
                required
                value={formData.last_name}
                onChange={(e) =>
                  setFormData({ ...formData, last_name: e.target.value })
                }
                className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition"
                placeholder="Apellido"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Usuario
            </label>
            <input
              type="text"
              required
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              placeholder="Tu usuario"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              placeholder="tu@email.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Contraseña
            </label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              placeholder="Tu contraseña"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              required
              value={formData.password_confirm}
              onChange={(e) =>
                setFormData({ ...formData, password_confirm: e.target.value })
              }
              className="w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-green-500 focus:bg-white transition"
              placeholder="Confirma tu contraseña"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gray-900 text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed mt-6"
          >
            {isLoading ? 'Registrando...' : 'Crear Cuenta'}
          </button>
        </form>
      </div>
    </div>
  );
}


