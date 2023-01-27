import React from 'react';
import { StyleSheet, View } from 'react-native';
import { auth } from '../../config/firebaseConfig';
import { TextH2 } from '../../src/utils/styles/FontStyles';
import { Todo, TodoList } from '../../types/FirebaseTypes';
import { useItemContext } from '../contexts/ItemContext';
import { DotsMenu } from './DotsMenu';
import { DeleteMenu } from './small/DeleteMenu';
import { TodoCard } from './TodoCard';

export const TodoListCard = ({
  items,
  title,
  id,
  shareID,
  createdBy,
}: TodoList) => {
  const data = { items, title, id };
  const { updateCheckedBox } = useItemContext();
  const changeCompletedValue = (value: boolean, desc: string) => {
    const newArray = items;
    const changedItem = newArray.find((item) => item.desc === desc);
    changedItem.completed = value;
    updateCheckedBox(newArray, id);
  };

  return (
    <View style={TodoListStyles.paddingBox}>
      <View style={TodoListStyles.Box}>
        <View>
          <TextH2 color="white">{title}</TextH2>
        </View>
        <View style={TodoListStyles.flexRow}>
          {createdBy === auth.currentUser.uid ? (
            <>
              <DotsMenu type="todos" data={data} />
              <DeleteMenu type="todo" id={id} shareID={shareID} />
            </>
          ) : (
            <DeleteMenu type="todo" id={id} shareID={shareID} share />
          )}
        </View>
      </View>
      <View>
        {items.map((item: Todo, key) => (
          <TodoCard
            onChangeFunction={changeCompletedValue}
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
