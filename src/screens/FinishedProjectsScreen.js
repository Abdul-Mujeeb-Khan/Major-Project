import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { Card, StyledText } from '../components/common/StyledComponents';
import { colors, spacing, borderRadius } from '../theme/theme';
import { useProjects } from '../context/ProjectContext';

const FinishedProjectCard = ({ project }) => (
  <Card style={styles.card}>
    <Image
      source={{ uri: project.image }}
      style={styles.image}
      resizeMode="cover"
    />
    <View style={styles.content}>
      <StyledText variant="h3" style={styles.title}>
        {project.title}
      </StyledText>
      <StyledText style={styles.description}>
        {project.description}
      </StyledText>
      <View style={styles.statsContainer}>
        <View style={styles.stat}>
          <StyledText style={styles.statLabel}>Raised</StyledText>
          <StyledText style={styles.statValue}>
            ${project.targetAmount.toLocaleString()}
          </StyledText>
        </View>
        <View style={styles.stat}>
          <StyledText style={styles.statLabel}>Completed</StyledText>
          <StyledText style={styles.statValue}>
            {new Date(project.completedDate).toLocaleDateString()}
          </StyledText>
        </View>
      </View>
      <View style={styles.successBadge}>
        <MaterialIcons name="check-circle" size={20} color={colors.status.success} />
        <StyledText style={styles.successText}>Successfully Funded</StyledText>
      </View>
    </View>
  </Card>
);

const FinishedProjectsScreen = () => {
  const { finishedProjects } = useProjects();

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.primary}
      />
      <FlatList
        data={finishedProjects}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FinishedProjectCard project={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <MaterialIcons
              name="assignment-turned-in"
              size={64}
              color={colors.text.light}
            />
            <StyledText style={styles.emptyText}>
              No finished projects yet
            </StyledText>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  listContainer: {
    padding: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
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
  title: {
    marginBottom: spacing.sm,
  },
  description: {
    color: colors.text.secondary,
    marginBottom: spacing.md,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.md,
  },
  stat: {
    alignItems: 'center',
  },
  statLabel: {
    color: colors.text.secondary,
    fontSize: 12,
    marginBottom: 4,
  },
  statValue: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.status.success + '10',
    padding: spacing.sm,
    borderRadius: borderRadius.md,
  },
  successText: {
    color: colors.status.success,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: spacing.xl * 2,
  },
  emptyText: {
    color: colors.text.light,
    marginTop: spacing.md,
  },
});

export default FinishedProjectsScreen; 