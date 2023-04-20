import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFireAgents } from '../api/fireAgents';

const { fireAuth: auth } = getFireAgents();


const signInFlow = async () => {
  const provider = new GoogleAuthProvider();
  const userCreds = await signInWithPopup(auth, provider)
  return userCreds.user;
}

const signOuFlow = () => {
  signOut(auth);
}

const handleAuthStateChange = (callback) => {

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    console.log(user)
    callback(user);
  });

  return unsubscribe;
}


export { signInFlow, signOuFlow, handleAuthStateChange }
