import { useEffect, useState } from 'react';
import CollegeCard from '../components/CollegeCard';
import GraduateGallery from '../components/GraduateGallery';
import useCollegeStore from '../store/useCollegeStore';
import ResearchPapers from '../components/ResearchPapers';
import CollegeRatingCard from '../components/CollegeRatingCard';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { fetchColleges, colleges, loading, error } = useCollegeStore();

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const filteredColleges = colleges.filter((college) =>
    college.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  let content;
  if (loading) {
    content = <div>Loading...</div>;
  } else if (error) {
    content = <div>{error}</div>;
  } else if (!loading && filteredColleges.length === 0) {
    content = <div className="text-xl text-center">Oops! Not found!</div>;
  } else {
    content = filteredColleges.map((college) => (
      <CollegeCard key={college._id} college={college} />
    ));
  }

  return (
    <div className="bg-background min-h-screen">
      {/* ---------------- Search Section ---------------- */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold text-textPrimary mb-4">
          Find Your College
        </h1>
        <div className="flex items-center max-w-md">
          <input
            type="text"
            placeholder="Search by college name..."
            className="w-full px-4 py-2 border border-border rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-blue-800 transition">
            Search
          </button>
        </div>
      </section>

      {/* ---------------- College Cards Section ---------------- */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-textPrimary mb-6">
          Featured Colleges
        </h2>
        <div className="grid md:grid-cols-3 gap-6">{content}</div>
      </section>

      {/* ---------------- Graduate Gallery ---------------- */}
      <GraduateGallery colleges={colleges} />

      {/* ---------------- Research Papers ---------------- */}
      <ResearchPapers colleges={colleges} />

      {/* ---------------- Reviews Section ---------------- */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-2xl font-semibold text-textPrimary mb-6">
          College Ratings
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {colleges.map((college) => (
            <CollegeRatingCard key={college._id} college={college} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
