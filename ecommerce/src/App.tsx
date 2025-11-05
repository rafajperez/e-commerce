import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/layout";
import Home from "./pages/home";
import Cart from "./pages/cart/cart";
import Login from "./pages/login";
import SignupPage from "./pages/signUpPage";
import { ProtectedRoute } from "./components/protetctedRoute";
import CheckoutPage from "./components/checkout";

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
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
]);

export { router };
