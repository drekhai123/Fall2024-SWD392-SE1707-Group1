// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4dM9KennpVJURBJPV35GbrFIIg6dRjG0",
  authDomain: "kods-online.firebaseapp.com",
  projectId: "kods-online",
  storageBucket: "kods-online.appspot.com",
  messagingSenderId: "171767902783",
  appId: "1:171767902783:web:dd4511010281fb0d81be8a",
  measurementId: "G-CW1WXMRH1C"
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);
export const storage = getStorage(firebaseApp); // Initialize Firebase Storage
