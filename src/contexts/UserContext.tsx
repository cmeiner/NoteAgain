import React, { createContext, FC, ReactNode, useContext } from 'react';
import { getAuth, updateProfile } from 'firebase/auth';

type UserContextType = {
  updateDisplayName: (NewDisplayName: string) => void;
};

export const UserContext = createContext<UserContextType>({
  updateDisplayName: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
  const auth = getAuth();

  const updateDisplayName = (NewDisplayName: string) => {
    updateProfile(auth.currentUser, {
      displayName: NewDisplayName,
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
