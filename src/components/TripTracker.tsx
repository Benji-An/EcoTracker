import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Car } from 'lucide-react';
import { TripEntry } from './Dashboard';

interface TripTrackerProps {
  trips: TripEntry[];
  onAddTrip: (trip: TripEntry) => void;
}

const TRANSPORT_TYPES = {
  'coche': { label: 'Coche', co2PerKm: 0.192 },
  'bus': { label: 'Bus', co2PerKm: 0.089 },
  'metro': { label: 'Metro', co2PerKm: 0.041 },
  'tren': { label: 'Tren', co2PerKm: 0.041 },
  'bici': { label: 'Bicicleta', co2PerKm: 0 },
  'moto': { label: 'Motocicleta', co2PerKm: 0.103 },
};

export function TripTracker({ trips, onAddTrip }: TripTrackerProps) {
  const [transport, setTransport] = useState('');
  const [distance, setDistance] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!transport || !distance || parseFloat(distance) <= 0) return;

    const co2PerKm = TRANSPORT_TYPES[transport as keyof typeof TRANSPORT_TYPES].co2PerKm;
    const totalCO2 = co2PerKm * parseFloat(distance);
    
    onAddTrip({
      id: Date.now().toString(),
      transport: TRANSPORT_TYPES[transport as keyof typeof TRANSPORT_TYPES].label,
      transportKey: transport,
      distance: parseFloat(distance),
      co2: totalCO2,
      date: new Date().toISOString(),
    });

    setTransport('');
    setDistance('');
  };

  const totalTripsCO2 = trips.reduce((acc, trip) => acc + trip.co2, 0);
  const totalDistance = trips.reduce((acc, trip) => acc + trip.distance, 0);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5" />
            Registrar Viaje
          </CardTitle>
          <CardDescription>
            Registra tus viajes para calcular emisiones de CO₂
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="transport">Medio de Transporte</Label>
              <Select value={transport} onValueChange={setTransport}>
                <SelectTrigger id="transport">
                  <SelectValue placeholder="Selecciona el transporte" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(TRANSPORT_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label} ({value.co2PerKm} kg CO₂/km)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="distance">Distancia (km)</Label>
              <Input
                id="distance"
                type="number"
                step="0.1"
                min="0"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                placeholder="Ej: 15.5"
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Viaje
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Viajes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-blue-600">{totalTripsCO2.toFixed(2)} kg CO₂</div>
            <p className="text-muted-foreground">
              {trips.length} viajes • {totalDistance.toFixed(1)} km recorridos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {trips.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No hay viajes registrados aún
                </p>
              ) : (
                trips.slice().reverse().map((trip) => (
                  <div key={trip.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p>{trip.transport}</p>
                      <span className="text-blue-600">{trip.co2.toFixed(2)} kg</span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {trip.distance} km
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(trip.date).toLocaleDateString('es-ES')}
                    </p>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
