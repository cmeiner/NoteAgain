import { fetchSignInMethodsForEmail } from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { reminder } from '../../assets';
import { auth, db } from '../../config/firebaseConfig';
import { remindersRef } from './ReminderHooks';

export const shareItem_db = async (itemID, itemType: string, receiverEmail) => {
  const users = [];

  const querySnapshot = await getDocs(collection(db, 'users'));
  querySnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });

  try {
    const receiverUser = users.find((doc) => doc.email === receiverEmail);
    if (itemType === 'reminder') {
      const docRef = doc(db, 'reminders', itemID);
      const reminder = await getDoc(docRef);
      const newData = await reminder.data();
      const isSharedWithUser = newData.sharedWith.find(
        (sharedItem) => sharedItem.receiverID === receiverUser.id
      );
      if (isSharedWithUser) return console.log('Already shared with this user');
      newData.sharedWith = [
        ...newData.sharedWith,
        {
          receiverID: receiverUser.id,
          status: 'pending',
        },
      ];
      updateDoc(docRef, newData);
    }
  } catch (e) {
    console.log(e);
  }
};
