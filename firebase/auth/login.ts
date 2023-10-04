import firebase_app from '../config';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';

type LoginParams = {
  email: string;
  password: string;
};

const auth = getAuth(firebase_app);

export default async function login(email: string, password: string) {
  let result = null,
    error = null;
  try {
    result = await signInWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e;
  }

  return { result, error };
}
