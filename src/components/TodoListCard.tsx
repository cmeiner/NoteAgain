import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { TextH2 } from '../../src/utils/styles/FontStyles';
import { Todo, TodoList } from '../../types/FirebaseTypes';
import { TodoCard } from './TodoCard';

export const TodoListCard = ({ items, title }: TodoList) => {
  return (
    <View style={TodoListStyles.paddingBox}>
      <View style={TodoListStyles.Box}>
        <View>
          <TextH2 color="white">{title}</TextH2>
        </View>
        <View style={TodoListStyles.flexRow}>
          {/* // TODO Add press events to the icons. */}
          <Ionicons name="trash-outline" size={24} color="#F5F5F5" />
          <MaterialCommunityIcons
            name="dots-vertical"
            size={30}
            color="#F5F5F5"
          />
        </View>
      </View>
      <View>
        {items.map((item: Todo) => (
          <TodoCard
            key={item.id}
            completed={item.completed}
            title={item.title}
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
  },
});
