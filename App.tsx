import {
  Sora_100Thin,
  Sora_400Regular,
  Sora_700Bold,
  useFonts,
} from '@expo-google-fonts/sora';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { auth } from './config/firebaseConfig';
import { Login } from './pages/Login';
import { AuthContext } from './src/auth/AuthContext';
import { NavBar } from './src/components/NavBar';

const App = () => {
  const [currentUser, setCurrentUser] = useState({});
  const [fontsLoaded] = useFonts({
    Sora_700Bold,
    Sora_400Regular,
    Sora_100Thin,
  });

  if (!fontsLoaded) {
    return null;
  }

  const Stack = createNativeStackNavigator();

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={auth.currentUser ? 'NavBar' : 'Login'}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="NavBar"
            component={NavBar}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Login"
            component={Login}
          />
        </Stack.Navigator>
        <StatusBar />
      </NavigationContainer>
    </AuthContext.Provider>
  );
};

export default App;
