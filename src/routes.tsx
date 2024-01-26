import { LoaderFunctionArgs, createBrowserRouter, redirect } from "react-router-dom";
import RootLayout from "@components/layout/RootLayout";
import DashboardPage from "@pages/dashboard/DashboardPage";
import LoginPage from "@pages/login/LoginPage";
import Cookies from "js-cookie";
import TestPage from "./pages/TestPage";
import JustAdmin from "./components/hocAuthorization/JustAdmin";
import TestPageUser from "./pages/TestPageUser";
import JustUser from "./components/hocAuthorization/JustUser";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader: protectedLoader,
    element: <RootLayout />,
    children: [
      {
        path: "admin",
        element: <JustAdmin />,
        children: [
          {
            index: true,
            element: <DashboardPage />,
          },
          {
            path: "test",
            element: <TestPage />,
          },
        ]
      },
      {
        path: "user",
        element: <JustUser />,
        children: [
          {
            index: true,
            element: <TestPageUser />,
          },
        ]
      },
    ],
  },
  {
    path: "login",
    loader: loginLoader,
    element: <LoginPage />,
  },
]);


export default router;



function protectedLoader({ request }: LoaderFunctionArgs) {
  const token = Cookies.get("token");
  if (!token) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

async function loginLoader() {
  const token = Cookies.get("token");
  if (token) {
    return redirect("/");
  }
  return null;
}