import Footer from './Footer';

export default function Layout({ children }) {
  return (
    <div className="relative">
      <main className="flex relative flex-col justify-center items-center min-h-screen font-normal">
        {children}

        <Footer />
      </main>
    </div>
  );
}
