/**
 * EcoTipCard Component - Tarjeta de tip ecológico
 * @module components/dashboard/EcoTipCard
 */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { dashboardAPI } from '../../api/dashboard.api';
import { colors, spacing, typography, borderRadius, shadows } from '../../styles';
import type { EcoTip } from '../../models';

const EcoTipCard: React.FC = () => {
  const [tip, setTip] = useState<EcoTip | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTip();
  }, []);

  const loadTip = async () => {
    try {
      const data = await dashboardAPI.getRandomEcoTip();
      setTip(data);
    } catch (error) {
      console.error('Error loading eco tip:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.card, styles.loadingCard]}>
        <ActivityIndicator size="small" color={colors.primary} />
      </View>
    );
  }

  if (!tip) {
    return null;
  }

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="lightbulb-on" size={24} color={colors.warning} />
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>💡 Tip Ecológico del Día</Text>
          <Text style={styles.category}>{tip.category}</Text>
        </View>
      </View>
      <Text style={styles.tipText}>{tip.tip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadows.sm,
  },
  loadingCard: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: `${colors.warning}15`,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  headerText: {
    flex: 1,
  },
  title: {
    fontSize: typography.fontSizes.base,
    fontWeight: typography.fontWeights.semibold,
    color: colors.text.primary,
    marginBottom: spacing.xs,
  },
  category: {
    fontSize: typography.fontSizes.xs,
    color: colors.text.secondary,
    textTransform: 'capitalize',
  },
  tipText: {
    fontSize: typography.fontSizes.sm,
    color: colors.text.secondary,
    lineHeight: typography.lineHeights.relaxed * typography.fontSizes.sm,
  },
});

export default EcoTipCard;
