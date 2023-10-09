import firebase_app from '../config';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

type UserDataType = {
  email: string;
  id: string;
  gender: string;
  name: string;
  password: string;
  surname: string;
  birthDate: Date;
};

const db = getFirestore(firebase_app);
export default async function getData(collection: string, id: string) {
  let docRef = doc(db, collection, id);

  let result = null;
  let error = null;
  let data = null;

  try {
    result = await getDoc(docRef);
    if (result.exists()) {
      data = result.data() as UserDataType;
    }
  } catch (e) {
    error = e;
  }

  return { result, data, error };
}
