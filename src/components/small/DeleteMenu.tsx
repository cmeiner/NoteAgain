import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { TextP } from '../../utils/styles/FontStyles';

export const DeleteMenu = () => {
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
          <Ionicons
            name="trash-outline"
            size={24}
            color="#F5F5F5"
            onPress={showMenu}
          />
        }
        onRequestClose={hideMenu}
        animationDuration={100}
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <View style={{ maxWidth: 70 }}>
          <MenuItem onPress={hideMenu}>
            <TextP color="black">Delete</TextP>
          </MenuItem>
        </View>
      </Menu>
    </View>
  );
};
