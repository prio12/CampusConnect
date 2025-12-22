import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../store/useUserStore';
import useCollegeStore from '../store/useCollegeStore';

const MyCollege = () => {
  const { user, fetchUser, loading } = useUserStore();
  const { colleges, fetchColleges } = useCollegeStore();
  const [reviewData, setReviewData] = useState({});
  const navigate = useNavigate();

  const uid = user?.uid; // Assuming user UID is available from store

  // Fetch user and colleges
  useEffect(() => {
    if (!user && uid) fetchUser(uid);
    if (colleges.length === 0) fetchColleges();
  }, [uid, user, fetchUser, colleges.length, fetchColleges]);

  const handleReviewChange = (collegeId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [collegeId]: {
        ...prev[collegeId],
        [field]: value,
      },
    }));
  };

  const handleSubmitReview = (collegeId) => {
    const review = reviewData[collegeId];
    if (!review || !review.comment || !review.rating) {
      alert('Please provide both comment and rating.');
      return;
    }

    console.log('Submitting review for college:', collegeId, review);
    alert('Review submitted! (Server logic to be implemented)');
    setReviewData((prev) => ({
      ...prev,
      [collegeId]: { comment: '', rating: '' },
    }));
  };

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  if (!user) {
    return <p className="text-center mt-10">User not found.</p>;
  }

  const userAdmissions = user.admissions || [];

  return (
    <div className="min-h-screen bg-background px-4 py-10">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-textPrimary mb-8 text-center">
          My Colleges
        </h2>

        {userAdmissions.length === 0 ? (
          <div className="text-center p-10 bg-white rounded-xl shadow-md">
            <p className="text-gray-600 mb-4">
              You haven’t applied to any colleges yet.
            </p>
            <button
              onClick={() => navigate('/admission')}
              className="bg-primary text-white py-2 px-6 rounded hover:bg-blue-800 transition"
            >
              Go to Admission Page
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {userAdmissions.map((admission) => {
              const college = colleges.find((c) => c._id === admission.college);

              return (
                <div
                  key={admission._id}
                  className="bg-white rounded-xl shadow-md p-6 flex flex-col"
                >
                  <div className="flex items-center mb-4">
                    {/* College Image */}
                    {college?.image && (
                      <img
                        src={college.image}
                        alt={college.name}
                        className="w-20 h-20 rounded-md mr-4 object-cover"
                      />
                    )}

                    <div>
                      <h3 className="text-xl font-semibold text-textPrimary">
                        {college?.name || 'College Name'}
                      </h3>
                      <p className="text-gray-500 text-sm">
                        Applied on:{' '}
                        {new Date(admission.submittedAt).toLocaleDateString()}
                      </p>
                    </div>

                    {/* User-provided Image */}
                    {admission.image && (
                      <img
                        src={admission.image}
                        alt={admission.candidateName}
                        className="w-16 h-16 rounded-full ml-auto object-cover border-2 border-primary"
                      />
                    )}
                  </div>

                  <div className="mb-4">
                    <p>
                      <span className="font-medium">Candidate Name: </span>
                      {admission.candidateName}
                    </p>
                    <p>
                      <span className="font-medium">Email: </span>
                      {admission.candidateEmail}
                    </p>
                    <p>
                      <span className="font-medium">Phone: </span>
                      {admission.candidatePhone}
                    </p>
                    <p>
                      <span className="font-medium">Address: </span>
                      {admission.address}
                    </p>
                    <p>
                      <span className="font-medium">DOB: </span>
                      {admission.dob
                        ? new Date(admission.dob).toLocaleDateString()
                        : '-'}
                    </p>
                  </div>

                  {/* Review Input */}
                  <div className="mt-auto border-t pt-4">
                    <h4 className="font-semibold text-textPrimary mb-2">
                      Add a Review
                    </h4>
                    <textarea
                      rows="3"
                      placeholder="Write your review..."
                      className="w-full px-3 py-2 border rounded mb-2 focus:ring-2 focus:ring-primary outline-none"
                      value={reviewData[admission._id]?.comment || ''}
                      onChange={(e) =>
                        handleReviewChange(
                          admission._id,
                          'comment',
                          e.target.value
                        )
                      }
                    />
                    <select
                      className="w-full px-3 py-2 border rounded mb-2 focus:ring-2 focus:ring-primary outline-none"
                      value={reviewData[admission._id]?.rating || ''}
                      onChange={(e) =>
                        handleReviewChange(
                          admission._id,
                          'rating',
                          e.target.value
                        )
                      }
                    >
                      <option value="">Select Rating</option>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <button
                      className="w-full bg-primary text-white py-2 rounded hover:bg-blue-800 transition"
                      onClick={() => handleSubmitReview(admission._id)}
                    >
                      Submit Review
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyCollege;
