import axios from "axios";
import { useState, useEffect } from "react";

interface IProfile {
  id: null;
  userModal: boolean;
  setUserModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProfileModal: React.FC<IProfile> = ({ id, userModal, setUserModal }) => {
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const getProfileData = async () => {
      try {
        const userInfo = await axios.get(
          `http://localhost:8000/user/user-profile/${id}`
        );
        const user = userInfo.data;
        // console.log(user);
        setUserData(user);
      } catch (error) {
        console.log(error);
      }
    };
    getProfileData();
  }, [id]);

  if (!userModal) {
    return null;
  }
  if (userData) {
    const { image, firstName, lastName, email, phoneNumber, gender } = userData;
    return (
      <div className="overlay" onClick={() => setUserModal(false)}>
        <div
          className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-40 h-auto w-auto bg-white opacity-100 flex flex-col p-4 md:p-8 shadow rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="font-bold text-2xl mb-4 border-b-2">User Details</h1>
          <div className="flex gap-2 md:gap-4">
            <div className="w-1/2 p-2 md:p-4 flex flex-col items-center justify-center gap-4">
              <img
                src={image}
                alt="Profile Picture"
                className="w-54 h-54 rounded-full object-cover"
              />
              <h2 className="font-bold text-xl text-center">
                {firstName + " " + lastName}
              </h2>
            </div>
            <div className="w-1/2 p-2 md:p-4">
              <h3 className="font-bold text-xl">Email:</h3>
              <p>{email}</p>
              <h3 className="font-bold text-xl mt-4">Phone Number:</h3>
              <p>{phoneNumber}</p>
              <h3 className="font-bold text-xl mt-4">Gender:</h3>
              <p>{gender}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ProfileModal;
