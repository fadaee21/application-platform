import { InputHTMLAttributes } from "react";
type InputProps = InputHTMLAttributes<HTMLInputElement>;
const Input: React.FC<InputProps> = ({ ...rest }) => {
  return (
    <input
      className="w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-slate-300 block shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-inset  focus:ring-indigo-400 dark:focus:ring-indigo-500 text-sm leading-6"
      {...rest}
    />
  );
};

export default Input;
