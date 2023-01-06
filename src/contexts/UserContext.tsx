import React, { createContext, FC, ReactNode, useContext } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';

type UserContextType = {
  updateDisplayName: (newDisplayName: string) => void;
};

export const UserContext = createContext<UserContextType>({
  updateDisplayName: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
  const auth = getAuth();

  const updateDisplayName = (newDisplayName: string) => {
    updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    })
      .then(() => {
        console.log('Display Name Changed');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        updateDisplayName,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const userContext = () => useContext(UserContext);
