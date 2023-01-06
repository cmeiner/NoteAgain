import React, { createContext, FC, ReactNode, useContext } from 'react';
import { getAuth, updateProfile, updateEmail } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { loginUser } from '../../hooks/firebase/UserHooks';

type UserContextType = {
  updateDisplayName: (newDisplayName: string) => void;
  updateUserEmail: (newEmail: string, password: string) => void;
};

export const UserContext = createContext<UserContextType>({
  updateDisplayName: () => undefined,
  updateUserEmail: () => undefined,
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
      .then(async () => {
        console.log('Display Name Changed');
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { displayName: newDisplayName });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserEmail = (newEmail: string, password: string) => {
    updateEmail(auth.currentUser, newEmail)
      .then(async () => {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        await updateDoc(userRef, { email: newEmail });
        loginUser(newEmail, password);

        console.log('Email updated to' + newEmail);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        updateDisplayName,
        updateUserEmail,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const userContext = () => useContext(UserContext);
