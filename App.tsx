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
import { auth } from './config/firebaseConfig';
import { loginUser } from './hooks/firebase/UserHooks';
import { checkUserData, getUserData } from './hooks/StorageHooks';
import { Login } from './pages/Login';
import { NavBar } from './src/components/NavBar';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    checkUserData().then((boolean) => {
      if (boolean) {
        //console.log('Inloggad');
        getUserData().then((data) => {
          //console.log(data);
          loginUser(data);
          setLoggedIn(true);
        });
      }
    });
  }, [loggedIn]);
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
      <Stack.Navigator initialRouteName={auth.currentUser ? 'NavBar' : 'Login'}>
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
  );
};

export default App;
