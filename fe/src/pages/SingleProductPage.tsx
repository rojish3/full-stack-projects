import axios from "axios";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useUser } from "../Context/userProvider";
import { Slide } from "react-awesome-reveal";
import HomeNav from "../components/HomeNav";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProduct {
  id: string;
  //   productModal: boolean;
  //   setProductModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleProductPage: React.FC<IProduct> = () => {
  const { id } = useParams();
  const { userInfo } = useUser();
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const productInfo = await axios.get(
          `http://localhost:8000/product/single-product/${id}`
        );
        setLoading(false);
        const product = productInfo.data;
        // console.log(product);
        setProductData(product);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
  }, [id]);

  if (productData) {
    const { _id, image, name, price, description, quantity } = productData;

    const requestProduct = async (id, name, quantity) => {
      setCount(0);
      const email = userInfo?.email;
      const data = {
        name,
        email,
        quantity,
      };
      try {
        const productRequest = await axios.post(
          `http://localhost:8000/request/add-request`,
          data
        );
        console.log(productRequest);
        if (productRequest.status === 200) {
          toast.success(productRequest.data, { autoClose: 1000 });
        }
      } catch (error) {
        console.log(error);
      }
      console.log(id, name, quantity);
    };
    return (
      <>
        <HomeNav />
        <div className="">
          <Link to="/home">
            <button className="flex justify-center items-center gap-2 hover:underline ml-10 mt-4">
              <AiOutlineArrowLeft />
              Go back
            </button>
          </Link>
          {loading ? (
            <div className="flex justify-center items-center mt-32">
              <span className="loader"></span>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2 p-4">
                <Slide direction="left">
                  <img src={image} alt="Product" />
                </Slide>
              </div>
              <div className="md:w-1/2 p-4">
                <Slide direction="right">
                  <h2 className="font-semibold text-2xl md:text-4xl my-4">
                    {name}
                  </h2>
                  <p className="font-bold text-3xl md:text-5xl my-4">
                    $ {price}
                  </p>
                  <h3 className="font-semibold text-md md:text-2xl mt-4 md:mt-8 my-4">
                    Product Description
                  </h3>
                  <p className="md:text-lg">{description}</p>
                  <p className="text:lg md:text-xl font-semibold my-4">
                    Stock: {quantity}
                  </p>

                  <div className="flex flex-row h-8 w-32 md:h-10 md:w-40 rounded-lg relative bg-transparent mt-1">
                    <button
                      className=" bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none"
                      onClick={() => {
                        setCount(function (prevCount) {
                          if (prevCount > 0) {
                            return (prevCount -= 1);
                          } else {
                            return (prevCount = 0);
                          }
                        });
                      }}
                    >
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      className="outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black md:text-basecursor-default flex items-center text-gray-700"
                      value={count}
                      onChange={(e) => setCount(Number(e.target.value))}
                    ></input>
                    <button
                      data-action="increment"
                      className="bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer"
                      onClick={() => {
                        setCount(function (prevCount) {
                          if (prevCount < quantity) {
                            return (prevCount += 1);
                          } else prevCount;
                        });
                      }}
                    >
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>

                  <button
                    disabled={count === 0}
                    className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-2 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-2xl px-5 py-2.5 text-center mt-3 md:mt-10"
                    onClick={() => requestProduct(_id, name, count)}
                  >
                    Request
                  </button>
                </Slide>
              </div>
            </div>
          )}
        </div>
        <ToastContainer autoClose={1000} />
      </>
    );
  }
};

export default SingleProductPage;
