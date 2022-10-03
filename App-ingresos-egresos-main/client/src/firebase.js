/// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBotmJsWmYUGsop3p9Tj1iBAt7oPIk27So",
  authDomain: "api-ingresos-egresos.firebaseapp.com",
  databaseURL: "https://api-ingresos-egresos-default-rtdb.firebaseio.com",
  projectId: "api-ingresos-egresos",
  storageBucket: "api-ingresos-egresos.appspot.com",
  messagingSenderId: "835395366806",
  appId: "1:835395366806:web:82d7852bb0a11ca113b7b7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);