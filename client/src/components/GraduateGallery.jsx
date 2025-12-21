import { useNavigate } from 'react-router-dom';

const GraduateGallery = ({ colleges }) => {
  const navigate = useNavigate();

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-2xl font-semibold text-textPrimary mb-6">
        Graduate Gallery
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {colleges.map((college) =>
          (college.gallery || []).map((img, index) => (
            <img
              key={`${college._id}-${index}`}
              src={img}
              alt={`${college.name} Graduate`}
              className="rounded shadow hover:scale-105 transition-transform cursor-pointer"
              onClick={() => navigate(`/college/${college._id}`)}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default GraduateGallery;
