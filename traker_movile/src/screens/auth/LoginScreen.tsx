/**
 * Login Screen - Pantalla de inicio de sesión
 * @module screens/auth/LoginScreen
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

type LoginScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList, 'Login'>;

interface Props {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const { login, error, isLoading, clearError } = useAuthStore();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Por favor completa todos los campos');
      return;
    }

    clearError();

    try {
      await login(username.trim(), password);
      // La navegación se maneja automáticamente por AppNavigator
    } catch (err) {
      Alert.alert(
        'Error',
        error || 'Usuario o contraseña incorrectos'
      );
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
      >
        {/* Header con Logo */}
        <View style={styles.header}>
          <Logo size="xl" showName />
          <Text style={styles.subtitle}>Monitorea tu huella de carbono</Text>
        </View>

        {/* Card de Login */}
        <View style={styles.card}>
          {/* Tabs */}
          <View style={styles.tabsContainer}>
            <View style={styles.tabs}>
              <View style={[styles.tabIndicator, { left: spacing.xs }]} />
              <View style={styles.tabActive}>
                <Text style={styles.tabTextActive}>Iniciar Sesión</Text>
              </View>
              <TouchableOpacity
                style={styles.tabInactive}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={styles.tabTextInactive}>Registrarse</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Welcome Text */}
          <View style={styles.welcomeSection}>
            <Text style={styles.welcomeTitle}>Bienvenido</Text>
            <Text style={styles.welcomeSubtitle}>
              Ingresa tus credenciales para continuar
            </Text>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <Input
              label="Usuario"
              value={username}
              onChangeText={setUsername}
              placeholder="Ingresa tu usuario"
              autoCapitalize="none"
              leftIcon={<Icon name="account-outline" size={20} color={colors.text.light} />}
            />

            <Input
              label="Contraseña"
              value={password}
              onChangeText={setPassword}
              placeholder="Ingresa tu contraseña"
              secureTextEntry={!showPassword}
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

            <Button
              title="Iniciar Sesión"
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              variant="primary"
              style={styles.loginButton}
            />
          </View>

          {/* Register Link */}
          <View style={styles.registerLink}>
            <Text style={styles.registerText}>¿No tienes cuenta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.registerTextBold}>Regístrate</Text>
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
  loginButton: {
    marginTop: spacing.sm,
  },
  registerLink: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.md,
  },
  registerText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
  },
  registerTextBold: {
    fontSize: typography.fontSizes.sm,
    fontWeight: typography.fontWeights.semibold,
    color: colors.primary,
  },
});

export default LoginScreen;
