import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { db } from '../../config/firebaseConfig';
import { loginUser } from '../../hooks/firebase/UserHooks';
import { checkUserData, getUserData } from '../../hooks/StorageHooks';

type UserContextType = {
  updateUserDisplayName: (newDisplayName: string) => void;
  updateUserEmail: (newEmail: string, password: string) => void;
  updateUserPassword: (newPassword: string) => void;
  isLoggedIn: boolean;
  updateLoggedIn: (status: boolean) => void;
};

export const UserContext = createContext<UserContextType>({
  updateUserDisplayName: () => undefined,
  updateUserEmail: () => undefined,
  updateUserPassword: () => undefined,
  isLoggedIn: false,
  updateLoggedIn: () => undefined,
});

type Props = {
  children: ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const updateLoggedIn = (status: boolean) => {
    setIsLoggedIn(status);
  };

  useEffect(() => {
    checkUserData().then((boolean) => {
      if (boolean) {
        getUserData().then((data) => {
          loginUser(data).then(() => {
            setIsLoggedIn(true);
          });
        });
      }
    });
  }, [isLoggedIn]);

  const auth = getAuth();

  const updateUserDisplayName = (newDisplayName: string) => {
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
        const data = { email: newEmail, password };
        loginUser(data);
        console.log('Email updated to' + newEmail);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserPassword = (newPassword: string) => {
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        console.log('password updated');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <UserContext.Provider
      value={{
        updateLoggedIn,
        isLoggedIn,
        updateUserDisplayName,
        updateUserEmail,
        updateUserPassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
