import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Reminder, TodoList } from '../../types/FirebaseTypes';

type ModalType = 'reminder' | 'todo';

type EditContextType = {
  editVisible: boolean;
  toggleEdit: (visible: boolean, type: ModalType) => void;
  updateData: (datax: Reminder, type: ModalType) => void;
  resetData: () => void;
  modalType: ModalType;
  todoData: TodoList;
  reminderData: Reminder;
};

export const EditContext = createContext<EditContextType>({
  editVisible: false,
  toggleEdit: () => undefined,
  updateData: () => undefined,
  modalType: 'reminder',
  resetData: () => undefined,
  reminderData: { title: '', description: '' },
  todoData: { title: '', items: [] },
});

type Props = {
  children: ReactNode;
};

export const EditProvider: FC<Props> = ({ children }) => {
  const [todoData, setTodoData] = useState<TodoList>();
  const [reminderData, setReminderData] = useState<Reminder>();
  const [editVisible, setEditVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('reminder');

  const updateData = (datax: any, type: ModalType) => {
    if (type === 'reminder') {
      setReminderData(datax);
    } else {
      setTodoData(datax);
    }
  };

  const resetData = () => {
    setReminderData({ title: '', description: '' });
    setTodoData({ title: '', items: [] });
  };

  const toggleEdit = (visible: boolean, type: ModalType) => {
    setModalType(type);
    setEditVisible(visible);
  };

  return (
    <EditContext.Provider
      value={{
        modalType,
        editVisible,
        toggleEdit,
        updateData,
        todoData,
        reminderData,
        resetData,
      }}
    >
      {children}
    </EditContext.Provider>
  );
};

export const useEditContext = () => useContext(EditContext);
