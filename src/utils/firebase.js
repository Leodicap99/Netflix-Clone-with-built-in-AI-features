// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBhI5-47_b817ydBD8J6GAsPWhVzoSm5Io",
  authDomain: "netflixgpt-caf21.firebaseapp.com",
  projectId: "netflixgpt-caf21",
  storageBucket: "netflixgpt-caf21.appspot.com",
  messagingSenderId: "620456726840",
  appId: "1:620456726840:web:51f7221c3cca37db8571cd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();