import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type ModalContextType = {
  modalVisible: boolean;
  toggleModal: (visible: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  modalVisible: false,
  toggleModal: () => {},
});

type Props = {
  children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
  };

  return (
    <ModalContext.Provider value={{ toggleModal, modalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
