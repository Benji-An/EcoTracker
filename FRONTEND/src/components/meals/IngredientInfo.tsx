/**
 * IngredientInfo - Componente para mostrar información de ingredientes
 */
import { Leaf, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { INGREDIENTS } from '../../data/ingredients';

export default function IngredientInfo() {
  // Agrupar por categoría
  const categories = {
    carne: INGREDIENTS.filter(i => i.category === 'carne'),
    pescado: INGREDIENTS.filter(i => i.category === 'pescado'),
    lacteos: INGREDIENTS.filter(i => i.category === 'lacteos'),
    legumbres: INGREDIENTS.filter(i => i.category === 'legumbres'),
    cereales: INGREDIENTS.filter(i => i.category === 'cereales'),
    verduras: INGREDIENTS.filter(i => i.category === 'verduras'),
    frutas: INGREDIENTS.filter(i => i.category === 'frutas'),
    otros: INGREDIENTS.filter(i => i.category === 'otros'),
  };

  const categoryNames = {
    carne: 'Carnes',
    pescado: 'Pescados y Mariscos',
    lacteos: 'Lácteos y Huevos',
    legumbres: 'Legumbres',
    cereales: 'Cereales y Granos',
    verduras: 'Verduras',
    frutas: 'Frutas',
    otros: 'Otros',
  };

  const getImpactLevel = (co2: number) => {
    if (co2 < 2) return { level: 'Bajo', color: 'text-green-600', Icon: TrendingDown };
    if (co2 < 10) return { level: 'Medio', color: 'text-yellow-600', Icon: Leaf };
    return { level: 'Alto', color: 'text-red-600', Icon: TrendingUp };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Leaf className="w-5 h-5 text-green-600" />
          Factores de Emisión de CO₂
        </CardTitle>
        <p className="text-sm text-gray-600 mt-2">
          Valores aproximados basados en estudios de Poore & Nemecek (2018) y bases de datos Ecoinvent
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(categories).map(([key, items]) => (
            <div key={key}>
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                {categoryNames[key as keyof typeof categoryNames]}
                <span className="text-sm text-gray-500">
                  ({items.length} ingredientes)
                </span>
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {items.map((ingredient) => {
                  const impact = getImpactLevel(ingredient.co2_per_kg);
                  const ImpactIcon = impact.Icon;
                  return (
                    <div
                      key={ingredient.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200"
                    >
                      <div className="flex-1">
                        <span className="text-gray-900 font-medium">
                          {ingredient.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700 font-semibold">
                          {ingredient.co2_per_kg.toFixed(1)} kg CO₂/kg
                        </span>
                        <ImpactIcon className={`w-4 h-4 ${impact.color}`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Leyenda */}
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h4 className="font-semibold text-gray-900 mb-2">Niveles de Impacto:</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-green-600" />
              <span className="text-gray-700">
                <strong className="text-green-600">Bajo:</strong> {'<'} 2 kg CO₂/kg
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-yellow-600" />
              <span className="text-gray-700">
                <strong className="text-yellow-600">Medio:</strong> 2-10 kg CO₂/kg
              </span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-red-600" />
              <span className="text-gray-700">
                <strong className="text-red-600">Alto:</strong> {'>'} 10 kg CO₂/kg
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
