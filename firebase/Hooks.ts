import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore";
import { FormEvent } from "react";
import { auth, db } from "./firebaseConfig";

type UserProps = {
  email: string;
  displayName: string;
  password: string;
};

export const usePost = async (api: string, data: any) => {
  await setDoc(doc(collection(db, api)), data);
  console.log(data, "added to the database");
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
  await updateProfile(auth.currentUser!, {
    displayName: displayName,
    // TODO Add Profile Picture
  });
  // TODO Create a nice toast message alerting the user that the account is created.
  // TODO Send the user to the main page after user is created.
};

export const loginUser = async ({ email, password }: UserProps) => {
  try {
    let userCredentials = await signInWithEmailAndPassword(
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
};
