import 'react-native-gesture-handler';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppNavigator from './src/navigation/AppNavigator';
import { ProjectProvider } from './src/context/ProjectContext';

export default function App() {
  return (
    <SafeAreaProvider>
      <ProjectProvider>
        <AppNavigator />
      </ProjectProvider>
    </SafeAreaProvider>
  );
}
