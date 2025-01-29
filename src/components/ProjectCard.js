import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, StyledText, Button } from './common/StyledComponents';
import ProgressBar from './common/ProgressBar';
import DonationModal from './DonationModal';
import CongratulationsModal from './CongratulationsModal';
import { colors, spacing, borderRadius } from '../theme/theme';

const ProjectCard = ({ project, onDonationComplete, onProjectComplete }) => {
  const [isDonationModalVisible, setDonationModalVisible] = useState(false);
  const [isCongratulationsVisible, setIsCongratulationsVisible] = useState(false);
  const [currentFundedAmount, setCurrentFundedAmount] = useState(project.fundedAmount);
  
  const progressPercentage = (currentFundedAmount / project.targetAmount) * 100;

  const handleDonationComplete = (amount) => {
    const newAmount = currentFundedAmount + parseFloat(amount);
    setCurrentFundedAmount(newAmount);
    
    if (newAmount >= project.targetAmount) {
      setIsCongratulationsVisible(true);
      // Notify parent component after a delay to allow animation
      setTimeout(() => {
        onProjectComplete && onProjectComplete(project.id);
      }, 3000);
    } else {
      onDonationComplete && onDonationComplete(project.id, newAmount);
    }
    
    setDonationModalVisible(false);
  };

  return (
    <>
      <Card style={styles.container}>
        <Image
          source={{ uri: project.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.content}>
          <StyledText variant="h3">{project.title}</StyledText>
          <StyledText variant="body" style={styles.description}>
            {project.description}
          </StyledText>
          
          <View style={styles.progressContainer}>
            <ProgressBar 
              progress={progressPercentage} 
              height={12}
              showPercentage={false}
            />
            <View style={styles.statsContainer}>
              <StyledText variant="caption">
                ${currentFundedAmount.toLocaleString()}
                <StyledText variant="caption" style={styles.targetAmount}>
                  {' '}of ${project.targetAmount.toLocaleString()}
                </StyledText>
              </StyledText>
              <StyledText variant="caption" style={styles.percentage}>
                {progressPercentage.toFixed(0)}%
              </StyledText>
            </View>
          </View>

          <Button
            onPress={() => setDonationModalVisible(true)}
            style={styles.donateButton}
          >
            <StyledText style={styles.donateButtonText}>Donate Now</StyledText>
          </Button>
        </View>
      </Card>

      <DonationModal
        visible={isDonationModalVisible}
        onClose={() => setDonationModalVisible(false)}
        onDonationComplete={handleDonationComplete}
        project={{
          ...project,
          fundedAmount: currentFundedAmount
        }}
      />

      <CongratulationsModal
        visible={isCongratulationsVisible}
        onClose={() => setIsCongratulationsVisible(false)}
        project={project}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.md,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: borderRadius.lg,
    borderTopRightRadius: borderRadius.lg,
  },
  content: {
    padding: spacing.md,
  },
  description: {
    marginTop: spacing.sm,
    color: colors.text.secondary,
  },
  progressContainer: {
    marginTop: spacing.md,
  },
  progressBar: {
    height: 8,
    backgroundColor: colors.background,
    borderRadius: borderRadius.full,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: borderRadius.full,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  targetAmount: {
    color: colors.text.light,
  },
  percentage: {
    color: colors.primary,
    fontWeight: '600',
  },
  donateButton: {
    marginTop: spacing.md,
  },
  donateButtonText: {
    color: colors.surface,
    fontWeight: '600',
    fontSize: 16,
  },
});

export default ProjectCard; 