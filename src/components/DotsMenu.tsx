import { Entypo } from '@expo/vector-icons';
import React, { FC, useState } from 'react';
import { View } from 'react-native';
import { Menu, MenuItem } from 'react-native-material-menu';
import { ItemType } from '../../types/FirebaseTypes';
import { useEditContext } from '../contexts/EditContext';
import { useShareContext } from '../contexts/ShareContext';
import { TextP } from '../utils/styles/FontStyles';
import { EditModal } from './modals/EditModal';
import { ShareModal } from './modals/ShareModal';

type Props = {
  data: any;
  type: ItemType;
};

export const DotsMenu: FC<Props> = ({ data, type }) => {
  const [visible, setVisible] = useState(false);
  const { toggleEdit, updateData } = useEditContext();
  const { toggleShare, idToShare } = useShareContext();

  const hideMenu = () => {
    setVisible(false);
  };
  const showMenu = () => {
    setVisible(true);
  };

  const edit = () => {
    hideMenu();
    updateData(data, type);
    setTimeout(() => toggleEdit(true, type), 150);
  };

  const share = () => {
    hideMenu();
    idToShare(data.id);
    setTimeout(() => toggleShare(true, type), 150);
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
          <Entypo
            name="dots-three-vertical"
            size={24}
            color="white"
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
      <ShareModal />
    </View>
  );
};
