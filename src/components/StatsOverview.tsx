import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Utensils, Car, Calendar, Award } from 'lucide-react';
import { MealEntry, TripEntry } from './Dashboard';

interface StatsOverviewProps {
  meals: MealEntry[];
  trips: TripEntry[];
}

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

export function StatsOverview({ meals, trips }: StatsOverviewProps) {
  const totalMealsCO2 = meals.reduce((acc, meal) => acc + meal.co2, 0);
  const totalTripsCO2 = trips.reduce((acc, trip) => acc + trip.co2, 0);
  const totalCO2 = totalMealsCO2 + totalTripsCO2;

  // Data for pie chart
  const pieData = [
    { name: 'Comidas', value: totalMealsCO2 },
    { name: 'Viajes', value: totalTripsCO2 },
  ];

  // Data for weekly trend (last 7 days)
  const getLast7Days = () => {
    const days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      days.push(date.toISOString().split('T')[0]);
    }
    return days;
  };

  const weeklyData = getLast7Days().map(date => {
    const dayMeals = meals.filter(m => m.date.startsWith(date));
    const dayTrips = trips.filter(t => t.date.startsWith(date));
    const mealsCO2 = dayMeals.reduce((acc, m) => acc + m.co2, 0);
    const tripsCO2 = dayTrips.reduce((acc, t) => acc + t.co2, 0);
    
    return {
      date: new Date(date).toLocaleDateString('es-ES', { weekday: 'short' }),
      Comidas: Number(mealsCO2.toFixed(2)),
      Viajes: Number(tripsCO2.toFixed(2))
    };
  });

  // Achievement calculation
  const getAchievementLevel = () => {
    if (totalCO2 === 0) return 'Nuevo Usuario';
    if (totalCO2 <= 30) return 'Eco-Experto';
    if (totalCO2 <= 60) return 'Eco-Guerrero';
    if (totalCO2 <= 100) return 'Eco-Consciente';
    return 'Principiante';
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Total CO₂</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{totalCO2.toFixed(2)} kg</div>
            <p className="text-xs text-muted-foreground">Emisiones totales</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Comidas</CardTitle>
            <Utensils className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{meals.length}</div>
            <p className="text-xs text-muted-foreground">{totalMealsCO2.toFixed(2)} kg CO₂</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Viajes</CardTitle>
            <Car className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{trips.length}</div>
            <p className="text-xs text-muted-foreground">{totalTripsCO2.toFixed(2)} kg CO₂</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm">Nivel</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl">{getAchievementLevel()}</div>
            <p className="text-xs text-muted-foreground">Sigue así!</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Tendencia Semanal</CardTitle>
            <CardDescription>Emisiones de CO₂ en los últimos 7 días</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Comidas" fill="#10b981" />
                <Bar dataKey="Viajes" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Distribución de Emisiones</CardTitle>
            <CardDescription>Por categoría</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Tips Card */}
      <Card className="bg-green-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-green-800">💡 Consejos Eco-Friendly</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-green-900">• Opta por comidas vegetarianas 2-3 veces por semana para reducir tu huella de carbono</p>
          <p className="text-green-900">• Usa transporte público, bicicleta o camina cuando sea posible</p>
          <p className="text-green-900">• Un viaje en bicicleta de 10 km ahorra aproximadamente 1.9 kg de CO₂ comparado con el coche</p>
          <p className="text-green-900">• Planifica tus rutas para combinar varios destinos en un solo viaje</p>
        </CardContent>
      </Card>
    </div>
  );
}
