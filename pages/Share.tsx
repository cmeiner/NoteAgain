import React from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { PendingReminder } from '../src/components/PendingReminder';
import { PendingTodo } from '../src/components/PendingTodo';
import { TopBar } from '../src/components/TopBar';
import { useShareContext } from '../src/contexts/ShareContext';
import { TextH2 } from '../src/utils/styles/FontStyles';

export const Share = () => {
  const { sharedReminders, sharedTodos } = useShareContext();

  return (
    <SafeAreaView style={styles.container}>
      <Image
        style={{
          position: 'absolute',
          top: 500,
        }}
        source={require('../assets/images/Wave.png')}
      />
      <View style={{ marginHorizontal: 10, marginBottom: 10 }}>
        <TopBar />
      </View>
      <ScrollView
        style={{
          position: 'relative',
          marginHorizontal: 10,
          paddingBottom: 40,
          flex: 1,
        }}
      >
        <TextH2 color="black">Your pending reminders:</TextH2>
        {sharedReminders.pending.map((reminder, key) => (
          <PendingReminder
            title={reminder.title}
            description={reminder.description}
            id={reminder.id}
            shareID={reminder.shareID}
            key={key}
          />
        ))}
        <TextH2 color="black">Your pending todos:</TextH2>
        {sharedTodos.pending.map((todo, key) => (
          <PendingTodo
            shareID={todo.shareID}
            items={todo.items}
            key={key}
            title={todo.title}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
