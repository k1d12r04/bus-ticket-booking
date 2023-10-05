import firebase_app from '../config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  AuthError,
} from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function register(email: string, password: string) {
  let result = null;
  let error: AuthError | null = null;
  try {
    result = await createUserWithEmailAndPassword(auth, email, password);
  } catch (e) {
    error = e as AuthError;
  }

  return { result, error };
}
