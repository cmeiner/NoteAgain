import { Ionicons } from '@expo/vector-icons';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { removeNotifcation } from '../../../hooks/notifHooks';
import { useItemContext } from '../../contexts/ItemContext';
import { useShareContext } from '../../contexts/ShareContext';
import { showToast } from '../../utils/constants/ToastHelper';
import { TextP } from '../../utils/styles/FontStyles';

type Props = {
  id: string;
  type: 'reminder' | 'todo';
  share?: boolean;
  shareID: string;
  date?: any;
  title?: string;
};

export const DeleteMenu: FC<Props> = ({
  id,
  type,
  share,
  shareID,
  title,
  date,
}) => {
  const { removeReminder, removeTodo } = useItemContext();
  const { removeSharedItem } = useShareContext();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const deleteItem = () => {
    hideMenu();
    if (share) {
      removeSharedItem(shareID);
      type === 'reminder'
        ? showToast('deleteReminder')
        : showToast('deleteTodo');
    } else {
      type === 'reminder'
        ? (removeReminder(id), showToast('deleteReminder'))
        : (removeTodo(id), showToast('deleteTodo'));
      if (type === 'reminder') {
        if (date instanceof Date) {
          removeNotifcation(`Don't forget ${title} in 10 Minutes`, date);
        }
      }
    }
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
