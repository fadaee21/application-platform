import { Outlet } from "react-router-dom";
import Sidebar from "../ui-kit/Sidebar";

function RootLayout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}

export default RootLayout;
