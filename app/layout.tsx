import './globals.css';
import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import { AuthContextProvider } from '../context/AuthContext';
import { Toaster } from '@/components/ui/toaster';

const manrope = Manrope({ subsets: ['latin'], weight: ['500', '600', '700'] });

export const metadata: Metadata = {
  title: 'Bibilet',
  description: 'Otobüs bileti satın alma uygulaması',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr">
      <body className={manrope.className}>
        <AuthContextProvider>
          {children}
          <Toaster />
        </AuthContextProvider>
      </body>
    </html>
  );
}
