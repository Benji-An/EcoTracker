import { Calendar, Trash2, Leaf, Salad, UtensilsCrossed } from 'lucide-react';
import { Card } from '../ui/card';
import type { Meal } from '../../types';

interface MealListProps {
  meals: Meal[];
  onDelete: (id: number) => void;
}

export default function MealList({ meals, onDelete }: MealListProps) {
  if (meals.length === 0) {
    return (
      <Card className="text-center py-12">
        <UtensilsCrossed className="w-16 h-16 mx-auto text-gray-600 mb-4" />
        <p className="text-lg text-gray-600">
          No hay comidas registradas aún
        </p>
        <p className="text-sm text-gray-600 mt-2">
          Registra tu primera comida para empezar a hacer seguimiento
        </p>
      </Card>
    );
  }

  const getMealIcon = (meal: string) => {
    const icons: Record<string, any> = {
      breakfast: UtensilsCrossed,
      lunch: UtensilsCrossed,
      dinner: UtensilsCrossed,
      snack: UtensilsCrossed,
    };
    return icons[meal] || UtensilsCrossed;
  };

  return (
    <div className="space-y-4">
      {meals.map((meal) => {
        const IconComponent = getMealIcon(meal.meal_type);
        return (
          <Card key={meal.id} padding="md">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {/* Header */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <IconComponent className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {meal.meal_type_display}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      {new Date(meal.meal_date).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-900 mb-3">{meal.description}</p>

              {/* Info */}
              <div className="space-y-2 mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-900">CO2:</span>
                  <span className="text-sm text-gray-600">
                    {meal.total_co2.toFixed(2)} kg
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {meal.is_vegan && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                      <Leaf className="w-4 h-4" />
                      Vegana
                    </span>
                  )}
                  {meal.is_vegetarian && !meal.is_vegan && (
                    <span className="flex items-center gap-1 px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm font-medium">
                      <Salad className="w-4 h-4" />
                      Vegetariana
                    </span>
                  )}
                </div>
              </div>

              {/* Ingredientes */}
              {meal.ingredients && Object.keys(meal.ingredients).length > 0 && (
                <div className="mt-3">
                  <p className="text-sm font-medium text-foreground mb-2">
                    Ingredientes:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(meal.ingredients).map(([name, quantity]) => (
                      <span
                        key={name}
                        className="px-3 py-1 bg-secondary text-secondary-foreground rounded-lg text-sm"
                      >
                        {name}: {(quantity * 1000).toFixed(0)}g
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Delete Button */}
            <button
              onClick={() => {
                if (confirm('¿Estás seguro de eliminar esta comida?')) {
                  onDelete(meal.id);
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