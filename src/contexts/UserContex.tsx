import React, {
    createContext,
    FC,
    ReactNode,
    useContext,
  } from 'react';
import { Reminder, TodoList } from '../../types/FirebaseTypes';
import { useState } from 'react';
import { collection, getDocs, query, where} from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { createReminder_DB, removeReminder_DB } from '../../hooks/firebase/ReminderHooks';
import { createTodo_DB } from '../../hooks/firebase/TodoHooks';
  
  type UserContextType = {
    reminders : Reminder[],
    removeReminder: (id : string) => void,
    addReminder: ({ title, remindAt, description } : Reminder) => void,
    todos: TodoList[],
    addTodo: ({ title, items, createdBy }: TodoList) => void,
    fetchAllItems: () => void,
  };
  
  export const UserContext = createContext<UserContextType>({
    reminders: [],
    removeReminder: () => {},
    addReminder: () => {},
    todos: [],
    addTodo: () => {},
    fetchAllItems: () => {},
  });
  
  type Props = {
    children: ReactNode;
  };
  
  export const UserProvider: FC<Props> = ({ children }) => {
    const [reminders, setReminders] = useState<Reminder[] | any >([])
    const [todos, setTodos] = useState<TodoList[] | any >([])

    const fetchAllItems = async () => {
        getTodos()
        getReminders()
    }


    const addReminder = ({ title, remindAt, description } : Reminder) => {
        const data = {title, description, remindAt}
        const reminder = createReminder_DB(data)
        const updatedArray = reminders
        updatedArray.push(reminder)
        setReminders(updatedArray)
    }

    const addTodo = ({ title, items, createdBy }: TodoList) => {
        const data = { title, items, createdBy }
        const todo = createTodo_DB(data)
        const updatedArray = todos
        updatedArray.push(todo)
        setTodos(updatedArray)
    }

    const removeReminder = (id: string) => {
        removeReminder_DB(id)
        const updatedArray = reminders.filter(item => item.id === id)
    }
 


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
  
    return (
      <UserContext.Provider value={{ fetchAllItems, reminders, todos, addReminder, removeReminder, addTodo  }}>
        {children}
      </UserContext.Provider>
    );
  };
  
  export const useUserContext = () => useContext(UserContext);
  