import { Outlet } from "react-router-dom";
import Sidebar from "../ui-kit/sidebar/Sidebar";
import { ToastContainer } from "react-toastify";
function RootLayout() {
  return (
    <Sidebar>
      <Outlet />
      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        rtl
        toastStyle={{ width: 450 }}
      />
    </Sidebar>
  );
}

export default RootLayout;
