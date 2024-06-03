import { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;
//TODO: handle to get bgc to make more easy customization
export const PrimaryButtons: React.FC<ButtonProps> = ({
  children,
  className,
  disabled,
  ...rest
}) => {
  const buttonStyle = `
  ${
    disabled
      ? "bg-gray-400 text-gray-500 cursor-not-allowed"
      : "bg-indigo-400 hover:bg-indigo-500 dark:bg-indigo-900 hover:dark:bg-indigo-800 hover:text-slate-900 hover:dark:text-slate-50 text-gray-800 dark:text-slate-300"
  }
  flex justify-center w-full px-4 py-2 text-sm font-semibold leading-6 rounded-md shadow-md whitespace-nowrap
  ${className}
`;
  //className="bg-red-400" define type to use for delete button

  return (
    <button className={buttonStyle} disabled={disabled} {...rest}>
      {children}
    </button>
  );
};
