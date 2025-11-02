
import { Edit2, X } from 'lucide-react';
import { Card } from '../ui/card';
import Logo from '../Logo';
import type { UserProfile } from '../../types';

interface ProfileCardProps {
  profile: UserProfile;
  previewUrl: string;
  isEditing: boolean;
  onEdit: () => void;
  onCancel: () => void;
}

export default function ProfileCard({
  profile,
  previewUrl,
  isEditing,
  onEdit,
  onCancel,
}: ProfileCardProps) {
  const getAvatarUrl = () => {
    if (previewUrl) return previewUrl;
    if (profile.profile_picture) return profile.profile_picture;
    const name = `${profile.first_name}+${profile.last_name}`;
    return `https://ui-avatars.com/api/?name=${name}&size=200&background=00c853&color=fff&bold=true`;
  };

  return (
    <Card padding="lg" className="mb-6">
      <div className="flex flex-col md:flex-row items-center gap-6">
        {/* Avatar */}
        <div className="relative">
          <img
            src={getAvatarUrl()}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover border-4 border-green-600 shadow-lg"
          />
          <div className="absolute -bottom-2 -right-2">
            <Logo size="sm" />
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-900">
            {profile.first_name} {profile.last_name}
          </h2>
          <p className="text-gray-600 mt-1">@{profile.username}</p>
          {profile.bio && (
            <p className="text-gray-900 mt-3 max-w-md">{profile.bio}</p>
          )}
        </div>

        {/* Edit Button */}
        <div>
          {!isEditing ? (
            <button
              onClick={onEdit}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Edit2 className="w-4 h-4" />
              Editar Perfil
            </button>
          ) : (
            <button
              onClick={onCancel}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 bg-white hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X className="w-4 h-4" />
              Cancelar
            </button>
          )}
        </div>
      </div>
    </Card>
  );
}
