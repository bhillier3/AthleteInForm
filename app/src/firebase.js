import firebase from 'firebase/app';
import 'firebase/analytics';
// import 'firebase/auth';
import 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwfOJWrEwhyKliTeqsznIuuLV-4fq3Uuk",
  authDomain: "athleteinform.firebaseapp.com",
  projectId: "athleteinform",
  storageBucket: "athleteinform.appspot.com",
  messagingSenderId: "338007035858",
  appId: "1:338007035858:web:a21a76eb366f6d6a3d020b",
  measurementId: "G-9RRT96GRKZ"
};

firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();

export default firebase;