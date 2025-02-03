import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import InputField from "./InputFiled";

const SignIn = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-96 shadow-xl">
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
            <Button type="submit" className="w-full">Next</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignIn;
