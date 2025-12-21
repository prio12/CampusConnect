import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useCollegeStore from '../store/useCollegeStore';
import { FaStar } from 'react-icons/fa';

const CollegeDetails = () => {
  const { id } = useParams();
  const { fetchColleges, colleges, loading, error } = useCollegeStore();
  const [college, setCollege] = useState(null);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  useEffect(() => {
    if (colleges.length > 0) {
      const found = colleges.find((c) => c._id === id);
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCollege(found);
    }
  }, [colleges, id]);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error)
    return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!college)
    return <div className="text-center py-10">College not found!</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center gap-6">
        <img
          src={college.image}
          alt={college.name}
          className="w-full md:w-96 h-64 object-cover rounded shadow-md"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-textPrimary mb-2">
            {college.name}
          </h1>
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
          <p className="text-textSecondary mb-2">{college.description}</p>
          <p className="text-textSecondary">
            <strong>Admission:</strong>{' '}
            {new Date(college.admissionStart).toLocaleDateString()} -{' '}
            {new Date(college.admissionEnd).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Events */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-textPrimary mb-4">Events</h2>
        {college.events.length > 0 ? (
          <ul className="space-y-3">
            {college.events.map((event) => (
              <li
                key={event._id}
                className="p-4 border rounded shadow-sm hover:shadow-md transition"
              >
                <h3 className="font-semibold text-textPrimary">
                  {event.title}
                </h3>
                <p className="text-textSecondary">
                  {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-textSecondary">{event.description}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-textSecondary">No upcoming events.</p>
        )}
      </section>

      {/* Research Papers */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-textPrimary mb-4">
          Research Papers
        </h2>
        {college.researchPapers.length > 0 ? (
          <ul className="space-y-2">
            {college.researchPapers.map((paper) => (
              <li key={paper._id}>
                <a
                  href={paper.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  {paper.title}
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-textSecondary">No research papers available.</p>
        )}
      </section>

      {/* Sports */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-textPrimary mb-4">Sports</h2>
        {college.sports.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {college.sports.map((sport, i) => (
              <span
                key={i}
                className="px-3 py-1 bg-primary/20 text-primary rounded-full font-medium"
              >
                {sport}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-textSecondary">No sports information available.</p>
        )}
      </section>

      {/* Graduate Gallery */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold text-textPrimary mb-4">
          Graduate Gallery
        </h2>
        {college.gallery.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {college.gallery.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Graduate ${i + 1}`}
                className="rounded shadow hover:scale-105 transition-transform cursor-pointer"
                onClick={() => window.open(img, '_blank')}
              />
            ))}
          </div>
        ) : (
          <p className="text-textSecondary">No gallery images available.</p>
        )}
      </section>
    </div>
  );
};

export default CollegeDetails;
