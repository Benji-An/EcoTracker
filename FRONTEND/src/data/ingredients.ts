/**
 * Factores de emisión de CO2 por ingrediente
 * Basado en estudios de Poore & Nemecek (2018) y bases de datos Ecoinvent
 * Valores en kg CO2 por kg de producto
 */

export interface Ingredient {
  id: string;
  name: string;
  category: 'carne' | 'pescado' | 'lacteos' | 'legumbres' | 'cereales' | 'verduras' | 'frutas' | 'otros';
  co2_per_kg: number; // kg CO2 por kg de producto
  unit: 'kg' | 'g' | 'unidad' | 'ml';
}

export const INGREDIENTS: Ingredient[] = [
  // CARNES (Alto impacto)
  { id: 'beef', name: 'Carne de res', category: 'carne', co2_per_kg: 27.0, unit: 'g' },
  { id: 'lamb', name: 'Cordero', category: 'carne', co2_per_kg: 39.2, unit: 'g' },
  { id: 'pork', name: 'Cerdo', category: 'carne', co2_per_kg: 12.1, unit: 'g' },
  { id: 'chicken', name: 'Pollo', category: 'carne', co2_per_kg: 6.9, unit: 'g' },
  { id: 'turkey', name: 'Pavo', category: 'carne', co2_per_kg: 10.9, unit: 'g' },

  // PESCADOS Y MARISCOS
  { id: 'salmon', name: 'Salmón (cultivado)', category: 'pescado', co2_per_kg: 11.9, unit: 'g' },
  { id: 'tuna', name: 'Atún', category: 'pescado', co2_per_kg: 6.1, unit: 'g' },
  { id: 'white_fish', name: 'Pescado blanco', category: 'pescado', co2_per_kg: 5.1, unit: 'g' },
  { id: 'shrimp', name: 'Camarón', category: 'pescado', co2_per_kg: 26.9, unit: 'g' },

  // LÁCTEOS
  { id: 'milk', name: 'Leche de vaca', category: 'lacteos', co2_per_kg: 3.2, unit: 'ml' },
  { id: 'cheese', name: 'Queso', category: 'lacteos', co2_per_kg: 23.9, unit: 'g' },
  { id: 'yogurt', name: 'Yogur', category: 'lacteos', co2_per_kg: 2.2, unit: 'g' },
  { id: 'butter', name: 'Mantequilla', category: 'lacteos', co2_per_kg: 23.8, unit: 'g' },
  { id: 'eggs', name: 'Huevos', category: 'lacteos', co2_per_kg: 4.8, unit: 'g' },

  // LEGUMBRES (Bajo impacto)
  { id: 'lentils', name: 'Lentejas', category: 'legumbres', co2_per_kg: 0.9, unit: 'g' },
  { id: 'chickpeas', name: 'Garbanzos', category: 'legumbres', co2_per_kg: 1.0, unit: 'g' },
  { id: 'beans', name: 'Frijoles', category: 'legumbres', co2_per_kg: 1.0, unit: 'g' },
  { id: 'peas', name: 'Guisantes', category: 'legumbres', co2_per_kg: 0.9, unit: 'g' },
  { id: 'tofu', name: 'Tofu', category: 'legumbres', co2_per_kg: 2.0, unit: 'g' },
  { id: 'soy_milk', name: 'Leche de soja', category: 'legumbres', co2_per_kg: 0.9, unit: 'ml' },

  // CEREALES Y GRANOS
  { id: 'rice', name: 'Arroz', category: 'cereales', co2_per_kg: 4.0, unit: 'g' },
  { id: 'wheat', name: 'Trigo/Pan', category: 'cereales', co2_per_kg: 1.6, unit: 'g' },
  { id: 'pasta', name: 'Pasta', category: 'cereales', co2_per_kg: 1.4, unit: 'g' },
  { id: 'oats', name: 'Avena', category: 'cereales', co2_per_kg: 2.5, unit: 'g' },
  { id: 'corn', name: 'Maíz', category: 'cereales', co2_per_kg: 1.1, unit: 'g' },

  // VERDURAS (Bajo-Medio impacto)
  { id: 'tomato', name: 'Tomate', category: 'verduras', co2_per_kg: 2.1, unit: 'g' },
  { id: 'potato', name: 'Papa', category: 'verduras', co2_per_kg: 0.5, unit: 'g' },
  { id: 'carrot', name: 'Zanahoria', category: 'verduras', co2_per_kg: 0.4, unit: 'g' },
  { id: 'onion', name: 'Cebolla', category: 'verduras', co2_per_kg: 0.4, unit: 'g' },
  { id: 'lettuce', name: 'Lechuga', category: 'verduras', co2_per_kg: 1.3, unit: 'g' },
  { id: 'broccoli', name: 'Brócoli', category: 'verduras', co2_per_kg: 2.0, unit: 'g' },
  { id: 'pepper', name: 'Pimiento', category: 'verduras', co2_per_kg: 2.5, unit: 'g' },
  { id: 'spinach', name: 'Espinaca', category: 'verduras', co2_per_kg: 2.0, unit: 'g' },
  { id: 'mushroom', name: 'Champiñones', category: 'verduras', co2_per_kg: 3.0, unit: 'g' },

  // FRUTAS
  { id: 'apple', name: 'Manzana', category: 'frutas', co2_per_kg: 0.4, unit: 'g' },
  { id: 'banana', name: 'Plátano', category: 'frutas', co2_per_kg: 0.7, unit: 'g' },
  { id: 'orange', name: 'Naranja', category: 'frutas', co2_per_kg: 0.4, unit: 'g' },
  { id: 'strawberry', name: 'Fresa', category: 'frutas', co2_per_kg: 1.0, unit: 'g' },
  { id: 'avocado', name: 'Aguacate', category: 'frutas', co2_per_kg: 2.5, unit: 'g' },

  // OTROS
  { id: 'olive_oil', name: 'Aceite de oliva', category: 'otros', co2_per_kg: 5.4, unit: 'ml' },
  { id: 'sugar', name: 'Azúcar', category: 'otros', co2_per_kg: 3.2, unit: 'g' },
  { id: 'chocolate', name: 'Chocolate', category: 'otros', co2_per_kg: 18.7, unit: 'g' },
  { id: 'coffee', name: 'Café', category: 'otros', co2_per_kg: 16.5, unit: 'g' },
  { id: 'wine', name: 'Vino', category: 'otros', co2_per_kg: 1.8, unit: 'ml' },
];

/**
 * Calcula el CO2 de un ingrediente basado en cantidad
 * @param ingredientId ID del ingrediente
 * @param quantity Cantidad en la unidad especificada por el ingrediente
 * @returns CO2 en kg
 */
export function calculateIngredientCO2(ingredientId: string, quantity: number): number {
  const ingredient = INGREDIENTS.find((ing) => ing.id === ingredientId);
  if (!ingredient) return 0;

  // Convertir cantidad a kg
  let quantityInKg = quantity;
  if (ingredient.unit === 'g') {
    quantityInKg = quantity / 1000;
  } else if (ingredient.unit === 'ml') {
    // Asumimos densidad ~1 para líquidos (1ml ≈ 1g)
    quantityInKg = quantity / 1000;
  }

  // CO2 = cantidad (kg) × factor de emisión (kg CO2/kg)
  return quantityInKg * ingredient.co2_per_kg;
}

/**
 * Calcula el CO2 total de una comida con múltiples ingredientes
 * @param ingredients Array de {ingredientId, quantity}
 * @returns CO2 total en kg
 */
export function calculateMealCO2(
  ingredients: Array<{ ingredientId: string; quantity: number }>
): number {
  return ingredients.reduce((total, ing) => {
    return total + calculateIngredientCO2(ing.ingredientId, ing.quantity);
  }, 0);
}

/**
 * Obtiene un ingrediente por ID
 */
export function getIngredient(id: string): Ingredient | undefined {
  return INGREDIENTS.find((ing) => ing.id === id);
}

/**
 * Obtiene ingredientes por categoría
 */
export function getIngredientsByCategory(category: string): Ingredient[] {
  return INGREDIENTS.filter((ing) => ing.category === category);
}
