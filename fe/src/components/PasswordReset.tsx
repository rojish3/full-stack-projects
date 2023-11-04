import { useState } from "react";
import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { BiSolidShow, BiSolidHide } from "react-icons/bi";

const PasswordReset = () => {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const navigate = useNavigate();

  const url = new URL(window.location.href);
  const token = url.searchParams.get("token");

  const handleClick = async (data: FieldValues) => {
    try {
      const resetPassword = await axios.post(
        `http://localhost:8000/reset-password?token=${token}`,
        data
        // { headers: { Authorization: `Bearer token=${token}` } }
      );
      if (resetPassword.status === 200) {
        toast.success(resetPassword.data);
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
      // console.log(resetPassword);
    } catch (error: any) {
      toast.error(error.response.data);
    }
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleClick)}>
      <div className="flex justify-center items-center h-screen">
        <div className="h-auto w-[550px] max-w-[700px] bg-white opacity-100 flex flex-col p-4 shadow rounded-lg">
          <div className="flex justify-between cursor-pointer mb-4">
            <p className="text-2xl font-bold uppercase">Reset Password</p>
          </div>
          <p className="text-gray-400 text-sm">Enter a new password</p>

          <div>
            <label className="block mt-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative">
              <input
                {...register("password", {
                  required: "This filed is required",
                  pattern: {
                    value: /^(?=.*[A-Z])(?=.*\d)(?=.*\W).*$/,
                    message:
                      "Password must contain a Uppercase letter, a number and a symbol",
                  },
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
          <div>
            <label className="block mt-2 text-sm font-medium text-gray-900">
              Confirm Password
            </label>
            <div className="relative">
              <input
                {...register("confirmPassword", {
                  required: "This filed is required",
                  minLength: {
                    value: 8,
                    message: "Passowrd must be atleast 8 characters",
                  },
                  validate: (value) => {
                    return (
                      value === getValues("password") ||
                      "Password did not match"
                    );
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
            {errors.confirmPassword && (
              <p className="text-sm text-red-600">{`${errors.confirmPassword.message}`}</p>
            )}
          </div>
          <button
            disabled={isSubmitting}
            className="mt-4 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
            //   onClick={() => handleSubmit()}
          >
            Reset Password
          </button>
        </div>
      </div>
      <ToastContainer />
    </form>
  );
};

export default PasswordReset;
