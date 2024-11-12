import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";
const Product = ({ product }) => {
  return (
    <div className="w-[320px] h-auto ml-[2rem] p-3 relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-[200px] object-cover rounded-2xl"
        />
        <HeartIcon product={product} />
        <div className="py-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-start">
              {console.log(product)}
              <div className="flex flex-col gap-2">
                <Ratings
                  value={product.rating}
                />
                <div className="text-lg font-bold ml-1">{product.name}</div>
              </div>
              <span className="bg-blue-700 text-white text-sm font-medium mr-2 px-4 py-1 rounded-full">
                {new Intl.NumberFormat("de-DE", {
                  style: "currency",
                  currency: "USD",
                }).format(product.price)}
              </span>
            </h2>
          </Link>
        </div>
    </div>
  );
};

export default Product;
