import { ROUTES } from "@/lib/constants/routes.constant";
import RootLayout from "./root/layout";
import { createBrowserRouter } from "react-router-dom";
import HomePage from "./root/home";
import ProductsPage from "./root/products";
import ProductDetailsPage from "./root/products-details";
import AuthLayout from "./auth/layout";
import LoginPage from "./auth/login";
import RegisterPage from "./auth/register";
import UserLayout from "./user/layout";
import UserProfilePage from "./user/profile";
import UserProfileSettingPage from "./user/setting";
const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: ROUTES.auth.login, index: true, element: <LoginPage /> },
      { path: ROUTES.auth.register, element: <RegisterPage /> },
    ],
  },
  {
    path: ROUTES.main.root,
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: ROUTES.main.products,
        element: <ProductsPage />,
      },
      {
        path: ROUTES.main.productDetails,
        element: <ProductDetailsPage />,
      },
    ],
  },
  {
    element: <UserLayout />,
    children: [
      { path: ROUTES.user.profile, index: true, element: <UserProfilePage /> },
      { path: ROUTES.user.setting, element: <UserProfileSettingPage /> },
    ],
  },
]);
export default router;
