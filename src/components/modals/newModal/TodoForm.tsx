import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Todo } from '../../../../types/FirebaseTypes';
import { useEditContext } from '../../../contexts/EditContext';
import { useItemContext } from '../../../contexts/ItemContext';
import { ModalContext } from '../../../contexts/ModalContext';
import { showToast } from '../../../utils/constants/ToastHelper';
import { TextP, TextThin } from '../../../utils/styles/FontStyles';
import { FormButton } from '../../small/FormButton';

export const TodoForm = () => {
  const { addTodo, updateTodo } = useItemContext();
  const { todoData, toggleEdit, editVisible } = useEditContext();
  const { toggleNew } = useContext(ModalContext);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [todoError, setTodoError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: { ...todoData, inputPlaceholder: '' },
  });

  const onSubmit = async (data) => {
    data.items = todos;
    const dataObject = {
      title: data.title,
      items: data.items,
    };
    addTodo(dataObject);
    toggleEdit(false, 'todos');
    toggleNew(false);
    showToast('newTodo');
  };

  const onSubmitSaveEdit = async (data) => {
    data.items = todos;
    updateTodo(data);
    toggleEdit(false, 'todos');
    toggleNew(false);
    showToast('editTodo');
  };

  const addTodoList = (data: Todo) => {
    const array = todos;
    array.push(data);
    setTodos(array);
    setValue('inputPlaceholder', '');
  };

  useEffect(() => {
    setTodos(todoData.items);
    setTodoError(false);
  }, [todos, todos.length]);

  return (
    <View style={styles.container}>
      <View>
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextThin color="black">Title</TextThin>
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder='"Walk the dog"'
                placeholderTextColor="#808080"
              />
              {errors.title && (
                <Text style={styles.errorText}> Please enter a title</Text>
              )}
            </View>
          )}
          name="title"
        />
        <Controller
          control={control}
          rules={{
            maxLength: 100,
            required: false,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <View style={styles.inputContainer}>
              <TextThin color="black">Todos ({todos.length})</TextThin>
              {todos.map((todooo, key) => (
                <TextP color="black" key={key}>
                  - {todooo.desc}
                </TextP>
              ))}
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <TextInput
                  style={styles.todoInput}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  onSubmitEditing={
                    value
                      ? () => {
                          addTodoList({
                            desc: value,
                            completed: false,
                          });
                        }
                      : null
                  }
                  value={value}
                  placeholder='"Walk the dog"'
                  placeholderTextColor="#808080"
                />
                <Ionicons
                  name="add-outline"
                  size={40}
                  color="black"
                  onPress={() => {
                    value
                      ? addTodoList({ desc: value, completed: false })
                      : null;
                  }}
                />
              </View>
              {todoError && (
                <Text style={styles.errorText}>
                  Please add atleast one to-do
                </Text>
              )}
            </View>
          )}
          name="inputPlaceholder"
        />
      </View>
      <View>
        {editVisible ? (
          <FormButton
            title="Save changes"
            onPress={handleSubmit(onSubmitSaveEdit)}
          />
        ) : (
          <FormButton title="Add to-do" onPress={handleSubmit(onSubmit)} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  inputContainer: {
    marginBottom: 20,
    width: 280,
  },
  formContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputTitle: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 14,
  },
  input: {
    height: 40,
    width: 280,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#808080',
    marginTop: 5,
  },
  todoInput: {
    height: 40,
    width: 230,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: '#808080',
    marginTop: 5,
  },
  inputDesc: {
    height: 200,
    width: 280,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#F0F0F0',
  },
  errorText: {
    color: 'red',
    position: 'absolute',
    marginTop: 5,
    marginLeft: 7,
    bottom: -16,
  },
});
