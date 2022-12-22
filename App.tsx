import { useFonts } from 'expo-font';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import TodoListCard from './components/TodoListCard';
import { auth } from './config/firebaseConfig';
import { createReminder } from './hooks/firebase/ReminderHooks';
import { TodoList } from './types/FirebaseTypes';

export default function App() {
  const TodoListData: TodoList = {
    title: 'FelixTest',
    items: [
      {
        title: 'test',
        completed: false,
      },
      {
        title: 'test',
        completed: false,
      },
      {
        title: 'test',
        completed: false,
      },
      {
        title: 'test',
        completed: false,
      },
    ],
  };

  const data = {
    title: 'testTitle',
    description: 'testDesc',
    remindAt: 'test',
  };
  useFonts({
    SoraBold: require('./assets/fonts/Sora-Bold.ttf'),
    SoraRegular: require('./assets/fonts/Sora-Regular.ttf'),
    SoraThin: require('./assets/fonts/Sora-Thin.ttf'),
  });

  const test = () => {
    createReminder(data);
  };

  return (
    <View style={styles.container}>
      <Button title="test" onPress={() => alert('asd')} />
      <StatusBar style="auto" />
      <TodoListCard title={TodoListData.title} items={TodoListData.items} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
