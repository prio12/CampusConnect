import { useState, useEffect } from 'react';
import useCollegeStore from '../store/useCollegeStore';
import useUserStore from '../store/useUserStore';

const Admission = () => {
  const { colleges, loading, error, fetchColleges } = useCollegeStore();
  const { user } = useUserStore();

  const [selectedCollege, setSelectedCollege] = useState(null);

  const [formData, setFormData] = useState({
    candidateName: '',
    subject: '',
    email: '',
    phone: '',
    address: '',
    dob: '',
    image: null,
  });

  // Fetch colleges
  useEffect(() => {
    if (colleges.length === 0) fetchColleges();
  }, [colleges.length, fetchColleges]);

  // Populate form from user (DB)
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData((prev) => ({
        ...prev,
        candidateName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const submissionData = {
      college: selectedCollege._id,
      candidateName: formData.candidateName,
      subject: formData.subject,
      candidateEmail: formData.email,
      candidatePhone: formData.phone,
      address: formData.address,
      dob: formData.dob,
      image: formData.image,
    };

    console.log('Admission Submitted:', submissionData);

    alert('Admission form submitted successfully!');

    setSelectedCollege(null);
  };

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h2 className="text-3xl font-bold text-textPrimary mb-6 text-center">
          College Admission
        </h2>

        {loading && (
          <p className="text-center text-gray-500">Loading colleges...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* College List */}
        {!selectedCollege && !loading && !error && (
          <>
            <p className="text-gray-600 mb-4 text-center">
              Select a college to apply for admission
            </p>
            <ul className="space-y-3">
              {colleges.map((college) => (
                <li
                  key={college._id}
                  onClick={() => setSelectedCollege(college)}
                  className="cursor-pointer border border-border rounded-lg px-4 py-3 hover:bg-primary hover:text-white transition font-medium"
                >
                  {college.name}
                </li>
              ))}
            </ul>
          </>
        )}

        {/* Admission Form */}
        {selectedCollege && user && (
          <>
            <div className="mb-6">
              <button
                onClick={() => setSelectedCollege(null)}
                className="text-sm text-primary hover:underline mb-2"
              >
                ← Back to college list
              </button>
              <h3 className="text-xl font-semibold text-textPrimary">
                Applying to: {selectedCollege.name}
              </h3>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Read-only Name */}
              <input
                type="text"
                value={formData.candidateName}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />

              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject"
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary outline-none"
              />

              {/* Read-only Email */}
              <input
                type="email"
                value={formData.email}
                readOnly
                className="w-full px-4 py-2 border rounded bg-gray-100 cursor-not-allowed"
              />

              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Candidate Phone Number"
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary outline-none"
              />

              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Address"
                required
                rows="3"
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded focus:ring-2 focus:ring-primary outline-none"
              />

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded bg-white"
              />

              <button
                type="submit"
                className="w-full bg-primary text-white py-2 rounded font-medium hover:bg-blue-800 transition"
              >
                Submit Admission
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Admission;
