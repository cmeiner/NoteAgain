import {
  getAuth,
  updateEmail,
  updatePassword,
  updateProfile,
} from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
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
import { UserType } from '../../types/FirebaseTypes';

type UserContextType = {
  updateUserDisplayName: (newDisplayName: string) => void;
  updateUserEmail: (newEmail: string, password: string) => void;
  updateUserPassword: (newPassword: string) => void;
  isLoggedIn: boolean;
  updateLoggedIn: (status: boolean) => void;
  getUser: () => void;
  currentUser: UserType;
};

export const UserContext = createContext<UserContextType>({
  updateUserDisplayName: () => undefined,
  updateUserEmail: () => undefined,
  updateUserPassword: () => undefined,
  isLoggedIn: false,
  updateLoggedIn: () => undefined,
  getUser: () => undefined,
  currentUser: {},
});

type Props = {
  children: ReactNode;
};

export const UserProvider: FC<Props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState<UserType>();

  const updateLoggedIn = (status: boolean) => {
    setIsLoggedIn(status);
  };

  useEffect(() => {
    checkUserData().then((boolean) => {
      if (boolean) {
        getUserData().then((data) => {
          loginUser(data).then(() => {
            getUser();
            setIsLoggedIn(true);
          });
        });
      }
    });
  }, [isLoggedIn]);

  const auth = getAuth();

  const getUser = async () => {
    const docRef = doc(db, 'users', auth.currentUser.uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const UserData = docSnap.data();
      setCurrentUser(UserData);
    } else {
      console.log('No such document!');
    }
  };

  const updateUserDisplayName = (newDisplayName: string) => {
    updateProfile(auth.currentUser, {
      displayName: newDisplayName,
    })
      .then(async () => {
        console.log('Display name changed');
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
        console.log('E-mail updated to' + newEmail);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUserPassword = (newPassword: string) => {
    updatePassword(auth.currentUser, newPassword)
      .then(() => {
        console.log('Password updated');
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
        currentUser,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
