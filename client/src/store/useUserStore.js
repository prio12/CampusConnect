import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  loading: true,

  setUser: (userData) =>
    set({
      user: userData,
      loading: false,
    }),

  removeUser: () =>
    set({
      user: null,
      loading: false,
    }),

  setLoading: (value) => set({ loading: value }),
}));

export default useUserStore;
