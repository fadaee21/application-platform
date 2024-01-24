import MySwitch from "@/components/ui-kit/MySwitch";
import { phoneSchema } from "@/validator/phone";
import alertErr from "@/validator/showError";
import { useEffect, useState } from "react";
export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [errRes, setErrRes] = useState<string[]>();
  const [phoneCounter, setPhoneCounter] = useState(0);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      phoneSchema.parse(phoneNumber);
    } catch (error) {
      const err = alertErr(error);
      setErrRes(err);
      setTimeout(() => setErrRes([]), 3000);
    }
  };
  useEffect(() => {
    setPhoneCounter(phoneNumber.length);
  }, [phoneNumber.length]);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center dark:bg-gray-900 bg-gray-200">
        <div className="w-9/12 max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-md">
          <div className="mx-auto w-full max-w-sm">
            <img
              className="mx-auto h-12 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight dark:text-white">
              برای دریافت کد فعال سازی، شماره تماس خود را وارد کنید
            </h2>
          </div>

          <div className="mt-20 mx-auto w-full max-w-sm">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="tel"
                  className="block text-sm font-medium leading-6 dark:text-white"
                >
                  تلفن همراه
                </label>
                <div className="mt-2">
                  <input
                    maxLength={11}
                    value={phoneNumber}
                    onChange={handleChange}
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-white 
                      shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 
                      placeholder:text-gray-400 bg-gray-100 dark:bg-gray-700
                      focus:ring-2 focus:ring-inset focus:ring-indigo-600 dark:focus:ring-indigo-400 
                      text-sm leading-6"
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
            <div className="w-full text-left mt-4 ">
              <span className=" w-10 inline-flex items-center justify-center rounded-md bg-gray-50 px-2 py-1 text-xs font-medium text-gray-600 ring-1 ring-inset ring-gray-500/10">
                11/{phoneCounter}
              </span>
            </div>
            {errRes && errRes.length > 0 ? (
              <ul className="max-h-16 mt-4 p-2 bg-rose-50 dark:bg-rose-950 rounded-lg text-xs font-medium shadow-sm list-disc list-inside">
                {errRes.map((error, index) => (
                  <li className="text-rose-950 dark:text-rose-50" key={index}>
                    {error}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="h-10 mt-1 w-full" />
            )}
          </div>
          <div className="mt-8 mx-auto w-full max-w-sm">
            <MySwitch />
          </div>
        </div>
      </div>
    </>
  );
}

/* <p className="mt-10 text-center text-sm text-gray-500">
              Not a member?{" "}
              <a
                href="#"
                className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Start a 14 day free trial
              </a>
            </p> */

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
