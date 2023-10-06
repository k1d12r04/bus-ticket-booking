'use client';

import { useAuthContext } from '@/context/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import Container from '@/components/Container';

export default function HomePage() {
  const authContext = useAuthContext();

  useEffect(() => {
    if (authContext?.user == null) {
      redirect('/register');
    }
  }, [authContext?.user]);

  return (
    <main>
      <Container>
        <h2 className="text-center text-2xl mt-10">BİLETBUL</h2>
      </Container>
    </main>
  );
}
