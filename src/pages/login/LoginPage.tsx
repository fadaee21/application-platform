import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@headlessui/react";

export default function Example() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 bg-gray-200">
        <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-md lg:w-96">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight dark:text-white">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" action="#" method="POST">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 dark:text-white"
                >
                  شماره تماس
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white 
                      shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 
                      placeholder:text-gray-400 bg-gray-100 dark:bg-gray-700
                      focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 
                      sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 dark:bg-indigo-400 
                    px-4 py-2 text-sm font-semibold leading-6 text-white dark:text-gray-900 
                    shadow-sm hover:bg-indigo-500 dark:hover:bg-indigo-300 
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                    focus-visible:outline-indigo-600 dark:focus-visible:outline-indigo-400"
              >
                ورود
              </button>
            </form>
          </div>
          <div className="mt-8 flex items-center justify-between">
            <span className="text-gray-600 dark:text-gray-400">
              Toggle Theme
            </span>
            <Switch
              checked={theme === "dark"}
              onChange={toggleTheme}
              className={`${
                theme !== "dark" ? "bg-indigo-600" : "bg-gray-400"
              } relative inline-flex items-center h-6 rounded-full w-12 transition-colors duration-300 focus:outline-none`}
            >
              <span className="sr-only">Toggle theme</span>
              <span
                className={`${
                  theme === "dark" ? "-translate-x-1" : "-translate-x-7"
                } inline-block w-4 h-4 transform bg-white dark:bg-white rounded-full transition-transform duration-300`}
              />
            </Switch>
          </div>
        </div>
      </div>
    </>
  );
}

{
  /* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Start a 14 day free trial
              </a>
            </p> */
}

{
  /* <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium leading-6 dark:text-white"
                  >
                    Password
                  </label>
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
                    >
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white 
                      shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 
                      placeholder:text-gray-400 bg-gray-100 dark:bg-gray-700
                      focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 
                      sm:text-sm sm:leading-6"
                  />
                </div>
              </div> */
}
