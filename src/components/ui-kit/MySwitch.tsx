import { useTheme } from "@/hooks/context/useTheme";
import { Switch } from "@headlessui/react";

const MySwitch = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Switch
      checked={isDark}
      onChange={toggleTheme}
      className={`
      ring-2 ring-gray-300 dark:ring-gray-600
      bg-gray-100 dark:bg-gray-700
       relative inline-flex items-center h-6 rounded-full w-12 transition-colors duration-300 focus:outline-none`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${isDark ? "-translate-x-1" : "-translate-x-7"}
        inline-block w-4 h-4 transform bg-gray-500 dark:bg-gray-400 rounded-full transition-transform duration-300`}
      />
    </Switch>
  );
};

export default MySwitch;
