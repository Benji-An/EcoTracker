/**
 * Formatters - Funciones para formatear datos
 * @module utils/formatters
 */

/**
 * Formatear número con decimales
 */
export const formatNumber = (value: number, decimals: number = 2): string => {
  return value.toFixed(decimals);
};

/**
 * Formatear CO2 con unidad
 */
export const formatCO2 = (co2: number): string => {
  if (co2 >= 1000) {
    return `${formatNumber(co2 / 1000, 2)} toneladas`;
  }
  return `${formatNumber(co2, 2)} kg`;
};

/**
 * Formatear fecha a formato local
 */
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Formatear fecha corta
 */
export const formatDateShort = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', {
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Formatear fecha para input
 */
export const formatDateForInput = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Obtener fecha de hoy en formato YYYY-MM-DD
 */
export const getTodayDate = (): string => {
  return formatDateForInput(new Date());
};

/**
 * Formatear distancia
 */
export const formatDistance = (km: number): string => {
  if (km < 1) {
    return `${Math.round(km * 1000)} m`;
  }
  return `${formatNumber(km, 1)} km`;
};

/**
 * Capitalizar primera letra
 */
export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Obtener iniciales de nombre
 */
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};
