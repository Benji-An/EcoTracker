/**
 * MealForm - Formulario para registrar comidas con cálculo de CO2
 */
import { useState, useMemo } from 'react';
import { X, Check, Plus, Coffee, Sun, Moon, Apple } from 'lucide-react';
import { Card } from '../ui/card';
import { 
  INGREDIENTS, 
  calculateMealCO2, 
  getIngredient
} from '../../data/ingredients';
import type { MealType, CreateMealData } from '../../types';

interface MealFormProps {
  onSubmit: (data: CreateMealData) => void;
  isLoading: boolean;
}

interface MealIngredient {
  ingredientId: string;
  quantity: number; // en gramos o ml según el ingrediente
}

export default function MealForm({ onSubmit, isLoading }: MealFormProps) {
  const [meal_type, setMealType] = useState<MealType>('lunch');
  const [description, setDescription] = useState('');
  const [mealIngredients, setMealIngredients] = useState<MealIngredient[]>([]);
  const [meal_date, setMealDate] = useState(new Date().toISOString().split('T')[0]);
  
  const [selectedIngredientId, setSelectedIngredientId] = useState('');
  const [ingredientQuantity, setIngredientQuantity] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const mealOptions = [
    { value: 'breakfast', label: 'Desayuno', Icon: Coffee },
    { value: 'lunch', label: 'Almuerzo', Icon: Sun },
    { value: 'dinner', label: 'Cena', Icon: Moon },
    { value: 'snack', label: 'Snack', Icon: Apple },
  ];

  // Filtrar ingredientes por búsqueda
  const filteredIngredients = useMemo(() => {
    if (!searchTerm) return INGREDIENTS;
    const term = searchTerm.toLowerCase();
    return INGREDIENTS.filter(ing => 
      ing.name.toLowerCase().includes(term) ||
      ing.category.toLowerCase().includes(term)
    );
  }, [searchTerm]);

  // Calcular CO2 total de la comida
  const totalCO2 = useMemo(() => {
    return calculateMealCO2(mealIngredients);
  }, [mealIngredients]);

  const handleAddIngredient = () => {
    if (!selectedIngredientId || !ingredientQuantity) {
      alert('Selecciona un ingrediente y cantidad');
      return;
    }

    const quantity = parseFloat(ingredientQuantity);
    if (quantity <= 0) {
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    setMealIngredients([
      ...mealIngredients,
      { ingredientId: selectedIngredientId, quantity }
    ]);
    setSelectedIngredientId('');
    setIngredientQuantity('');
    setSearchTerm('');
  };

  const handleRemoveIngredient = (index: number) => {
    setMealIngredients(mealIngredients.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mealIngredients.length === 0) {
      alert('Agrega al menos un ingrediente');
      return;
    }

    // Convertir a formato esperado por el backend
    const ingredients: Record<string, number> = {};
    mealIngredients.forEach((ing) => {
      const ingredient = getIngredient(ing.ingredientId);
      if (ingredient) {
        // Convertir a kg para el backend
        ingredients[ingredient.name] = ing.quantity / 1000;
      }
    });

    onSubmit({
      meal_type,
      description,
      ingredients,
      meal_date,
    });
  };

  return (
    <Card>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Tipo de Comida */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-3">
            Tipo de Comida
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {mealOptions.map((option) => {
              const IconComponent = option.Icon;
              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setMealType(option.value as MealType)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    meal_type === option.value
                      ? 'border-green-600 bg-green-50 shadow-md'
                      : 'border-gray-200 bg-white hover:border-green-300 hover:bg-green-50'
                  }`}
                >
                  <IconComponent 
                    className={`w-8 h-8 mx-auto mb-2 ${
                      meal_type === option.value ? 'text-green-600' : 'text-gray-600'
                    }`}
                  />
                  <div className={`text-sm font-medium ${
                    meal_type === option.value ? 'text-green-900' : 'text-gray-700'
                  }`}>
                    {option.label}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Fecha */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Fecha
          </label>
          <input
            type="date"
            value={meal_date}
            onChange={(e) => setMealDate(e.target.value)}
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
          />
        </div>

        {/* Descripción */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Descripción
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Ej: Ensalada mixta con pollo"
            className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            required
          />
        </div>

        {/* Ingredientes */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-2">
            Ingredientes
          </label>
          
          {/* Buscador de ingredientes */}
          <div className="mb-3">
            <input
              type="text"
              placeholder="Buscar ingrediente..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-white border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Selector y cantidad */}
          <div className="flex gap-2 mb-3">
            <select
              value={selectedIngredientId}
              onChange={(e) => setSelectedIngredientId(e.target.value)}
              className="flex-1 px-4 py-2 bg-white border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="">Selecciona un ingrediente</option>
              {filteredIngredients.map((ing) => (
                <option key={ing.id} value={ing.id}>
                  {ing.name} ({ing.co2_per_kg} kg CO₂/kg)
                </option>
              ))}
            </select>
            <input
              type="number"
              placeholder="Cantidad"
              value={ingredientQuantity}
              onChange={(e) => setIngredientQuantity(e.target.value)}
              className="w-24 px-4 py-2 bg-white border border-gray-300 rounded-lg 
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <span className="flex items-center px-3 text-gray-600 text-sm">
              {selectedIngredientId && getIngredient(selectedIngredientId)?.unit || 'g'}
            </span>
            <button
              type="button"
              onClick={handleAddIngredient}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 
                       active:bg-green-800 transition-colors shadow-md"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          {/* Lista de Ingredientes Agregados */}
          <div className="space-y-2">
            {mealIngredients.map((ing, index) => {
              const ingredient = getIngredient(ing.ingredientId);
              const co2 = calculateMealCO2([ing]);
              return (
                <div
                  key={`${ing.ingredientId}-${index}`}
                  className="flex items-center justify-between bg-gray-100 px-4 py-3 rounded-lg border border-gray-200"
                >
                  <div className="flex-1">
                    <span className="text-gray-900 font-medium">
                      {ingredient?.name}
                    </span>
                    <span className="text-gray-600 ml-2">
                      - {ing.quantity}{ingredient?.unit}
                    </span>
                    <span className="text-green-600 ml-3 text-sm font-semibold">
                      {co2.toFixed(3)} kg CO₂
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          {/* CO2 Total */}
          {mealIngredients.length > 0 && (
            <div className="mt-4 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
              <div className="flex items-center justify-between">
                <span className="text-gray-700 font-medium">CO₂ Total de la comida:</span>
                <span className="text-green-600 text-xl font-bold">
                  {totalCO2.toFixed(3)} kg CO₂
                </span>
              </div>
            </div>
          )}
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
              Registrar Comida
            </>
          )}
        </button>
      </form>
    </Card>
  );
}

export type { MealType, CreateMealData as MealFormData };
