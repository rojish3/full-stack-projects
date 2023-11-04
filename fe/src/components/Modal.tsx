import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";
import { useState, useEffect } from "react";

interface IModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal: React.FC<IModal> = ({ showModal, setShowModal }) => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleClick = async () => {
    setLoading(true);

    try {
      const postData = await axios.post(
        "http://localhost:8000/forgot-password",
        {
          email,
        }
      );
      if (postData.status === 200) {
        toast.success(postData.data);
      }
      console.log(postData);
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
    }

    setEmail("");
  };

  useEffect(() => {
    if (!showModal) {
      setLoading(false);
    }
  }, [showModal]);

  if (!showModal) {
    return null;
  }

  return (
    <div className="overlay">
      <div className=" absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-40 h-auto w-96 bg-white opacity-100 flex flex-col p-4 shadow rounded-lg">
        <div className="flex justify-between cursor-pointer mb-4">
          <p className="font-bold">Forgot Password</p>
          <GrClose onClick={() => setShowModal(false)} />
        </div>
        <p className="text-gray-400 text-sm">
          What's your email? We'll send you a password reset link.
        </p>

        <label className="block mt-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          type="text"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className="mt-4 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
          onClick={() => handleClick()}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send me a link"}
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Modal;
