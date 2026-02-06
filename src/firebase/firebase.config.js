import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBQktWtgM1k_QDfmk9mI76M_mZp5ATwiL4",
  authDomain: "greennest-bf8f3.firebaseapp.com",
  projectId: "greennest-bf8f3",
  storageBucket: "greennest-bf8f3.firebasestorage.app",
  messagingSenderId: "372802459982",
  appId: "1:372802459982:web:4405da039908b83825e61f"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
