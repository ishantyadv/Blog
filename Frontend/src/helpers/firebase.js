import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:('AIzaSyAGhgs5frR55E6oGRHywkrLKhQVVROT8fU'),
  authDomain: "mern-blog-884bc.firebaseapp.com",
  projectId: "mern-blog-884bc",
  storageBucket: "mern-blog-884bc.firebasestorage.app",
  messagingSenderId: "389478098948",
  appId: "1:389478098948:web:b640d110ac190609ae2d51"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider }