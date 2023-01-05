import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { TextP } from '../utils/styles/FontStyles';

export const DotsMenu = () => {
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  return (
    <View
      style={{
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Menu
        visible={visible}
        anchor={
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color="#F5F5F5"
            onPress={showMenu}
          />
        }
        onRequestClose={hideMenu}
        animationDuration={200}
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <View style={{ maxWidth: 80 }}>
          <MenuItem onPress={hideMenu}>
            <TextP color="black">Edit</TextP>
          </MenuItem>
          <MenuItem onPress={hideMenu}>
            <TextP color="black">Share</TextP>
          </MenuItem>
          <MenuItem onPress={hideMenu}>
            <TextP color="black">Favorite</TextP>
          </MenuItem>
        </View>
      </Menu>
    </View>
  );
};
