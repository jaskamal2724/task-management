import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import InputField from "./InputFiled";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/signin");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 transition-colors"> {/* ✅ Dynamic background */}
      <Card className="w-96 shadow-xl bg-base-100 text-base-content transition-colors"> {/* ✅ Theme-friendly classes */}
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
  );
};

export default SignUpForm;
