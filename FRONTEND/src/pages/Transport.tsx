/**
 * Transport Page - Gestión de transporte
 */
import { useState, useEffect } from 'react';
import { Plus, List, Car } from 'lucide-react';
import { transportAPI } from '../api/transport';
import { useToast } from '../context/ToastContext';
import type { Transport } from '../types';

// Components
import Navbar from '../components/nav/Navbar';
import TransportForm, { type TransportFormData } from '../components/transport/TransportForm';
import TransportList from '../components/transport/TransportList';
import Button from '../components/ui/Button';

export default function TransportPage() {
  const [transports, setTransports] = useState<Transport[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const toast = useToast();

  useEffect(() => {
    loadTransports();
  }, []);

  const loadTransports = async () => {
    try {
      const response = await transportAPI.list();
      setTransports(response.transports || []);
    } catch (error) {
      console.error('Error al cargar transportes:', error);
      setTransports([]);
      toast.error('Error al cargar el historial de transportes');
    }
  };

  const handleSubmit = async (formData: TransportFormData) => {
    setIsLoading(true);
    try {
      await transportAPI.create(formData);
      toast.success('¡Viaje registrado exitosamente! 🚗');
      setShowForm(false);
      loadTransports();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error al registrar viaje');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await transportAPI.delete(id);
      toast.success('Viaje eliminado correctamente');
      loadTransports();
    } catch (error) {
      toast.error('Error al eliminar viaje');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8f5e9' }}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <Car className="w-8 h-8" />
            Transporte
          </h1>
          <p className="text-gray-600 mt-2">
            Registra tus viajes para calcular tu impacto en CO2
          </p>
        </div>

        {/* Toggle Button */}
        <div className="mb-6">
          <Button onClick={() => setShowForm(!showForm)}>
            {showForm ? (
              <>
                <List className="w-5 h-5" />
                Ver Historial
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Agregar Viaje
              </>
            )}
          </Button>
        </div>

        {/* Content */}
        {showForm ? (
          <TransportForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <TransportList transports={transports} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
