import React from 'react'
import { useTheme } from 'styled-components'
import { MaterialIcons as Icon } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';
import { Platform } from 'react-native';
import { Summary } from '../screens/Summary';

const { Screen, Navigator } = createBottomTabNavigator();

export function AppRoutes() {
  const theme = useTheme()
  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.secondary,
        inactiveTintColor: theme.colors.text,
        labelPosition: 'beside-icon',
        style: { paddingVertical: Platform.OS === 'ios' ? 20 : 0, height: 88 }
      }}
    >
      <Screen
        name="Listagem"
        component={Dashboard}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon name="format-list-bulleted" size={size} color={color} />
          ))
        }}
      />

      <Screen
        name="Cadastro"
        component={Register}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon name="attach-money" size={size} color={color} />
          ))
        }}
      />
      <Screen
        name="Resumo"
        component={Summary}
        options={{
          tabBarIcon: (({ size, color }) => (
            <Icon name="pie-chart" size={size} color={color} />
          ))
        }}
      />
    </Navigator>
  )
}