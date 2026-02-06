import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Categories from "../pages/Categories";
import Plants from "../pages/Plants";
import PlantDetails from "../pages/PlantDetails";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ErrorPage from "../pages/ErrorPage";
import MainLayout from "../components/MainLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Home /> },
      { path: "categories", element: <Categories /> },
      { path: "category/:id", element: <Plants /> },
      { path: "plant/:id", element: <PlantDetails /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);
