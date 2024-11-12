import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import Ratings from "./Ratings";

const ProductCard = ({ p }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
    toast.success("Item added successfully", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 2000,
    });
  };

  return (
    <div className="p-4 w-[340px] relative bg-gray-100 rounded-2xl shadow-2xl dark:border-gray-700 ">
      <section className="relative">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 text-sky-700 text-md font-medium mr-2 px-3 py-0.5 rounded-full bg-white">
            {p?.brand}
          </span>
          <img
            className="cursor-pointer w-full rounded-xl"
            src={p.image}
            alt={p.name}
            style={{ objectPosition: '50% 0%', objectFit: 'cover', height: '170px' }}

          />
        </Link>
      </section>
      <div className="p-2">
        <div className="flex justify-between items-center mb-2 ">
          <div>
            <div className=" text-xl font-bold text-whiet dark:text-black">{p?.name}</div>
          </div>
          <Ratings
            value={p.rating}
            size={16}
            color='#FFD700'
          />
        </div>
        <div className="mb-3 font-normal text-gray-700 text-base" style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {p?.description?.substring(0, 60)}
        </div>


        <section className="flex justify-between items-center">
          <div className='relative'>
            <button
              className="p-2 rounded-full ml-7"
              onClick={() => addToCartHandler(p, 1)}
            >

              <AiOutlineShoppingCart size={25} />
            </button>
            <HeartIcon product={p} size={25} className={'absolute top-2 right-10 cursor-pointer'} />
          </div>

          <div className="bg-blue-100 text-white text-lg font-medium   py-1 px-4 rounded-full dark:bg-blue-900 " style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "USD",
            }).format(p.price)}

          </div>


        </section>
      </div>
      {/* <div className='bg-blue-700 rounded-lg hover:bg-blue-800'>
        <Link
          style={{ display: 'block' }}
          to={`/product/${p._id}`}
          className="text-white inline-flex items-center px-3 py-2 text-sm font-medium text-center "
        >
          View More

        </Link>
      </div> */}
    </div>
  );
};

export default ProductCard;
