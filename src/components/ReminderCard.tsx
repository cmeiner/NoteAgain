import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Timestamp } from 'firebase/firestore';
import React from 'react';
import { StyleSheet, View } from 'react-native';
//import { removeReminder } from '../../hooks/firebase/ReminderHooks';
import { Reminder } from '../../types/FirebaseTypes';
import { useItemContext } from '../contexts/ItemContex';
import { TextH2, TextThin } from '../utils/styles/FontStyles';

// ? Think of "RemindAt" attribute
export const ReminderCard = ({ title, remindAt, id }: Reminder) => {
  const { removeReminder } = useItemContext();
  return (
    <View style={ReminderStyles.Box}>
      <View>
        <TextH2 color="white">{title}</TextH2>
        <TextThin color="white">
          {remindAt instanceof Timestamp
            ? `${new Date(
                remindAt.seconds * 1000
              ).toDateString()} \n ${new Date(remindAt.seconds * 1000)
                .toLocaleTimeString()
                .substring(0, 5)}`
            : 'No notification'}
        </TextThin>
      </View>
      <View style={ReminderStyles.flexRow}>
        {/* // TODO Add press events to the icons. */}
        <Ionicons
          onPress={() => removeReminder(id)}
          name="trash-outline"
          size={24}
          color="#F5F5F5"
        />
        <MaterialCommunityIcons
          name="dots-vertical"
          size={30}
          color="#F5F5F5"
        />
      </View>
    </View>
  );
};

const ReminderStyles = StyleSheet.create({
  Box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1B1D29',
    width: '100%',
    padding: 20,
    marginVertical: 5,
  },
  DropDown: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderRadius: 10,
    padding: 20,
    width: '70%',
    backgroundColor: '#1B1D29',
    position: 'absolute',
    right: 0,
    bottom: -50,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
