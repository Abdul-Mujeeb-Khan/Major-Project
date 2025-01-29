import React, { useState, useRef } from 'react';
import {
  View,
  StyleSheet,
  Animated,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import ProjectList from '../components/ProjectList';
import AddProjectModal from '../components/AddProjectModal';
import ScrollToTopButton from '../components/ScrollToTopButton';
import { StyledText } from '../components/common/StyledComponents';
import { colors, spacing, shadows, borderRadius } from '../theme/theme';

const HEADER_MAX_HEIGHT = 120;
const HEADER_MIN_HEIGHT = 70;

const HomeScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const scrollY = useRef(new Animated.Value(0)).current;
  const listRef = useRef(null);

  const handleAddProject = (newProject) => {
    setProjects(currentProjects => [...currentProjects, {
      ...newProject,
      id: Date.now().toString(),
      fundedAmount: 0,
    }]);
    
    setTimeout(() => {
      listRef.current?.scrollToEnd({ animated: true });
    }, 500);
    
    setModalVisible(false);
  };

  const scrollToTop = () => {
    listRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  // Header animations using transform instead of height
  const headerTranslate = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [0, -(HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT)],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" />
      
      {/* Animated Header */}
      <Animated.View 
        style={[
          styles.header,
          {
            transform: [{ translateY: headerTranslate }],
          }
        ]}
      >
        <LinearGradient
          colors={[colors.gradient.start, colors.gradient.end]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.headerGradient}
        >
          <Animated.View style={[styles.headerContent, { opacity: headerOpacity }]}>
            <StyledText variant="h1" style={styles.mainTitle}>
              Discover Projects
            </StyledText>
          </Animated.View>
        </LinearGradient>
      </Animated.View>

      {/* Project List */}
      <ProjectList
        ref={listRef}
        projects={projects}
        scrollY={scrollY}
        contentContainerStyle={styles.listContent}
      />

      {/* Add Project Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[colors.gradient.start, colors.gradient.end]}
          style={styles.addButtonGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
        >
          <MaterialIcons name="add" size={24} color="white" />
        </LinearGradient>
      </TouchableOpacity>

      {/* Scroll to Top Button */}
      <ScrollToTopButton scrollY={scrollY} onPress={scrollToTop} />

      {/* Add Project Modal */}
      <AddProjectModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSubmit={handleAddProject}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: HEADER_MAX_HEIGHT,
    zIndex: 100,
    ...shadows.lg,
  },
  headerGradient: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.md,
    justifyContent: 'flex-end',
  },
  headerContent: {
    paddingBottom: spacing.md,
  },
  mainTitle: {
    color: colors.surface,
    fontSize: 28,
  },
  listContent: {
    paddingTop: HEADER_MAX_HEIGHT + spacing.md,
    paddingBottom: 100,
    paddingHorizontal: spacing.md,
  },
  addButton: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.md,
    ...shadows.lg,
  },
  addButtonGradient: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.full,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen; 