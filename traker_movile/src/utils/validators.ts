/**
 * Validators - Funciones de validación
 * @module utils/validators
 */

/**
 * Validar email
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validar contraseña (mínimo 8 caracteres)
 */
export const isValidPassword = (password: string): boolean => {
  return password.length >= 8;
};

/**
 * Validar username (solo letras, números y guiones bajos)
 */
export const isValidUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
  return usernameRegex.test(username);
};

/**
 * Validar número positivo
 */
export const isPositiveNumber = (value: number): boolean => {
  return !isNaN(value) && value > 0;
};

/**
 * Validar campo requerido
 */
export const isRequired = (value: string): boolean => {
  return value.trim().length > 0;
};

/**
 * Comparar contraseñas
 */
export const passwordsMatch = (password: string, confirm: string): boolean => {
  return password === confirm;
};
