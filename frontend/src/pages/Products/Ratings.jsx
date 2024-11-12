import { FaRegStar, FaStar, FaStarHalfAlt } from "react-icons/fa";

const Ratings = ({ value, text, color, size = 20 }) => {
  const fullStars = Math.floor(value);
  const halfStars = value - fullStars > 0.5 ? 1 : 0;
  const emptyStar = 5 - fullStars - halfStars;

  return (
    <div className="flex items-start
    ">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar color={color} key={index} className={`text-${color} ml-1`} size={size} />
      ))}

      {halfStars === 1 && <FaStarHalfAlt color={color} className={`text-${color} ml-1`} size={size} />}
      {[...Array(emptyStar)].map((_, index) => (
        <FaRegStar color={color} key={index} className={`text-${color} ml-1`} size={size} />
      ))}

      <span className={`rating-text ml-3 text-${color}`}>
        {text && text}
      </span>
    </div>
  );
};

// Ratings.defaultProps = {
//   color: "yellow-500",
// };

export default Ratings;
