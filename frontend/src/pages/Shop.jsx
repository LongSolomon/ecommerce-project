import { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetFilteredProductsQuery } from "../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../redux/api/categoryApiSlice";

import {
  setCategories,
  setProducts,
  setChecked,
} from "../redux/features/shop/shopSlice";
import Loader from "../components/Loader";
import ProductCard from "./Products/ProductCard";

const Shop = () => {
  const dispatch = useDispatch();
  const { categories, products, checked, radio } = useSelector(
    (state) => state.shop
  );
  const categoriesQuery = useFetchCategoriesQuery();
  const [priceFilter, setPriceFilter] = useState("");

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });

  const selectedBrands = useRef([]);

  useEffect(() => {
    // console.log('categoriesQuery')
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
        // Filter products based on both checked categories and price filter
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            // Check if the product price includes the entered price filter value
            return (
              product.price.toString().includes(priceFilter) ||
              product.price === parseInt(priceFilter, 10)
            );
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  // const handleBrandClick = (brand) => {
  //   const productsByBrand = filteredProductsQuery.data?.filter(
  //     (product) => product.brand === brand
  //   );
  //   dispatch(setProducts(productsByBrand));
  // };

  const handleBrandCheck = (value, brand) => {
    selectedBrands.current = value ? [...selectedBrands.current, brand] : selectedBrands.current.filter((b) => b !== brand);
    const productsByBrand = JSON.stringify(selectedBrands.current) != JSON.stringify([]) ? filteredProductsQuery.data?.filter(
      (product) => selectedBrands.current.includes(product.brand)
    ) : filteredProductsQuery.data;
    console.log('productsByBrand', productsByBrand)
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value
      ? [...checked, id]
      : checked.filter((c) => c !== id);
    dispatch(setChecked(updatedChecked));
  };

  const uniqueBrands = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.brand)
          .filter((brand) => brand !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    setPriceFilter(e.target.value);
  };
  console.log('checked', checked)
  console.log('radio', radio)
  console.log('uniqueBrands', uniqueBrands)
  console.log('selectedBrands', selectedBrands.current)
  return (
    <div className="ml-1">
      <div className="flex md:flex-row">
        <div className="py-3 mb-2 border-gray-200 border-r-2 px-5">
          <h2 className="py-2 bg-white rounded-full text-start ml-2 font-bold">
            Categories
          </h2>
          <div className="w-60 mt-2 mb-5 flex flex-wrap">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2 w-full">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={c._id}
                    onChange={(e) => handleCheck(e.target.checked, c._id)}
                    className="hidden"
                  />
                  <label
                    htmlFor={c._id}
                    className={`ml-2 text-sm cursor-pointer font-medium border-2 px-3 py-1 rounded-lg transition-colors duration-300 ${checked.includes(c._id)
                      ? "bg-sky-700 text-white border-sky-300"
                      : "text-sky-600 border-sky-600"
                      }`}
                  >
                    {c.name}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="h4 text-start ml-2 py-1 bg-white rounded-full font-bold">
            Brands
          </h2>
          <div className="mt-2 mb-5 ml-2">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="mb-2 w-full">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id={brand}
                    name="brand"
                    onChange={(e) => handleBrandCheck(e.target.checked, brand)}
                    className="hidden"
                  />
                  <label
                    htmlFor={brand}
                    className={`text-sm cursor-pointer font-medium border-2 px-3 py-1 rounded-lg transition-colors duration-300 ${selectedBrands.current.includes(brand)
                      ? "bg-teal-600 text-white border-teal-300"
                      : "text-teal-600 border-teal-600"
                      }`}
                  >
                    {brand}
                  </label>
                </div>
              </div>
            ))}
          </div>

          <h2 className="h4 text-start ml-2 py-1 bg-white rounded-full font-bold">
            Price
          </h2>

          <div className="mt-2 mb-1 ml-2 w-[15rem]">
            <input
              type="text"
              placeholder="Enter Price"
              value={priceFilter}
              onChange={handlePriceChange}
              className="w-full px-3 py-2 placeholder-gray-400 border-2 border-black/70 rounded-xl focus:outline-none"
            />
          </div>

          <div className="px-4 mt-4 flex justify-center items-start">
            <button
              className="w-full border py-2 font-bold rounded-3xl bg-teal-600 text-white transition-colors duration-300"
              onClick={() => window.location.reload()}
            >
              Clear filters
            </button>
          </div>
        </div>

        <div className="p-3">
          {/* <h2 className="h4 text-center mb-2 bg-gray-400">{products?.length} Products</h2> */}
          <div className="flex flex-wrap gap-3 justify-start items-center">
            {products.length === 0 ? (
              <Loader />
            ) : (
              products?.map((p) => (
                <div className="p-3" key={p._id}>
                  <ProductCard p={p} />
                </div>


              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
