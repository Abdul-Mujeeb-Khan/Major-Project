import React, { forwardRef, useState } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import ProjectCard from './ProjectCard';
import ScrollToTopButton from './ScrollToTopButton';
import { colors, spacing } from '../theme/theme';
import { useProjects } from '../context/ProjectContext';

const DUMMY_PROJECTS = [
  {
    id: '1',
    title: 'Eco-Friendly Water Bottle',
    description: 'Innovative water bottle made from biodegradable materials.',
    image: 'https://picsum.photos/id/1/400/300',
    targetAmount: 10000,
    fundedAmount: 7500,
  },
  {
    id: '2',
    title: 'Smart Urban Garden',
    description: 'Self-maintaining indoor garden system with AI-powered monitoring.',
    image: 'https://picsum.photos/id/2/400/300',
    targetAmount: 25000,
    fundedAmount: 15000,
  },
];

const ProjectList = forwardRef(({ projects = [], scrollY, contentContainerStyle }, ref) => {
  const [projectData, setProjectData] = useState(DUMMY_PROJECTS);
  const { addFinishedProject } = useProjects();

  React.useEffect(() => {
    if (projects.length > 0) {
      setProjectData([...DUMMY_PROJECTS, ...projects]);
    }
  }, [projects]);

  const handleDonationComplete = (projectId, newAmount) => {
    setProjectData(currentProjects =>
      currentProjects.map(project =>
        project.id === projectId
          ? { ...project, fundedAmount: newAmount }
          : project
      )
    );
  };

  const handleProjectComplete = (projectId) => {
    const completedProject = projectData.find(p => p.id === projectId);
    if (completedProject) {
      addFinishedProject(completedProject);
      setProjectData(currentProjects =>
        currentProjects.filter(project => project.id !== projectId)
      );
    }
  };

  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={ref}
        data={projectData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProjectCard 
            project={item} 
            onDonationComplete={handleDonationComplete}
            onProjectComplete={handleProjectComplete}
          />
        )}
        contentContainerStyle={[styles.listContainer, contentContainerStyle]}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: true }
        )}
        scrollEventThrottle={16}
      />
    </View>
  );
});

ProjectList.displayName = 'ProjectList';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: spacing.md,
  },
});

export default ProjectList; 