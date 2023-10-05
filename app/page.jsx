'use client';

import { useAuthContext } from '../context/AuthContext';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { user } = useAuthContext();

  useEffect(() => {
    if (user == null) {
      redirect('/register');
    }
  }, [user]);

  return (
    <main>
      <h2>Bus ticket app</h2>
      <h2>Only authorized users</h2>
    </main>
  );
}
