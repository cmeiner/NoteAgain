import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Todo, TodoList } from '../../types/FirebaseTypes';
import { useShareContext } from '../contexts/ShareContext';
import { TextH2 } from '../utils/styles/FontStyles';
import { TodoCard } from './TodoCard';

export const PendingTodo = ({ items, title, id, shareID }: TodoList) => {
  const { removeSharedItem, updateShare } = useShareContext();
  return (
    <View style={TodoListStyles.paddingBox}>
      <View style={TodoListStyles.Box}>
        <View>
          <TextH2 color="white">{title}</TextH2>
        </View>
        <View style={TodoListStyles.flexRow}>
          <Ionicons
            name="checkmark"
            size={24}
            color="white"
            style={{ marginRight: 5 }}
            onPress={() => updateShare(shareID)}
          />
          <Ionicons
            name="close"
            size={24}
            color="white"
            onPress={() => removeSharedItem(shareID)}
          />
        </View>
      </View>
      <View>
        {items.map((item: Todo, key) => (
          <TodoCard
            id={id}
            key={key}
            completed={item.completed}
            desc={item.desc}
            share
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
