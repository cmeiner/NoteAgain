import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { TodoList } from '../../types/FirebaseTypes';

export const todoRef = collection(db, 'todos'); // * Gets the collection of todos.

export const createTodo = async ({ title, items, createdBy }: TodoList) => {
  try {
    const user = await auth.currentUser;
    if (!user) return console.log('No user'); // TODO Do something more useful here, maybe send user to login page?
    await addDoc(todoRef, {
      title: title,
      items: items,
      createdBy: user.uid,
    });
    // TODO Create a nice toast message that a reminder is created.
  } catch (Error) {
    console.log(Error);
  }
};
