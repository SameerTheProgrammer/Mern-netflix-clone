import firebase from 'firebase/app';
import 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyBjlNG5FLT-XG4SvLXDnPfR_VVY9LpCy_0",
  authDomain: "mern-netflix-clone-ba7de.firebaseapp.com",
  projectId: "mern-netflix-clone-ba7de",
  storageBucket: "mern-netflix-clone-ba7de.appspot.com",
  messagingSenderId: "328437739861",
  appId: "1:328437739861:web:5b94832637fc525c90ffdc",
  measurementId: "G-4J3VN7DQWB"
};

firebase.initializeApp(firebaseConfig);
const storage = firebase.storage().ref();
export default storage;



