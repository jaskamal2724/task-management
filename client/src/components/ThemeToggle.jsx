import { useEffect, useState } from "react";
import { Switch } from "./ui/switch";

const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const theme = isDarkMode ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", theme); // ✅ Apply theme globally
  }, [isDarkMode]);

  return (
    <div className="flex items-center justify-end p-4">
      <span className="mr-2 text-sm">{isDarkMode ? "☀️":"🌙" }</span>
      <Switch checked={isDarkMode} onCheckedChange={() => setIsDarkMode(!isDarkMode)} /> {/* ✅ Toggle Handler */}
    </div>
  );
};

export default ThemeToggle;


