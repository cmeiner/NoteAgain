import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type ModalContextType = {
  newVisible: boolean;
  toggleNew: (visible: boolean) => void;
  editVisible: boolean;
  toggleEdit: (visible: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  newVisible: false,
  toggleNew: () => undefined,
  editVisible: false,
  toggleEdit: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
  const [newVisible, setNewVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(false);
  const toggleNew = (visible: boolean) => {
    setNewVisible(visible);
  };

  const toggleEdit = (visible: boolean) => {
    setEditVisible(visible);
    console.log('EDIT ' + visible);
  };
  return (
    <ModalContext.Provider
      value={{ toggleNew, newVisible, editVisible, toggleEdit }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
