import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { getDbTools } from "../api/db";

const { fireDb: db } = getDbTools();

const fetchData = async () => {
  const querySnapshot = await getDocs(collection(db, "todos"));
  const todos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return todos;
}

const addTodoToDb = async (todo) => {
  const docRef = await addDoc(collection(db, "todos"), todo);
  console.log("Document written with ID: ", docRef.id);
  return docRef;
}

const updateTodoInDb = async (id, data) => {
  const docRef = doc(db, "todos", id);
  await updateDoc(docRef, data);
  console.log("Updated document with ID: ", docRef.id);
}

const deleteTodoFromDb = async (id) => {
  const docRef = doc(db, "todos", id);
  await deleteDoc(docRef);
  console.log("Deleted document with ID: ", docRef.id);
}

export { fetchData, addTodoToDb, updateTodoInDb, deleteTodoFromDb }
