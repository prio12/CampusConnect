import React from 'react';

const ReviewCard = ({ review }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center mb-2">
        <div className="font-bold text-textPrimary">{review.name}</div>
        <div className="ml-auto text-accent font-semibold">
          {'★'.repeat(review.rating)}
        </div>
      </div>
      <p className="text-textSecondary">{review.text}</p>
    </div>
  );
};

export default ReviewCard;
