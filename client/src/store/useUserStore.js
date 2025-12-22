import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  // Fetch user by UID
  fetchUser: async (uid) => {
    if (!uid) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.get(`http://localhost:5000/users/${uid}`);

      set({
        user: res.data.user,
        loading: false,
      });
    } catch (err) {
      console.error('Fetch user error:', err);
      set({
        user: null,
        loading: false,
        error: err.message,
      });
    }
  },

  // Set user directly (after login / register)
  setUser: (userData) =>
    set({
      user: userData,
      loading: false,
      error: null,
    }),

  // Clear user on logout
  removeUser: () =>
    set({
      user: null,
      loading: false,
      error: null,
    }),

  setLoading: (value) => set({ loading: value }),
}));

export default useUserStore;
