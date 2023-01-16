import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { TodoList } from '../../types/FirebaseTypes';

export const todoRef = collection(db, 'todos'); // * Gets the collection of todos.

export const createTodo_DB = async ({ title, items }: TodoList) => {
  try {
    const user = await auth.currentUser;
    if (!user) return console.log('No user'); // TODO Do something more useful here, maybe send user to login page?
    const todo = await addDoc(todoRef, {
      title: title,
      items: items,
      createdBy: user.uid,
    });
    return { title: title, items: items, createdBy: user.uid, id: todo.id };
    // TODO Create a nice toast message that a reminder is created.
  } catch (Error) {
    console.log(Error);
  }
};

export const removeTodo_DB = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'todos', id));
    console.log('Todo Removed');
  } catch (e) {
    console.log(e);
  }
};

export const updateTodo_DB = async (id: string, data: TodoList) => {
  try {
    await updateDoc(doc(db, 'todos', id), data);
    console.log('Todo Updated');
  } catch (e) {
    console.log(e);
  }
};

// const washingtonRef = doc(db, 'cities', 'DC');

// // Set the "capital" field of the city 'DC'
// await updateDoc(washingtonRef, {
//   capital: true,
// });
