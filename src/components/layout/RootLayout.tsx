import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function RootLayout() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Cookies.remove("token");
    navigate("/login");
  };
  return (
    <div className="container mx-auto mt-10">
      <button
        onClick={handleLogout}
        type="button"
        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        خروج
      </button>
      <Outlet />
    </div>
  );
}

export default RootLayout;
