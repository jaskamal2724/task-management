import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "./ui/card";

const formSchema = z.object({
  title: z.string().min(2, { message: "Title must be at least 2 characters." }),
  description: z.string().min(10, { message: "Description must be at least 10 characters." }),
  priority: z.string({ required_error: "Please select a task priority." }),
});

const ItemType = { TASK: "task" };

const Task = ({ task, index, moveTask }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ItemType.TASK,
    item: { task, index },
    collect: (monitor) => ({ isDragging: monitor.isDragging() }),
  }));

  return (
    <div
      ref={drag}
      className={`p-2 mt-2 rounded bg-blue-300 text-black cursor-pointer shadow-md ${
        isDragging ? "opacity-50" : "opacity-100"
      }`}
    >
      <p>{task.title}</p>
    </div>
  );
};

const PriorityColumn = ({ priority, tasks, moveTask }) => {
  const [, drop] = useDrop({
    accept: ItemType.TASK,
    drop: (item) => moveTask(item.task, priority),
  });

  return (
    <div
      ref={drop}
      className="p-4 rounded-lg shadow-md transition-colors duration-300 bg-gray-200 dark:bg-gray-700 text-black dark:text-white"
    >
      <h3 className="text-center font-semibold capitalize">{priority}</h3>
      <hr className="my-2 border-gray-400" />
      {tasks.map((task, index) => (
        <Task key={task.id} task={task} index={index} moveTask={moveTask} />
      ))}
    </div>
  );
};

const TaskForm = () => {
  const [theme, setTheme] = useState("light");
  const [tasks, setTasks] = useState({ low: [], medium: [], high: [] });

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
    defaultValues: { title: "", description: "", priority: "" },
  });

  const onSubmit = (values) => {
    setTasks((prev) => ({
      ...prev,
      [values.priority]: [...prev[values.priority], { id: Date.now().toString(), ...values }],
    }));
    form.reset();
  };

  const moveTask = (task, newPriority) => {
    setTasks((prev) => {
      const updatedTasks = { ...prev };
      Object.keys(updatedTasks).forEach((priority) => {
        updatedTasks[priority] = updatedTasks[priority].filter((t) => t.id !== task.id);
      });
      updatedTasks[newPriority].push(task);
      return updatedTasks;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={`min-h-screen p-4 ${theme === "light" ? "bg-gray-100 text-black" : "bg-gray-900 text-white"}`}>
        <Card className={`w-full max-w-md mx-auto mt-8 ${theme === "light" ? "bg-white" : "bg-gray-800"}`}>
          <CardHeader>
            <CardTitle className="text-center text-2xl">Create New Task</CardTitle>
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
                        <Input placeholder="Enter task title" {...field} />
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
                        <Textarea placeholder="Enter task description" {...field} rows={3} />
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
                          <SelectTrigger>
                            <SelectValue placeholder="Select task priority" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full bg-primary text-white">
                  Create Task
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <div className="mt-10 grid grid-cols-3 gap-4">
          {Object.keys(tasks).map((priority) => (
            <PriorityColumn key={priority} priority={priority} tasks={tasks[priority]} moveTask={moveTask} />
          ))}
        </div>
      </div>
    </DndProvider>
  );
};

export default TaskForm;
