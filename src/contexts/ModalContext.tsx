import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';
import { Reminder } from '../../types/FirebaseTypes';

type ModalContextType = {
  newVisible: boolean;
  toggleNew: (visible: boolean) => void;
  editVisible: boolean;
  toggleEdit: (visible: boolean) => void;
  data: Reminder;
  updateData: (datax: Reminder) => void;
};

export const ModalContext = createContext<ModalContextType>({
  newVisible: false,
  toggleNew: () => undefined,
  editVisible: false,
  toggleEdit: () => undefined,
  data: { title: '', description: '' },
  updateData: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
  const [newVisible, setNewVisible] = useState(false);
  const [data, setData] = useState<Reminder>({ title: '', description: '' });
  const [editVisible, setEditVisible] = useState(false);
  const toggleNew = (visible: boolean) => {
    setData({ title: '', description: '' });
    setNewVisible(visible);
  };

  const updateData = (datax: any) => {
    console.log('MODAL DATA ' + datax);
    setData(datax);
    console.log('MODAL ' + datax);
  };

  const toggleEdit = (visible: boolean) => {
    setEditVisible(visible);
  };
  return (
    <ModalContext.Provider
      value={{
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
