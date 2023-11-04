import { useEffect, useState } from "react";
import axios from "axios";
import { Fade } from "react-awesome-reveal";

import ProductCard from "../components/ProductCard";
import HomeNav from "../components/HomeNav";
import { useNavigate } from "react-router-dom";
import { IProduct } from "../types/product.types";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);

  useEffect(() => {
    const getProductData = async () => {
      try {
        const productData = await axios.get("http://localhost:8000/product");
        setLoading(false);
        setProduct(productData.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProductData();
  }, []);
  return (
    <>
      <HomeNav />
      <Fade>
        <div className="p-8">
          {loading ? (
            <div className="flex justify-center items-center mt-32">
              <span className="loader"></span>
            </div>
          ) : !product ? (
            <p className="text-center text-2xl mt-32">-- No product found --</p>
          ) : (
            <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-y-8">
              {product?.map((item: IProduct) => {
                return (
                  <div key={item._id}>
                    <ProductCard {...item} />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </Fade>
    </>
  );
};

export default Home;
