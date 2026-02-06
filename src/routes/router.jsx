import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/MainLayout";

import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Plants from "../pages/Plants";
import PlantDetails from "../pages/PlantDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import PrivateRoute from "./PrivateRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      // ✅ ONLY public page
      { index: true, element: <Home /> },

      // ✅ auth pages stay public
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },

      // ✅ everything else private
      {
        path: "categories",
        element: (
          <PrivateRoute>
            <Categories />
          </PrivateRoute>
        ),
      },
      {
        path: "category/:id",
        element: (
          <PrivateRoute>
            <Plants />
          </PrivateRoute>
        ),
      },
      {
        path: "plant/:id",
        element: (
          <PrivateRoute>
            <PlantDetails />
          </PrivateRoute>
        ),
      },

      // optional: also handle * inside children
      // { path: "*", element: <ErrorPage /> },
    ],
  },
]);
