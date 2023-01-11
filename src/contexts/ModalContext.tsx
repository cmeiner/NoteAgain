import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type ModalType = 'reminder' | 'todo';

type ModalContextType = {
  newVisible: boolean;
  toggleNew: (visible: boolean) => void;
  settingsModalVisible: boolean;
  toggleSettingsModal: (visible: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  newVisible: false,
  toggleNew: () => undefined,
  settingsModalVisible: false,
  toggleSettingsModal: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const ModalProvider: FC<Props> = ({ children }) => {
  const [newVisible, setNewVisible] = useState(false);
  const [settingsModalVisible, setSettingsModalVisible] = useState(false);

  const toggleNew = (visible: boolean) => {
    setNewVisible(visible);
  };

  const toggleSettingsModal = (visible: boolean) => {
    setSettingsModalVisible(visible);
  };

  return (
    <ModalContext.Provider
      value={{
        toggleNew,
        newVisible,
        settingsModalVisible,
        toggleSettingsModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export const useModalContext = () => useContext(ModalContext);
