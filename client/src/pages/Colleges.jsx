import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCollegeStore from '../store/useCollegeStore';
import { FaStar } from 'react-icons/fa';

const Colleges = () => {
  const { fetchColleges, colleges, loading, error } = useCollegeStore();

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  if (loading)
    return <div className="text-center py-10">Loading colleges...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (colleges.length === 0)
    return <div className="text-center py-10">No colleges available.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold text-textPrimary mb-8">Colleges</h1>
      <div className="grid md:grid-cols-3 gap-6">
        {colleges.map((college) => (
          <div
            key={college._id}
            className="border rounded shadow hover:shadow-lg transition p-4 flex flex-col"
          >
            {/* College Image */}
            <img
              src={college.image}
              alt={college.name}
              className="w-full h-48 object-cover rounded mb-4"
            />

            {/* College Info */}
            <h2 className="text-xl font-semibold text-textPrimary mb-2">
              {college.name}
            </h2>
            <div className="flex items-center mb-2">
              <span className="text-yellow-500 flex items-center">
                {Array.from({ length: Math.floor(college.rating) }).map(
                  (_, i) => (
                    <FaStar key={i} className="mr-1" />
                  )
                )}
              </span>
              <span className="ml-2 text-textSecondary">
                {college.rating} ({college.numRatings} ratings)
              </span>
            </div>
            <p className="text-textSecondary mb-2">
              <strong>Admission:</strong>{' '}
              {new Date(college.admissionStart).toLocaleDateString()} -{' '}
              {new Date(college.admissionEnd).toLocaleDateString()}
            </p>
            <p className="text-textSecondary mb-4">
              <strong>Research Papers:</strong> {college.researchPapers.length}
            </p>

            {/* Details Button */}
            <Link
              to={`/college/${college._id}`}
              className="mt-auto px-4 py-2 text-center bg-primary text-white rounded hover:bg-blue-800 transition"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Colleges;
