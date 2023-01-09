import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Reminder } from '../../types/FirebaseTypes';

type ModalType = 'reminder' | 'todo';

type ModalContextType = {
  newVisible: boolean;
  toggleNew: (visible: boolean) => void;
  editVisible: boolean;
  toggleEdit: (visible: boolean, type: ModalType) => void;
  data: Reminder;
  updateData: (datax: Reminder) => void;
  modalType: ModalType;
};

export const ModalContext = createContext<ModalContextType>({
  newVisible: false,
  toggleNew: () => undefined,
  editVisible: false,
  toggleEdit: () => undefined,
  data: { title: '', description: '' },
  updateData: () => undefined,
  modalType: 'reminder',
});

type Props = {
  children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
  const [newVisible, setNewVisible] = useState(false);
  const [data, setData] = useState<Reminder>({ title: '', description: '' });
  const [editVisible, setEditVisible] = useState(false);
  const [modalType, setModalType] = useState<ModalType>('reminder');
  const toggleNew = (visible: boolean) => {
    setData({ title: '', description: '' });
    setNewVisible(visible);
  };

  const updateData = (datax: any) => {
    console.log('MODAL DATA ' + datax);
    setData(datax);
    console.log('MODAL ' + datax);
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
        data,
        updateData,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
