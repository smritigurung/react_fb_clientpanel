import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase"; // npm i firebase
import "firebase/firestore";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// Reducers
// @todo

// Go to Firebase Google and on the left side bar, click "Project Overview" and click on "</>" sign
// Register your web app and give your project name for example "React Client Panel", and copy the firebaseConfig objects and paste it in here
const firebaseConfig = {
  apiKey: "AIzaSyBwHxPzij3WSBRwUG0bdDFyVlCcYY-Ju_A",
  authDomain: "reactclientpanel-8a56e.firebaseapp.com",
  projectId: "reactclientpanel-8a56e",
  storageBucket: "reactclientpanel-8a56e.appspot.com",
  messagingSenderId: "1015396607622",
  appId: "1:1015396607622:web:bddd75317d1bbc41fc5307",
  measurementId: "G-2VD80NVDGN",
};

// Got this from react-redux-firebase config on Github
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize firestore
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase)
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

// Create initial state
const initialState = {};

// Create store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reduxFirestore(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
