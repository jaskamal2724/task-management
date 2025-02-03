import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "./ui/card";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  priority: z.string({
    required_error: "Please select a task priority.",
  }),
});

const TaskForm = () => {
  const [theme, setTheme] = useState("light");

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

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "",
    },
  });

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <div
      className={`min-h-screen p-4 transition-colors duration-300 ${
        theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"
      }`}
    >
      <Card
        className={`w-full max-w-md mx-auto mt-8 overflow-hidden transition-shadow duration-300 ${
          theme === "light" ? "bg-white text-black" : "bg-gray-800 text-white"
        }`}
      >
        <CardHeader className="space-y-1">
          <CardTitle className="text-center text-2xl font-bold">Create New Task</CardTitle>
          <CardDescription className="text-center">Add a new task to your list</CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter task title"
                        {...field}
                        className={`backdrop-blur-sm ${theme === "light" ? "bg-gray-50" : "bg-gray-700 text-white"}`}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter task description"
                        {...field}
                        className={`resize-none backdrop-blur-sm ${theme === "light" ? "bg-gray-50" : "bg-gray-700 text-white"}`}
                        rows={3}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className={`${theme === "light" ? "bg-gray-50" : "bg-gray-700 text-white"}`}>
                          <SelectValue placeholder="Select task priority" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem  value="low">Low</SelectItem>
                        <SelectItem  value="medium">Medium</SelectItem>
                        <SelectItem  value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button
            type="submit"
            onClick={form.handleSubmit(onSubmit)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground transition-colors duration-300"
          >
            Create Task
          </Button>
        </CardFooter>
      </Card>

      <div className="mt-20 p-10 flex w-full transition-colors">
        
        <div className="card  rounded-box grid h-20 flex-grow place-items-center">
            <h3>low</h3>
        </div>

        <div className="divider divider-horizontal"></div>
        <div className="card  rounded-box grid h-20 flex-grow place-items-center">
            <h3>medium</h3>
        </div>

        <div className="divider divider-horizontal"></div>
        <div className="card  rounded-box grid h-20 flex-grow place-items-center">
            <h3>high</h3>
        </div>
    </div>
      
    </div>
  );
};

export default TaskForm;