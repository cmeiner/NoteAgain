import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../../config/firebaseConfig';
import { Share } from '../../types/FirebaseTypes';
export const sharesRef = collection(db, 'shares'); // * Gets the collection of reminders.

export const shareItem_db = async (itemID, itemType, receiverEmail) => {
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
      itemType: itemType,
      receiverID: receiverUser.id,
      status: 'pending',
    };
    await addDoc(sharesRef, sharesData);
  } catch (e) {
    return;
  }
};

export const updateStatus_db = async (shareID: string) => {
  const docRef = doc(db, 'shares', shareID);
  const docData = (await getDoc(docRef)).data();
  const updatedData = docData;
  updatedData.status = 'accepted';
  updateDoc(docRef, updatedData).then(() => console.log('data updated.'));
};

export const declineShare = async (shareID: string) => {
  const docRef = doc(db, 'shares', shareID);
  deleteDoc(docRef);
};
