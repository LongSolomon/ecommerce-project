import { useState } from "react";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineShoppingCart,
  AiOutlineLogout,
} from "react-icons/ai";
import { FaRegStar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Navigation.css";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../redux/api/usersApiSlice";
import { logout } from "../../redux/features/auth/authSlice";
import FavoritesCount from "../Products/FavoritesCount";
import "./styles.css";

import { CgProfile } from "react-icons/cg";
import { BiExpandHorizontal } from "react-icons/bi";

const Navigation = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div
      style={{ zIndex: 9999 }}
      className={`${showSidebar ? "hidden" : "flex"
        } xl:flex lg:flex md:hidden sm:hidden justify-between p-4 text-black bg-white w-full`}
      id="navigation-container"
    >
      <div className="flex justify-center items-center gap-24 ml-12 lg:ml-[200px]">
        <Link
          to="/"
          className={`flex items-center transition-transform transform hover:translate-x-2 ${isActive("/") ? "text-sky-600" : ""
            }`}
        >
          <AiOutlineHome className="ml-2 mr-2" size={26} />
          <span className="hidden nav-item-name">HOME</span>
        </Link>

        <Link
          to="/shop"
          className={`flex items-center transition-transform transform hover:translate-x-2 ${isActive("/shop") ? "text-sky-600" : ""
            }`}
        >
          <AiOutlineShopping className="ml-2 mr-2" size={26} />
          <span className="hidden nav-item-name">SHOP</span>
        </Link>

        <Link to="/cart" className="flex relative">
          <div className={`flex items-center transition-transform transform hover:translate-x-2 ${isActive("/cart") ? "text-sky-600" : ""
            }`}>
            <AiOutlineShoppingCart className="ml-2 mr-2" size={26} />
            <span className="hidden nav-item-name">Cart</span>
          </div>

          <div className="absolute top-5 left-6">
            {cartItems.length > 0 && (
              <span>
                <span className="px-1 py-0 text-sm text-white bg-blue-500 rounded-full">
                  {cartItems.reduce((a, c) => a + c.qty, 0)}
                </span>
              </span>
            )}
          </div>
        </Link>

        <Link to="/favorite" className="flex relative">
          <div
            className={`flex justify-center items-center transition-transform transform hover:translate-x-2 ${isActive("/favorite") ? "text-sky-600" : ""
              }`}
          >
            <FaRegStar className="ml-2 mr-2" size={20} />
            <span className="hidden nav-item-name">Favorites</span>
            <FavoritesCount />
          </div>
        </Link>
      </div>

      <div className="relative flex items-center space-x-20">
        <button
          onClick={toggleDropdown}
          className="flex items-center text-gray-800 focus:outline-none"
        >
          {userInfo && userInfo.username ? (
            <>
              <span className="text-black">{userInfo.username}</span>
              <BiExpandHorizontal className="ml-2 mr-2" size={20} />
            </>
          ) : null}
        </button>

        {dropdownOpen && userInfo && (
          <div className="flex space-x-10">
            <Link
              to="/profile"
              className={`flex items-center transition-transform transform hover:translate-x-2 ${isActive("/profile") ? "text-sky-600" : ""
                }`}
            >
              <CgProfile className="ml-2 mr-2" size={26} />
              <span className="hidden nav-item-name">Profile</span>
            </Link>

            <button
              onClick={logoutHandler}
              className="flex items-center w-full px-4 transition-transform transform hover:translate-x-2 text-left"
            >
              <AiOutlineLogout className="ml-2 mr-2" size={26} />
              <span className="hidden nav-item-name">Logout</span>
            </button>
          </div>
        )}
        {!userInfo && (
          <div className="flex space-x-10">
            <Link
              to="/login"
              className={`flex items-center transition-transform transform hover:translate-x-2 ${isActive("/login") ? "text-sky-600" : ""
                }`}
            >
              <AiOutlineLogin className="ml-2 mr-2" size={26} />
              <span className="hidden nav-item-name">LOGIN</span>
            </Link>

            {/* <Link
              to="/register"
              className="flex items-center transition-transform transform hover:translate-x-2"
            >
              <AiOutlineUserAdd size={26} />
              <span className="hidden nav-item-name">REGISTER</span>
            </Link> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navigation;