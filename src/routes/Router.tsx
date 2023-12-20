import { lazy } from "react";
import Loadable from "../components/share/loadable/Loadable.tsx";
import CreatePage from "../views/CreatePage/CreatePage.tsx";

const Layout = Loadable(lazy(() => import("../layout/Layout.tsx")));
const HomePage = Loadable(lazy(() => import("../views/HomePage/HomePage.tsx")));

const Router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", exact: true, element: <HomePage /> },
      { path: "/create", exact: true, element: <CreatePage /> },
    ],
  },
];

export default Router;
