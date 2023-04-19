import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

let fireApp, fireDb;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC_TX8TRwqaTVmRkleP1XlPuCMZToHbnmU",
  authDomain: "todo-app-71bd3.firebaseapp.com",
  projectId: "todo-app-71bd3",
  storageBucket: "todo-app-71bd3.appspot.com",
  messagingSenderId: "482991704317",
  appId: "1:482991704317:web:5f22f2bd427317e73ed694"
};

const getDbTools = () => {
  if (!fireApp) {
    fireApp = initializeApp(firebaseConfig);
    fireDb = getFirestore(fireApp);
  }
  return { fireApp, fireDb };
}

export { getDbTools }
