import React from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Animated } from 'react-native';
import { colors, shadows, borderRadius, typography } from '../../theme/theme';

export const Card = ({ children, style }) => (
  <View style={[styles.card, style]}>
    {children}
  </View>
);

export const Button = ({ onPress, children, variant = 'primary', style }) => {
  const buttonStyle = variant === 'secondary' ? styles.buttonSecondary : styles.buttonPrimary;
  
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle, style]}
      activeOpacity={0.8}
    >
      {children}
    </TouchableOpacity>
  );
};

export const StyledText = ({ variant = 'body', style, children }) => (
  <Text style={[styles[variant], style]}>
    {children}
  </Text>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: 16,
    ...shadows.md,
  },
  button: {
    borderRadius: borderRadius.md,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.sm,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  h1: {
    ...typography.h1,
    color: colors.text.primary,
  },
  h2: {
    ...typography.h2,
    color: colors.text.primary,
  },
  h3: {
    ...typography.h3,
    color: colors.text.primary,
  },
  body: {
    ...typography.body,
    color: colors.text.primary,
  },
  caption: {
    ...typography.caption,
    color: colors.text.secondary,
  },
}); 