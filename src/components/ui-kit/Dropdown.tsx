import { Menu, Transition } from "@headlessui/react";
import { Fragment, memo } from "react";
import ChevronDownIcon from "@/assets/icons/chevron-down.svg?react";
import { useAuth } from "@/hooks/context/useAuth";
import Cookies from "js-cookie";
import router from "@/routes";
type Auth = {
  auth: IAuthState | null;
};

// ... (previous imports)

const Dropdown = memo(({ auth }: Auth) => {
  console.count("drop down is running");
  const { setAuth } = useAuth();
  const handleLogout = () => {
    Cookies.remove("token");
    setAuth(null);
    router.navigate("/", { replace: true });
  };
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div className="text-style">
        <Menu.Button className="text-md font-semibold inline-flex w-full justify-center items-center rounded-md px-4 py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75 ">
          {auth?.username}
          <ChevronDownIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute left-5 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md  shadow-lg ring-1 ring-black/5 focus:outline-none bg-slate-50 dark:bg-slate-700">
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-gray-300 text-slate-900 dark:text-slate-50 dark:bg-slate-800/30"
                      : "text-gray-900 dark:text-slate-300"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-slate-900 hover:dark:text-slate-50`}
                >
                  مشاهده پروفایل
                </button>
              )}
            </Menu.Item>
            {/* i didn't remove this part to have an example to see if i want to add any item to my menu */}
            {/* <Menu.Item>
              {({ active }) => (
                <button
                  className={`${
                    active
                      ? "bg-gray-300 text-slate-900 dark:text-slate-50 dark:bg-slate-800/30"
                      : "text-gray-900 dark:text-slate-300"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-slate-900 hover:dark:text-slate-50`}
                >
                  Duplicate
                </button>
              )}
            </Menu.Item> */}
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              {({ active }) => (
                <button
                  onClick={handleLogout}
                  className={`${
                    active
                      ? "bg-gray-300 text-slate-900 dark:text-slate-50 dark:bg-slate-800/30"
                      : "text-gray-900 dark:text-slate-300"
                  } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:text-slate-900 hover:dark:text-slate-50`}
                >
                  خروج
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
});

export default Dropdown;
