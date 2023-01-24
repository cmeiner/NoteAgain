import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { showToast } from '../../src/utils/constants/ToastHelper';
import { UserType } from '../../types/FirebaseTypes';
import { resetUserData, storeUserData } from '../StorageHooks';

export const registerUser = async ({
  email,
  password,
  displayName,
}: UserType) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    await setDoc(doc(db, `users/${auth.currentUser?.uid}`), {
      // TODO Add Profile Picture
      displayName: displayName,
      email: email,
      profilePicture: '',
    });
    auth.currentUser
      ? await updateProfile(auth.currentUser, {
          displayName: displayName,
          // TODO Add Profile Picture
        })
      : null;
    // TODO Create a nice toast message alerting the user that the account is created.
    // TODO Send the user to the main page after user is created.
    return 'Success';
  } catch (error) {
    const errorMessage =
      error.code === 'auth/email-already-in-use'
        ? 'Account already found'
        : 'Error';
    return errorMessage;
  }
};

export const loginUser = async ({ email, password }: UserType) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    storeUserData(email, password);

    // TODO Create a nice toast message alerting that the user is signed in.
    // TODO Send the user to their profile page.
    return 'Success';
  } catch (error) {
    // TODO Create a nice toast message alerting the error.
    const errorMessage =
      error.code === 'auth/invalid-email' ||
      error.code === 'auth/wrong-password'
        ? 'Wrong e-mail or password'
        : 'No account found';
    return errorMessage;
  }
};

export const logOutUser = async () => {
  try {
    await signOut(auth);
    showToast('logoutSuccesful');
    resetUserData();
    return 'Success';
  } catch (error) {
    return 'Error';
  }
};
