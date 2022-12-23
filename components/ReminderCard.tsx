import { View, Text, StyleSheet } from 'react-native';
import { TextH2, TextThin } from '../src/utils/styles/FontStyles';
import {
  MaterialCommunityIcons,
  MaterialIcons,
  Ionicons,
} from '@expo/vector-icons';
import { Reminder } from '../types/FirebaseTypes';

// ? Think of "RemindAt" attribute
const ReminderCard = ({ title, description }: Reminder) => {
  console.log(title, description);
  return (
    <View style={ReminderStyles.Box}>
      <View>
        <TextH2 color="white">{title}</TextH2>
        <TextThin color="white">{description}</TextThin>
      </View>
      <View style={ReminderStyles.flexRow}>
        {/* // TODO Add press events to the icons. */}
        <Ionicons name="trash-outline" size={24} color="#F5F5F5" />
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
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1B1D29',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
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

export default ReminderCard;
