import axios from "axios";
import { useState, useEffect } from "react";

interface IProduct {
  id: string;
  productPage: boolean;
  setProductPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const SingleProduct: React.FC<IProduct> = ({
  id,
  productPage,
  setProductPage,
}) => {
  const [productData, setProductData] = useState(null);
  useEffect(() => {
    const getSingleProduct = async () => {
      try {
        const productInfo = await axios.get(
          `http://localhost:8000/product/single-product/${id}`
        );
        const product = productInfo.data;
        // console.log(product);
        setProductData(product);
      } catch (error) {
        console.log(error);
      }
    };
    getSingleProduct();
  }, [id]);

  if (!productPage) {
    return null;
  }
  if (productData) {
    const { image, name, price, description } = productData;
    return (
      <div className="overlay" onClick={() => setProductPage(false)}>
        <div
          className="absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%] z-40 h-auto w-[50%] bg-white opacity-100 flex flex-col p-4 shadow rounded-lg"
          onClick={(e) => e.stopPropagation()}
        >
          <h1 className="font-bold text-2xl mb-4 border-b-2">
            Product Details
          </h1>
          <div className="flex">
            <div className="w-1/2 p-4">
              <img src={image} alt="Product" />
            </div>
            <div className="w-1/2 p-4">
              <h2 className="font-bold text-xl">{name}</h2>
              <p>$ {price}</p>
              <h3 className="font-bold text-xl">Product Description</h3>
              <p>{description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SingleProduct;
