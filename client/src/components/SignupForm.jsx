import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InputField from "./InputFiled";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const SignUpForm = () => {
  

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/signup`, formData)
      console.log(response.data.message)

      if (response) {
        toast.success('Sign up Success !', {
          position: "top-left",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          
          });
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
      return

    }
    catch (error) {
      console.log("sign up error ", error)
    }

  };

  return (
    <>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        
      />

      <div className="flex flex-col items-center justify-center h-[840px] w-full bg-base-200 transition-colors ">
        <Card className="w-96 shadow-xl bg-base-100 text-base-content transition-colors">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Sign Up</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <InputField
                label="Username"
                type="text"
                placeholder="john"
                value={formData.username}
                onChange={handleChange}
                name="username"
              />
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
              <Button type="submit" className="w-full">Create Account</Button>
            </form>
          </CardContent>
        </Card>
      </div>

    </>

  );
};

export default SignUpForm;
