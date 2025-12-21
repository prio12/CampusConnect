import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
const CollegeRatingCard = ({ college }) => {
  const { name, rating, numRatings } = college;

  // Generate star icons based on rating
  const renderStars = () => {
    const stars = [];
    let remaining = rating;
    for (let i = 0; i < 5; i++) {
      if (remaining >= 1) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
        remaining -= 1;
      } else if (remaining >= 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
        remaining = 0;
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };
  return (
    <div className="border border-border rounded-lg p-4 shadow hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-textPrimary mb-2">{name}</h3>
      <div className="flex items-center space-x-2 mb-1">
        {renderStars()}
        <span className="text-sm text-textSecondary">
          ({numRatings} ratings)
        </span>
      </div>
    </div>
  );
};

export default CollegeRatingCard;
