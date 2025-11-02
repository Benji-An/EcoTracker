/**
 * TransportList - Lista de transportes registrados
 */
import { Calendar, Trash2, Car, MapPin, Bus, Train, Bike, PersonStanding, Plane, Zap } from 'lucide-react';
import { Card } from '../ui/card';
import type { Transport } from '../../types';

interface TransportListProps {
  transports: Transport[];
  onDelete: (id: number) => void;
}

export default function TransportList({ transports, onDelete }: TransportListProps) {
  if (transports.length === 0) {
    return (
      <Card className="text-center py-12">
        <Car className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <p className="text-lg text-gray-600">
          No hay viajes registrados aún
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Registra tu primer viaje para empezar a hacer seguimiento
        </p>
      </Card>
    );
  }

  const getTransportIcon = (type: string) => {
    const icons: Record<string, any> = {
      car: Car,
      electric_car: Zap,
      bus: Bus,
      metro: Train,
      train: Train,
      motorcycle: Bike,
      bike: Bike,
      walk: PersonStanding,
      scooter: Bike,
      plane: Plane,
    };
    return icons[type] || Car;
  };

  return (
    <div className="space-y-4">
      {transports.map((transport) => {
        const IconComponent = getTransportIcon(transport.transport_type);
        return (
          <Card key={transport.id} padding="md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <IconComponent className="w-8 h-8 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {transport.transport_type_display}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(transport.trip_date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

              {/* Info */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">Distancia:</span>
                  <span className="text-sm text-muted-foreground">
                    {transport.distance_km.toFixed(1)} km
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-foreground">CO2:</span>
                  <span className="text-sm text-muted-foreground">
                    {transport.total_co2.toFixed(2)} kg
                  </span>
                </div>
              </div>

              {/* Route */}
              {(transport.origin || transport.destination) && (
                <div className="mt-3 flex items-center gap-2 p-3 bg-secondary rounded-lg">
                  <MapPin className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-foreground">
                    {transport.origin && transport.destination
                      ? `${transport.origin} → ${transport.destination}`
                      : transport.origin || transport.destination}
                  </span>
                </div>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => {
                if (confirm('¿Estás seguro de eliminar este viaje?')) {
                  onDelete(transport.id);
                }
              }}
              className="ml-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        </Card>
        );
      })}
    </div>
  );
}
