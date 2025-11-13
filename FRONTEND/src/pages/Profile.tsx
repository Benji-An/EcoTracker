/**
 * Profile Page - Perfil del usuario
 */
import { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { authAPI } from '../api/auth';
import { useToast } from '../context/ToastContext';
import type { UserProfile } from '../types';

// Components
import Navbar from '../components/nav/Navbar';
import ProfileCard from '../components/profile/ProfileCard';
import ProfileStats from '../components/profile/ProfileStats';
import ProfileEditForm from '../components/profile/ProfileEditForm';

export default function Profile() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    bio: '',
    daily_co2_goal: 8.0,
    notifications_enabled: true,
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const data = await authAPI.getProfile();
      setProfile(data);
      setFormData({
        first_name: data.first_name,
        last_name: data.last_name,
        bio: data.bio || '',
        daily_co2_goal: data.daily_co2_goal,
        notifications_enabled: data.notifications_enabled,
      });
    } catch (error) {
      console.error('Error al cargar perfil:', error);
      toast.error('Error al cargar el perfil');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFormChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('first_name', formData.first_name);
      formDataToSend.append('last_name', formData.last_name);
      formDataToSend.append('bio', formData.bio);
      formDataToSend.append('daily_co2_goal', formData.daily_co2_goal.toString());
      formDataToSend.append('notifications_enabled', formData.notifications_enabled.toString());

      if (selectedFile) {
        formDataToSend.append('profile_picture', selectedFile);
      }

      const updatedProfile = await authAPI.updateProfile(formDataToSend);
      setProfile(updatedProfile);
      setIsEditing(false);
      toast.success('¡Perfil actualizado exitosamente! 👤');

      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
        setPreviewUrl('');
      }
      setSelectedFile(null);
    } catch (error: any) {
      console.error('Error updating profile:', error);
      toast.error(error.response?.data?.error || 'Error al actualizar perfil');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl('');
    }
    setSelectedFile(null);
  };

  if (!profile) {
    return (
      <div className="min-h-screen" style={{ backgroundColor: '#e8f5e9' }}>
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-gray-600">Cargando perfil...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8f5e9' }}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <User className="w-8 h-8" />
            Mi Perfil
          </h1>
          <p className="text-gray-600 mt-2">
            Gestiona tu información personal y preferencias
          </p>
        </div>

        {/* Profile Card */}
        <ProfileCard
          profile={profile}
          previewUrl={previewUrl}
          isEditing={isEditing}
          onEdit={() => setIsEditing(true)}
          onCancel={handleCancel}
        />

        {/* Stats */}
        <ProfileStats profile={profile} />

        {/* Edit Form */}
        {isEditing && (
          <ProfileEditForm
            formData={formData}
            previewUrl={previewUrl}
            isLoading={isLoading}
            onSubmit={handleSubmit}
            onChange={handleFormChange}
            onFileChange={handleFileChange}
          />
        )}
      </div>
    </div>
  );
}
