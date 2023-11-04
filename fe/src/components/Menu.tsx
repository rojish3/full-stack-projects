import { Link, NavLink } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { LiaClipboardListSolid } from "react-icons/lia";
import { TbPresentationAnalytics } from "react-icons/tb";

const Menu = () => {
  return (
    <div className="p-4">
      <div className="item flex flex-col gap-4">
        <span className="text-xl md:text-2xl font-bold mt-4">MENU</span>
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            isActive ? "bg-gray-300 rounded-lg font-bold " : ""
          }
        >
          <div className="flex items-center md:gap-2 hover:bg-gray-200 p-2 pr-4 rounded-lg">
            <TbPresentationAnalytics size={25} />
            <p className="text-xl hidden md:block">Dashboard</p>
          </div>
        </NavLink>
        <NavLink
          to="/users"
          className={({ isActive }) =>
            isActive ? "bg-gray-300 rounded-lg font-bold " : ""
          }
        >
          <div className="flex items-center gap-2 hover:bg-gray-200 p-2 pr-4 rounded-lg">
            <FiUsers size={25} />
            <p className="text-xl hidden md:block">Users</p>
          </div>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "bg-gray-300 rounded-lg font-bold " : ""
          }
        >
          <div className="flex items-center gap-2 hover:bg-gray-200 p-2 pr-4 rounded-lg">
            <AiOutlineShoppingCart size={25} />
            <p className="text-xl hidden md:block">Inventory</p>
          </div>
        </NavLink>
        <NavLink
          to="/requests"
          className={({ isActive }) =>
            isActive ? "bg-gray-300 rounded-lg font-bold" : ""
          }
        >
          <div className="flex items-center gap-2 hover:bg-gray-200 p-2 pr-4 rounded-lg">
            <LiaClipboardListSolid size={25} />
            <p className="text-xl hidden md:block">Requests</p>
          </div>
        </NavLink>
      </div>
    </div>
  );
};

export default Menu;
