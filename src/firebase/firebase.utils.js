import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const config = {
  apiKey: "AIzaSyCxtSBYBkSeY-GPEAKcfHzDi5P-PkHESdo",
  authDomain: "crwn-db-204ae.firebaseapp.com",
  projectId: "crwn-db-204ae",
  storageBucket: "crwn-db-204ae.appspot.com",
  messagingSenderId: "675295795179",
  appId: "1:675295795179:web:1ff7b6ab530d5f98e02bae",
  measurementId: "G-D8JVCD5QWT"
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;