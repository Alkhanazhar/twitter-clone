import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Feed from "./Feed";
import Profile from "./Profile";
import Login from "./Login";

const Body = () => {
  const routes = [
    {
      path: "/",
      element: <Home />,
      children: [
        {
          path: "/",
          element: <Feed />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];

  const appRouter = createBrowserRouter(routes);

  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  );
};

export default Body;
