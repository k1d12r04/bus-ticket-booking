import firebase_app from '../config';
import {
  signInWithEmailAndPassword,
  getAuth,
  UserCredential,
} from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function login(
  email: string,
  password: string
): Promise<UserCredential> {
  return signInWithEmailAndPassword(auth, email, password);
}
