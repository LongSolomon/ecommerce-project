import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";
import { Link } from "react-router-dom";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div className="ml-[10rem]">
      <div className="container flex flex-col justify-around items-start wrap mx-24 mt-8">
        <h1 className="text-3xl font-bold mb-4">Favourite Products</h1>
        {favorites.length === 0 ? (
          <div className="text-2xl">
            Your favorites list is empty.{" "}
            <Link to="/shop" className="text-blue-500 font-bold hover:underline">
              Go to Shop
            </Link>
          </div>
        ) : (
          <div className="flex flex-wrap">
            {favorites.map((product) => (
              <Product key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favorites;