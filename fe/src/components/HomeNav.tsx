import {
  AiOutlineDown,
  AiOutlineBell,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useUser } from "../Context/userProvider";
import { useNavigate } from "react-router-dom";

const HomeNav = () => {
  const [dropdown, setDropdown] = useState(false);
  const { userInfo } = useUser();
  const navigate = useNavigate();

  return (
    <>
      <nav className="flex justify-between px-8 py-4 items-center relative border-b-2">
        <img
          src="https://cdn.iconscout.com/icon/premium/png-256-thumb/inventory-management-1857611-1575340.png?f=webp"
          alt="logo"
          className="md:hidden block w-12"
          onClick={() => navigate("/home")}
        />
        <h1
          className="text-4xl font-bold cursor-pointer hidden md:block"
          onClick={() => navigate("/home")}
        >
          InventoryMate
        </h1>

        <div className="flex items-center gap-6">
          <div className="cursor-pointer">
            <AiOutlineShoppingCart
              size={30}
              onClick={() => navigate("/cart")}
            />
          </div>
          <div className="cursor-pointer">
            <AiOutlineBell size={28} />
          </div>
          <div
            className="user flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
          >
            <img
              className="w-12 h-12 border border-black rounded-full object-cover"
              src={userInfo?.image}
              alt="profile picture"
            />
            <AiOutlineDown />
          </div>
          <ProfileDropdown dropdown={dropdown} setDropdown={setDropdown} />
        </div>
      </nav>
    </>
  );
};

export default HomeNav;
