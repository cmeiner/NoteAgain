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
import Toast, { BaseToast } from 'react-native-toast-message';
import { loginUser } from './hooks/firebase/UserHooks';
import { checkUserData, getUserData } from './hooks/StorageHooks';
import { Login } from './pages/Login';
import { NavBar } from './src/components/NavBar';
import { ItemProvider } from './src/contexts/ItemContext';
import { ModalProvider } from './src/contexts/ModalContext';
import { SettingsProvider } from './src/contexts/SettingsContext';
import { UserProvider } from './src/contexts/UserContext';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    checkUserData().then((boolean) => {
      if (boolean) {
        getUserData().then((data) => {
          loginUser(data).then(() => {
            setLoggedIn(true);
          });
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

  const toastConfig = {
    success: (props) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'green' }}
        contentContainerStyle={{
          justifyContent: 'center',
          paddingHorizontal: 15,
        }}
        text1Style={{
          fontSize: 24,
          fontWeight: '600',
        }}
      />
    ),
  };

  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <SettingsProvider>
        <UserProvider>
          <ItemProvider>
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
          </ItemProvider>
        </UserProvider>
      </SettingsProvider>
      <Toast config={toastConfig} />
    </NavigationContainer>
  );
};

export default App;
