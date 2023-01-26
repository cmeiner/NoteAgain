import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { Home } from '../../pages/Home';
import { Profile } from '../../pages/Profile';
import { Saved } from '../../pages/Saved';
import { Share } from '../../pages/Share';
import { useUserContext } from '../contexts/UserContext';
import { AddButton } from './small/AddButton';

export const NavBar = () => {
  const Tab = createBottomTabNavigator();
  const { currentUser } = useUserContext();

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
        name="Share"
        component={Share}
        options={{
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? 'rocket' : 'rocket-outline'}
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

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => {
            return auth.currentUser && currentUser?.profilePicture ? (
              <Image
                style={{
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                  borderColor: focused ? '#D77451' : 'black',
                  borderWidth: focused ? 3 : 2,
                }}
                source={{ uri: currentUser.profilePicture }}
              />
            ) : (
              <Ionicons
                name={focused ? 'person-circle' : 'person-circle-outline'}
                size={38}
                color="black"
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AddMoreScreen = () => {
  return null;
};
