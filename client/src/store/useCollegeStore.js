import axios from 'axios';
import { create } from 'zustand';

const useCollegeStore = create((set) => ({
  colleges: [],
  loading: false,
  error: null,

  fetchColleges: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get('http://localhost:5000/universities');
      console.log(res, 'From store');
      set({ colleges: res.data.universities, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },
}));

export default useCollegeStore;
