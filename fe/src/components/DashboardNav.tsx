import { AiOutlineDown, AiOutlineBell } from "react-icons/ai";
import { useState } from "react";
import ProfileDropdown from "./ProfileDropdown";
import { useUser } from "../Context/userProvider";
const DashboardNav = () => {
  const [dropdown, setDropdown] = useState(false);
  const { userInfo } = useUser();

  return (
    <>
      <nav className="flex justify-between px-8 py-4 items-center border-b-2 w-full">
        <div>
          <img
            src="https://cdn.iconscout.com/icon/premium/png-256-thumb/inventory-management-1857611-1575340.png?f=webp"
            alt="logo"
            className="md:hidden block w-12"
          />
          <h1 className="text-4xl font-bold cursor-pointer hidden md:block">
            InventoryMate
          </h1>
        </div>

        <div className="icon flex items-center gap-6">
          <div className="notification cursor-pointer">
            <AiOutlineBell size={28} />
          </div>
          <div
            className="user flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
          >
            <img
              className="w-10 border border-black rounded-[50%]"
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

export default DashboardNav;
