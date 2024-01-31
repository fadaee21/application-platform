import { PrimaryButtons } from "@/components/ui-kit/Buttons";
import Input from "@/components/ui-kit/Input";
import MySwitch from "@/components/ui-kit/MySwitch";
import useLogin from "@/hooks/useLogin";

import { useEffect, useState } from "react";
export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneCounter, setPhoneCounter] = useState(0);
  const { errRes, handleSubmit } = useLogin(phoneNumber);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPhoneNumber(event.target.value);
  };

  useEffect(() => {
    setPhoneCounter(phoneNumber.length);
  }, [phoneNumber.length]);

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-200 dark:bg-gray-900">
        <div className="w-9/12 max-w-xl p-8 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
          <div className="w-full max-w-sm mx-auto">
            <img
              className="w-auto h-12 mx-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt="Your Company"
            />
            <h2 className="mt-10 text-3xl font-bold leading-9 tracking-tight text-center text-gray-900 dark:text-slate-300">
              برای دریافت کد فعال سازی، شماره تماس خود را وارد کنید
            </h2>
          </div>

          <div className="w-full max-w-sm mx-auto mt-20">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="tel"
                  className="block text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
                >
                  تلفن همراه
                </label>
                <div className="mt-2">
                  <Input
                    maxLength={11}
                    value={phoneNumber}
                    onChange={handleChange}
                    id="tel"
                    name="tel"
                    type="tel"
                    autoComplete="tel"
                    required
                  />
                </div>
              </div>

              <PrimaryButtons type="submit">ورود</PrimaryButtons>
            </form>
            <div className="w-full mt-4 text-left ">
              <span className="inline-flex items-center justify-center w-10 px-2 py-1 text-xs font-medium text-gray-600 dark:text-slate-300 rounded-md bg-gray-100 dark:bg-gray-700 ring-1 ring-inset ring-gray-500/10">
                11/{phoneCounter}
              </span>
            </div>
            {errRes && errRes.length > 0 ? (
              <ul className="p-2 mt-4 text-xs font-medium list-disc list-inside rounded-lg shadow-sm max-h-16 bg-rose-50 dark:bg-rose-950">
                {errRes.map((error, index) => (
                  <li className="text-rose-950 dark:text-rose-50" key={index}>
                    {error}
                  </li>
                ))}
              </ul>
            ) : (
              <div className="w-full h-10 mt-1" />
            )}
          </div>
          <div className="w-full max-w-sm mx-auto mt-8">
            <MySwitch />
          </div>
        </div>
      </div>
    </>
  );
}
