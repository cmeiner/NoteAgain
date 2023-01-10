import { fetchSignInMethodsForEmail } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Share } from '../../types/FirebaseTypes';
export const sharesRef = collection(db, 'shares'); // * Gets the collection of reminders.

export const shareItem_db = async (itemID, receiverEmail) => {
  const users = [];
  const shares = [];
  const usersSnapshot = await getDocs(collection(db, 'users'));
  usersSnapshot.forEach((doc) => {
    users.push({ ...doc.data(), id: doc.id });
  });

  const sharesSnapshot = await getDocs(collection(db, 'shares'));
  sharesSnapshot.forEach((doc) => {
    shares.push({ ...doc.data(), id: doc.id });
  });

  try {
    const receiverUser = users.find((doc) => doc.email === receiverEmail);
    const boolean = shares.find(
      (sharedItem) =>
        sharedItem.receiverID === receiverUser.id &&
        sharedItem.itemID === itemID
    );
    if (boolean) return console.log('Already shared with user');
    const sharesData: Share = {
      itemID: itemID,
      receiverID: receiverUser.id,
      status: 'pending',
    };
    await addDoc(sharesRef, sharesData);
  } catch (e) {
    return;
  }
};
