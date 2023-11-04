import axios from "axios";
import { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineSearch } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";
import AddProducts from "../components/AddProducts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditProduct from "../components/EditProduct";
import SingleProduct from "../components/SingleProduct";

const Products = () => {
  const [product, setProduct] = useState([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [productPage, setProductPage] = useState<boolean>(false);
  const [editMenu, setEditMenu] = useState<boolean>(false);
  const [productId, setProductId] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState([]);
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
  }, [product]);
  useEffect(() => {
    setFilteredProducts(
      product.filter((item: any) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [search, product]);

  const handleViewProduct = (id: string) => {
    setProductId(id);
    setProductPage(true);
    setEditMenu(false);
  };

  const editProduct = async (id: string) => {
    setProductId(id);
    setEditMenu(true);
    setProductPage(false);
  };

  const deleteProduct = async (id: string) => {
    try {
      const deleteData = await axios.delete(
        `http://localhost:8000/product/delete-product/${id}`
      );
      console.log(deleteData);
      if (deleteData.status === 200) {
        toast.success(deleteData.data);
      }
    } catch (error) {
      toast.error("An Error occurred");
    }
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl md:text-3xl font-bold p-4">
          Inventory Products
        </h1>
        <form className="w-[40%]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <AiOutlineSearch size={20} />
            </div>
            <input
              className="block w-full p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-full bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search Products"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
          </div>
        </form>

        <button
          className="flex text-sm md:text-xl items-center gap-2 font-bold p-2 rounded-md hover:bg-gray-200 md:mr-8"
          onClick={() => setShowModal(true)}
        >
          <MdPlaylistAdd size={28} />
          Add Products
        </button>
      </div>

      <div className="w-full overflow-x-auto">
        {loading ? (
          <div className="flex justify-center items-center mt-60">
            <p className="loader"></p>
          </div>
        ) : product.length === 0 ? (
          <p className="text-center text-2xl mt-32">
            -- No product found, please add a product... --
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-2xl mt-32">-- No product found --</p>
        ) : (
          <table className="border-collapse w-full">
            <thead className="border-y-4 text-lg">
              <tr>
                <th className="p-3">SN</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Value</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody className="border-collapse w-full text-center">
              {filteredProducts.map((productItem, index) => {
                const { _id, name, category, price, quantity } = productItem;
                return (
                  <tr key={_id} className="list-bg border-b-2">
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{category}</td>
                    <td>
                      {"$"}
                      {price}
                    </td>
                    <td>{quantity}</td>
                    <td>
                      {"$"}
                      {parseFloat((Number(price) * quantity).toFixed(2))}
                    </td>

                    <td className="flex justify-center gap-4">
                      <span className="cursor-pointer">
                        <AiOutlineEye
                          size={25}
                          onClick={() => handleViewProduct(_id)}
                        />
                      </span>
                      <span className="cursor-pointer">
                        <FaEdit size={20} onClick={() => editProduct(_id)} />
                      </span>
                      <span className="cursor-pointer">
                        <FaTrashAlt
                          size={20}
                          color={"red"}
                          onClick={() => deleteProduct(_id)}
                        />
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {productPage && (
        <SingleProduct
          id={productId}
          productPage={productPage}
          setProductPage={setProductPage}
        />
      )}
      {editMenu && (
        <EditProduct
          id={productId}
          editMenu={editMenu}
          setEditMenu={setEditMenu}
        />
      )}
      <AddProducts showModal={showModal} setShowModal={setShowModal} />
      <ToastContainer autoClose={1000} />
    </div>
  );
};

export default Products;
