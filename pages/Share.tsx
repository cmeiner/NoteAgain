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
import { TextH2, TextThin } from '../src/utils/styles/FontStyles';

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
          top: pendingTodos.length || pendingReminders.length ? 500 : 150,
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
        {pendingReminders.length ? (
          <View
            style={{
              marginHorizontal: 10,
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <TextH2 color="black">Your pending reminders:</TextH2>
            {pendingReminders?.map((reminder, key) => (
              <PendingReminder
                title={reminder.title}
                shareID={reminder.shareID}
                description={reminder.description}
                id={reminder.id}
                key={key}
              />
            ))}
          </View>
        ) : null}
        {pendingTodos.length ? (
          <View>
            <TextH2 color="black">Your pending to-dos:</TextH2>
            {pendingTodos?.map((todo, key) => (
              <PendingTodo
                title={todo.title}
                shareID={todo.shareID}
                items={todo.items}
                key={key}
              />
            ))}
          </View>
        ) : null}
        {!pendingReminders && !pendingTodos ? (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
            }}
          >
            <View style={styles.Box}>
              <View>
                <View style={{ paddingBottom: 10 }}>
                  <TextH2 color="white">
                    You don't have any pending reminders or to-do's
                  </TextH2>
                </View>
                <TextThin color="white">
                  Maybe go make some friends and ask them to send some to you!
                </TextThin>
              </View>
            </View>
          </View>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Box: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1B1D29',
    width: '100%',
    padding: 20,
    marginBottom: 20,
  },
});
