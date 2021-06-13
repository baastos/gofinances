import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR'
import React from 'react'
import AppLoading from 'expo-app-loading'
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold
}
  from '@expo-google-fonts/poppins';
import { ThemeProvider } from 'styled-components';
import { Routes } from './src/routes';

import theme from './src/global/styles/theme';
import { AuthProvider, useAuth } from './src/hooks/useAuth';

export function App() {
  const { userStorageLoading } = useAuth()

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold
  })

  if (!fontsLoaded || userStorageLoading) {
    return <AppLoading />
  }
  return (
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </ThemeProvider>
  );
}
