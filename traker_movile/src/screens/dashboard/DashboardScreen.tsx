/**
 * Dashboard Screen - Pantalla principal con estadísticas
 * @module screens/dashboard/DashboardScreen
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, RefreshControl, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useAuthStore } from '../../context/AuthContext';
import { dashboardAPI, type DashboardStatsResponse } from '../../api/dashboard.api';
import { Logo, LoadingSpinner } from '../../components/common';
import { CO2HeroCard, QuickActionCard, EcoTipCard, StatCard } from '../../components/dashboard';
import { colors, spacing, typography } from '../../styles';

const DashboardScreen: React.FC = () => {
  const { user } = useAuthStore();
  const navigation = useNavigation();
  const [stats, setStats] = useState<DashboardStatsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async (isRefreshing = false) => {
    try {
      if (!isRefreshing) setLoading(true);
      const data = await dashboardAPI.getStats();
      setStats(data);
    } catch (error) {
      console.error('Error loading stats:', error);
      Alert.alert('Error', 'No se pudieron cargar las estadísticas');
    } finally {
      setLoading(false);
      if (isRefreshing) setRefreshing(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    loadStats(true);
  };

  if (loading && !refreshing) {
    return <LoadingSpinner message="Cargando estadísticas..." />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={[colors.primary]} />
        }
      >
        {/* Header */}
        <View style={styles.header}>
          <Logo size="sm" />
          <View style={styles.userInfo}>
            <Text style={styles.greeting}>Hola, {user?.first_name || user?.username}!</Text>
            <Text style={styles.subtitle}>¿Cómo está tu día eco-friendly?</Text>
          </View>
        </View>

        {/* CO2 Hero Card */}
        <CO2HeroCard
          totalCO2={stats?.summary.total_co2 || 0}
          todayCO2={stats?.summary.today_co2 || 0}
          points={stats?.summary.total_points || 0}
          level={stats?.summary.level || 1}
          streakDays={stats?.summary.streak_days || 0}
        />

        {/* Quick Actions Grid */}
        <View style={styles.quickActions}>
          <QuickActionCard
            title="Comidas"
            description="Registra tus comidas"
            icon="silverware-fork-knife"
            color={colors.success}
            onPress={() => navigation.navigate('Meals' as never)}
          />
          <QuickActionCard
            title="Transporte"
            description="Registra tus viajes"
            icon="car"
            color={colors.info}
            onPress={() => navigation.navigate('Transport' as never)}
          />
          <QuickActionCard
            title="Social"
            description="Comparte progreso"
            icon="account-group"
            color="#9333ea"
            onPress={() => navigation.navigate('Social' as never)}
          />
          <QuickActionCard
            title="Perfil"
            description="Ver tu perfil"
            icon="account-circle"
            color={colors.warning}
            onPress={() => navigation.navigate('Profile' as never)}
          />
        </View>

        {/* Stats Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Resumen de Actividad</Text>
        </View>
        <View style={styles.statsGrid}>
          <View style={styles.statRow}>
            <StatCard
              icon="food-apple"
              label="Comidas"
              value={stats?.summary.total_meals || 0}
              color={colors.success}
            />
          </View>
          <View style={styles.statRow}>
            <StatCard
              icon="car"
              label="Viajes"
              value={stats?.summary.total_transports || 0}
              color={colors.info}
            />
          </View>
          <View style={styles.statRow}>
            <StatCard
              icon="leaf"
              label="Veganas"
              value={stats?.summary.vegan_meals || 0}
              color={colors.primary}
            />
          </View>
          <View style={styles.statRow}>
            <StatCard
              icon="sprout"
              label="Vegetarianas"
              value={stats?.summary.vegetarian_meals || 0}
              color="#84cc16"
            />
          </View>
        </View>

        {/* Eco Tip */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>💡 Consejo del Día</Text>
        </View>
        <EcoTipCard />

        {/* Placeholder for Charts */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>📊 Próximamente</Text>
        </View>
        <View style={styles.placeholder}>
          <Text style={styles.placeholderText}>Gráficos de emisiones</Text>
          <Text style={styles.placeholderSubtext}>Visualiza tu progreso con gráficos detallados</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    padding: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  greeting: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  sectionHeader: {
    marginVertical: spacing.md,
  },
  sectionTitle: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: colors.text.primary,
  },
  statsGrid: {
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statRow: {
    width: '100%',
  },
  placeholder: {
    backgroundColor: colors.card,
    borderRadius: 16,
    padding: spacing.xl,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
  },
  placeholderText: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  placeholderSubtext: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.light,
    textAlign: 'center',
  },
});

export default DashboardScreen;
