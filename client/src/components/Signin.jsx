import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InputField from "./InputFiled";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SignIn = () => {
  const [loading, setLoading] = useState(false)

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/login`, formData, { withCredentials: true })
      // console.log( response.data.role)
      
      if (response.data.role=="Member") {
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          console.log("logged in")
          navigate("/dashboard")
        }, 2000)
      }
      else if(response.data.role=="Admin"){
        setLoading(true)
        setTimeout(() => {
          setLoading(false)
          console.log("logged in")
          navigate("/admin")
        }, 2000)
      }
    }
    catch (error) {
      console.log("login error ", error)
    }

  };

  const handleLoginRedirect = () => {
    navigate("/signup");
  };

  return (
    <>

      <div
        className={`flex items-center h-[839px] justify-center  transition-colors duration-300 ${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
          }`}
      >
        <Card
          className={`w-96 shadow-xl transition-colors duration-300 ${theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
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
              <div className="flex flex-col gap-4 items-center">
                <Button type="submit" className="w-72">NEXT</Button>
                <button className=" text-blue-700 bg-transparent hover:font-bold" onClick={handleLoginRedirect}>Don't have account . "Create" </button>
                {loading &&
                  <span className=" text-center loading loading-dots loading-lg text-blue-500"></span>
                }
              </div>
            </form>

          </CardContent>
        </Card>

      </div>

    </>
  );
};

export default SignIn;
