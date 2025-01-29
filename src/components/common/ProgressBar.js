import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, borderRadius, typography } from '../../theme/theme';

const ProgressBar = ({ progress, height = 24, showPercentage = true }) => {
  const animatedProgress = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.spring(animatedProgress, {
      toValue: progress,
      useNativeDriver: false,
      tension: 20,
      friction: 7,
    }).start();
  }, [progress]);

  const getGradientColors = (progress) => {
    if (progress >= 75) {
      return [colors.status.success, colors.accent];
    } else if (progress >= 40) {
      return [colors.primary, colors.secondary];
    } else {
      return [colors.status.warning, colors.status.error];
    }
  };

  const width = animatedProgress.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%'],
    extrapolate: 'clamp',
  });

  return (
    <View style={[styles.container, { height }]}>
      <Animated.View style={[styles.progressContainer, { width }]}>
        <LinearGradient
          colors={getGradientColors(progress)}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.gradient}
        >
          {showPercentage && (
            <Animated.Text style={styles.percentageText}>
              {Math.round(progress)}%
            </Animated.Text>
          )}
        </LinearGradient>
      </Animated.View>
      {showPercentage && progress < 35 && (
        <Text style={[styles.percentageTextDark]}>
          {Math.round(progress)}%
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    position: 'relative',
  },
  progressContainer: {
    height: '100%',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    color: colors.surface,
    fontSize: 12,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  percentageTextDark: {
    position: 'absolute',
    right: 8,
    color: colors.text.secondary,
    fontSize: 12,
    fontWeight: '600',
    alignSelf: 'center',
    top: '50%',
    transform: [{ translateY: -6 }],
  },
});

export default ProgressBar; 