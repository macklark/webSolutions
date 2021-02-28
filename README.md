# webSolutions
developers blogging site

Install node modules before
```
nppm install
```

Create tailwind config file
```
npx tailwindcss init -p
```

Create backend - 
[firebase](https://firebase.google.com/)

Create a config file to house your firebase API key
```
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: '........',
  authDomain: "........",
  projectId: "........",
  storageBucket: ".........",
  messagingSenderId: "...........",
  appId: "...............",
}

firebase.initializeApp(firebaseConfig);

const firebaseAuth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider()

const firestoreStorage = firebase.firestore();
const timer = firebase.firestore.FieldValue.serverTimestamp
const union = firebase.firestore.FieldValue.arrayUnion
const remove = firebase.firestore.FieldValue.arrayRemove

export { firebaseAuth, provider  ,firestoreStorage, timer, union, remove };
```
