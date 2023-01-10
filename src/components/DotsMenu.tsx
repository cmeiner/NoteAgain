import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { useModalContext } from '../contexts/ModalContext';
import { TextP } from '../utils/styles/FontStyles';
import { EditModal } from './modals/EditModal';
import { ShareModal } from './modals/ShareModal';

type Props = {
  data: any;
  type: 'reminder' | 'todo';
};

export const DotsMenu: FC<Props> = ({ data, type }) => {
  const [visible, setVisible] = useState(false);
  const { toggleEdit, updateData, toggleShare } = useModalContext();

  const hideMenu = () => {
    setVisible(false);
  };
  const showMenu = () => {
    setVisible(true);
  };

  const edit = () => {
    hideMenu();
    updateData(data, type);
    setTimeout(() => toggleEdit(true, type), 120);
  };

  const share = () => {
    hideMenu();
    setTimeout(() => toggleShare(true), 120);
  };

  const bookmark = () => {
    hideMenu();
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
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color="#F5F5F5"
            onPress={showMenu}
          />
        }
        onRequestClose={() => setVisible(false)}
        animationDuration={100}
        style={{ backgroundColor: '#f5f5f5' }}
      >
        <View style={{ maxWidth: 80 }}>
          <MenuItem onPress={edit}>
            <TextP color="black">Edit</TextP>
          </MenuItem>
          <MenuItem onPress={share}>
            <TextP color="black">Share</TextP>
          </MenuItem>
          <MenuItem onPress={bookmark}>
            <TextP color="black">Bookmark</TextP>
          </MenuItem>
        </View>
      </Menu>
      <EditModal />
      <ShareModal data={data} />
    </View>
  );
};
