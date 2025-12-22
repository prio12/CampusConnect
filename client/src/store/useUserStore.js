import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,
  loading: false,
  error: null,

  /* =======================
     Fetch user by UID
  ======================== */
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

  /* =======================
     Submit Admission
  ======================== */
  submitAdmission: async (uid, admissionObj) => {
    if (!uid) return;

    set({ loading: true, error: null });

    try {
      // Use singular "admission" to match server
      const res = await axios.patch(`http://localhost:5000/users/${uid}`, {
        admission: admissionObj,
      });

      set((state) => ({
        user: {
          ...state.user,
          admissions: res.data.admissions, // updated array from server
        },
        loading: false,
      }));

      return true;
    } catch (err) {
      console.error('Admission submit error:', err);
      set({
        loading: false,
        error: err.message,
      });
      return false;
    }
  },

  /* =======================
     Update Profile Info
  ======================== */
  updateProfile: async (uid, payload) => {
    if (!uid) return;

    set({ loading: true, error: null });

    try {
      const res = await axios.patch(
        `http://localhost:5000/users/${uid}`,
        payload
      );

      set({
        user: res.data.user,
        loading: false,
      });

      return true;
    } catch (err) {
      console.error('Profile update error:', err);
      set({
        loading: false,
        error: err.message,
      });
      return false;
    }
  },

  /* =======================
     Local helpers
  ======================== */
  setUser: (userData) =>
    set({
      user: userData,
      loading: false,
      error: null,
    }),

  removeUser: () =>
    set({
      user: null,
      loading: false,
      error: null,
    }),

  setLoading: (value) => set({ loading: value }),
}));

export default useUserStore;
