import {
  Sora_100Thin,
  Sora_400Regular,
  Sora_700Bold,
  useFonts,
} from '@expo-google-fonts/sora';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { loginUser } from './hooks/firebase/UserHooks';
import { checkUserData, getUserData } from './hooks/StorageHooks';
import { Login } from './pages/Login';
import { NavBar } from './src/components/NavBar';
import { ModalProvider } from './src/contexts/ModalContext';
import Toast from 'react-native-toast-message';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  // useEffect(() => {
  //   checkUserData().then((boolean) => {
  //     if (boolean) {
  //       getUserData().then((data) => {
  //         loginUser(data).then(() => {
  //           setLoggedIn(true);
  //         });
  //       });
  //     }
  //   });
  // }, [loggedIn]);
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
    <NavigationContainer>
      <ModalProvider>
        <Stack.Navigator>
          {loggedIn ? (
            <Stack.Screen
              options={{ headerShown: false }}
              name="NavBar"
              component={NavBar}
            />
          ) : (
            <Stack.Screen
              options={{ headerShown: false }}
              name="Login"
              component={Login}
            />
          )}
          <Stack.Screen
            options={{ headerShown: false }}
            name="HomeScreen"
            component={NavBar}
          />
        </Stack.Navigator>
        <StatusBar />
      </ModalProvider>
      <Toast />
    </NavigationContainer>
  );
};

export default App;
