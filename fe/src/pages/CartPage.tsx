import axios from "axios";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { useUser } from "../Context/userProvider";
import HomeNav from "../components/HomeNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { IRequest } from "../types/request.types";

const CartPage = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [request, setRequest] = useState([]);
  const { userInfo } = useUser();
  const navigate = useNavigate();
  const userEmail = userInfo?.email;
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  useEffect(() => {
    const getRequestData = async () => {
      try {
        const requestData = await axios.get("http://localhost:8000/request");
        setLoading(false);
        // console.log(requestData.data);
        setRequest(requestData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRequestData();
  }, []);

  const deleteRequest = async (id: string) => {
    try {
      const deletedData = await axios.delete(
        `http://localhost:8000/request/delete-request/${id}`
      );
      // console.log(deletedData);
      if (deletedData.status === 200) {
        toast.success(deletedData.data, { autoClose: 1000 });
        const updatedRequest = request.filter((item) => item.id !== id);
        console.log(updatedRequest);
        setRequest(updatedRequest);
        // const requestData = await axios.get("http://localhost:8000/request");
        // setLoading(false);
        // console.log(requestData.data);
        // setRequest(requestData.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <HomeNav />
      <h1 className="text-3xl font-bold px-8 py-4">Requested Products</h1>
      {loading ? (
        <div className="flex justify-center items-center mt-60">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="w-full px-8">
          <table className="border-collapse w-full">
            <thead className="border-y-4 text-lg">
              <tr>
                <th className="p-4 text-left">Name</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="border-collapse w-full text-left">
              {request?.map((item: IRequest) => {
                const { _id, name, quantity, email, status } = item;
                if (userEmail === email) {
                  return (
                    <tr key={_id} className="border-y-2 list-bg text-center">
                      <td className="text-left">{name}</td>
                      <td>{quantity}</td>
                      <td>
                        {status == "approved" ? (
                          <span className="font-bold text-green-500">
                            Approved
                          </span>
                        ) : status == "declined" ? (
                          <span className="font-bold text-red-500">
                            Declined
                          </span>
                        ) : (
                          <span className="font-bold text-yellow-500">
                            Pending
                          </span>
                        )}
                      </td>

                      <td className="text-center  ">
                        <button className="p-3 rounded-md border-red-400 bg-red-500 hover:bg-red-400">
                          <ImCross onClick={() => deleteRequest(_id)} />
                        </button>
                      </td>
                    </tr>
                  );
                }
              })}
            </tbody>
          </table>
        </div>
      )}
      <ToastContainer />
    </>
  );
};

export default CartPage;
