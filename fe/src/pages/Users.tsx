import axios from "axios";
import { useState, useEffect } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProfileModal from "../components/ProfileModal";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [userModal, setUserModal] = useState(false);

  // const token = localStorage.getItem("token");
  // const axiosInstance = axios.create({
  //   baseURL: "http://localhost:8000",
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //     "Content-Type": "application/json",
  //   },
  // });

  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/user");
        setLoading(false);
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    getUsersData();
  }, [users]);

  const handleViewUser = (id: never) => {
    setUserId(id);
    setUserModal(true);
  };
  const deleteUser = async (id: never) => {
    try {
      const deleteData = await axios.delete(
        `http://localhost:8000/user/delete-user/${id}`
      );
      // console.log(deleteData);
      if (deleteData.status === 200) {
        toast.success(deleteData.data);
      }
    } catch (error) {
      toast.error("An Error occured");
    }
  };

  return (
    <>
      <div className="w-full">
        <h1 className="text-3xl font-bold p-4">Users</h1>
        <div>
          {loading ? (
            <div className="flex justify-center items-center mt-60">
              <span className="loader"></span>
            </div>
          ) : (
            <table className="border-collapse w-full overflow-x-auto">
              <thead className="border-y-4 text-lg">
                <tr>
                  <th className="p-4">SN</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody className="border-collapse w-full text-center">
                {users.map((user, index) => {
                  const { _id, firstName, lastName, email, role } = user;
                  if (role !== "ADMIN") {
                    return (
                      <tr
                        key={_id}
                        className="even:bg-gray-200 text-center border-b-2"
                      >
                        <td>{index}</td>
                        <td>{firstName + " " + lastName}</td>
                        <td>{email}</td>
                        <td className="flex justify-center gap-4">
                          <span className="my-anchor-element cursor-pointer">
                            <AiOutlineEye
                              size={25}
                              onClick={() => handleViewUser(_id)}
                            />
                          </span>
                          <span className="cursor-pointer">
                            <FaTrashAlt
                              size={20}
                              color={"red"}
                              onClick={() => deleteUser(_id)}
                            />
                          </span>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          )}
        </div>
        {userModal && (
          <ProfileModal
            id={userId}
            userModal={userModal}
            setUserModal={setUserModal}
          />
        )}
        <ToastContainer autoClose={1000} />
      </div>
    </>
  );
};

export default Users;
