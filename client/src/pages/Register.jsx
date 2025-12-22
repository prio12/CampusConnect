import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import useUserStore from '../store/useUserStore';

const Register = () => {
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Save user to backend
  const saveUserToBackend = async (userData) => {
    try {
      await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
    } catch (err) {
      console.error('Failed to save user:', err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      setError('All fields are required!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Set display name
      await updateProfile(userCredential.user, { displayName: name });

      const firebaseUser = userCredential.user;

      const userData = {
        uid: firebaseUser.uid,
        name: name,
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || '',
        admissions: [],
        reviews: [],
        myColleges: [],
      };

      // 1️⃣ Set in Zustand
      setUser(userData);

      // 2️⃣ Save to backend
      await saveUserToBackend(userData);

      setLoading(false);
      navigate('/'); // redirect to home
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || '',
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || '',
        admissions: [],
        reviews: [],
        myColleges: [],
      };

      // 1️⃣ Set in Zustand
      setUser(userData);

      // 2️⃣ Save to backend
      await saveUserToBackend(userData);

      setLoading(false);
      navigate('/');
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h2 className="text-2xl font-bold text-center text-textPrimary">
          Create Your Account
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
            placeholder="Full Name"
            className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Email Address"
            className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-blue-800 transition"
          >
            {loading ? 'Creating...' : 'Sign Up'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-400">or</span>
        </div>

        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center border border-border rounded py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign up with Google
        </button>

        <p className="text-center text-sm text-gray-500">
          Already have an account?{' '}
          <Link
            to="/login"
            className="text-primary hover:underline font-medium"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
