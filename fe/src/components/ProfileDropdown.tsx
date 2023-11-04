import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { LuLogOut } from "react-icons/lu";
import { useUser } from "../Context/userProvider";
import ProfileModal from "./ProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../slice/theme/themeSlice";
interface IDropdown {
  dropdown: boolean;
  setDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileDropdown: React.FC<IDropdown> = ({ dropdown, setDropdown }) => {
  const { userInfo, clearUser } = useUser();
  const [userId, setUserId] = useState(null);
  const [userModal, setUserModal] = useState(false);
  const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const darkMode = useSelector((state) => state.theme.darkMode);
  // const toggleTheme = () => {
  //   dispatch(toggleDarkMode());
  // };

  const handleViewUser = (id: never) => {
    setUserId(id);
    setUserModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    clearUser();
    navigate("/login");
  };
  return (
    <>
      {dropdown && (
        <div
          className="absolute top-0 left-0 h-screen w-screen z-20"
          onClick={() => setDropdown(false)}
        >
          <div
            className="absolute w-56 h-auto flex flex-col gap-4 p-4 bg-white card-shadow rounded-lg top-20 right-4 z-30"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="flex items-center gap-4 cursor-pointer pb-3 border-b-2"
              onClick={() => handleViewUser(userInfo?._id)}
            >
              <img
                className="w-12 h-12 border border-black rounded-full object-cover"
                src={userInfo?.image}
                alt="profile picture"
              />
              <span>{userInfo?.firstName + " " + userInfo?.lastName}</span>
            </div>
            <div className="flex items-center gap-4 cursor-pointer">
              {/* <button onClick={toggleTheme}>
                Dark Mode: {darkMode ? "On" : "Off"}
              </button> */}
              <FiSettings />
              <span>Settings</span>
            </div>
            <div
              className="flex items-center gap-4 text-red-600 cursor-pointer"
              onClick={handleLogout}
            >
              <LuLogOut />
              <span>Log Out</span>
            </div>
          </div>
          <ProfileModal
            id={userId}
            userModal={userModal}
            setUserModal={setUserModal}
          />
        </div>
      )}
    </>
  );
};

export default ProfileDropdown;
