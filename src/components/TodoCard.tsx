import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { TextP } from '../../src/utils/styles/FontStyles';

type TodoProps = {
  desc: string;
  completed: boolean;
  onChangeFunction?: (a: any, b: any) => void;
  share?: boolean;
  id?: string;
};

export const TodoCard = ({
  onChangeFunction,
  share,
  completed,
  desc,
}: TodoProps) => {
  const [isChecked, setChecked] = useState(completed);

  useEffect(() => {
    onChangeFunction ? onChangeFunction(isChecked, desc) : null;
  }, [isChecked]);

  return (
    <View>
      <Pressable
        onPress={() =>
          share ? null : isChecked ? setChecked(false) : setChecked(true)
        }
        style={TodoStyles.section}
      >
        <Checkbox
          style={TodoStyles.checkbox}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? '#D77451' : undefined}
          disabled
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
