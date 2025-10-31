import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { LogOut, Leaf, TrendingDown } from 'lucide-react';
import { MealTracker } from './MealTracker';
import { TripTracker } from './TripTracker';
import { StatsOverview } from './StatsOverview';

interface DashboardProps {
  username: string;
  onLogout: () => void;
}

export interface MealEntry {
  id: string;
  type: string;
  description: string;
  co2: number;
  date: string;
}

export interface TripEntry {
  id: string;
  transport: string;
  transportKey?: string;
  distance: number;
  co2: number;
  date: string;
}

export function Dashboard({ username, onLogout }: DashboardProps) {
  const [meals, setMeals] = useState<MealEntry[]>([]);
  const [trips, setTrips] = useState<TripEntry[]>([]);
  useEffect(() => {
    // Cargar comidas desde localStorage (mantener comportamiento existente)
    const storedMeals = localStorage.getItem(`ecotracker_meals_${username}`);
    if (storedMeals) setMeals(JSON.parse(storedMeals));

    // Cargar viajes desde backend
  const token = localStorage.getItem('ecotracker_token');
  const API = (import.meta as any).env?.VITE_API_URL || 'http://127.0.0.1:8000';
    if (!token) return;

    fetch(`${API}/trips`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('No se pudieron obtener los viajes');
        return res.json();
      })
      .then((data) => {
        // mapear al formato TripEntry usado en el frontend
        const remoteTrips: TripEntry[] = data.map((t: any) => ({
          id: String(t.id),
          transport: t.title || (t.transport ? t.transport : 'Viaje'),
          transportKey: t.transport || undefined,
          distance: t.distance_km || 0,
          co2: t.co2 || 0,
          date: t.start ? new Date(t.start).toISOString() : new Date().toISOString(),
        }));
        setTrips(remoteTrips);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [username]);

  const addMeal = (meal: MealEntry) => {
    const newMeals = [...meals, meal];
    setMeals(newMeals);
    localStorage.setItem(`ecotracker_meals_${username}`, JSON.stringify(newMeals));
  };

  const addTrip = (trip: TripEntry) => {
    // Enviar al backend y luego actualizar estado local con el id devuelto
    const token = localStorage.getItem('ecotracker_token');
  const API = (import.meta as any).env?.VITE_API_URL || 'http://127.0.0.1:8000';
    if (!token) {
      // fallback local
      const newTrips = [...trips, trip];
      setTrips(newTrips);
      localStorage.setItem(`ecotracker_trips_${username}`, JSON.stringify(newTrips));
      return;
    }

  const form = new FormData();
  // send transport key so backend can compute CO2
  form.append('transport', (trip.transportKey ?? trip.transport) as string);
  if (trip.transport) form.append('title', trip.transport);
    form.append('start', trip.date);
    form.append('end', trip.date);
    form.append('distance_km', String(trip.distance));
    form.append('notes', trip.transport);

    fetch(`${API}/trips`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: form,
    })
      .then(async (res) => {
        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || 'Error al crear viaje');
        }
        return res.json();
      })
      .then((created) => {
        const newTrip: TripEntry = {
          ...trip,
          id: String(created.id),
          transport: created.title || created.transport || trip.transport,
          transportKey: created.transport || trip.transportKey,
          co2: created.co2 || trip.co2,
        };
        const newTrips = [...trips, newTrip];
        setTrips(newTrips);
        localStorage.setItem(`ecotracker_trips_${username}`, JSON.stringify(newTrips));
      })
      .catch((err) => {
        console.error(err);
        // fallback local
        const newTrips = [...trips, trip];
        setTrips(newTrips);
        localStorage.setItem(`ecotracker_trips_${username}`, JSON.stringify(newTrips));
      });
  };

  const totalCO2 = meals.reduce((acc: number, m: MealEntry) => acc + m.co2, 0) + trips.reduce((acc: number, t: TripEntry) => acc + t.co2, 0);

  return (
    <div className="size-full overflow-auto">
      <div className="min-h-full">
        {/* Header */}
        <header className="bg-white border-b border-border sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-green-800">EcoTracker</h1>
                <p className="text-sm text-muted-foreground">Hola, {username}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Salir
            </Button>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 py-8">
          {/* CO2 Summary Card */}
          <Card className="mb-8 bg-gradient-to-r from-green-500 to-emerald-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <TrendingDown className="w-6 h-6" />
                Tu Huella de Carbono
              </CardTitle>
              <CardDescription className="text-green-50">
                Emisiones totales acumuladas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-5xl mb-2">{totalCO2.toFixed(2)} kg</div>
              <p className="text-green-100">CO₂ equivalente</p>
            </CardContent>
          </Card>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Resumen</TabsTrigger>
              <TabsTrigger value="meals">Comidas</TabsTrigger>
              <TabsTrigger value="trips">Viajes</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <StatsOverview meals={meals} trips={trips} />
            </TabsContent>

            <TabsContent value="meals">
              <MealTracker meals={meals} onAddMeal={addMeal} />
            </TabsContent>

            <TabsContent value="trips">
              <TripTracker trips={trips} onAddTrip={addTrip} />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}
