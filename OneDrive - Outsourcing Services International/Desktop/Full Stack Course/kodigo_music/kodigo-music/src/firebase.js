import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

//firebase configs

const firebaseConfig = {
  apiKey: "AIzaSyD9HyZz8569aAt35LmkSTciGBcLkoOWaUk",
  authDomain: "kodigo-music-1cdba.firebaseapp.com",
  projectId: "kodigo-music-1cdba",
  storageBucket: "kodigo-music-1cdba.firebasestorage.app",
  messagingSenderId: "312172584170",
  appId: "1:312172584170:web:08837ea36ba0922fdd8b93"
};

//inicializar firebase
const app = initializeApp(firebaseConfig);

//inicializar servicios
export const auth = getAuth(app);
export default app;






