import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { auth, db } from '../../config/firebaseConfig';
import { Todo, TodoList } from '../../types/FirebaseTypes';

export const todoRef = collection(db, 'todos'); // * Gets the collection of to-dos.

export const createTodo_DB = async ({ title, items }: TodoList) => {
  try {
    const user = await auth.currentUser;
    if (!user) return console.log('No user');
    const todo = await addDoc(todoRef, {
      title: title,
      items: items,
      createdBy: user.uid,
    });
    return { title: title, items: items, createdBy: user.uid, id: todo.id };
  } catch (Error) {
    console.log(Error);
  }
};

export const removeTodo_DB = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'todos', id));
    console.log('To-do Removed');
  } catch (e) {
    console.log(e);
  }
};

export const updateTodo_DB = async (id: string, data: TodoList) => {
  try {
    await updateDoc(doc(db, 'todos', id), data);
    console.log('To-do Updated');
  } catch (e) {
    console.log(e);
  }
};

export const updateCheckedTodo_DB = async (itemList: Todo[], id: string) => {
  const todosRef = doc(db, 'todos', id);
  await updateDoc(todosRef, {
    items: itemList,
  });
};
