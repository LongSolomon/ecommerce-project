import { useEffect } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  setFavorites,
} from "../../redux/features/favorites/favoriteSlice";

import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
  removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";

const StarIcon = ({ product, size = 24, className, style }) => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites) || [];
  const isFavorite = favorites.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    dispatch(setFavorites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product));
      // remove the product from the localStorage as well
      removeFavoriteFromLocalStorage(product._id);
    } else {
      dispatch(addToFavorites(product));
      // add the product to localStorage as well
      addFavoriteToLocalStorage(product);
    }
  };

  return (
    <div
      className={className || "ml-2 cursor-pointer rounded-full border-black border-2 min-w-12 min-h-12 flex justify-center items-center"}
      onClick={toggleFavorites}
    >
      {isFavorite ? (
        <FaStar className="text-yellow-500" size={size ? size : ''} />
      ) : (
        <FaRegStar className="text-black" size={size ? size : ''} />
      )}
    </div>
  );
};

export default StarIcon;