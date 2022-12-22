import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth';
import { collection, doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';

type UserProps = {
  email: string;
  displayName?: string;
  password: string;
};

// export const usePost = async (api: string, data: object) => {
//   await setDoc(doc(collection(db, api)), data);
//   console.log(data, "added to the database");
// };

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
};

export const loginUser = async ({ email, password }: UserProps) => {
  try {
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // TODO Create a nice toast message alerting that the user is signed in.
    // TODO Send the user to their profile page.
    console.log(userCredentials);
  } catch (error) {
    // TODO Create a nice toast message alerting the error.
    console.log(error);
  }
  console.log(auth.currentUser);
};
