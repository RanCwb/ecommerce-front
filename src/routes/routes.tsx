import HomePage from "../pages/Home/HomePage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "@/pages/Login/login-page";
import RegisterPage from "@/pages/SignUp/signup-page";
import OrdersPage from "@/pages/Orders/OrdersPage";
import ProfilePage from "@/pages/Profile/profile-edit-page";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/orders" element={<OrdersPage />} />
      <Route path="/profile-edit" element={<ProfilePage />} />
    </Routes>
  );
}

export default AppRoutes;
