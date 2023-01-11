import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

type ShareContextType = {
  shareID: string;
  idToShare: (a: string) => void;
  shareVisible: boolean;
  toggleShare: (visible: boolean) => void;
};

export const ShareContext = createContext<ShareContextType>({
  shareID: '',
  idToShare: () => undefined,
  shareVisible: false,
  toggleShare: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const ShareProvider: FC<Props> = ({ children }) => {
  const [shareVisible, setShareVisible] = useState(false);
  const [shareID, setShareID] = useState('');

  const toggleShare = (visible: boolean) => {
    setShareVisible(visible);
  };

  const idToShare = (shareID: string) => {
    setShareID(shareID);
  };

  return (
    <ShareContext.Provider
      value={{
        shareVisible,
        toggleShare,
        shareID,
        idToShare,
      }}
    >
      {children}
    </ShareContext.Provider>
  );
};

export const useShareContext = () => useContext(ShareContext);
