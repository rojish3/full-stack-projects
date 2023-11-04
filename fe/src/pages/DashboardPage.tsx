import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DashbordCard from "../components/DashbordCard";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdOutlineRequestQuote } from "react-icons/md";
import { ImCross } from "react-icons/im";
import { FiUsers } from "react-icons/fi";
import { useProductContext } from "../Context/productProvider";
import { useAllUserContext } from "../Context/Context";
import { useRequestContext } from "../Context/requestContext";
import PieChartDiagram from "../components/PieChartDiagram";
import BarChart from "../components/BarChart";

const DashboardPage = () => {
  const navigate = useNavigate();

  const { allProduct } = useProductContext();
  const totalQuantity = allProduct
    ?.reduce(
      (accumulator, product) => accumulator + Number(product.quantity),
      0
    )
    .toString();
  // console.log(allProduct);

  //Total Laptops
  const categoryLaptop = allProduct?.filter(
    (product) => product.category === "Laptop"
  );
  const totalLaptop = categoryLaptop?.reduce(
    (accumulator, product) => accumulator + Number(product.quantity),
    0
  );
  // console.log(totalLaptop);

  //Total Monitors
  const categoryMonitor = allProduct?.filter(
    (product) => product.category === "Monitor"
  );
  const totalMonitor = categoryMonitor?.reduce(
    (accumulator, product) => accumulator + Number(product.quantity),
    0
  );
  // console.log(totalMonitor);

  //Total Accessories
  const categoryAccessories = allProduct?.filter(
    (product) => product.category === "Accessories"
  );
  const totalAccessories = categoryAccessories?.reduce(
    (accumulator, product) => accumulator + Number(product.quantity),
    0
  );

  const productsWithQuantityZero = allProduct?.filter(
    (product) => product.quantity === 0
  );
  const count = productsWithQuantityZero?.length.toString();
  const { allUser } = useAllUserContext();
  const { allRequest } = useRequestContext();
  const totalUser = (allUser?.length - 1).toString();
  const totalRequest = allRequest?.length.toString();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, [navigate]);
  return (
    <>
      <h1 className="text-3xl font-bold p-4 border-b-2">Dashboard Overview</h1>
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <DashbordCard
          icon={<AiOutlineShoppingCart size={50} />}
          bgColor="green"
          label="Total Products"
          data={totalQuantity}
        />
        <DashbordCard
          icon={<FiUsers size={50} />}
          bgColor="blue"
          label="Total Users"
          data={totalUser}
        />
        <DashbordCard
          icon={<MdOutlineRequestQuote size={50} />}
          bgColor="yellow"
          label="Total Requests"
          data={totalRequest}
        />
        <DashbordCard
          icon={<ImCross size={50} />}
          bgColor="red"
          label="Out of Stock"
          data={count}
        />
      </div>
      <div className="flex justify-around p-8 gap-12">
        <div className="p-10 shadow-xl w-auto">
          <PieChartDiagram
            laptop={totalLaptop}
            monitor={totalMonitor}
            accessories={totalAccessories}
          />
        </div>
        <div className="p-10 shadow-xl w-[700px]">
          <BarChart />
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
