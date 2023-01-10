import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextH2 } from '../../src/utils/styles/FontStyles';
import { Todo, TodoList } from '../../types/FirebaseTypes';
import { DotsMenu } from './DotsMenu';
import { DeleteMenu } from './small/DeleteMenu';
import { TodoCard } from './TodoCard';

export const TodoListCard = ({ items, title, id }: TodoList) => {
  const data = { items, title, id };

  return (
    <View style={TodoListStyles.paddingBox}>
      <View style={TodoListStyles.Box}>
        <View>
          <TextH2 color="white">{title}</TextH2>
        </View>
        <View style={TodoListStyles.flexRow}>
          {/* // TODO Add press events to the icons. */}
          <DotsMenu type="todo" data={data} />
          <DeleteMenu type="todo" id={id} />
        </View>
      </View>
      <View>
        {items.map((item: Todo, key) => (
          <TodoCard
            id={id}
            key={key}
            completed={item.completed}
            desc={item.desc}
          />
        ))}
      </View>
    </View>
  );
};

const TodoListStyles = StyleSheet.create({
  Box: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  paddingBox: {
    backgroundColor: '#1B1D29',
    width: '100%',
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
});
