import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';
import Logo from '../../assets/Logo/logo_cc.png';
import useUserStore from '../../store/useUserStore';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

const Navbar = () => {
  const { user, removeUser } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Colleges', path: '/colleges' },
    { name: 'Admission', path: '/admission' },
    { name: 'My College', path: '/myCollege' },
  ];

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      removeUser();
    } catch (error) {
      console.error('Sign out failed:', error);
    }
  };

  const getAvatar = () => {
    if (user?.avatar) {
      return (
        <img src={user.avatar} alt="Profile" className="h-8 w-8 rounded-full" />
      );
    }

    if (user?.name) {
      return (
        <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
          {user.name.charAt(0).toUpperCase()}
        </div>
      );
    }

    return null;
  };

  return (
    <nav className="bg-background shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Link to="/">
              <img src={Logo} alt="Campus Connect" className="h-10 w-10" />
            </Link>
            <span className="text-textPrimary font-bold text-xl">
              CampusConnect
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  isActive
                    ? 'text-primary font-semibold'
                    : 'text-textPrimary hover:text-primary font-medium'
                }
              >
                {link.name}
              </NavLink>
            ))}

            {/* Auth / Profile */}
            {user ? (
              <div className="flex items-center space-x-2">
                <Link
                  to="/profile"
                  className="flex items-center space-x-2 font-medium text-textPrimary hover:text-primary"
                >
                  <span>{user.name}</span>
                  {getAvatar()}
                </Link>
                <button
                  onClick={handleSignOut}
                  className="px-3 py-1 font-medium rounded bg-red-500 text-white hover:bg-red-600 transition"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex space-x-3">
                <Link
                  to="/login"
                  className="px-3 py-1 font-medium rounded hover:bg-primary hover:text-white transition"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-3 py-1 font-medium rounded bg-primary text-white hover:bg-blue-800 transition"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggleMenu} className="text-textPrimary">
              {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-background px-4 pt-2 pb-3 space-y-1 shadow-md">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.path}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                isActive
                  ? 'block px-3 py-2 rounded bg-primary text-white font-semibold'
                  : 'block px-3 py-2 rounded text-textPrimary hover:bg-primary hover:text-white'
              }
            >
              {link.name}
            </NavLink>
          ))}

          {user ? (
            <>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded text-textPrimary hover:bg-primary hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="w-full text-left px-3 py-2 rounded bg-red-500 text-white hover:bg-red-600"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="block px-3 py-2 rounded text-textPrimary hover:bg-primary hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="block px-3 py-2 rounded bg-primary text-white hover:bg-blue-800"
                onClick={() => setMenuOpen(false)}
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
