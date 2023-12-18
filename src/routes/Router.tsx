import { lazy } from "react";
import Loadable from "../components/share/loadable/Loadable.tsx";

const Layout = Loadable(lazy(() => import("../layout/Layout.tsx")));
const HomePage = Loadable(lazy(() => import("../views/HomePage/HomePage.tsx")));

const Router = [
  {
    path: "/",
    element: <Layout />,
    children: [{ path: "/", exact: true, element: <HomePage /> }],
  },
];

export default Router;
