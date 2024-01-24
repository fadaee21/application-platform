import { useTheme } from "@/hooks/useTheme";
import { Switch } from "@headlessui/react";

const MySwitch = () => {
  const { isDark, toggleTheme } = useTheme();
  return (
    <Switch
      checked={isDark}
      onChange={toggleTheme}
      className={`${
        isDark ? "bg-indigo-600" : "bg-gray-400"
      } relative inline-flex items-center h-6 rounded-full w-12 transition-colors duration-300 focus:outline-none`}
    >
      <span className="sr-only">Toggle theme</span>
      <span
        className={`${
          isDark ? "-translate-x-1" : "-translate-x-7"
        } inline-block w-4 h-4 transform bg-white dark:bg-white rounded-full transition-transform duration-300`}
      />
    </Switch>
  );
};

export default MySwitch;
