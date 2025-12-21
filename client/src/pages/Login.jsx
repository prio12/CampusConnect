import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase/firebase.config';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { FcGoogle } from 'react-icons/fc';
import useUserStore from '../store/useUserStore';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Email and Password are required!');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const firebaseUser = userCredential.user;

      // Save user in zustand
      const loggedUser = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName || 'User',
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || null,
      };
      setUser(loggedUser);

      setLoading(false);
      navigate('/'); // redirect to home after login
    } catch (err) {
      setLoading(false);
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    setError('');

    try {
      const result = await signInWithPopup(auth, provider);
      const firebaseUser = result.user;

      // Prepare user data for backend
      const userData = {
        uid: firebaseUser.uid,
        name: firebaseUser.displayName,
        email: firebaseUser.email,
        avatar: firebaseUser.photoURL || null,
      };

      // Send user to backend (create if not exists)
      const res = await axios.post('http://localhost:5000/users', userData);

      if (res.data.error) {
        setError(res.data.error);
        setLoading(false);
        return;
      }

      // Save in zustand
      setUser(res.data);
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
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-sm text-center font-medium">
            {error}
          </p>
        )}

        <form className="space-y-4" onSubmit={handleEmailLogin}>
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
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <div className="flex items-center justify-center space-x-2">
          <span className="text-gray-400">or</span>
        </div>

        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center border border-border rounded py-2 hover:bg-gray-100 transition"
        >
          <FcGoogle className="mr-2 text-xl" />
          Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-500">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary hover:underline font-medium"
          >
            Sign Up
          </Link>
        </p>

        <p className="text-center text-sm text-primary hover:underline cursor-pointer">
          <Link to="/resetPassword">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
