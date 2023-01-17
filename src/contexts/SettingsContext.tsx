import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from 'react';

export type CurrentlyShowing =
  | 'settings'
  | 'displayname'
  | 'displayPicture'
  | 'password';

type SettingsContextType = {
  showing: CurrentlyShowing;
  setCurrentlyShowing: (showing: CurrentlyShowing) => void;
};

export const SettingsContext = createContext<SettingsContextType>({
  showing: 'settings',
  setCurrentlyShowing: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const SettingsProvider: FC<Props> = ({ children }) => {
  const [showing, setShowing] = useState<CurrentlyShowing>('settings');

  const setCurrentlyShowing = (showing: CurrentlyShowing) => {
    setShowing(showing);
  };

  return (
    <SettingsContext.Provider
      value={{
        showing,
        setCurrentlyShowing,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettingsContext = () => useContext(SettingsContext);
