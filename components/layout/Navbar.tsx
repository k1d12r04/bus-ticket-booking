'use client';

import { Button } from '@/components/ui/button';
import { getAuth, signOut } from 'firebase/auth';
import firebase_app from '@/firebase/config';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const router = useRouter();
  const auth = getAuth(firebase_app);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/register');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-end my-5 mx-32">
      <Button onClick={handleLogout}>Çıkış yap</Button>
    </section>
  );
};
export default Navbar;
