import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { FaSearch } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { PiCircleThin } from "react-icons/pi";
import globe from "../assets/globe.svg";
import advantage from "../assets/advantage.svg";
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
                  The marketplace for coders building the world
                </h1>

                <img src={globe} alt="Globe" className="rounded-md mb-6" />
                <div className="flex items-center space-x-2 mb-4">
                  <span className="px-3 py-1 bg-[#1F364D] text-white rounded-full text-sm">
                    🎉 It's a new era!
                  </span>
                </div>

                <div className="text-lg">
                  <p className="text-white text-3xl mb-4">
                    Over
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      1
                    </span>
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      2
                    </span>
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      3
                    </span>
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      4
                    </span>
                    <span className="inline-block bg-white text-black font-bold text-3xl px-2 py-1 mx-1 rounded">
                      5
                    </span>
                    indie developers are flying with our services.
                  </p>

                  <div className="flex items-center space-x-4">
                    <a
                      href="#"
                      className="bg-gradient-to-r from-[#E052A0] to-[#F15C41] hover:from-[#F15C41] hover:to-[#E052A0] text-white font-bold py-2 px-6 rounded-full"
                    >
                      Start Your Own
                    </a>
                    <a href="#" className="text-white text-lg">
                      or learn more below ⬇️
                    </a>
                  </div>
                </div>
              </div>
              <div className="md:w-1/2 flex flex-col space-y-6">
                <div className="bg-gray-800 py-4  px-24 rounded-2xl">
                  <div className="flex space-x-4 bg-gray-800 rounded-t-lg py-2 px-4">
                    <span className="bg-gray-700 text-white px-3 py-1 rounded">
                      index.html
                    </span>
                    <span className="text-gray-400 px-3 py-1">script.js</span>
                    <span className="text-gray-400 px-3 py-1">
                      package.json
                    </span>
                  </div>
                  <pre className="text-sm text-gray-300">
                    <code>
                      <span className="text-green-400">&lt;div</span>{" "}
                      <span className="text-purple-400">class=</span>
                      <span className="text-blue-400">
                        "position-absolute width-full color-bg-default"
                      </span>
                      <span className="text-green-400">&gt;</span>
                      <br />
                      <span className="text-gray-500">2</span>{" "}
                      <span className="text-green-400">&lt;div</span>{" "}
                      <span className="text-purple-400">class=</span>
                      <span className="text-blue-400">
                        "container-xl p-responsive"
                      </span>
                      <span className="text-green-400">&gt;</span>
                      <br />
                      <span className="text-gray-500">3</span>{" "}
                      <span className="text-green-400">&lt;div</span>{" "}
                      <span className="text-purple-400">class=</span>
                      <span className="text-blue-400">
                        "d-flex flex-justify-center flex-lg-justify-end"
                      </span>
                      <span className="text-green-400">&gt;</span>
                      <br />
                      <span className="text-gray-500">4</span>{" "}
                      <span className="text-green-400">&lt;div</span>{" "}
                      <span className="text-purple-400">class=</span>
                      <span className="text-blue-400">
                        "col-8 col-sm-7 col-md-6 col-lg-5 position-relative"
                      </span>
                      <span className="text-green-400">&gt;</span>
                      <br />
                      <span className="text-gray-500">5</span>{" "}
                      &nbsp;&lt;picture&gt;
                      <br />
                      <span className="text-gray-500">6</span> &nbsp;&nbsp;&lt;
                      <span className="text-green-400">source</span>{" "}
                      <span className="text-purple-400">srcset=</span>
                      <span className="text-blue-400">
                        "astro-mona.webp"
                      </span>{" "}
                      <span className="text-purple-400">type=</span>
                      <span className="text-blue-400">"image/webp"</span>&gt;
                      <br />
                      <span className="text-gray-500">7</span> &nbsp;&nbsp;&lt;
                      <span className="text-green-400">img</span>{" "}
                      <span className="text-purple-400">src=</span>
                      <span className="text-blue-400">
                        "astro-mona.svg"
                      </span>{" "}
                      <span className="text-purple-400">width=</span>
                      <span className="text-blue-400">"960"</span>{" "}
                      <span className="text-purple-400">height=</span>
                      <span className="text-blue-400">"960"</span>&gt;
                      <br />
                      <span className="text-gray-500">8</span>{" "}
                      &nbsp;&lt;/picture&gt;
                      <br />
                      <span className="text-gray-500">9</span> &lt;/div&gt;
                      <br />
                      <span className="text-gray-500">10</span> &lt;/div&gt;
                      <br />
                      <span className="text-gray-500">11</span> &lt;/div&gt;
                    </code>
                  </pre>
                </div>

                <div className="bg-black mt-6 p-4 rounded-lg">
                  <div className="text-gray-500 flex space-x-4 text-sm mb-2">
                    <span>Terminal</span>
                    <span>Output</span>
                    <span>Problems</span>
                    <span>Debug Console</span>
                  </div>
                  <div className="h-40 overflow-y-auto text-xs text-gray-300">
                    <pre>
                      <span className="text-gray-500">[09:43:36]</span> Starting{" "}
                      <span className="text-white">
                        'watch-extension:vscode-api-tests'
                      </span>
                      ...
                      <br />
                      <span className="text-gray-500">
                        [09:43:36]
                      </span> Finished{" "}
                      <span className="text-white">
                        'clean-extension:typescript-language-features'
                      </span>{" "}
                      after <span className="text-blue-400">384 ms</span>
                      <br />
                      <span className="text-gray-500">
                        [09:43:36]
                      </span> Starting{" "}
                      <span className="text-white">
                        'watch-extension:typescript-language-features'
                      </span>
                      ...
                      <br />
                      <span className="text-gray-500">
                        [09:43:36]
                      </span> Finished{" "}
                      <span className="text-white">
                        'clean-extension:php-language-features'
                      </span>{" "}
                      after <span className="text-blue-400">384 ms</span>
                      <br />
                      <span className="text-gray-500">
                        [09:43:36]
                      </span> Starting{" "}
                      <span className="text-white">
                        'watch-extension:php-language-features'
                      </span>
                      ...
                      <br />
                      <span className="text-gray-500">
                        [09:43:40]
                      </span> Finished{" "}
                      <span className="text-white">
                        'clean-extension:html-language-features-server'
                      </span>{" "}
                      after <span className="text-blue-400">400 ms</span>
                      <br />
                      <span className="text-gray-500">
                        [09:43:40]
                      </span> Starting{" "}
                      <span className="text-white">
                        'watch-extension:html-language-features-server'
                      </span>
                      ...
                      <br />
                      <span className="text-gray-500">
                        [09:43:43]
                      </span> Finished{" "}
                      <span className="text-white">'clean-client'</span> after{" "}
                      <span className="text-yellow-400">7.33 s</span>
                      <br />
                      <span className="text-gray-500">
                        [09:43:43]
                      </span> Starting{" "}
                      <span className="text-white">'watch-client'</span>...
                    </pre>
                  </div>
                </div>

                <h2 className="text-white text-4xl font-semibold font-thin">
                  The platform where developers can trade their products
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
                  What makes Codify special?
                </h2>
                <p className="text-gray-700 mb-4 text-xl text-justify">
                  <strong className="font-semibold ">Codify</strong> simplifies
                  the process of sharing and monetizing code, enabling
                  developers to showcase their work and offer high-quality
                  solutions that can be easily integrated into various projects.
                  By offering a dedicated space for these transactions, Codify
                  empowers both experienced and novice developers to access
                  ready-made solutions that can save time and effort in
                  development.
                </p>
                <p className="text-gray-700 text-xl text-justify">
                  Additionally, Codify fosters a vibrant community of creators
                  and buyers, encouraging collaboration and innovation.
                  Developers can not only sell their products but also receive
                  feedback, improve their offerings, and explore potential
                  partnerships. For buyers, it’s a go-to platform to discover
                  reliable and proven code, whether they are looking to speed up
                  a project or implement specific functionalities. Codify’s
                  clear, user-friendly interface and its commitment to
                  high-quality listings make it a standout platform for both
                  developers and businesses alike.
                </p>
              </div>
              <div className="bg-yellow-100 rounded-lg p-4 lg:w-2/5 h-fit">
                <h3 className="text-lg font-bold text-gray-800 mb-2 text-left">
                  Things to check out
                </h3>
                <ul className="list-none pl-4 space-y-2">
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Our Scrum Master tells our origin story.
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      New features in version 4.
                    </a>
                  </li>
                  <li>
                    <a href="#" className="text-blue-600 hover:underline">
                      Browse the components gallery.
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
                  Find a component, or a full website as you discover
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
