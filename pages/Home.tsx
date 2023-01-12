import { AntDesign } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { ReminderCard } from '../src/components/ReminderCard';
import { TodoListCard } from '../src/components/TodoListCard';
import { TopBar } from '../src/components/TopBar';
import { useItemContext } from '../src/contexts/ItemContext';
import { useShareContext } from '../src/contexts/ShareContext';
import { TextH2, TextThin } from '../src/utils/styles/FontStyles';

export const Home = ({ navigation }: any) => {
  const { reminders, todos, fetchAllItems } = useItemContext();
  const { sharedReminders, sharedTodos } = useShareContext();

  useEffect(() => {
    fetchAllItems();
  }, []);

  return (
    <SafeAreaView>
      <Image
        style={{
          position: 'absolute',
          top: todos.length || reminders.length ? 500 : 150,
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
          height: '100%',
        }}
      >
        {reminders.length || todos.length ? (
          <View style={{ marginBottom: 'auto' }}>
            <TextH2 color="black">Your reminders:</TextH2>
            {sharedReminders.accepted.map((reminder, key) => {
              return (
                <ReminderCard
                  description={reminder.description}
                  key={key}
                  title={reminder.title}
                  remindAt={reminder.remindAt}
                  id={reminder.id}
                  createdBy={reminder.createdBy}
                  shareID={reminder.shareID}
                />
              );
            })}
            {reminders.map((reminder, key) => {
              return (
                <ReminderCard
                  description={reminder.description}
                  key={key}
                  title={reminder.title}
                  remindAt={reminder.remindAt}
                  id={reminder.id}
                  createdBy={reminder.createdBy}
                />
              );
            })}
            <View style={{ marginTop: 15 }}>
              <TextH2 color="black">Your Todos:</TextH2>
              {sharedTodos.accepted.map((todo, key) => {
                return (
                  <TodoListCard
                    key={key}
                    items={todo.items}
                    title={todo.title}
                    createdBy={todo.createdBy}
                    id={todo.id}
                    shareID={todo.shareID}
                  />
                );
              })}
              {todos.map((todo, key) => {
                return (
                  <TodoListCard
                    key={key}
                    items={todo.items}
                    title={todo.title}
                    createdBy={todo.createdBy}
                    id={todo.id}
                  />
                );
              })}
            </View>
          </View>
        ) : (
          <View style={styles.Box}>
            <View>
              <View style={{ paddingBottom: 10 }}>
                <TextH2 color="white">You don't have any notes</TextH2>
              </View>
              <TextThin color="white">Create one today</TextThin>
            </View>
            <View
              style={{
                width: 30,
                height: 30,
                backgroundColor: '#F5F5F5',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 10,
              }}
            >
              <AntDesign
                onPress={() => navigation.navigate('Share')}
                name="plus"
                size={24}
                color="black"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  imageMargin: {
    marginLeft: 10,
  },
  Box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#1B1D29',
    width: '100%',
    padding: 20,
    marginVertical: 5,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  marginTop: {
    marginTop: 40,
    marginHorizontal: 10,
  },
  modalView: {
    width: 340,
    height: 600,
    margin: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    // shadowOffset: {
    //   width: 2,
    //   height: 2,
    // },
    shadowOpacity: 1,
    shadowRadius: 100,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});
