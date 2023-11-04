import { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Navigate,
  useNavigate,
  Routes,
  useParams,
  Outlet,
} from "react-router-dom";
import PasswordReset from "./components/PasswordReset";
import DashboardNav from "./components/DashboardNav";
import Menu from "./components/Menu";
import { useUser } from "./Context/userProvider";
import SingleProductPage from "./pages/SingleProductPage";

const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));
const Error = lazy(() => import("./components/Error"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const Home = lazy(() => import("./pages/Home"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const Users = lazy(() => import("./pages/Users"));
const Products = lazy(() => import("./pages/Products"));
const Requests = lazy(() => import("./pages/Requests"));
const CartPage = lazy(() => import("./pages/CartPage"));

const App = () => {
  const { userInfo } = useUser();
  const { id } = useParams();
  const Layout = ({ children }) => {
    const navigate = useNavigate();
    useEffect(() => {
      if (!localStorage.getItem("token")) {
        navigate("/login");
      }
    }, [navigate]);

    return (
      <div className="w-full h-full">
        <DashboardNav />
        <div className="flex w-full">
          <div className="menuContainer md:min-w-[250px] h-screen">
            <Menu />
          </div>
          <div className="contentContainer w-full border-l-2">{children}</div>
        </div>
      </div>
    );
  };

  // const adminRoutes = (
  //   <Routes>
  //     <Route path="/" element={<DashboardPage />} />
  //     <Route path="/" element={<Users />} />
  //     <Route path="/" element={<Products />} />
  //     <Route path="/" element={<Requests />} />
  //   </Routes>
  // );

  // const userRoutes = (
  //   <Routes>
  //     <Route path="/" element={<Home />} />
  //   </Routes>
  // );

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/landing" />} />
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Signup />
            </Suspense>
          }
        />
        <Route
          path="/reset-password"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PasswordReset />
            </Suspense>
          }
        />
        <Route
          path="/landing"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LandingPage />
            </Suspense>
          }
        />
        {userInfo?.role === "ADMIN" ? (
          <>
            <Route
              path="/dashboard"
              element={
                <Suspense>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </Suspense>
              }
            />
            <Route
              path="/users"
              element={
                <Suspense>
                  <Layout>
                    <Users />
                  </Layout>
                </Suspense>
              }
            />
            <Route
              path="/products"
              element={
                <Suspense>
                  <Layout>
                    <Products />
                  </Layout>
                </Suspense>
              }
            />
            <Route
              path="/requests"
              element={
                <Suspense>
                  <Layout>
                    <Requests />
                  </Layout>
                </Suspense>
              }
            />
          </>
        ) : (
          <>
            <Route
              path="/home"
              element={
                <Suspense>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/products/:id"
              element={
                <Suspense>
                  <SingleProductPage id={id} />
                </Suspense>
              }
            />
            <Route
              path="/cart"
              element={
                <Suspense>
                  <CartPage />
                </Suspense>
              }
            />
          </>
        )}
        <Route path="*" element={<Error />} />
      </Routes>
    </Router>
  );
};

export default App;
