import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import HomeScreen from '../screens/HomeScreen';
import FinishedProjectsScreen from '../screens/FinishedProjectsScreen';
import { colors } from '../theme/theme';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: colors.surface,
            fontSize: 20,
            fontWeight: '600',
          },
          headerTitleAlign: 'center',
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.text.secondary,
          tabBarStyle: {
            borderTopWidth: 1,
            borderTopColor: colors.background,
            paddingVertical: 5,
          },
        }}
      >
        <Tab.Screen
          name="Active Projects"
          component={HomeScreen}
          options={{
            headerTitle: 'CROWDFUNDME',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="Finished Projects"
          component={FinishedProjectsScreen}
          options={{
            headerTitle: 'CROWDFUNDME',
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="check-circle" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 