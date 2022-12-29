import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { useContext } from 'react';
import { auth, db } from '../../config/firebaseConfig';
import { AuthContext } from '../../src/auth/AuthContext';
import { storeUserData } from '../StorageHooks';

type UserProps = {
  email: string;
  displayName: string;
  password: string;
};

// export const usePost = async (api: string, data: object) => {
//   await setDoc(doc(collection(db, api)), data);
//   console.log(data, "added to the database");
// };

export const GetUser = () => {
  const { currentUser } = useContext(AuthContext);
  const user = { ...(currentUser as UserProps) };
  return { user };
};

export const registerUser = async ({
  email,
  password,
  displayName,
}: UserProps) => {
  await createUserWithEmailAndPassword(auth, email, password);
  await setDoc(doc(db, `users/${auth.currentUser?.uid}`), {
    // TODO Add Profile Picture
    displayName: displayName,
    email: email,
  });
  auth.currentUser
    ? await updateProfile(auth.currentUser, {
        displayName: displayName,
        // TODO Add Profile Picture
      })
    : null;
  // TODO Create a nice toast message alerting the user that the account is created.
  // TODO Send the user to the main page after user is created.
  console.log('sucessful register');
};

export const loginUser = async ({ email, password }: UserProps) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    storeUserData(email, password);

    // TODO Create a nice toast message alerting that the user is signed in.
    // TODO Send the user to their profile page.
    return 'Success';
  } catch (error) {
    // TODO Create a nice toast message alerting the error.
    const errorMessage =
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/wrong-password'
        ? 'Wrong Email or Password'
        : 'No account found';
    return errorMessage;
  }
};
