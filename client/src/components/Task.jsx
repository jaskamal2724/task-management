import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const TaskDetails = () => {
  const [task, setTask] = useState({
    id: 1,
    title: "Implement Authentication",
    priority: "medium",
    subtasks: [
      { id: "sub1", title: "Set up Firebase Auth", completed: true },
      { id: "sub2", title: "Implement OAuth login", completed: false },
      { id: "sub3", title: "Add password reset", completed: false },
    ],
  });

  const calculateProgress = () => {
    const totalSubtasks = task.subtasks.length;
    const completedSubtasks = task.subtasks.filter((sub) => sub.completed).length;
    return totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
  };

  const toggleSubtaskCompletion = (subtaskId) => {
    setTask((prevTask) => ({
      ...prevTask,
      subtasks: prevTask.subtasks.map((subtask) =>
        subtask.id === subtaskId ? { ...subtask, completed: !subtask.completed } : subtask
      ),
    }));
  };

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 bg-white text-black rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{task.title}</h2>
          <span className={`text-xs px-2 py-1 mt-2 rounded-full ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
        </div>

        <div className="w-20 h-20">
          <CircularProgressbar
            value={calculateProgress()}
            text={`${calculateProgress()}%`}
            styles={buildStyles({
              textSize: "24px",
              pathColor: calculateProgress() < 50 ? "red" : "green",
              textColor: "#333",
              trailColor: "#ddd",
            })}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">Subtasks</h3>
        <div className="mt-4 space-y-4">
          {task.subtasks.map((subtask) => (
            <div key={subtask.id} className="flex justify-between items-center">
              <div className="text-sm text-gray-600">{subtask.title}</div>
              <Button
                onClick={() => toggleSubtaskCompletion(subtask.id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold ${
                  subtask.completed ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {subtask.completed ? "Done" : "Not Done"}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <Input
          placeholder="Add a subtask"
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button className="mt-4 w-full bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600">
          Add Subtask
        </Button>
      </div>
    </div>
  );
};

export default TaskDetails;
