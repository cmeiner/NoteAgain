import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { Reminder } from '../../types/FirebaseTypes';

export const remindersRef = collection(db, 'reminders'); // * Gets the collection of reminders.

export const createReminder = async ({
  title,
  description,
  remindAt,
}: Reminder) => {
  try {
    const user = await auth.currentUser;
    if (!user) return console.log('No user'); // TODO Do something more useful here, maybe send user to login page?
    await addDoc(remindersRef, {
      title: title,
      description: description,
      createdBy: user.uid,
      remindAt: remindAt,
    });
    // TODO Create a nice toast message that a reminder is created.
  } catch (Error) {
    console.log(Error);
  }
};

export const removeReminder = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'reminders', id));
    console.log('Reminder Removed');
  } catch (e) {
    console.log(e);
  }
};
