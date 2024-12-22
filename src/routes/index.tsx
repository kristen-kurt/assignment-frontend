import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import SettingPage from "../pages/SettingPage";
import AuthPage from "@/pages/AuthPage";
 
function PrivateRoute({ element }) {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/" />;
  }
  return element;
}
function ProtectRoute({ element }) {
  const token = localStorage.getItem("token");
  if (token) {
    return <Navigate to="/home" />;
  }
  return element;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectRoute element={<AuthPage />} />
    ),
  },
  {
    path: "/home",
    element: (
      <PrivateRoute element={<HomePage />} />
    ),
  },
  {
    path: "/setting",
    element: (
      <PrivateRoute element={<SettingPage />} />
    ),
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
