import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { Reminder } from '../../types/FirebaseTypes';

export const remindersRef = collection(db, 'reminders'); // * Gets the collection of reminders.

export const createReminder_DB = async ({
  title,
  description,
  remindAt,
}: Reminder) => {
  try {
    const user = await auth.currentUser;
    if (!user) return console.log('No user');
    const reminder = await addDoc(remindersRef, {
      title: title,
      description: description,
      createdBy: user.uid,
      remindAt: remindAt,
    });
    return {
      title: title,
      description: description,
      createdBy: user.uid,
      remindAt: remindAt,
      id: reminder.id,
    };
  } catch (Error) {
    console.log(Error);
  }
};

export const removeReminder_DB = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'reminders', id));
  } catch (e) {
    console.log(e);
  }
};

export const updateReminder_DB = async (id: string, data: Reminder) => {
  try {
    await updateDoc(doc(db, 'reminders', id), data);
  } catch (e) {
    console.log(e);
  }
};
