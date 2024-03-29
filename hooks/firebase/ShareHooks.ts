import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { ItemType, Share } from '../../types/FirebaseTypes';

export const sharesRef = collection(db, 'shares'); // * Gets the collection of shares.

export const shareItem_db = async (
  itemID: string,
  itemType: ItemType,
  receiverEmail: string
) => {
  const users = [];
  const shares = [];
  const usersSnapshot = await getDocs(collection(db, 'users'));
  usersSnapshot.forEach((doc) => {
    users.push({
      ...doc.data(),
      id: doc.id,
    });
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
      author: auth.currentUser.displayName,
      status: 'pending',
    };
    await addDoc(sharesRef, sharesData);
    return sharesData;
  } catch (e) {
    console.log(e);
  }
};

export const updateStatus_db = async (shareID: string) => {
  const docRef = doc(db, 'shares', shareID);
  const docData = (await getDoc(docRef)).data();
  const updatedData = docData;
  updatedData.status = 'accepted';
  updateDoc(docRef, updatedData);
};

export const declineShare = async (shareID: string) => {
  const docRef = doc(db, 'shares', shareID);

  deleteDoc(docRef);
};
