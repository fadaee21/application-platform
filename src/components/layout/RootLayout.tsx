import { Outlet } from "react-router-dom";
import Sidebar from "../ui-kit/sidebar/Sidebar";
function RootLayout() {
  return (
    <Sidebar>
      <Outlet />
    </Sidebar>
  );
}

export default RootLayout;
