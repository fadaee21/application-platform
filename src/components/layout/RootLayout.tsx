import { Outlet } from "react-router-dom";
function RootLayout() {
  return (
    <div className="container">
      <p>hello</p> <Outlet />
    </div>
  );
}

export default RootLayout;
