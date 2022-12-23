import {
  Sora_100Thin,
  Sora_400Regular,
  Sora_700Bold,
  useFonts
} from '@expo-google-fonts/sora';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button } from 'react-native';
import ReminderCard from './components/ReminderCard';
import { NavBar } from './src/components/NavBar';

const App = () => {
  const fontsLoaded = useFonts({
    Sora_700Bold,
    Sora_400Regular,
    Sora_100Thin,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <ReminderCard title="Reminder 1" description="Pick up ur shit" />
      <Button title="test" onPress={() => alert('asd')} />
      <StatusBar style="auto" />
      <NavBar />
    </NavigationContainer>
  );
};

export default App;
