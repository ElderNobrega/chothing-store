import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite'; // collection, getDocs
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyCxtSBYBkSeY-GPEAKcfHzDi5P-PkHESdo",
  authDomain: "crwn-db-204ae.firebaseapp.com",
  projectId: "crwn-db-204ae",
  storageBucket: "crwn-db-204ae.appspot.com",
  messagingSenderId: "675295795179",
  appId: "1:675295795179:web:1ff7b6ab530d5f98e02bae",
  measurementId: "G-D8JVCD5QWT"
}

const firebase = initializeApp(config);

export const auth = getAuth();
export const firestore = getFirestore(firebase);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, provider);

export default firebase;