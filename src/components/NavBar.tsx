import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { auth } from '../../config/firebaseConfig';
import { Login } from '../../pages/Login';
import { Messages } from '../../pages/Messages';
import { New } from '../../pages/New';
import { Profile } from '../../pages/Profile';
import { Saved } from '../../pages/Saved';
import { Home } from '../../pages/Home';

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
        name="New"
        component={New}
        options={{
          tabBarIcon: () => (
            <Ionicons name="md-add-circle" size={45} color="black" />
          ),
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
