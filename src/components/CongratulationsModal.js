import React from 'react';
import { Modal, View, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { StyledText, Button } from './common/StyledComponents';
import { colors, spacing, borderRadius, shadows } from '../theme/theme';

const CongratulationsModal = ({ visible, onClose, project }) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="celebration" size={60} color={colors.primary} />
          </View>
          
          <StyledText variant="h2" style={styles.title}>
            Congratulations!
          </StyledText>
          
          <StyledText style={styles.message}>
            {project.title} has been fully funded! Thank you to all supporters who made this possible.
          </StyledText>
          
          <View style={styles.statsContainer}>
            <StyledText style={styles.statsLabel}>Total Raised</StyledText>
            <StyledText style={styles.statsAmount}>
              ${project.targetAmount.toLocaleString()}
            </StyledText>
          </View>

          <Button
            onPress={onClose}
            style={styles.closeButton}
          >
            <StyledText style={styles.closeButtonText}>
              Close
            </StyledText>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: borderRadius.lg,
    padding: spacing.xl,
    width: '90%',
    alignItems: 'center',
    ...shadows.lg,
  },
  iconContainer: {
    marginBottom: spacing.md,
  },
  title: {
    color: colors.primary,
    marginBottom: spacing.md,
    textAlign: 'center',
  },
  message: {
    textAlign: 'center',
    color: colors.text.secondary,
    marginBottom: spacing.xl,
    lineHeight: 24,
  },
  statsContainer: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  statsLabel: {
    color: colors.text.secondary,
    marginBottom: spacing.xs,
  },
  statsAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
  },
  closeButton: {
    minWidth: 150,
  },
  closeButtonText: {
    color: colors.surface,
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CongratulationsModal; 