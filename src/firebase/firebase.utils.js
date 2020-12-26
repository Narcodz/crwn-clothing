import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyCwCATrc8Itq31cbK-NT-dg1lWbMmurb6w",
    authDomain: "crwn-db-f34c4.firebaseapp.com",
    databaseURL: "https://crwn-db-f34c4-default-rtdb.firebaseio.com",
    projectId: "crwn-db-f34c4",
    storageBucket: "crwn-db-f34c4.appspot.com",
    messagingSenderId: "849481017961",
    appId: "1:849481017961:web:a866a4994c4609e9ecd0f8",
    measurementId: "G-2NZ5E11LQE"
  };

export const createUserProfileDocument = async (userAuth, addionalData) => {
  if(!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);//getting refernce data of authenticated user
  const snapShot = await userRef.get();//getting snapshot of authenticated user

  console.log('user obj',snapShot);

  if(!snapShot.exists){
    const {displayName, email} = userAuth;
    const createAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createAt,
        ...addionalData
      });
    }
  
    catch(error){
      console.log('error creating user', error.message);
    }
  }
 
  return userRef; // userRef is object in createUserProfileDocument method 
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

