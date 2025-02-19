import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Rocket, Target, Star } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";


const TaskDetails = () => {
  const { id } = useParams()
  const [task, setTask] = useState({});
  const [newSubtask, setnewsubtask]=useState({title:""})

  const gettask = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gettask`)

      if (response.status == 200) {
        const tsk = response.data?.filter((item) => item._id == id)
        // console.log(tsk[0])
        setTask(tsk[0])
      }
      else {
        setTask([])
      }
    }
    catch (error) {
      console.log("error fetching this task ", error)
    }
  }

  useEffect(() => {
    if (id) gettask()
  }, [id])

  const calculateProgress = () => {
    const totalSubtasks = task.subtasks?.length;
    const completedSubtasks = task.subtasks?.filter((sub) => sub.status=="Done")?.length;
    return totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
  };

  const toggleSubtaskCompletion = async (subtaskId) => {
    try {
      // Toggle status locally
      const updatedSubtasks = task.subtasks.map((subtask) =>
        subtask._id === subtaskId
          ? { ...subtask, status: subtask.status === "Done" ? "Not Done" : "Done" }
          : subtask
      );
  
      // Update frontend state instantly for better UX
      setTask((prevTask) => ({ ...prevTask, subtasks: updatedSubtasks }));
  
      // Send update request to backend
      await axios.put(`${import.meta.env.VITE_BACKEND_URL}/updatesubtask`, {
        taskId: task._id, // Send the parent task ID
        subtaskId,
      });
  
      console.log("Subtask status updated successfully");
    } catch (error) {
      console.error("Error updating subtask status:", error);
    }
  };
  
  

  const priorityColors = {
    high: "bg-red-100 text-red-800",
    medium: "bg-yellow-100 text-yellow-800",
    low: "bg-green-100 text-green-800",
  };

  const statusIcons = {
    high: <Rocket className="h-5 w-5 text-blue-500" />,
    medium: <Target className="h-5 w-5 text-yellow-500" />,
    low: <Star className="h-5 w-5 text-green-500" />,
  }

  const hnadlesubtask=async ()=>{
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addsubtask`,{title:newSubtask.title,id:id})

      if(response.status==200){
        console.log("subtask added successfully")
      }
      else{
        console.log("subtask not added successfully")
      }
    } 
    catch (error) {
      console.log("error in adding subtask ", error)
    }
  }

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 bg-white text-black rounded-lg shadow-lg">
      <div className="flex items-center justify-between">
        <div className="">
          <span>{statusIcons[task.priority]}</span>
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
              pathColor: calculateProgress() < 50 ? "#AC99CC" : "#F0A59A",
              textColor: "#333",
              trailColor: "#ddd",
            })}
          />
        </div>
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700 text-center">Subtasks</h3>
        <div className="mt-4 space-y-4">
          {task.subtasks?.map((subtask) => (
            <div key={subtask?._id} className="flex justify-between items-center">
              <div className="text-sm text-gray-600">{subtask.title}</div>
              <Button
                onClick={() => toggleSubtaskCompletion(subtask?._id)}
                className={`px-4 py-2 rounded-lg text-xs font-semibold ${subtask.status=="Done" ? "bg-green-500 text-white" : "bg-red-500 text-white"
                  }`}
              >
                {subtask.status}
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 flex flex-col items-center">
        <Input
          onChange={(e)=>setnewsubtask({title:e.target.value})}
          placeholder="Add a subtask"
          className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Button onClick={hnadlesubtask} className="mt-4 w-[200px] bg-blue-500 text-white font-semibold rounded-lg py-2 hover:bg-blue-600">
          Add Subtask
        </Button>
      </div>
    </div>
  );
};

export default TaskDetails;
