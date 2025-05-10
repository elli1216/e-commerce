import { type FirebaseApp, initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
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
const auth = getAuth(app);

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
  }
}

export const getCurrentUser = (): void => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
      console.log(currentUser.uid);
    }
  });
}