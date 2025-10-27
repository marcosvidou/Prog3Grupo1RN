import app from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD_hxQ2PR8wJ_hQ6_F3dAFyRHx-ET51_uU",
    authDomain: "prog3grupo1.firebaseapp.com",
    projectId: "prog3grupo1",
    storageBucket: "prog3grupo1.firebasestorage.app",
    messagingSenderId: "1004265348232",
    appId: "1:1004265348232:web:e8a4905bddc2804a5e133d"
};

app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = app.storage();
export const db = app.firestore();