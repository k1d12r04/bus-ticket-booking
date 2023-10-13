import Navbar from '@/components/layout/Navbar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <nav>
        <Navbar />
      </nav>
      {children}
    </div>
  );
}
