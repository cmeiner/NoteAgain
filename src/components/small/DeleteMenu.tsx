import { Ionicons } from '@expo/vector-icons';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import Toast from 'react-native-toast-message';
import { useItemContext } from '../../contexts/ItemContext';
import { TextP } from '../../utils/styles/FontStyles';

type Props = {
  id: string;
  type: 'reminder' | 'todo';
};

export const DeleteMenu: FC<Props> = ({ id, type }) => {
  const { removeReminder, removeTodo } = useItemContext();

  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);
  const showMenu = () => setVisible(true);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: type === 'reminder' ? 'Reminder deleted!' : 'Todo Deleted!',
      position: 'bottom',
      autoHide: true,
      visibilityTime: 1000,
    });
  };

  const deleteItem = () => {
    hideMenu();
    type === 'reminder' ? removeReminder(id) : removeTodo(id);
    showToast();
  };

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
          <MenuItem onPress={deleteItem}>
            <TextP color="black">Delete</TextP>
          </MenuItem>
        </View>
      </Menu>
    </View>
  );
};
