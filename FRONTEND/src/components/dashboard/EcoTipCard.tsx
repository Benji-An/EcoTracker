/**
 * EcoTipCard - Componente para mostrar eco tips aleatorios
 */
import { useEffect, useState } from 'react';
import { 
  Leaf, ShoppingBasket, ChefHat, Apple, Footprints, Bike, Users, Bus, 
  MapPin, Wrench, Lightbulb, Zap, Power, Sun, Thermometer, Wind, 
  Droplet, Timer, Recycle, Waves, Trash2, ShoppingBag, Ban, Sprout, 
  Package, Settings, Heart, BookOpen, Store, BarChart, RefreshCw 
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { getRandomEcoTip, type EcoTip } from '../../api/dashboard';
import { useToast } from '../../context/ToastContext';

// Mapeo de iconos
const iconMap: Record<string, any> = {
  Leaf, ShoppingBasket, ChefHat, Apple, Refrigerator: Package,
  FootPrints: Footprints, Bike, Users, Bus, MapPin, Wrench,
  Lightbulb, Zap, Power, Sun, Thermometer, Wind,
  Droplet, Timer, Recycle, Waves,
  Trash2, ShoppingBag, Ban, Sprout, Package, Tool: Settings,
  Heart, BookOpen, Store, BarChart
};

const categoryColors: Record<string, { bg: string; text: string; icon: string }> = {
  meals: { bg: 'bg-green-50', text: 'text-green-700', icon: 'text-green-600' },
  transport: { bg: 'bg-blue-50', text: 'text-blue-700', icon: 'text-blue-600' },
  energy: { bg: 'bg-yellow-50', text: 'text-yellow-700', icon: 'text-yellow-600' },
  water: { bg: 'bg-cyan-50', text: 'text-cyan-700', icon: 'text-cyan-600' },
  waste: { bg: 'bg-orange-50', text: 'text-orange-700', icon: 'text-orange-600' },
  general: { bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'text-emerald-600' },
};

const categoryLabels: Record<string, string> = {
  meals: 'Comidas',
  transport: 'Transporte',
  energy: 'Energía',
  water: 'Agua',
  waste: 'Residuos',
  general: 'General',
};

export default function EcoTipCard() {
  const [tip, setTip] = useState<EcoTip | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const loadTip = async () => {
    setIsLoading(true);
    try {
      const data = await getRandomEcoTip();
      setTip(data);
    } catch (error) {
      console.error('Error loading eco tip:', error);
      toast.error('Error al cargar el eco tip');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTip();
  }, []);

  if (!tip) {
    return null;
  }

  const colors = categoryColors[tip.category] || categoryColors.general;
  const IconComponent = iconMap[tip.icon] || Leaf;

  return (
    <Card className={`${colors.bg} border-2 border-${tip.category === 'meals' ? 'green' : tip.category === 'transport' ? 'blue' : tip.category === 'energy' ? 'yellow' : tip.category === 'water' ? 'cyan' : tip.category === 'waste' ? 'orange' : 'emerald'}-200`}>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <IconComponent className={`w-6 h-6 ${colors.icon}`} />
            <span className={colors.text}>Eco Tip del Día</span>
          </div>
          <button
            onClick={loadTip}
            disabled={isLoading}
            className={`p-2 rounded-lg hover:bg-white/50 transition-colors ${isLoading ? 'animate-spin' : ''}`}
            title="Obtener nuevo tip"
          >
            <RefreshCw className={`w-5 h-5 ${colors.icon}`} />
          </button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* Categoría */}
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${colors.text} bg-white/50`}>
            {categoryLabels[tip.category]}
          </span>
          
          {/* Título */}
          <h3 className={`text-xl font-bold ${colors.text}`}>
            {tip.title}
          </h3>
          
          {/* Descripción */}
          <p className="text-gray-700 leading-relaxed">
            {tip.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
