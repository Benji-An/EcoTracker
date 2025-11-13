/**
 * Logo Component - Logo reutilizable de EcoTracker
 * @module components/common/Logo
 */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, spacing } from '../../styles';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showName?: boolean;
  style?: any;
}

const Logo: React.FC<LogoProps> = ({ size = 'md', showName = false, style }) => {
  const sizes = {
    sm: { container: 32, icon: 16, text: 14 },
    md: { container: 48, icon: 24, text: 20 },
    lg: { container: 64, icon: 32, text: 24 },
    xl: { container: 96, icon: 48, text: 32 },
  };

  const currentSize = sizes[size];

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.logoCircle,
          {
            width: currentSize.container,
            height: currentSize.container,
            borderRadius: currentSize.container / 2,
          },
        ]}
      >
        <Icon name="leaf" size={currentSize.icon} color="#fff" />
      </View>
      {showName && (
        <Text
          style={[
            styles.logoText,
            { fontSize: currentSize.text },
          ]}
        >
          EcoTracker
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  logoCircle: {
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  logoText: {
    fontWeight: '700',
    color: colors.text.primary,
  },
});

export default Logo;
