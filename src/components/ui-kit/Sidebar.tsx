import { NavLink } from "react-router-dom";
import navList from "@/navList";
import { useAuth } from "@/hooks/context/useAuth";
import Dropdown from "./Dropdown";
import Avatar from "./Avatar";
import Settings from "@/assets/icons/settings.svg?react";
import Bell from "@/assets/icons/bell.svg?react";
function Sidebar({ children }: TChildren) {
  const { auth } = useAuth();
  return (
    <div className="flex justify-start w-full">
      <aside className="fixed top-0 bottom-0 z-50 flex flex-col h-screen px-6 pb-4 bg-slate-50 dark:bg-slate-700 w-80 shrink-0">
        <div className="flex items-center h-16">
          <img
            src="https://tailwindui.com/img/logos/mark.svg?color=white"
            alt="Your Company"
            className="h-8"
          />
        </div>
        <nav className="flex flex-col flex-1 mt-6 text-slate-700 dark:text-slate-300">
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
                          `flex p-2 my-1 text-sm font-semibold leading-6 rounded-md gap-x-3 hover:text-slate-900 hover:dark:text-slate-50  ${
                            isActive
                              ? "bg-gray-300 text-slate-900 dark:text-slate-50 dark:bg-slate-800/30 "
                              : ""
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
                className={({ isActive }) =>
                  `flex p-2 my-1 text-sm font-semibold leading-6 rounded-md gap-x-3 hover:text-slate-900 hover:dark:text-slate-50  ${
                    isActive
                      ? "bg-gray-300 text-slate-900 dark:text-slate-50 dark:bg-slate-800/30 "
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
        <header className="w-full  flex items-center justify-end  h-16 border-b-2 border-stale-100 dark:border-slate-700 text-gray-900 dark:text-slate-300">
          <Bell
            className="h-5 w-5 cursor-pointer"
            onClick={() => console.log("bell")}
          />
          <div className="border-r-2 border-slate-200 dark:border-slate-700 flex items-center pr-4 mr-4">
            <Avatar src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
            <Dropdown auth={auth} />
          </div>
        </header>
        <main className="container py-10 mx-auto bg-white dark:bg-gray-800">
          <div className="px-8 text-gray-900 dark:text-slate-300">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Sidebar;
