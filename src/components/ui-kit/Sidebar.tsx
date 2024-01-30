import { NavLink } from "react-router-dom";
import navList from "@/navList";
import Settings from "@/assets/icons/settings.svg?react";
import { useAuth } from "@/hooks/context/useAuth";
import Dropdown from "./Dropdown";

function Sidebar({ children }: TChildren) {
  const { auth } = useAuth();
  return (
    <div className="flex justify-start w-full dark:bg-gray-800">
      <aside className="fixed top-0 bottom-0 z-50 flex flex-col h-screen px-6 pb-4 bg-indigo-700 dark:bg-gray-700 w-80 shrink-0">
        <div className="flex items-center h-16">
          <img
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
            className="h-8"
          />
        </div>
        <nav className="flex flex-col flex-1 mt-6 text-white dark:text-slate-400">
          <ul className="flex flex-col flex-1 gap-y-7 " role="list">
            <li>
              <ul>
                {navList
                  .filter((item) => item.role === auth?.role)
                  .map((item) => (
                    <li key={item.name}>
                      <NavLink
                        to={item.href}
                        className={({ isActive }) =>
                          `flex p-2 my-1 text-sm font-semibold leading-6 rounded-md gap-x-3 hover:bg-indigo-800 dark:hover:bg-indigo-300 ${
                            isActive ? "bg-indigo-800 dark:bg-indigo-400" : ""
                          }`
                        }
                        end
                      >
                        <item.icon className="w-5 h-5" />
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
              </ul>
            </li>
            <li className="mt-auto">
              <NavLink
                to="/settings"
                className={({ isActive, isPending }) =>
                  `flex p-2 my-1 text-sm font-semibold leading-6 rounded-md gap-x-3 hover:bg-indigo-800 dark:hover:bg-indigo-300 ${
                    isPending
                      ? "bg-red-600 dark:bg-red-600"
                      : isActive
                      ? "bg-indigo-800 dark:bg-indigo-400"
                      : ""
                  }`
                }
              >
                <Settings className="w-5 h-5" />
                تنظیمات
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <div className="w-full min-h-screen mr-80 bg-white dark:bg-gray-800">
        <header className="w-full  flex items-center justify-end  h-16 border-b-2 text-gray-900 dark:text-slate-400">
          <Dropdown />
        </header>
        <main className="container py-10 mx-auto bg-white dark:bg-gray-800">
          <div className="px-8 text-gray-900 dark:text-slate-400">{children}</div>
        </main>
      </div>
    </div>
  );
}

export default Sidebar;
