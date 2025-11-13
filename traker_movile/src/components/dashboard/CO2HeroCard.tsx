/**
 * CO2HeroCard Component - Tarjeta hero de CO2
 * @module components/dashboard/CO2HeroCard
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles';

interface CO2HeroCardProps {
  totalCO2: number;
  todayCO2: number;
  points: number;
  level: number;
  streakDays: number;
}

const CO2HeroCard: React.FC<CO2HeroCardProps> = ({
  totalCO2,
  todayCO2,
  points,
  level,
  streakDays,
}) => {
  return (
    <View style={[styles.card, shadows.lg]}>
      {/* Simulamos gradient con un View con backgroundColor */}
      <View style={styles.gradient}>
        <View style={styles.header}>
          <Icon name="leaf" size={32} color="#fff" />
          <Text style={styles.title}>Tu Huella de Carbono</Text>
        </View>
        
        <Text style={styles.subtitle}>Emisiones totales acumuladas</Text>
        
        <View style={styles.mainValue}>
          <Text style={styles.co2Value}>{totalCO2.toFixed(2)}</Text>
          <Text style={styles.co2Unit}>kg</Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Hoy</Text>
            <Text style={styles.statValue}>{todayCO2.toFixed(2)} kg</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Puntos</Text>
            <Text style={styles.statValue}>{points}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Nivel</Text>
            <Text style={styles.statValue}>{level}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Racha</Text>
            <Text style={styles.statValue}>{streakDays} días</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: borderRadius['2xl'],
    overflow: 'hidden',
    marginBottom: spacing.lg,
  },
  gradient: {
    backgroundColor: colors.primary,
    padding: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  title: {
    fontSize: typography.fontSizes['2xl'],
    fontWeight: typography.fontWeights.bold,
    color: '#fff',
  },
  subtitle: {
    fontSize: typography.fontSizes.sm,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: spacing.lg,
  },
  mainValue: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.xl,
  },
  co2Value: {
    fontSize: 64,
    fontWeight: typography.fontWeights.bold,
    color: '#fff',
  },
  co2Unit: {
    fontSize: typography.fontSizes['3xl'],
    fontWeight: typography.fontWeights.semibold,
    color: 'rgba(255, 255, 255, 0.9)',
    marginLeft: spacing.sm,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.2)',
  },
  statItem: {
    alignItems: 'center',
  },
  statLabel: {
    fontSize: typography.fontSizes.xs,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: spacing.xs,
  },
  statValue: {
    fontSize: typography.fontSizes.lg,
    fontWeight: typography.fontWeights.bold,
    color: '#fff',
  },
});

export default CO2HeroCard;
