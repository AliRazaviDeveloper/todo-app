import { Outlet } from "react-router-dom";
import Customizer from "../components/share/customizer/Customizer";

const Layout = () => (
  <>
    <Outlet />
    <Customizer />
  </>
);

export default Layout;
