
import { Upload, Check } from 'lucide-react';
import { Card } from '../ui/card';

interface ProfileEditFormProps {
  formData: {
    first_name: string;
    last_name: string;
    bio: string;
    daily_co2_goal: number;
    notifications_enabled: boolean;
  };
  previewUrl: string;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function ProfileEditForm({
  formData,
  previewUrl,
  isLoading,
  onSubmit,
  onChange,
  onFileChange,
}: ProfileEditFormProps) {
  return (
    <Card>
      <h3 className="text-xl font-semibold text-gray-900 mb-6">
        Editar Información
      </h3>

      <form onSubmit={onSubmit} className="space-y-6">
        {/* Foto de Perfil */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Foto de Perfil
          </label>
          <div className="flex items-center gap-4">
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border-2 border-green-600"
              />
            )}
            <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
              <Upload className="w-4 h-4" />
              <span className="text-sm font-medium">Subir Foto</span>
              <input
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* Nombre */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Nombre
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => onChange('first_name', e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Apellido
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => onChange('last_name', e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Biografía
          </label>
          <textarea
            value={formData.bio}
            onChange={(e) => onChange('bio', e.target.value)}
            rows={3}
            placeholder="Cuéntanos sobre ti..."
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
          />
        </div>

        {/* Objetivo CO2 */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Objetivo Diario de CO2 (kg)
          </label>
          <input
            type="number"
            step="0.1"
            value={formData.daily_co2_goal}
            onChange={(e) => onChange('daily_co2_goal', parseFloat(e.target.value))}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Notificaciones */}
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <p className="font-medium text-gray-900">Notificaciones</p>
            <p className="text-sm text-gray-600">
              Recibe recordatorios y actualizaciones
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={formData.notifications_enabled}
              onChange={(e) => onChange('notifications_enabled', e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Guardando...' : (
            <>
              <Check className="w-5 h-5" />
              Guardar Cambios
            </>
          )}
        </button>
      </form>
    </Card>
  );
}
