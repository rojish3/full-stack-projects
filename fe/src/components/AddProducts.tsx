import axios from "axios";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GrClose } from "react-icons/gr";

interface IModal {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddProducts: React.FC<IModal> = ({ showModal, setShowModal }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      const postData = await axios.post(
        "http://localhost:8000/product/add-product",
        data
      );
      if (postData.status === 200) {
        toast.success(postData.data, { autoClose: 1000 });
      }
      console.log(postData);
    } catch (error: any) {
      console.log(error);
    }
    reset();
  };
  if (!showModal) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-center items-center">
        <div className=" absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-40 h-auto w-[550px] bg-white opacity-100 flex flex-col p-4 shadow rounded-lg">
          <div className="flex justify-between cursor-pointer mb-4">
            <p className="font-bold text-2xl">Add Product</p>
            <GrClose onClick={() => setShowModal(false)} />
          </div>

          <div>
            <div>
              <label className="block mt-2 text-sm font-medium text-gray-900">
                Product Name
              </label>
              <input
                {...register("name", {
                  required: "This field cannot be empty.",
                  validate: (value) => {
                    if (value.trim() === "")
                      return "Name should not be empty of contain only spaces";
                  },
                })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter product name"
              />
              {errors.name && (
                <p className="text-sm text-red-600">{`${errors.name.message}`}</p>
              )}
            </div>
            <div>
              <label className="block mt-2 text-sm font-medium text-gray-900">
                Brand
              </label>
              <input
                {...register("brand", {
                  required: "This field cannot be empty.",
                })}
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Enter brand name"
              />
              {errors.brand && (
                <p className="text-sm text-red-600">{`${errors.brand.message}`}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block mt-2 text-sm font-medium text-gray-900">
              Category
            </label>
            <select
              {...register("category", {
                required: "Please select a category",
              })}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">Select Category</option>
              <option value="Laptop">Laptop</option>
              <option value="Monitor">Monitor</option>
              <option value="Accessories">Accessories</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-600">{`${errors.category.message}`}</p>
            )}
          </div>

          <div>
            <label className="block mt-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              {...register("price", {
                required: "This field is required",
              })}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter product price"
            />
            {errors.price && (
              <p className="text-sm text-red-600">{`${errors.price.message}`}</p>
            )}
          </div>
          <div>
            <label className="block mt-2 text-sm font-medium text-gray-900">
              Quantity
            </label>
            <input
              {...register("quantity", {
                required: "This field is required",
              })}
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter product price"
            />
            {errors.quantity && (
              <p className="text-sm text-red-600">{`${errors.quantity.message}`}</p>
            )}
          </div>
          <div>
            <label className="block mt-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              {...register("description")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Enter product description"
            />
            {/* {errors.brand && (
              <p className="text-sm text-red-600">{`${errors.brand.message}`}</p>
            )} */}
          </div>

          <div>
            <label className="block mt-2 text-sm font-medium text-gray-900">
              Product Image
            </label>
            <input
              type="text"
              {...register("image")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
              placeholder="Enter Image URL"
            />
          </div>
          {/* <div>
            <label className="block mt-2 text-sm font-medium text-gray-900">
              Product Image
            </label>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5 "
              placeholder="Upload image"
            />
          </div> */}

          <button
            disabled={isSubmitting}
            type="submit"
            className="mt-10 text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-3 text-center mb-2 transition-all ease-in-out duration-300 disabled:bg-gray-600 disabled:text-white"
            // onClick={() => setTimeout(() => setShowModal(false), 1000)}
          >
            {isSubmitting ? "Loading..." : "Add Product"}
          </button>
        </div>
      </div>
      {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      /> */}
    </form>
  );
};

export default AddProducts;
