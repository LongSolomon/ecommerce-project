import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { FaSearch } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { PiCircleThin } from "react-icons/pi";
import globe from '../assets/badminton-1428046_1280.jpg';
import advantage from '../assets/1-26.jpeg';
import ProductCard from "./Products/ProductCard";

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  return (
    <>
      {/* {!keyword ? <Header /> : null} */}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data?.message || isError?.error}
        </Message>
      ) : (
        <div className="flex flex-col w-full overflow-x-hidden gap-4 pb-[100px]">
          <div className="p-12 bg-black mt-10 mx-16 rounded-3xl">
            <div className="flex flex-col md:flex-row justify-between items-center gap-10">
              <div className="md:w-1/2">
                <h1 className="text-white text-4xl md:text-6xl font-bold mb-4">
                  The best badminton equipment shop
                </h1>

                <img src={globe} alt="Globe" className="rounded-md mb-6" />
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-[#1F364D] text-white rounded-full text-sm">
                    🎉 It's a badminton era!
                  </span>
                </div>

                <div className="text-lg">
                  <p className="text-white text-3xl mb-4">
                    Over
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      5
                    </span>
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      5
                    </span>
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      3
                    </span>
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      6
                    </span>
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      9
                    </span>
                    existing badminton products
                  </p>

                  <div className="flex items-center space-x-4">
                    <a
                      href="#"
                      className="bg-gradient-to-r from-[#E052A0] to-[#F15C41] hover:from-[#F15C41] hover:to-[#E052A0] text-white font-bold py-2 px-6 rounded-full"
                    >
                      Start Shopping
                    </a>
                    <a href="#" className="text-white text-lg">
                      or reading more below ⬇️
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col space-y-6">
                <h2 className="text-white text-4xl font-semibold font-thin">
                  1B, a place to satisfy your passion
                </h2>

                <div className="relative flex space-x-4">
                  <img
                    src={advantage}
                    alt="Background Image 1"
                    className="object-cover rounded-md shadow-lg"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mx-auto py-10 px-20">
            <div className="flex flex-col lg:flex-row justify-between gap-8">
              <div className="lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  What makes 1B special?
                </h2>
                <p className="text-gray-700 mb-4 text-xl text-justify">
                  <strong className="font-semibold ">1B</strong>1B is your ultimate destination for premium badminton gear, tailored to elevate every player’s game. Our expert staff helps you find the perfect equipment, while our “try-before-you-buy” feature ensures you get the right feel for your play style. With quality gear, in-depth guidance, and a community-driven spirit, 1B empowers players to step onto the court with confidence, style, and performance in every shot.
                </p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 lg:w-2/5 h-fit">
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">
                  Things to check out
                </h3>
                <ul className="list-none pl-4 space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Top 10 badminton rackets for newbies.
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      The most durable badminton string.
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Super sale 11/11 at 1B.
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      1000+ customer testimonials.
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Before & After.
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-black text-white p-8">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-8">
              <div className="lg:w-2/3">
                <h1 className="text-4xl lg:text-6xl font-bold leading-snug">
                  Search for products that suit your needs
                </h1>

                <div className="relative mt-6 max-w-md">
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full p-3 rounded-md bg-gray-800 text-white focus:outline-none"
                  />
                  <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <FaSearch className="text-teal-400" size={20} />
                  </button>
                </div>
              </div>

              <div className="bg-teal-500 relative rounded-lg p-8 w-full h-64 lg:h-72 lg:w-1/3 overflow-hidden">
                <div className="absolute bottom-8 left-8">
                  <h2 className="text-6xl font-bold text-black leading-tight">
                    See how
                    <br /> it’s done
                  </h2>
                </div>

                <div className="absolute top-0 right-0 transform translate-x-1/4 -translate-y-1/4">
                  <PiCircleThin className="text-black opacity-75" size={250} />
                </div>

                <div className="absolute top-2/3 right-0 transform translate-x-1/2 -translate-y-1/2">
                  <PiCircleThin className="text-black opacity-75" size={200} />
                </div>

                <div className="absolute top-8 right-8 text-black">
                  <FiArrowUpRight size={80} />
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex justify-center w-full flex-wrap py-10 ">
              {data.products.map((product) => (
                <Product product={product} />
              ))}
            </div>
            <div className="flex justify-center w-full">
              <Link
                to="/shop"
                className="text-white bg-gradient-to-r from-[#E052A0] to-[#F15C41] hover:from-[#F15C41] hover:to-[#E052A0] font-bold rounded-full py-2 px-10"
              >
                Show all
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
