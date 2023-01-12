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
import { Reminder, TodoList } from '../../types/FirebaseTypes';

type ShareContextType = {
  shareID: string;
  idToShare: (a: string) => void;
  shareVisible: boolean;
  toggleShare: (visible: boolean) => void;
  sharedReminders: { pending: Reminder[]; accepted: Reminder[] };
  sharedTodos: { pending: TodoList[]; accepted: TodoList[] };
  getSharedItems: () => void;
};

export const ShareContext = createContext<ShareContextType>({
  shareID: '',
  idToShare: () => undefined,
  shareVisible: false,
  toggleShare: () => undefined,
  sharedTodos: { pending: [], accepted: [] },
  sharedReminders: { pending: [], accepted: [] },
  getSharedItems: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const ShareProvider: FC<Props> = ({ children }) => {
  const [shareVisible, setShareVisible] = useState(false);
  const [shareID, setShareID] = useState('');
  const [sharedReminders, setSharedReminders] = useState<
    { pending: Reminder[]; accepted: Reminder[] } | any
  >({ pending: [], accepted: [] });
  const [sharedTodos, setSharedTodos] = useState<
    { pending: TodoList[]; accepted: TodoList[] } | any
  >({ pending: [], accepted: [] });

  const toggleShare = (visible: boolean) => {
    setShareVisible(visible);
  };

  const idToShare = (shareID: string) => {
    setShareID(shareID);
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
                pendingReminderArray.push({ ...data.data(), shareID: item.id });
              } else if (item.data().status === 'accepted') {
                acceptedReminderArray.push({
                  ...data.data(),
                  shareID: item.id,
                });
              }
            })
            .then(() => {
              const sharedRemindersObject = {
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
                pendingTodoArray.push({ ...data.data(), shareID: item.id });
              } else if (item.data().status === 'accepted') {
                acceptedTodoArray.push({ ...data.data(), shareID: item.id });
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
  };

  return (
    <ShareContext.Provider
      value={{
        shareVisible,
        toggleShare,
        shareID,
        idToShare,
        sharedReminders,
        sharedTodos,
        getSharedItems,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
};

export const useShareContext = () => useContext(ShareContext);
