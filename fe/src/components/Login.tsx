import { FieldValues, useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";
import image from "../assets/image.jpg";
import Modal from "./Modal";
import { useUser } from "../Context/userProvider";

const Login = () => {
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const postData = await axios.post("http://localhost:8000/login", data);
      if (postData.status === 200) {
        toast.success(postData.data.message);

        const token = postData.data.accesstoken;
        const allUserInfo = postData.data.userData;
        const { _id, firstName, lastName, email, image, role } = allUserInfo;
        const userInfo = {
          _id,
          firstName,
          lastName,
          email,
          image,
          role,
        };
        updateUser(userInfo);

        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(userInfo));
        if (userInfo?.role === "ADMIN") {
          setTimeout(() => {
            navigate("/dashboard");
          });
        } else if (userInfo?.role === "USER") {
          setTimeout(() => {
            navigate("/home");
          });
        }
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        toast.error("Invalid Email or Password");
      }
    }
    reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex justify-center items-center h-screen">
          <div className="w-[550px] max-w-[550px] h-auto m-auto flex flex-col justify-center p-4">
            <h1 className="text-2xl font-bold mb-4 uppercase">Log In</h1>
            <div className="lg:w-full lg:gap-4">
              <div>
                <label className="block mt-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  {...register("email", {
                    required: "This field is required",
                    pattern: {
                      value: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
                      message: "Invalid Email, please enter valid email",
                    },
                  })}
                  type="text"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="johndoe@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-red-600">{`${errors.email.message}`}</p>
                )}
              </div>
              <div>
                <label className="block mt-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: "This filed is required",
                      // pattern: {
                      //   value: /^(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/,
                      //   message:
                      //     "Password must contain a Uppercase letter, a number and a symbol",
                      // },
                      minLength: {
                        value: 8,
                        message: "Passowrd must be atleast 8 characters",
                      },
                    })}
                    type={showPassword ? "text" : "password"}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                    placeholder="********"
                  />
                  <button
                    type="button"
                    className="absolute top-2 right-2 text-gray-500"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <BiSolidHide size={25} />
                    ) : (
                      <BiSolidShow size={25} />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-600">{`${errors.password.message}`}</p>
                )}
              </div>
            </div>
            <button
              type="submit"
              className="mt-10 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Logging In..." : "Log In"}
            </button>
            <a
              className="py-4 text-gray-400 cursor-pointer hover:underline"
              onClick={() => setShowModal(true)}
            >
              Forgot your password?
            </a>
            {/* <Modal showModal={showModal} setShowModal={setShowModal} /> */}

            <p>
              Don't have an account?{" "}
              <a
                className="cursor-pointer text-blue-700 hover:underline"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </a>
            </p>
          </div>
          <div className="right-container w-1/2 hidden lg:block">
            <img src={image} alt="image" />
          </div>
        </div>
      </form>
      <Modal showModal={showModal} setShowModal={setShowModal} />

      <ToastContainer />
    </>
  );
};

export default Login;
