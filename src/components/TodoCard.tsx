import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextP } from '../../src/utils/styles/FontStyles';
import { Todo } from '../../types/FirebaseTypes';

export const TodoCard = ({ desc, completed, id }: Todo) => {
  const [isChecked, setChecked] = useState(completed);
  console.log(id);
  return (
    <View>
      <Pressable
        onPress={() => (isChecked ? setChecked(false) : setChecked(true))}
        style={TodoStyles.section}
      >
        <Checkbox
          style={TodoStyles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#D77451' : undefined}
        />
        <TextP color="white">{desc}</TextP>
      </Pressable>
    </View>
  );
};

const TodoStyles = StyleSheet.create({
  TodoItem: {
    flexDirection: 'row',
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    alignItems: 'center',
    marginVertical: 5,
    backgroundColor: '#ffff',
    border: 'none !important',
    appearance: 'none',
    outline: 'none',
    marginRight: 8,
    marginTop: 8,
  },
});
