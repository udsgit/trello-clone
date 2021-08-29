import firebase from "firebase/app";

import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FB_API_KEY,
    authDomain: "trello-clone-3e025.firebaseapp.com",
    projectId: "trello-clone-3e025",
    storageBucket: "trello-clone-3e025.appspot.com",
    messagingSenderId: "43740531409",
    appId: "1:43740531409:web:2cf9560636a871190d53f0"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

export { auth, db, firebase }