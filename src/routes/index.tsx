import { RouterProvider, createBrowserRouter } from "react-router-dom";

import HomePage from "../pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
]);

export default function Router() {
  return <RouterProvider router={router} />;
}
