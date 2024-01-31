import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const PrimaryButtons: React.FC<ButtonProps> = ({
  children,
  className,
  ...rest
}) => {
  return (
    <button
      className={`
        bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-900 hover:dark:bg-indigo-800 
        hover:text-slate-900 hover:dark:text-slate-50 text-gray-800 dark:text-slate-300 
        hover:ring-2 ring-indigo-400 dark:ring-indigo-500 flex justify-center w-full 
        px-4 py-2 text-sm font-semibold leading-6 rounded-md shadow-md 
        focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
        ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};
