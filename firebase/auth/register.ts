import firebase_app from '../config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  UserCredential,
} from 'firebase/auth';

const auth = getAuth(firebase_app);

export default async function register(
  email: string,
  password: string
): Promise<UserCredential> {
  return createUserWithEmailAndPassword(auth, email, password);
}
