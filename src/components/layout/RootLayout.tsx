import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useAuth } from "@/hooks/context/useAuth";
import Sidebar from "../ui-kit/Sidebar";

function RootLayout() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const handleLogout = () => {
    Cookies.remove("token");
    setAuth(null)
    navigate("/login", { replace: true });
  };
  return (
    <Sidebar>
      <div className="container mx-auto mt-10">
        <button
          onClick={handleLogout}
          type="button"
          className="px-3 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          خروج
        </button>
        <Outlet />
      </div>
    </Sidebar>
  );
}

export default RootLayout;