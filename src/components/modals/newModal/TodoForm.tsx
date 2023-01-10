import { Ionicons } from '@expo/vector-icons';
import React, { useContext, useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { useItemContext } from '../../../contexts/ItemContext';
import { ModalContext, useModalContext } from '../../../contexts/ModalContext';
import { TextP, TextThin } from '../../../utils/styles/FontStyles';
import { FormButton } from '../../small/FormButton';

export const TodoForm = () => {
  const { addTodo } = useItemContext();
  const { todoData } = useModalContext();
  type Todo = {
    desc: string;
    completed: boolean;
  };
  const { toggleNew } = useContext(ModalContext);
  const [todos, setTodos] = useState<Todo[]>([]);

  const showToast = () => {
    Toast.show({
      type: 'success',
      text1: 'New todo added 🙂',
      position: 'bottom',
      autoHide: true,
      visibilityTime: 1000,
    });
  };

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
    toggleNew(false);
    showToast();
  };

  const addTodoList = (data: Todo) => {
    const array = todos;
    array.push(data);
    setTodos(array);
    setValue('inputPlaceholder', '');
  };
  useEffect(() => {
    setTodos(todoData.items);
  }, [todos]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
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
          </View>
        )}
        name="title"
      />
      {errors.title && (
        <Text style={styles.errorText}> Please enter a title</Text>
      )}

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
                value={value}
                placeholder='"Walk the dog"'
                placeholderTextColor="#808080"
              />
              <Ionicons
                name="add-outline"
                size={40}
                color="black"
                onPress={() => {
                  value ? addTodoList({ desc: value, completed: false }) : null;
                }}
              />
            </View>
          </View>
        )}
        name="inputPlaceholder"
      />
      {errors.inputPlaceholder && (
        <Text style={styles.errorText}>Please enter a description</Text>
      )}
      <FormButton width="240px" title="Add" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 472,
  },
  inputContainer: {
    marginBottom: 10,
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
    marginTop: 5,
  },
});
