import { useNavigate } from 'react-router-dom';

const CollegeCard = ({ college }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <img
        src={college.image}
        alt={college.name}
        className="h-40 w-full object-cover rounded mb-4 cursor-pointer"
        onClick={() => navigate(`/college/${college._id}`)}
      />
      <h3 className="text-xl font-semibold mb-2">{college.name}</h3>
      <p className="text-sm text-gray-600 mb-2">
        Admission: {new Date(college.admissionStart).toLocaleDateString()} -{' '}
        {new Date(college.admissionEnd).toLocaleDateString()}
      </p>
      <p className="text-sm mb-2">
        Events: {college.events?.map((e) => e.title).join(', ')}
      </p>
      <p className="text-sm mb-2">
        Research Papers: {college.researchPapers?.length}
      </p>
      <p className="text-sm mb-2">Sports: {college.sports?.join(', ')}</p>
      <button
        onClick={() => navigate(`/college/${college._id}`)}
        className="mt-auto bg-primary text-white py-2 px-4 rounded hover:bg-blue-800 transition"
      >
        Details
      </button>
    </div>
  );
};

export default CollegeCard;
