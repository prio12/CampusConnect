import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import useUserStore from '../store/useUserStore';
import axios from 'axios';

const useObserveAuth = () => {
  const { setUser, removeUser, setLoading } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const res = await axios.get(
            `http://localhost:5000/users/${firebaseUser.uid}`
          );

          setUser(res.data);
        } catch (error) {
          console.log(error);
          console.warn('User not found in DB yet, using Firebase user');

          setUser({
            uid: firebaseUser.uid,
            name: firebaseUser.displayName,
            email: firebaseUser.email,
            avatar: firebaseUser.photoURL,
          });
        }
      } else {
        removeUser();
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, removeUser, setLoading]);
};

export default useObserveAuth;
