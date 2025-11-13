/**
 * Meals Page - Gestión de comidas
 */
import { useState, useEffect } from 'react';
import { Plus, List, UtensilsCrossed, Info } from 'lucide-react';
import { mealsAPI } from '../api/meals';
import { useToast } from '../context/ToastContext';
import type { Meal } from '../types';

// Components
import Navbar from '../components/nav/Navbar';
import MealForm, { type MealFormData } from '../components/meals/MealForm';
import MealList from '../components/meals/MealList';
import IngredientInfo from '../components/meals/IngredientInfo';
import Button from '../components/ui/Button';

export default function Meals() {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const toast = useToast();

  useEffect(() => {
    loadMeals();
  }, []);

  const loadMeals = async () => {
    try {
      const response = await mealsAPI.list();
      setMeals(response.meals || []);
    } catch (error) {
      console.error('Error al cargar comidas:', error);
      setMeals([]);
      toast.error('Error al cargar el historial de comidas');
    }
  };

  const handleSubmit = async (formData: MealFormData) => {
    setIsLoading(true);
    try {
      await mealsAPI.create(formData);
      toast.success('¡Comida registrada exitosamente! 🍽️');
      setShowForm(false);
      loadMeals();
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Error al registrar comida');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await mealsAPI.delete(id);
      toast.success('Comida eliminada correctamente');
      loadMeals();
    } catch (error) {
      toast.error('Error al eliminar comida');
    }
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#e8f5e9' }}>
      <Navbar />

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
            <UtensilsCrossed className="w-8 h-8" />
            Comidas
          </h1>
          <p className="text-gray-600 mt-2">
            Registra tus comidas para calcular tu impacto en CO2
          </p>
        </div>

        {/* Toggle Buttons */}
        <div className="mb-6 flex gap-3">
          <Button onClick={() => { setShowForm(!showForm); setShowInfo(false); }}>
            {showForm ? (
              <>
                <List className="w-5 h-5" />
                Ver Historial
              </>
            ) : (
              <>
                <Plus className="w-5 h-5" />
                Agregar Comida
              </>
            )}
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => { setShowInfo(!showInfo); setShowForm(false); }}
          >
            <Info className="w-5 h-5" />
            {showInfo ? 'Ocultar Info' : 'Factores de CO₂'}
          </Button>
        </div>

        {/* Content */}
        {showInfo ? (
          <IngredientInfo />
        ) : showForm ? (
          <MealForm onSubmit={handleSubmit} isLoading={isLoading} />
        ) : (
          <MealList meals={meals} onDelete={handleDelete} />
        )}
      </div>
    </div>
  );
}
