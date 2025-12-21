import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';

const UserLayOut = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Fixed Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <Navbar />
      </header>

      {/* Main Content */}
      <main className="flex-grow md:px-5 pt-16">
        {/* pt-16 ensures content starts below navbar */}
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="mt-5">
        <Footer />
      </footer>
    </div>
  );
};

export default UserLayOut;
