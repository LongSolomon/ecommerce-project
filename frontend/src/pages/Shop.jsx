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
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 1000 });

  const filteredProductsQuery = useGetFilteredProductsQuery({
    checked,
    radio,
  });
  const selectedAttributes = useRef([]);
  const selectedBrands = useRef([]);

  useEffect(() => {
    if (!categoriesQuery.isLoading) {
      dispatch(setCategories(categoriesQuery.data));
    }
  }, [categoriesQuery.data, dispatch]);

  useEffect(() => {
    if (!checked.length || !radio.length) {
      if (!filteredProductsQuery.isLoading && filteredProductsQuery.data) {
        const filteredProducts = filteredProductsQuery.data.filter(
          (product) => {
            const price = product.price;
            const minPrice = priceFilter.min ? parseInt(priceFilter.min, 10) : 0;
            const maxPrice = priceFilter.max ? parseInt(priceFilter.max, 10) : Infinity;
            return price >= minPrice && price <= maxPrice;
          }
        );

        dispatch(setProducts(filteredProducts));
      }
    }
  }, [checked, radio, filteredProductsQuery.data, dispatch, priceFilter]);

  const handleAttributeCheck = (value, attribute) => {
    selectedAttributes.current = value ? [...selectedAttributes.current, attribute] : selectedAttributes.current.filter((a) => a !== attribute);
    const productsByAttribute = JSON.stringify(selectedAttributes.current) != JSON.stringify([]) ? filteredProductsQuery.data?.filter(
      (product) => selectedAttributes.current.includes(product.attributes)
    ) : filteredProductsQuery.data;
    dispatch(setProducts(productsByAttribute));
  };

  const handleBrandCheck = (value, brand) => {
    selectedBrands.current = value ? [...selectedBrands.current, brand] : selectedBrands.current.filter((b) => b !== brand);
    const productsByBrand = JSON.stringify(selectedBrands.current) != JSON.stringify([]) ? filteredProductsQuery.data?.filter(
      (product) => selectedBrands.current.includes(product.brand)
    ) : filteredProductsQuery.data;
    console.log('productsByBrand', productsByBrand)
    dispatch(setProducts(productsByBrand));
  };

  const handleCheck = (value, id) => {
    const updatedChecked = value ? [id] : checked.filter((c) => c !== id);
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
  const allAttributes = [
    ...Array.from(
      new Set(
        filteredProductsQuery.data
          ?.map((product) => product.attributes)
          .filter((attr) => attr !== undefined)
      )
    ),
  ];

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceFilter((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="ml-1">
      <div className="flex md:flex-row">
        <div className="py-3 mb-2 border-gray-200 border-r-2 px-5">
          <h2 className="py-2 bg-white rounded-full text-start ml-2 font-bold">
            Categories
          </h2>
          <div className="w-60 mt-2 mb-5 flex flex-wrap gap-1">
            {categories?.map((c) => (
              <div key={c._id} className="mb-2">
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

          {checked.length > 0 &&
            <>
              <h2 className="h4 text-start ml-2 py-1 bg-white rounded-full font-bold">
                Attributes
              </h2>
              <div className="mt-2 mb-5 ml-2 flex flex-wrap gap-1">
                {allAttributes?.map((attribute) => (
                  <div key={attribute} className="mb-2">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={attribute}
                        name="attribute"
                        onChange={(e) => handleAttributeCheck(e.target.checked, attribute)}
                        className="hidden"
                      />
                      <label
                        htmlFor={attribute}
                        className={`text-sm cursor-pointer font-medium border-2 px-3 py-1 rounded-lg transition-colors duration-300 ${selectedAttributes.current.includes(attribute)
                          ? "bg-teal-600 text-white border-teal-300"
                          : "text-teal-600 border-teal-600"
                          }`}
                      >
                        {attribute}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </>
          }

          <h2 className="h4 text-start ml-2 py-1 bg-white rounded-full font-bold">
            Brands
          </h2>
          <div className="mt-2 mb-5 ml-2 flex flex-wrap gap-1">
            {uniqueBrands?.map((brand) => (
              <div key={brand} className="mb-2">
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
            <label>Min Price: {priceFilter.min}</label>
            <input
              type="range"
              name="min"
              min="0"
              max="1000"
              value={priceFilter.min}
              onChange={handlePriceChange}
              className="w-full"
            />
            <label>Max Price: {priceFilter.max}</label>
            <input
              type="range"
              name="max"
              min="0"
              max="1000"
              value={priceFilter.max}
              onChange={handlePriceChange}
              className="w-full"
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