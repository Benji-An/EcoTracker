/**
 * Navbar Component - Barra de navegación principal
 */
import { LogOut, LayoutDashboard, Utensils, Car, User, Users } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../context/AuthContext';
import Logo from '../Logo';

interface NavLink {
  path: string;
  label: string;
  icon: React.ElementType;
}

const navLinks: NavLink[] = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/meals', label: 'Comidas', icon: Utensils },
  { path: '/transport', label: 'Transporte', icon: Car },
  { path: '/social', label: 'Social', icon: Users },
  { path: '/profile', label: 'Perfil', icon: User },
];

export default function Navbar() {
  const { user, logout } = useAuthStore();
  const location = useLocation();

  const handleLogout = () => {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      logout();
    }
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-white border-b border-green-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo y Usuario */}
          <div className="flex items-center gap-3">
            <Logo size="md" showName />
            <div className="hidden md:block border-l border-green-200 pl-3">
              <p className="text-sm text-gray-600">
                Hola, {user?.first_name || user?.username}
              </p>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
                    transition-all duration-200
                    ${
                      active
                        ? 'bg-green-600 text-white shadow-md'
                        : 'text-gray-600 hover:bg-green-50 hover:text-green-900'
                    }
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium 
                     border border-gray-300 bg-white text-gray-700
                     hover:bg-red-500 hover:text-white hover:border-red-500
                     rounded-lg transition-all duration-200 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            <LogOut className="w-4 h-4" />
            <span className="hidden sm:inline">Salir</span>
          </button>
        </div>
      </div>
    </header>
  );
}
