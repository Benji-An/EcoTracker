/**
 * Register Screen - Pantalla de registro
 * @module screens/auth/RegisterScreen
 */
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthStackParamList } from '../../navigation/AuthNavigator';
import { useAuthStore } from '../../context/AuthContext';
import { Logo, Input, Button } from '../../components/common';
import { colors, spacing, typography, borderRadius } from '../../styles';
import { isValidEmail, isValidPassword, isValidUsername, passwordsMatch } from '../../utils';

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Register'>;

interface Props {
  navigation: RegisterScreenNavigationProp;
}

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const { register, error, isLoading, clearError } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    first_name: '',
    last_name: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.username.trim()) {
      newErrors.username = 'El usuario es requerido';
    } else if (!isValidUsername(formData.username)) {
      newErrors.username = 'Usuario inválido (3-20 caracteres, solo letras, números y _)';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El email es requerido';
    } else if (!isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'El nombre es requerido';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'El apellido es requerido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (!isValidPassword(formData.password)) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!formData.password_confirm) {
      newErrors.password_confirm = 'Confirma tu contraseña';
    } else if (!passwordsMatch(formData.password, formData.password_confirm)) {
      newErrors.password_confirm = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    clearError();

    try {
      await register(formData);
      // La navegación se maneja automáticamente por AppNavigator
      Alert.alert('¡Bienvenido!', '¡Tu cuenta ha sido creada exitosamente! 🌱');
    } catch (err) {
      Alert.alert(
        'Error',
        error || 'Error al registrarse. Intenta con otro usuario o email.'
      );
    }
  };

  const updateField = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Limpiar error del campo
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        {/* Header con Logo */}
        <View style={styles.header}>
          <Logo size="lg" showName />
          <Text style={styles.subtitle}>Únete a la comunidad eco-friendly</Text>
        </View>

        {/* Card de Register */}
        <View style={styles.card}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <View style={styles.tabs}>
              <View style={[styles.tabIndicator, { left: '50.5%' }]} />
              <TouchableOpacity
                style={styles.tabInactive}
                onPress={() => navigation.navigate('Login')}
              >
                <Text style={styles.tabTextInactive}>Iniciar Sesión</Text>
              </TouchableOpacity>
              <View style={styles.tabActive}>
                <Text style={styles.tabTextActive}>Registrarse</Text>
              </View>
            </View>
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Crear Cuenta</Text>
            <Text style={styles.welcomeSubtitle}>
              Completa los datos para comenzar
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Usuario"
              value={formData.username}
              onChangeText={(value) => updateField('username', value)}
              placeholder="Ej: juan_eco"
              autoCapitalize="none"
              error={errors.username}
              leftIcon={<Icon name="account-outline" size={20} color={colors.text.light} />}
            />

            <Input
              label="Email"
              value={formData.email}
              onChangeText={(value) => updateField('email', value)}
              placeholder="tu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              error={errors.email}
              leftIcon={<Icon name="email-outline" size={20} color={colors.text.light} />}
            />

            {/* Nombre y Apellido en fila */}
            <View style={styles.row}>
              <View style={styles.halfInput}>
                <Input
                  label="Nombre"
                  value={formData.first_name}
                  onChangeText={(value) => updateField('first_name', value)}
                  placeholder="Juan"
                  error={errors.first_name}
                  containerStyle={styles.inputNoMargin}
                />
              </View>
              <View style={styles.halfInput}>
                <Input
                  label="Apellido"
                  value={formData.last_name}
                  onChangeText={(value) => updateField('last_name', value)}
                  placeholder="Pérez"
                  error={errors.last_name}
                  containerStyle={styles.inputNoMargin}
                />
              </View>
            </View>

            <Input
              label="Contraseña"
              value={formData.password}
              onChangeText={(value) => updateField('password', value)}
              placeholder="Mínimo 8 caracteres"
              secureTextEntry={!showPassword}
              error={errors.password}
              leftIcon={<Icon name="lock-outline" size={20} color={colors.text.light} />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.text.light}
                  />
                </TouchableOpacity>
              }
            />

            <Input
              label="Confirmar Contraseña"
              value={formData.password_confirm}
              onChangeText={(value) => updateField('password_confirm', value)}
              placeholder="Repite tu contraseña"
              secureTextEntry={!showConfirmPassword}
              error={errors.password_confirm}
              leftIcon={<Icon name="lock-check-outline" size={20} color={colors.text.light} />}
              rightIcon={
                <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                  <Icon
                    name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={colors.text.light}
                  />
                </TouchableOpacity>
              }
            />

            <Button
              title="Crear Cuenta"
              onPress={handleRegister}
              loading={isLoading}
              fullWidth
              variant="primary"
              style={styles.registerButton}
            />
          </View>

          {/* Login Link */}
          <View style={styles.loginLink}>
            <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginTextBold}>Inicia Sesión</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    paddingVertical: spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  subtitle: {
    marginTop: spacing.sm,
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius['2xl'],
    padding: spacing.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  tabsContainer: {
    marginBottom: spacing.lg,
  },
  tabs: {
    position: 'relative',
    flexDirection: 'row',
    backgroundColor: colors.backgroundAlt,
    borderRadius: borderRadius.md,
    padding: spacing.xs,
  },
  tabIndicator: {
    position: 'absolute',
    top: spacing.xs,
    width: '48%',
    height: '80%',
    backgroundColor: colors.card,
    borderRadius: borderRadius.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  tabActive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    zIndex: 10,
  },
  tabInactive: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    zIndex: 10,
  },
  tabTextActive: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
  },
  tabTextInactive: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.medium,
    color: colors.text.secondary,
  },
  welcomeSection: {
    marginBottom: spacing.lg,
  },
  welcomeTitle: {
    fontSize: typography.fontSizes.xl,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  welcomeSubtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  form: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  halfInput: {
    flex: 1,
  },
  inputNoMargin: {
    marginBottom: 0,
  },
  registerButton: {
    marginTop: spacing.sm,
  },
  loginLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  loginText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  loginTextBold: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.primary,
  },
});

export default RegisterScreen;
