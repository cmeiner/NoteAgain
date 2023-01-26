import { Octicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  LayoutAnimation,
  Platform,
  Pressable,
  StyleSheet,
  UIManager,
  View,
} from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { Reminder } from '../../types/FirebaseTypes';
import { TextH2, TextThin } from '../utils/styles/FontStyles';
import { DotsMenu } from './DotsMenu';
import { DeleteMenu } from './small/DeleteMenu';

export const ReminderCard = ({
  title,
  remindAt,
  description,
  id,
  createdBy,
  shareID,
}: Reminder) => {
  const data = { title, remindAt, description, id };
  const [exp, setExp] = useState(false);

  if (
    Platform.OS === 'android' &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  const toggleExp = () => {
    LayoutAnimation.configureNext({
      duration: 100,
      create: { type: 'easeIn', property: 'opacity' },
    });
    setExp((prevState) => !prevState);
  };

  return (
    <View style={ReminderStyles.Box}>
      <Pressable onPress={toggleExp} style={{ flex: 1 }}>
        <TextH2 color="white">{title}</TextH2>
        {exp ? <TextThin color="white">{description}</TextThin> : null}
      </Pressable>

      {exp ? (
        <View style={ReminderStyles.flexRow}>
          {createdBy === auth.currentUser.uid ? (
            <>
              <DotsMenu type="reminders" data={data} />
              <DeleteMenu
                title={title}
                date={remindAt}
                type="reminder"
                id={id}
                shareID={shareID}
              />
            </>
          ) : (
            <DeleteMenu
              title={title}
              date={remindAt}
              type="reminder"
              id={id}
              shareID={shareID}
              share
            />
          )}
        </View>
      ) : remindAt === 'Dont remind' ? null : (
        <Octicons name="bell-fill" size={20} color="white" />
      )}
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
    flex: 1,
    padding: 20,
    marginVertical: 5,
  },
  flexRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
});
