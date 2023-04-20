import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, where, query, onSnapshot } from "firebase/firestore";
import { getFireAgents } from "../api/fireAgents";

const { fireDb: db, dbRef } = getFireAgents();

const fetchData = async (uid) => {
  const dataQuery = query(collection(db, "todos"), where("uid", "==", uid));
  const querySnapshot = await getDocs(dataQuery);
  const todos = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  return todos;
}

const subscribeToChangesInDb = async (uid, callback) => {
  const dataQuery = query(collection(db, "todos"), where("uid", "==", uid));
  const unsubscribe = onSnapshot(dataQuery, (querySnapshot) => {
    const todos = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(todos);
  });

  return unsubscribe;
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

export { fetchData, subscribeToChangesInDb, addTodoToDb, updateTodoInDb, deleteTodoFromDb }
