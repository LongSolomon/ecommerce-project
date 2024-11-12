import { Link } from "react-router-dom";
import moment from "moment";
import { useAllProductsQuery } from "../../redux/api/productApiSlice";

const AllProducts = () => {
  const { data: products, isLoading, isError } = useAllProductsQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error loading products</div>;
  }

  return (
    <>
      <div style={{ paddingLeft: '2vw' }}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row">
            <div className="p-3 w-full">
              <div className="ml-4 text-xl font-bold h-12">
                All Products ({products.length})
              </div>
              <div className="flex flex-wrap justify-around items-center">
                {products.map((product) => (
                  <Link
                    key={product._id}
                    to={`/admin/product/update/${product._id}`}
                    className="block mb-4 overflow-hidden w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                  >
                    <div className="flex flex-col items-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-40 object-cover"
                      />
                      <div className="p-4 flex flex-col justify-around w-full">
                        <div className="flex justify-between w-full">
                          <h5 className="text-xl font-semibold mb-2">
                            {product?.name}
                          </h5>

                          <p className="text-gray-400 text-xs">
                            {moment(product.createdAt).format("MMM D, YYYY")}
                          </p>
                        </div>

                        <p className="text-gray-400 text-sm mb-4">
                          {product?.description?.substring(0, 160)}...
                        </p>

                        <div className="flex justify-between w-full">
                          <Link
                            to={`/admin/product/update/${product._id}`}
                            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          >
                            Update Product
                            <svg
                              className="w-3.5 h-3.5 ml-2"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 14 10"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M1 5h12m0 0L9 1m4 4L9 9"
                              />
                            </svg>
                          </Link>
                          <p>$ {product?.price}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div className="md:w-1/4 p-3 mt-2"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;