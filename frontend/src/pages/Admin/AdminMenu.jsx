import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaBars, FaTimes, FaTachometerAlt, FaPlus, FaList, FaUsers, FaBox, FaClipboardList, FaCog } from "react-icons/fa";
import { MdOutlinePageview, MdLibraryBooks } from "react-icons/md";
import { AiOutlineSchedule, AiFillSetting } from "react-icons/ai";
import { BsGraphUp, BsTags } from "react-icons/bs";
import { RiPagesLine } from "react-icons/ri";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        onClick={toggleMenu}
        className="fixed top-2 left-2 z-50 p-2"
      >
        {isMenuOpen ? <FaTimes className="text-black" size={24} /> : <FaBars className="text-black" size={24} />}
      </button>
      <div
        className={`h-[100vh] bg-gray-100 p-2 fixed z-40 w-[18vw] transition-transform duration-300 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <section className="p-4 w-full">
          <ul className="list-none mt-10 flex flex-col gap-2">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `py-2 px-3 flex items-center rounded-xl text-base font-semibold ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                  }`
                }
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >
                <FaTachometerAlt className="mr-3 text-lg" /> Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `py-2 px-3 flex items-center rounded-xl text-base font-semibold ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                  }`
                }
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >
                <FaPlus className="mr-3 text-lg" /> Create Category
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `py-2 px-3 flex items-center rounded-xl text-base font-semibold ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                  }`
                }
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >
                <FaBox className="mr-3 text-lg" /> Create Product
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `py-2 px-3 flex items-center rounded-xl text-base font-semibold ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                  }`
                }
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >a
                <FaClipboardList className="mr-3 text-lg" /> All Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `py-2 px-3 flex items-center rounded-xl text-base font-semibold ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                  }`
                }
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >
                <FaUsers className="mr-3 text-lg" /> Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `py-2 px-3 flex items-center rounded-xl text-base font-semibold ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                  }`
                }
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >
                <MdLibraryBooks className="mr-3 text-lg" /> Manage Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                className={({ isActive }) =>
                  `py-2 px-3 flex items-center rounded-xl text-base font-semibold ${isActive ? "bg-gray-200" : "hover:bg-gray-200"
                  }`
                }
                to="/admin/settings"
                style={({ isActive }) => ({
                  color: isActive ? "blue" : "black",
                })}
              >
                <AiFillSetting className="mr-3 text-lg" /> Settings
              </NavLink>
            </li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default AdminMenu;
