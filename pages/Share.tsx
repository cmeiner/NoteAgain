import React, { useCallback, useState } from 'react';
import {
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { PendingReminder } from '../src/components/PendingReminder';
import { PendingTodo } from '../src/components/PendingTodo';
import { TopBar } from '../src/components/TopBar';
import { useItemContext } from '../src/contexts/ItemContext';
import { useShareContext } from '../src/contexts/ShareContext';
import { TextH2 } from '../src/utils/styles/FontStyles';

export const Share = () => {
  const { pendingReminders, pendingTodos } = useShareContext();
  const { fetchAllItems } = useItemContext();

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchAllItems();
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

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
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <TextH2 color="black">Your pending reminders:</TextH2>
        {pendingReminders?.map((reminder, key) => (
          <PendingReminder
            title={reminder.title}
            description={reminder.description}
            id={reminder.id}
            shareID={reminder.shareID}
            key={key}
          />
        ))}
        <TextH2 color="black">Your pending to-dos:</TextH2>
        {pendingTodos?.map((todo, key) => (
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
