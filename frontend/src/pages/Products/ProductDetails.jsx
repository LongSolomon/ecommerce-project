import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { setCategories } from "../../redux/features/shop/shopSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
  FaInfoCircle,
  FaTag,
  FaTags,
  FaCommentDots
} from "react-icons/fa";
import moment from "moment";
import StarIcon from "./StarIconReCss";
import Ratings from "./Ratings";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { FaCode } from "react-icons/fa";

// Add preview handler inside ProductDetails component



const ProductDetails = () => {
  const { userInfo } = useSelector((state) => state.auth);
  if (userInfo) console.log(userInfo);

  const previewCodeHandler = () => {
    if (!userInfo) {
      toast.error("Please login to view code");
      navigate('/login');
      return;
    }
    navigate(`/code-preview/${productId}`);
  };
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);


  const { categories } = useSelector((state) => state.shop);
  const categoriesQuery = useFetchCategoriesQuery();

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      await createReview({
        productId,
        rating,
        comment,
      }).unwrap();
      refetch();
      toast.success("Review created successfully");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const categoryName = product && categories.find((cat) => cat._id === product.category)?.name || "Unknown Category";

  return (
    <div className="pt-[50px] w-screen h-auto flex flex-col px-24">
      <div>
        <Link
          to="/"
          className="text-black text-xl font-semibold hover:underline"
        >
          Back to shop
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap relative items-between mt-[2rem]">
            <div>
              <img
                src={product.image}
                alt={product.name}
                className="w-full xl:w-[40rem] lg:w-[25rem] md:w-[20rem] mr-[2rem] rounded-2xl"
              />
            </div>

            <div className="flex flex-col justify-between w-[40vw]">
              <h2 className="text-5xl font-semibold mb-12 w-full">{product.name}</h2>

              <div className="flex items-center justify-between flex-col w-full">
                <h2 className="flex items-center text-lg justify-between flex-row w-full border-t-2 p-2 border-black">
                  <div className="flex flex-row items-center gap-2 uppercase font-bold">
                    <FaTag className="mr-2 text-black" /> Brand{" "}
                  </div>
                  <div className="font-bold text-sky-700 ">
                    {product.brand}
                  </div>
                </h2>

                <h2 className="flex items-center text-lg justify-between flex-row w-full border-t-2 p-2 border-black">
                  <div className="flex flex-row items-center gap-2 uppercase font-bold">
                    <FaInfoCircle className="mr-2 text-black" /> Description{" "}
                  </div>
                  <div className="font-bold text-sky-700 " style={{ paddingLeft: "10px" }}>
                    {product.description}
                  </div>
                </h2>

                <h2 className="flex items-center text-lg justify-between flex-row w-full border-t-2 p-2 border-black">
                  <div className="flex flex-row items-center gap-2 uppercase font-bold">
                    <FaTags className="mr-2 text-black" /> Category{" "}
                  </div>
                  <div className="font-bold text-sky-700 ">
                    {categoryName}
                  </div>
                </h2>

                <h2 className="flex items-center text-lg justify-between flex-row w-full border-t-2 p-2 border-black">
                  <div className="flex flex-row items-center gap-2 uppercase font-bold">
                    <FaClock className="mr-2 text-black" /> Date{" "}
                  </div>
                  <div className="font-bold text-sky-700 ">
                    {moment(product.createdAt).format("MMM D, YYYY")}
                  </div>
                </h2>

                <h2 className="flex items-center text-lg justify-between flex-row w-full border-t-2 p-2 border-black">
                  <div className="flex flex-row items-center gap-2 uppercase font-bold">
                    <FaCommentDots className="mr-2 text-black" /> Reviews{" "}
                  </div>
                  <div className="font-bold text-sky-700 ">
                    {product.numReviews}
                  </div>
                </h2>
                <h2 className="flex items-center text-lg justify-between flex-row w-full border-y-2 p-2 border-black">
                  <div className="flex flex-row items-center gap-2 uppercase font-bold">
                    <FaBox className="mr-2 text-black" /> In stock{" "}
                  </div>
                  <div className="font-bold text-sky-700 ">
                    {product.countInStock}
                  </div>
                </h2>
              </div>
              <div className="flex justify-between mt-6 mb-4 flex-wrap">
                <div className="flex items-center">
                  <Ratings
                    value={product.rating}
                    text={`${product.rating}`}
                  />
                </div>
                {product.countInStock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-1 w-[4rem] rounded-xl text-black border-black border-[1px]"
                    >
                      {[...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              <div className="w-full flex flex-row items-center justify-between gap-4">
                <p className="text-2xl w-[150px] font-extrabold">$ {product.price}</p>
                <div className="flex gap-2 flex-1">
                  <button
                    onClick={addToCartHandler}
                    disabled={product.countInStock === 0}
                    className="bg-black text-white py-2 px-6 uppercase font-bold rounded-2xl "
                  >
                    Add To Cart
                  </button>
                  {/* <button
                    onClick={previewCodeHandler}
                    className="bg-sky-600 text-white py-2 px-6 uppercase font-bold rounded-2xl flex items-center justify-center gap-2"
                  >
                    <FaCode /> Preview Code
                  </button> */}
                </div>
                <StarIcon product={product} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;