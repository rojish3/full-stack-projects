import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import BackgroundImg from "../assets/bg.png";
import { useUser } from "../Context/userProvider";

const Home = () => {
  const { userInfo } = useUser();
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("userInfo") && userInfo) {
      if (userInfo.role === "ADMIN") {
        navigate("/dashboard");
      } else if (userInfo.role === "USER") {
        navigate("/home");
      }
    }
  }, [navigate, userInfo]);

  return (
    <>
      <nav className="flex justify-between items-center text-xl p-4 lg:p-8">
        <div className="logo w-16">
          <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/inventory-management-1857611-1575340.png?f=webp" />
        </div>
        <div className="flex gap-4">
          <div className="login" onClick={() => navigate("/login")}>
            <Button
              bg="bg-gray-200"
              color="text-balck"
              rounded="rounded-lg"
              value="Log in"
            />
          </div>
          <div className="signup" onClick={() => navigate("/signup")}>
            <Button
              bg="bg-blue-700"
              color="text-white"
              rounded="rounded-lg"
              value="Sign Up"
            />
          </div>
        </div>
      </nav>
      <div className="flex flex-col-reverse md:flex-row items-center justify-between">
        <div className="text-2xl text-center font-bold w-1/2 p-1 md:p-8">
          Streamline inventory control with our user-friendly web app. Easily
          track stock levels, monitor product movements, and generate real-time
          reports. Improve efficiency, reduce costs, and enhance decision-making
          with our intuitive, cloud-based solution.
        </div>
        <div className="w-1/2">
          <img src={BackgroundImg} alt="background image" />
        </div>
      </div>
    </>
  );
};

export default Home;
