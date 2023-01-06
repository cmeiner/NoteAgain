import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type ModalContextType = {
  AddNewModalVisible: boolean;
  toggleAddNewModal: (visible: boolean) => void;
  SettingsModalVisible: boolean;
  toggleSettingsModal: (visible: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  AddNewModalVisible: false,
  toggleAddNewModal: () => undefined,
  SettingsModalVisible: false,
  toggleSettingsModal: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
  const [AddNewModalVisible, setAddNewModalVisible] = useState(false);
  const [SettingsModalVisible, setSettingsModalVisible] = useState(false);

  const toggleAddNewModal = (visible: boolean) => {
    setAddNewModalVisible(visible);
  };
  const toggleSettingsModal = (visible: boolean) => {
    setSettingsModalVisible(visible);
  };

  return (
    <ModalContext.Provider
      value={{
        toggleAddNewModal: toggleAddNewModal,
        AddNewModalVisible: AddNewModalVisible,
        toggleSettingsModal: toggleSettingsModal,
        SettingsModalVisible: SettingsModalVisible,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
