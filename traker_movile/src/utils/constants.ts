/**
 * Constants - Valores constantes de la aplicación
 * @module utils/constants
 */

export const API_BASE_URL = 'http://127.0.0.1:8000/api';

// Para emulador Android usar: http://10.0.2.2:8000/api
// Para dispositivo físico usar tu IP local: http://192.168.x.x:8000/api

export const MEAL_TYPES = {
  breakfast: 'Desayuno',
  lunch: 'Almuerzo',
  dinner: 'Cena',
  snack: 'Snack',
};

export const TRANSPORT_TYPES = {
  car: 'Auto',
  electric_car: 'Auto Eléctrico',
  bus: 'Autobús',
  metro: 'Metro',
  train: 'Tren',
  motorcycle: 'Moto',
  bike: 'Bicicleta',
  walk: 'Caminar',
  scooter: 'Scooter',
  plane: 'Avión',
};

export const CO2_RATINGS = {
  excellent: { max: 3, label: 'Excelente', color: '#10b981' },
  good: { max: 5, label: 'Bueno', color: '#84cc16' },
  average: { max: 8, label: 'Promedio', color: '#f59e0b' },
  high: { max: Infinity, label: 'Alto', color: '#ef4444' },
};

export const POINTS_CONFIG = {
  MEAL_ADDED: 10,
  TRANSPORT_ADDED: 10,
  VEGETARIAN_MEAL: 20,
  VEGAN_MEAL: 30,
  ECO_TRANSPORT: 30,
  DAILY_GOAL: 50,
  WEEKLY_GOAL: 200,
  LOW_CO2_DAY: 100,
};

export const LEVELS_CONFIG = {
  POINTS_PER_LEVEL: 1000,
};

export default {
  API_BASE_URL,
  MEAL_TYPES,
  TRANSPORT_TYPES,
  CO2_RATINGS,
  POINTS_CONFIG,
  LEVELS_CONFIG,
};
