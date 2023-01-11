import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { auth, db } from '../../config/firebaseConfig';
import {
  createReminder_DB,
  removeReminder_DB,
} from '../../hooks/firebase/ReminderHooks';
import { createTodo_DB, removeTodo_DB } from '../../hooks/firebase/TodoHooks';
import { Reminder, TodoList } from '../../types/FirebaseTypes';

type ItemContextType = {
  sharedReminders: { pending: Reminder[]; accepted: Reminder[] };
  sharedTodos: { pending: TodoList[]; accepted: TodoList[] };
  reminders: Reminder[];
  removeReminder: (id: string) => void;
  addReminder: ({ title, remindAt, description }: Reminder) => void;
  todos: TodoList[];
  addTodo: ({ title, items, createdBy }: TodoList) => void;
  removeTodo: (id: string) => void;
  fetchAllItems: () => void;
  getSharedItems: () => void;
};

export const ItemContext = createContext<ItemContextType>({
  sharedTodos: { pending: [], accepted: [] },
  sharedReminders: { pending: [], accepted: [] },
  reminders: [],
  removeReminder: () => undefined,
  addReminder: () => undefined,
  todos: [],
  addTodo: () => undefined,
  removeTodo: () => undefined,
  fetchAllItems: () => undefined,
  getSharedItems: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const ItemProvider: FC<Props> = ({ children }) => {
  const [sharedReminders, setSharedReminders] = useState<
    { pending: Reminder[]; accepted: Reminder[] } | any
  >({ pending: [], accepted: [] });
  const [sharedTodos, setSharedTodos] = useState<
    { pending: TodoList[]; accepted: TodoList[] } | any
  >({ pending: [], accepted: [] });
  const [reminders, setReminders] = useState<Reminder[] | any>([]);
  const [todos, setTodos] = useState<TodoList[] | any>([]);

  const fetchAllItems = async () => {
    // * Fetching all reminders & todos for a user.
    getTodos();
    getReminders();
    getSharedItems();
  };

  const addReminder = async ({ title, remindAt, description }: Reminder) => {
    // * Adding a reminder to state and Firebase
    const data = { title, description, remindAt };
    const reminder = await createReminder_DB(data);
    setReminders([reminder, ...reminders]);
  };

  const addTodo = async ({ title, items }: TodoList) => {
    // * Adding a todo to state and Firebase
    const data = { title, items };
    const todo = await createTodo_DB(data);
    setTodos([todo, ...todos]);
  };

  const removeReminder = (id: string) => {
    // * Removing a reminder from state and Firebase
    removeReminder_DB(id);
    const updatedArray = reminders.filter((item) => item.id !== id);
    setReminders(updatedArray);
  };

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

  const getSharedItems = async () => {
    const shareQ = query(
      collection(db, 'shares'),
      where('receiverID', '==', auth.currentUser?.uid)
    );
    getDocs(shareQ).then((data) => {
      data.docs.map((item) => {
        //console.log(item.data());
        if (item.data().itemType === 'reminder') {
          const pendingReminderArray = [];
          const acceptedReminderArray = [];
          const docRef = doc(db, 'reminders', item.data().itemID);
          getDoc(docRef)
            .then((data) => {
              if (item.data().status === 'pending') {
                pendingReminderArray.push(data.data());
              } else if (item.data().status === 'accepted') {
                acceptedReminderArray.push(data.data());
              }
            })
            .then(() => {
              let sharedRemindersObject = {
                pending: pendingReminderArray,
                accepted: acceptedReminderArray,
              };
              setSharedReminders(sharedRemindersObject);
            });
        } else if (item.data().itemType === 'todo') {
          const pendingTodoArray = [];
          const acceptedTodoArray = [];
          const docRef = doc(db, 'todos', item.data().itemID);
          getDoc(docRef)
            .then((data) => {
              if (item.data().status === 'pending') {
                pendingTodoArray.push(data.data());
              } else if (item.data().status === 'accepted') {
                acceptedTodoArray.push(data.data());
              }
            })
            .then(() => {
              const sharedTodosObject = {
                pending: pendingTodoArray,
                accepted: acceptedTodoArray,
              };
              setSharedTodos(sharedTodosObject);
            });
        }
      });
    });
    console.log('Shared Reminders');
    console.log(sharedReminders);
    console.log('Shared Todos');
    console.log(sharedTodos);
  };

  const removeTodo = (id: string) => {
    // * Removing a todo from state and Firebase
    removeTodo_DB(id);
    const updatedArray = todos.filter((item) => item.id !== id);
    setTodos(updatedArray);
  };

  return (
    <ItemContext.Provider
      value={{
        fetchAllItems,
        reminders,
        todos,
        addReminder,
        removeReminder,
        addTodo,
        removeTodo,
        sharedReminders,
        sharedTodos,
        getSharedItems,
      }}
    >
      {children}
    </ItemContext.Provider>
  );
};

export const useItemContext = () => useContext(ItemContext);
