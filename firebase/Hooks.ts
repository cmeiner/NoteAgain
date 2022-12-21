import { collection, doc, setDoc } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const usePost = async (api: string, data: object) => {
  await setDoc(doc(collection(db, api)), data);
  console.log(data, "added to the database");
};
