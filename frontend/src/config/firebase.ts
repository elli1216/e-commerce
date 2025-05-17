import { type FirebaseApp, initializeApp } from 'firebase/app';
import Cookies from "js-cookie";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';

const firebaseConfig: Record<string, string> = {
  apiKey: "AIzaSyCmiIpsrOiA5ZUREQ1hkZlMTqXt-T1xz9A",
  authDomain: "e-commerce-115bf.firebaseapp.com",
  projectId: "e-commerce-115bf",
  storageBucket: "e-commerce-115bf.firebasestorage.app",
  messagingSenderId: "976882683653",
  appId: "1:976882683653:web:9b188500a1ac7a851b716c",
  measurementId: "G-WCNSM6ZDV8"
};

// Initialize Firebase

const app: FirebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(app);

// Functions

export const signup = async (
  email: string, password: string
): Promise<void> => {
  try {
    const userCredential =
      await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Successfully created a new user
    console.log('User created:', user);

  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

export const login = async (
  email: string, password: string
): Promise<void> => {
  try {
    const userCredential =
      await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // save the user in localstorage
    localStorage.setItem('user', JSON.stringify(user))

    // save the access token in cookie
    const token = await user.getIdToken();
    Cookies.set('token', token, { expires: 30 });

    console.log('User logged in:', user);
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

export const logout = async () => {
  await signOut(auth);
}