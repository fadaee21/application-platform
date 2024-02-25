import { createBrowserRouter } from "react-router-dom";
import DashboardPage from "@pages/dashboard/DashboardPage";
import LoginPage from "@pages/login/LoginPage";
import RegisteredAccount from "@pages/registered-account/RegisteredAccount";
import ProjectsPage from "@pages/projects/ProjectsPage";
import SettingPage from "@pages/setting/SettingPage";
import RequireAuth from "@components/auth/RequireAuth";
import PersistLogin from "@components/auth/PersistLogin";
import RootLayout from "@components/layout/RootLayout";
import NotFoundPage from "@pages/not-found/NotFoundPage";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    // loader: protectedLoader,
    element: <PersistLogin />,
    children: [
      {
        element: <RootLayout />,
        children: [
          {
            path: "superuser",
            element: <RequireAuth allowedRoles={["SUPERUSER"]} />,
            children: [
              {
                index: true,
                element: <DashboardPage />,
              },
              {
                path: "registered-account",
                element: <RegisteredAccount />,
              },
              {
                path: "projects",
                element: <ProjectsPage />,
              },
            ],
          },
          // {
          //   path: "user",
          //   element: <RequireAuth allowedRoles={["user"]} />,
          //   children: [
          //     {
          //       index: true,
          //       element: <TestPageUser />,
          //     },
          //   ],
          // },
          {
            path: "settings",
            element: <RequireAuth allowedRoles={["SUPERUSER"]} />, //add all allowed roles
            children: [
              {
                index: true,
                element: <SettingPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    index: true,
    // loader: loginLoader,
    element: <LoginPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default router;

// function protectedLoader({ request }: LoaderFunctionArgs) {
//   const token = Cookies.get("refreshToken");
//   if (!token) {
//     const params = new URLSearchParams();
//     params.set("from", new URL(request.url).pathname);
//     return redirect("/?" + params.toString());
//   }
//   return null;
// }
