import React, { InputHTMLAttributes, ReactNode, forwardRef } from "react";
// import eye from "@/assets/icons/eye.svg";
interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  state: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id: string;
  label: string;
  icon?: React.SVGProps<SVGSVGElement>; // New prop for the icon source
  onClick?: () => void;
}

export const TextField = forwardRef<HTMLInputElement, IProps>(
  ({ state, onChange, label, id, onClick, icon, ...rest }, ref) => {
    return (
      <>
        <label
          htmlFor={id}
          className="block w-full mb-1 text-sm font-medium leading-6 text-gray-900 dark:text-slate-300"
        >
          {label}
        </label>
        <div className="relative">
          <input
            className="w-full rounded-md border-0 py-1.5 text-gray-900 dark:text-slate-300 block shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-600 placeholder:text-gray-400 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-inset  focus:ring-indigo-400 dark:focus:ring-indigo-500 text-sm leading-6 pl-10" // Add left padding to make space for the icon
            value={state}
            onChange={onChange}
            id={id}
            name={id}
            ref={ref}
            {...rest}
          />
          {icon && (
            <button
              onClick={onClick}
              type="button"
              aria-label={label}
              className="absolute inset-y-0 left-0 pl-3 flex items-center cursor-default"
            >
              {icon as ReactNode}
            </button>
          )}
        </div>
      </>
    );
  }
);
