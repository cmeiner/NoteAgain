import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Reminder, TodoList } from '../../types/FirebaseTypes';

type ModalType = 'reminder' | 'todo';

type ModalContextType = {
  newVisible: boolean;
  toggleNew: (visible: boolean) => void;
  editVisible: boolean;
  toggleEdit: (visible: boolean, type: ModalType) => void;
  todoData: TodoList;
  reminderData: Reminder;
  updateData: (datax: Reminder, type: ModalType) => void;
  modalType: ModalType;
};

export const ModalContext = createContext<ModalContextType>({
  newVisible: false,
  toggleNew: () => undefined,
  editVisible: false,
  toggleEdit: () => undefined,
  reminderData: { title: '', description: '' },
  todoData: { title: '', items: [] },
  updateData: () => undefined,
  modalType: 'reminder',
});

type Props = {
  children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
  const [newVisible, setNewVisible] = useState(false);
  const [todoData, setTodoData] = useState<TodoList>({ title: '', items: [] });
  const [reminderData, setReminderData] = useState<Reminder>({
    title: '',
    description: '',
  });
  const [editVisible, setEditVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('reminder');
  const toggleNew = (visible: boolean) => {
    setReminderData({ title: '', description: '' });
    setTodoData({ title: '', items: [] });
    setNewVisible(visible);
  };

  const updateData = (datax: any, type: ModalType) => {
    if (type === 'reminder') {
      setReminderData(datax);
    } else {
      setTodoData(datax);
    }
  };

  const toggleEdit = (visible: boolean, type: ModalType) => {
    setModalType(type);
    setEditVisible(visible);
  };
  return (
    <ModalContext.Provider
      value={{
        modalType,
        toggleNew,
        newVisible,
        editVisible,
        toggleEdit,
        todoData,
        reminderData,
        updateData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
