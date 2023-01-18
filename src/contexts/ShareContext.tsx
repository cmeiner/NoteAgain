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
import { declineShare, updateStatus_db } from '../../hooks/firebase/ShareHooks';
import { ItemType, Reminder, TodoList } from '../../types/FirebaseTypes';

type ShareContextType = {
  shareID: string;
  idToShare: (a: string) => void;
  shareVisible: boolean;
  toggleShare: (a: boolean, itemType: ItemType) => void;
  acceptedReminders: Reminder[];
  pendingReminders: Reminder[];
  acceptedTodos: TodoList[];
  pendingTodos: TodoList[];
  getSharedItems: () => void;
  removeSharedItem: (a: string) => void;
  updateShare: (shareID: string) => void;
  itemType: ItemType;
};

export const ShareContext = createContext<ShareContextType>({
  shareID: '',
  idToShare: () => undefined,
  shareVisible: false,
  toggleShare: () => undefined,
  acceptedReminders: [],
  pendingReminders: [],
  acceptedTodos: [],
  pendingTodos: [],
  getSharedItems: () => undefined,
  removeSharedItem: () => undefined,
  updateShare: () => undefined,
  itemType: 'reminders',
});

type Props = {
  children: ReactNode;
};

export const ShareProvider: FC<Props> = ({ children }) => {
  const [shareVisible, setShareVisible] = useState(false);
  const [shareID, setShareID] = useState('');
  const [pendingReminders, setPendingReminders] = useState<Reminder[]>();
  const [acceptedReminders, setAcceptedReminders] = useState<Reminder[]>();
  const [pendingTodos, setPendingTodos] = useState<TodoList[]>();
  const [acceptedTodos, setAcceptedTodos] = useState<TodoList[]>();
  const [itemType, setItemType] = useState<ItemType>('reminders');

  const toggleShare = (visible: boolean, itemType: ItemType) => {
    setItemType(itemType);
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
      const pendingReminderArray = [];
      const acceptedReminderArray = [];
      const pendingTodoArray = [];
      const acceptedTodoArray = [];
      data.docs.map((item) => {
        if (item.data().itemType === 'reminders') {
          const docRef = doc(db, 'reminders', item.data().itemID);
          getDoc(docRef).then((data) => {
            if (item.data().status === 'pending') {
              pendingReminderArray.push({ ...data.data(), shareID: item.id });
            } else if (item.data().status === 'accepted') {
              acceptedReminderArray.push({
                ...data.data(),
                shareID: item.id,
              });
            }
          });
        } else if (item.data().itemType === 'todos') {
          const docRef = doc(db, 'todos', item.data().itemID);
          getDoc(docRef).then((data) => {
            if (item.data().status === 'pending') {
              pendingTodoArray.push({ ...data.data(), shareID: item.id });
            } else if (item.data().status === 'accepted') {
              acceptedTodoArray.push({ ...data.data(), shareID: item.id });
            }
          });
        }
      });
      setPendingReminders(pendingReminderArray);
      setAcceptedReminders(acceptedReminderArray);
      setPendingTodos(pendingTodoArray);
      setAcceptedTodos(acceptedTodoArray);
    });
  };

  const removeSharedItem = (shareID: string) => {
    declineShare(shareID);
    const pendingReminder = pendingReminders?.find(
      (item) => item.shareID === shareID
    );
    const acceptedReminder = acceptedReminders?.find(
      (item) => item.shareID === shareID
    );
    const pendingTodo = pendingTodos?.find((item) => item.shareID === shareID);
    const acceptedTodo = acceptedTodos?.find(
      (item) => item.shareID === shareID
    );

    if (pendingReminder) {
      setPendingReminders(
        pendingReminders.filter((item) => item.shareID !== shareID)
      );
    } else if (acceptedReminder) {
      setAcceptedReminders(
        acceptedReminders.filter((item) => item.shareID !== shareID)
      );
    } else if (pendingTodo) {
      setPendingTodos(pendingTodos.filter((item) => item.shareID !== shareID));
    } else if (acceptedTodo) {
      setAcceptedTodos(
        acceptedTodos.filter((item) => item.shareID !== shareID)
      );
    }
  };

  const updateShare = (shareID: string) => {
    updateStatus_db(shareID);
    const pendingReminder = pendingReminders?.find(
      (item) => item.shareID === shareID
    );
    const pendingTodo = pendingTodos?.find((item) => item.shareID === shareID);

    if (pendingReminder) {
      setPendingReminders(
        pendingReminders.filter((item) => item.shareID !== shareID)
      );
      const acceptedR = acceptedReminders;
      acceptedR.push(pendingReminder);
      setAcceptedReminders(acceptedR);
    } else if (pendingTodo) {
      setPendingTodos(pendingTodos.filter((item) => item.shareID !== shareID));
      const acceptedT = acceptedTodos;
      acceptedT.push(pendingTodo);
      setAcceptedTodos(acceptedT);
    }
  };

  return (
    <ShareContext.Provider
      value={{
        shareVisible,
        toggleShare,
        updateShare,
        shareID,
        idToShare,
        acceptedReminders,
        pendingReminders,
        acceptedTodos,
        pendingTodos,
        getSharedItems,
        removeSharedItem,
        itemType,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
};

export const useShareContext = () => useContext(ShareContext);
