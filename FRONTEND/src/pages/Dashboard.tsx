/**
 * Dashboard Page - Vista principal del usuario
 */
import { useState, useEffect } from 'react';
import { useAuthStore } from '../context/AuthContext';
import { getDashboardStats, type DashboardStats } from '../api/dashboard';
import { Utensils, Car, Users, TrendingUp, Leaf } from 'lucide-react';

// Components
import Navbar from '../components/nav/Navbar';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import QuickActionCard from '../components/dashboard/QuickActionCard';
import CO2LineChart from '../components/dashboard/CO2LineChart';
import MealsPieChart from '../components/dashboard/MealsPieChart';
import TransportBarChart from '../components/dashboard/TransportBarChart';
import EcoTipCard from '../components/dashboard/EcoTipCard';

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await getDashboardStats();
      setStats(data);
      setError('');
    } catch (err) {
      setError('Error al cargar estadísticas');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-xl text-gray-600">Cargando estadísticas...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex items-center justify-center h-[calc(100vh-80px)]">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  const pieData = stats?.charts.meals_by_type
    ? [
        { name: 'Veganas', value: stats.charts.meals_by_type.veganas },
        { name: 'Vegetarianas', value: stats.charts.meals_by_type.vegetarianas },
        { name: 'Omnívoras', value: stats.charts.meals_by_type.omnívoras },
      ]
    : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Carbon Footprint Hero Section */}
        <div className="mb-8">
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-3 mb-4">
              <Leaf className="w-8 h-8 text-white" />
              <h2 className="text-2xl font-bold text-white">Tu Huella de Carbono</h2>
            </div>
            <p className="text-green-50 mb-6 text-sm">
              Emisiones totales acumuladas
            </p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-7xl font-bold text-white">
                {stats?.summary.total_co2 ? stats.summary.total_co2.toFixed(2) : '0.00'}
              </span>
              <span className="text-3xl font-semibold text-green-50">kg</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-green-400/30">
              <div>
                <p className="text-green-100 text-sm mb-1">Hoy</p>
                <p className="text-white text-2xl font-bold">
                  {stats?.summary.today_co2 ? stats.summary.today_co2.toFixed(2) : '0.00'} kg
                </p>
              </div>
              <div>
                <p className="text-green-100 text-sm mb-1">Puntos</p>
                <p className="text-white text-2xl font-bold">
                  {stats?.summary.total_points || 0}
                </p>
              </div>
              <div>
                <p className="text-green-100 text-sm mb-1">Nivel</p>
                <p className="text-white text-2xl font-bold">
                  {stats?.summary.level || 1}
                </p>
              </div>
              <div>
                <p className="text-green-100 text-sm mb-1">Racha</p>
                <p className="text-white text-2xl font-bold">
                  {stats?.summary.streak_days || 0} días
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <QuickActionCard
            title="Comidas"
            description="Registra tus comidas"
            icon={Utensils}
            to="/meals"
            color="green"
          />
          <QuickActionCard
            title="Transporte"
            description="Registra tus viajes"
            icon={Car}
            to="/transport"
            color="blue"
          />
          <QuickActionCard
            title="Social"
            description="Comparte tu progreso"
            icon={Users}
            to="/social"
            color="purple"
          />
          <QuickActionCard
            title="Estadísticas"
            description="Ver análisis detallado"
            icon={TrendingUp}
            to="/stats"
            color="orange"
          />
        </div>

        {/* Eco Tip del Día */}
        <div className="mb-6">
          <EcoTipCard />
        </div>

        {/* Charts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Emisiones de CO2</CardTitle>
            </CardHeader>
            <CardContent>
              <CO2LineChart data={stats?.charts.co2_by_day || []} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Distribución de Comidas</CardTitle>
            </CardHeader>
            <CardContent>
              <MealsPieChart data={pieData} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Transporte por Tipo</CardTitle>
            </CardHeader>
            <CardContent>
              <TransportBarChart 
                data={stats?.charts.transports_by_type.map(t => ({ 
                  name: t.type, 
                  value: t.count 
                })) || []} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
