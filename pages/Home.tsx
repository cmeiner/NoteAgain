import { AntDesign } from '@expo/vector-icons';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { auth, db } from '../config/firebaseConfig';
import { ReminderCard } from '../src/components/ReminderCard';
import { TodoListCard } from '../src/components/TodoListCard';
import { TopBar } from '../src/components/TopBar';
import { TextH2, TextThin } from '../src/utils/styles/FontStyles';

export const Home = ({ navigation }: any) => {
  const [todos, setTodos] = useState([]);
  const [reminders, setReminders] = useState([]);

  const getReminders = async () => {
    const q = query(
      collection(db, 'reminders'),
      where('createdBy', '==', auth.currentUser?.uid)
    );
    getDocs(q).then((data) => {
      setReminders(
        data.docs.map((item) => {
          const object = { ...item.data(), id: item.id };
          return object;
        }) as any
      );
    });
  };
  const getTodos = async () => {
    const q = query(
      collection(db, 'todos'),
      where('createdBy', '==', auth.currentUser?.uid)
    );
    getDocs(q).then((data) => {
      setTodos(
        data.docs.map((item) => {
          const object = { ...item.data(), id: item.id };
          return object;
        }) as any
      );
    });
  };

  useEffect(() => {
    getReminders();
    getTodos();
    console.log('todos:', todos);
    console.log('remminders:', reminders);
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
        <TopBar settings={false} />
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
            {reminders.map((reminder, key) => {
              return (
                <ReminderCard
                  description="asdsd"
                  key={key}
                  createdBy={auth.currentUser.displayName}
                  title={reminder.title}
                  remindAt={reminder.remindAt}
                  id={reminder.id}
                />
              );
            })}
            <View style={{ marginTop: 15 }}>
              <TextH2 color="black">Your Todos:</TextH2>
              {todos.map((todo, key) => {
                return (
                  <TodoListCard
                    key={key}
                    items={todo.items}
                    title={todo.title}
                    createdBy={auth.currentUser.displayName}
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
                onPress={() => navigation.navigate('Messages')}
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
