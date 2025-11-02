/**
 * TransportForm - Formulario para registrar transporte
 */
import { useState } from 'react';
import { Car, Zap, Bus, Train, Bike, PersonStanding, Plane, Check } from 'lucide-react';
import { Card } from '../ui/card';
import type { TransportType, CreateTransportData } from '../../types';

interface TransportFormProps {
  onSubmit: (data: CreateTransportData) => void;
  isLoading: boolean;
}

export default function TransportForm({ onSubmit, isLoading }: TransportFormProps) {
  const [transport_type, setTransportType] = useState<TransportType>('car');
  const [distance_km, setDistanceKm] = useState('');
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [trip_date, setTripDate] = useState(new Date().toISOString().split('T')[0]);

  const transportOptions = [
    { value: 'car', label: 'Auto', Icon: Car },
    { value: 'electric_car', label: 'Auto Eléctrico', Icon: Zap },
    { value: 'bus', label: 'Autobús', Icon: Bus },
    { value: 'metro', label: 'Metro', Icon: Train },
    { value: 'train', label: 'Tren', Icon: Train },
    { value: 'motorcycle', label: 'Motocicleta', Icon: Bike },
    { value: 'bike', label: 'Bicicleta', Icon: Bike },
    { value: 'walk', label: 'Caminar', Icon: PersonStanding },
    { value: 'scooter', label: 'Scooter', Icon: Bike },
    { value: 'plane', label: 'Avión', Icon: Plane },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!distance_km || parseFloat(distance_km) <= 0) {
      alert('Ingresa una distancia válida');
      return;
    }
    onSubmit({
      transport_type,
      distance_km: parseFloat(distance_km),
      origin: origin || undefined,
      destination: destination || undefined,
      trip_date,
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Transporte */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Tipo de Transporte
          </label>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {transportOptions.map((option) => {
              const IconComponent = option.Icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setTransportType(option.value as TransportType)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    transport_type === option.value
                      ? 'border-green-600 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <IconComponent 
                    className={`w-8 h-8 mx-auto mb-2 ${
                      transport_type === option.value ? 'text-green-600' : 'text-gray-600'
                    }`}
                  />
                  <div className={`text-xs font-medium ${
                    transport_type === option.value ? 'text-green-900' : 'text-gray-700'
                  }`}>
                    {option.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Distancia */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Distancia (km)
          </label>
          <input
            type="number"
            step="0.1"
            value={distance_km}
            onChange={(e) => setDistanceKm(e.target.value)}
            placeholder="Ej: 15.5"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={trip_date}
            onChange={(e) => setTripDate(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Origen (Opcional) */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Origen (Opcional)
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="Ej: Casa"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Destino (Opcional) */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Destino (Opcional)
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            placeholder="Ej: Trabajo"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium 
                   hover:bg-green-700 active:bg-green-800 transition-colors 
                   disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
        >
          {isLoading ? 'Registrando...' : (
            <>
              <Check className="w-5 h-5" />
              Registrar Viaje
            </>
          )}
        </button>
      </form>
    </Card>
  );
}

export type { CreateTransportData as TransportFormData };
