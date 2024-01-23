import { useTheme } from "@/hooks/useTheme";
import { useState } from "react";

const LoginPage: React.FC = () => {
  const [number, setNumber] = useState("");
  const { theme, toggleTheme } = useTheme();
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(number);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200">
      <div className="h-96 max-w-2xl p-8 m-4 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center mb-4">
          برای دریافت کد فعال سازی شماره تلفن خود را وارد کنید.
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="پسورد"
            className="input input-bordered w-full max-w-xs"
            onChange={(e) => setNumber(e.target.value)}
          />
          <button className="btn btn-primary"> ورود</button>
        </form>
        <button onClick={toggleTheme}>
          Switch to {theme === "light" ? "dark" : "light"} mode
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
