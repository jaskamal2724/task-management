import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InputField from "./InputFiled";
import { useNavigate } from "react-router-dom";

const SignIn = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [theme, setTheme] = useState("light");

  // Sync theme with the current document theme
  useEffect(() => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
    setTheme(currentTheme);

    const observer = new MutationObserver(() => {
      const updatedTheme = document.documentElement.getAttribute("data-theme");
      setTheme(updatedTheme);
    });

    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here
    navigate("/dashboard")
  };

  return (
    <div
      className={`flex items-center justify-center pt-36 transition-colors duration-300 ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Card
        className={`w-96 shadow-xl transition-colors duration-300 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <CardHeader>
          <CardTitle className="text-2xl text-center">Sign In</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Email"
              type="email"
              placeholder="john@gmail.com"
              value={formData.email}
              onChange={handleChange}
              name="email"
            />
            <InputField
              label="Password"
              type="password"
              placeholder="**********"
              value={formData.password}
              onChange={handleChange}
              name="password"
            />
            <Button type="submit" className="w-full">
              Next
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
