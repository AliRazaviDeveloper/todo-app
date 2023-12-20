import { lazy } from "react";
import Loadable from "../components/share/loadable/Loadable.tsx";

const Layout = Loadable(lazy(() => import("../layout/Layout.tsx")));
const HomePage = Loadable(lazy(() => import("../views/HomePage/HomePage.tsx")));
const CreatePage = Loadable(
  lazy(() => import("../views/CreatePage/CreatePage.tsx"))
);
const EditPage = Loadable(lazy(() => import("../views/EditPage/EditPage.tsx")));
const Router = [
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", exact: true, element: <HomePage /> },
      { path: "/create", exact: true, element: <CreatePage /> },
      { path: "/edit/:id", exact: true, element: <EditPage /> },
    ],
  },
];

export default Router;
