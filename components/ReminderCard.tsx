import { View, Text, StyleSheet } from 'react-native';
import { TextH1, TextH2, TextThin } from '../src/utils/styles/FontStyles';

const ReminderCard = () => {
  return (
    <View style={ReminderStyles.Box}>
      <TextH1 color="white">Reminder</TextH1>
    </View>
  );
};

const ReminderStyles = StyleSheet.create({
  Box: {
    backgroundColor: '#1B1D29',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },
});

export default ReminderCard;
