import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { auth } from '../../../config/firebaseConfig';
import { createReminder } from '../../../hooks/firebase/ReminderHooks';
import { TextThin } from '../../utils/styles/FontStyles';
import { FormButton } from '../small/FormButton';

export const NewTodo = () => {
  type Todo = {
    desc: string;
    completed: boolean;
  };

  const [todos, setTodos] = useState<Todo[]>([]);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      creator: auth.currentUser.uid,
      remindAt: '',
    },
  });
  const onSubmit = async (data) => {
    createReminder(data);
    console.log(data);
  };

  const dummyData = {
    desc: 'hej',
    completed: false,
  };
  const addTodo = (data: Todo) => {
    setTodos([...todos, data]);
    console.log(todos);
  };

  const renderTodos = () => {
    useEffect(() => {
      console.log('tillagd');
    }, [todos]);
  };

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
              // clearButtonMode="while-editing"
            />
          </View>
        )}
        name="title"
      />
      {errors.title && (
        <Text style={styles.errorText}> Please enter a title</Text>
      )}

      {errors.remindAt && (
        <Text style={styles.errorText}> Please choose a time</Text>
      )}

      <Controller
        control={control}
        rules={{
          maxLength: 100,
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <View style={styles.inputContainer}>
            <TextThin color="black">Todos</TextThin>
            {todos.map((todooo, key) => (
              <TextThin color="black" key={key}>
                {todooo.desc}
              </TextThin>
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
                // clearButtonMode="while-editing"
              />
              <Ionicons
                name="add-outline"
                size={40}
                color="black"
                onPress={() => addTodo({ desc: value, completed: false })}
              />
            </View>
          </View>
        )}
        name="description"
      />
      {errors.description && (
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
