import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { auth } from '../../config/firebaseConfig';
import { Home } from '../../pages/Home';
import { Login } from '../../pages/Login';
import { Messages } from '../../pages/Messages';
import { Profile } from '../../pages/Profile';
import { Saved } from '../../pages/Saved';
import { AddButton } from './small/AddButton';

export const NavBar = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false, tabBarShowLabel: false }}
      initialRouteName="Home"
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'home' : 'home-outline'}
              size={30}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'mail' : 'mail-outline'}
              size={30}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="AddButton"
        component={AddMoreScreen}
        options={{
          tabBarButton: () => <AddButton />,
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'bookmark' : 'bookmark-outline'}
              size={30}
              color="black"
            />
          ),
        }}
      />
      {auth.currentUser ? (
        <Tab.Screen
          name="Profile"
          component={Profile} // todo check if the user is signed in :)
          options={{
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'person-circle' : 'person-circle-outline'}
                size={30}
                color="black"
              />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            tabBarStyle: { display: 'none' },
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? 'person-circle' : 'person-circle-outline'}
                size={30}
                color="black"
              />
            ),
          }}
        />
      )}
    </Tab.Navigator>
  );
};

const AddMoreScreen = () => {
  return null;
};
