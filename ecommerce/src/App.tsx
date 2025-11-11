import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import Home from "./pages/home/index";
import Cart from "./pages/cart";
import Login from "./pages/login";
import SignupPage from "./pages/signUpPage";
import { ProtectedRoute } from "./components/protetctedRoute";
import CheckoutPage from "./components/checkout";
import Products from "./pages/products";
import ProductDetailPage from "./pages/productDetailPage";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/products",
        element: <Products />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/checkout",
    element: <ProtectedRoute element={<CheckoutPage />} />,
  },
  {
    path: "/produtos/:id",
    element: <ProductDetailPage />,
  },
]);

export { router };
