import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Plus, Utensils } from 'lucide-react';
import { MealEntry } from './Dashboard';

interface MealTrackerProps {
  meals: MealEntry[];
  onAddMeal: (meal: MealEntry) => void;
}

const MEAL_TYPES = {
  'carne-res': { label: 'Carne de Res', co2: 27 },
  'carne-cerdo': { label: 'Carne de Cerdo', co2: 12 },
  'pollo': { label: 'Pollo', co2: 6.9 },
  'pescado': { label: 'Pescado', co2: 6.1 },
  'vegetariana': { label: 'Vegetariana', co2: 2 },
  'vegana': { label: 'Vegana', co2: 1.5 },
};

export function MealTracker({ meals, onAddMeal }: MealTrackerProps) {
  const [mealType, setMealType] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!mealType || !description) return;

    const co2 = MEAL_TYPES[mealType as keyof typeof MEAL_TYPES].co2;
    
    onAddMeal({
      id: Date.now().toString(),
      type: MEAL_TYPES[mealType as keyof typeof MEAL_TYPES].label,
      description,
      co2,
      date: new Date().toISOString()
    });

    setMealType('');
    setDescription('');
  };

  const totalMealsCO2 = meals.reduce((acc, meal) => acc + meal.co2, 0);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="w-5 h-5" />
            Registrar Comida
          </CardTitle>
          <CardDescription>
            Registra tus comidas para calcular el impacto en CO₂
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="meal-type">Tipo de Comida</Label>
              <Select value={mealType} onValueChange={setMealType}>
                <SelectTrigger id="meal-type">
                  <SelectValue placeholder="Selecciona el tipo" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(MEAL_TYPES).map(([key, value]) => (
                    <SelectItem key={key} value={key}>
                      {value.label} ({value.co2} kg CO₂)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descripción</Label>
              <Input
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Almuerzo en casa"
              />
            </div>

            <Button type="submit" className="w-full">
              <Plus className="w-4 h-4 mr-2" />
              Agregar Comida
            </Button>
          </form>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Comidas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl text-green-600">{totalMealsCO2.toFixed(2)} kg CO₂</div>
            <p className="text-muted-foreground">{meals.length} comidas registradas</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial Reciente</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {meals.length === 0 ? (
                <p className="text-muted-foreground text-center py-4">
                  No hay comidas registradas aún
                </p>
              ) : (
                meals.slice().reverse().map((meal) => (
                  <div key={meal.id} className="p-3 bg-muted rounded-lg">
                    <div className="flex justify-between items-start mb-1">
                      <p>{meal.type}</p>
                      <span className="text-green-600">{meal.co2} kg</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{meal.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(meal.date).toLocaleDateString('es-ES')}
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
