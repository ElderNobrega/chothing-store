import { initializeApp } from 'firebase/app';
import { getFirestore, getDoc, doc, setDoc, collection, writeBatch } from 'firebase/firestore'; // 
import { getAuth, GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
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

export const createUserProfileDucument = async (userAuth, additionalData) => {
  
  if (!userAuth) { return }
  
  const userRef = doc(firestore, `users/${userAuth.uid}`)

  const snapShot = await getDoc(userRef)

  if (!snapShot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userRef, {
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch (error) {
      console.log('error creating user', error.message)
    }
  }
  return userRef
}

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(firestore, collectionKey)

  const batch = writeBatch(firestore)
  objectsToAdd.forEach(obj => {
    const newDocRef = doc(collectionRef)
    batch.set(newDocRef, obj)
  })
  return await batch.commit()
}

export const signUp = async (email, password) => {
  signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    return user
  })
}

export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(docSnapshot => {
    const { title, items } = docSnapshot.data()

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: docSnapshot.id,
      title,
      items
    }
  })
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection
    return accumulator
  }, {})
}

export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = getAuth();
export const firestore = getFirestore(firebase);

export const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => signInWithPopup(auth, googleProvider);

export default firebase;