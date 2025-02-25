
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog"
import { Plus, CheckCircle, Flag, ListTodo, Clock, Rocket, Target, Star, BadgeCheck, AlertTriangle, Flame, LogOut, Activity } from "lucide-react"
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom"
import axios from "axios"


const TaskDashboard = () => {

  const [tasks, setTasks] = useState([
    // {
    //   id: 1,
    //   title: "Build UI",
    //   priority: "high",
    //   subtasks: [
    //     { id: "sub1", title: "Design homepage", completed: true },
    //     { id: "sub2", title: "Create login page", completed: false },
    //     { id: "sub3", title: "Add animations", completed: true },
    //   ],
    // },
    // {
    //   id: 2,
    //   title: "Implement Authentication",
    //   priority: "medium",
    //   subtasks: [
    //     { id: "sub4", title: "Set up Firebase Auth", completed: true },
    //     { id: "sub5", title: "Implement OAuth login", completed: false },
    //     { id: "sub6", title: "Add password reset", completed: false },
    //   ],
    // },
    // {
    //   id: 3,
    //   title: "Develop API Endpoints",
    //   priority: "high",
    //   subtasks: [
    //     { id: "sub7", title: "Create user routes", completed: true },
    //     { id: "sub8", title: "Add authentication middleware", completed: true },
    //     { id: "sub9", title: "Optimize database queries", completed: false },
    //   ],
    // },
    // {
    //   id: 4,
    //   title: "Testing and Debugging",
    //   priority: "low",
    //   subtasks: [
    //     { id: "sub10", title: "Write unit tests", completed: false },
    //     { id: "sub11", title: "Fix console warnings", completed: true },
    //     { id: "sub12", title: "Run end-to-end tests", completed: false },
    //   ],
    // },
    // {
    //   id: 5,
    //   title: "Deploy Application",
    //   priority: "medium",
    //   subtasks: [
    //     { id: "sub13", title: "Set up CI/CD pipeline", completed: true },
    //     { id: "sub14", title: "Configure server", completed: false },
    //     { id: "sub15", title: "Monitor performance", completed: false },
    //   ],
    // },
  ])

  const gettask = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/gettask`)
      if (response.status == 200) {
        // console.log(response.data)
        setTasks(response.data)
      }
      else {
        setTasks([])
      }
    }
    catch (error) {
      console.log("error fetching tasks ", error)
    }
  }

  useEffect(() => {
    gettask()
  }, [])

  const [theme, setTheme] = useState("light");

  // // Sync theme with the current document theme
  // useEffect(() => {
  //   const currentTheme = document.documentElement.getAttribute("data-theme") || "light";
  //   setTheme(currentTheme);

  //   const observer = new MutationObserver(() => {
  //     const updatedTheme = document.documentElement.getAttribute("data-theme");
  //     setTheme(updatedTheme);
  //   });

  //   observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  //   return () => observer.disconnect();
  // }, []);

  const navigate = useNavigate()


  const calculateProgress = (task) => {
    const totalSubtasks = task.subtasks?.length;
    const completedSubtasks = task.subtasks?.filter((sub) => sub.status=="Done").length;

    return totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;
  };


  const [newTask, setNewTask] = useState({
    title: "",
    priority: "medium",
  })


  const priorityColors = {
    high: "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100",
    medium: "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100",
    low: "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100",
  }

  const statusIcons = {
    high: <Rocket className="h-5 w-5 text-blue-500" />,
    medium: <Target className="h-5 w-5 text-yellow-500" />,
    low: <Star className="h-5 w-5 text-green-500" />,
  }

  const handleAddTask = async () => {

    try {

      const token = sessionStorage.getItem("token")
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/addtask`, {
        title: newTask.title,
        priority: newTask.priority,
        subtasks: [],
      }, { headers: { "Authorization": `Bearer ${token}` } })

      if (response.status == 200) {
        console.log("task added")
      }
      else {
        console.log("task not added")
      }

      return
    } catch (error) {
      console.log("error in adding task", error)
    }
  }

  const handlecard = (id) => {
    navigate(`/task/${id}`)
  }

  const handlelogout = () => {
    sessionStorage.removeItem("token")
    navigate("/signin")
  }

  return (

    <div
      className={`p-6 max-w-6xl mx-auto mt-10 min-h-[825px] transition-colors duration-300 `}
    >

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Flag className="h-6 w-6 text-indigo-500" />
          <h1 className="text-2xl font-bold text-[#fb6f92]">Task Dashboard</h1>
          <Button onClick={handlelogout} className="mx-72 bg-[#ffc7c9] flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 hover:bg-[#ff9a9e] hover:shadow-lg">
            <LogOut className="text-[#55559b] transition-all duration-300 group-hover:text-white" />
            <p className="text-[#55559b] transition-all duration-300 group-hover:text-white">Logout</p>
          </Button>

        </div>


        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2 bg-[#f0f3bd] hover:bg-[#f1f77f]">
                <Plus className="h-4 w-4 text-[#05668d]" />
                <p className="text-[#05668d]">Add Task</p>
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px] p-6 bg-[#F0F8FF] rounded-2xl shadow-lg border border-[#7dd3fc] absolute top-[45%] left-1/2 transform -translate-x-1/2 transition-all duration-300">
              <DialogHeader>
                <DialogTitle className="text-2xl font-semibold text-[#2563eb] dark:text-[#93c5fd] tracking-wide">
                  📌 Add New Task
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-6 py-4">

                <div className="grid gap-2">
                  <Label htmlFor="task-title" className="text-[#334155] dark:text-[#cbd5e1] font-medium text-lg">
                    Task Title
                  </Label>
                  <Input
                    id="task-title"
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Enter task title"
                    className="w-full px-4 py-2 border border-[#7dd3fc] bg-[#f1f5f9] dark:bg-gray-800 text-gray-900 dark:text-white rounded-lg shadow-md focus:ring-2 focus:ring-[#60a5fa] focus:outline-none transition-all duration-300"
                  />
                </div>


                <div className="grid gap-3">
                  <Label className="text-[#334155] dark:text-[#cbd5e1] font-medium text-lg text-center">Priority</Label>

                  <RadioGroup
                    value={newTask.priority}
                    onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                    className="flex gap-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="low" id="low" />
                      <BadgeCheck className="text-green-600" size={20} />
                      <Label htmlFor="low" className="cursor-pointer text-green-600 hover:text-green-500 transition-all">
                        Low
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="medium" id="medium" />
                      <AlertTriangle className="text-yellow-600" size={20} />
                      <Label htmlFor="medium" className="cursor-pointer text-yellow-600 hover:text-yellow-500 transition-all">
                        Medium
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="high" id="high" />
                      <Flame className="text-red-600" size={20} />
                      <Label htmlFor="high" className="cursor-pointer text-red-600 hover:text-red-500 transition-all">
                        High
                      </Label>
                    </div>
                  </RadioGroup>
                </div>


                <Button
                  onClick={handleAddTask}
                  className="w-full bg-[#60a5fa] text-white font-bold py-2 rounded-lg shadow-lg transition-all duration-300 hover:bg-[#3b82f6] hover:shadow-md hover:scale-105"
                >
                  ➕ Create Task
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-20">

        <div className="col-span-1 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="p-2 rounded-lg bg-purple-100 w-[40px]">
                  <ListTodo className="text-purple-500 h-5 w-5" />
                </div>
                <p className="mt-2">Total Tasks</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks?.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="p-2 rounded-lg bg-blue-100 w-[40px]">
                  <Clock className="text-blue-500 h-5 w-5" />
                </div>
                <p className="mt-2">In Progress</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks?.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                <div className="p-2 rounded-lg bg-green-100 w-[40px]">
                  <CheckCircle className="text-green-500 h-5 w-5" />
                </div>
                <p className="mt-2">Completed</p>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tasks?.filter((task) => task.status === "completed").length}</div>
            </CardContent>
          </Card>
        </div>


        <div className="col-span-2 grid grid-cols-1 md:grid-cols-1 md:w-[400px] lg:grid-cols-2 lg:w-[700px] gap-6">
          {tasks?.map((task) => (
            <button key={task._id} onClick={() => handlecard(task._id)}>
              <Card className="w-full shadow-lg border border-gray-300 hover:shadow-xl transition-all">
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">

                    <div className="flex gap-4">
                      {statusIcons[task.priority]}
                      <div>
                        <h3 className="font-medium text-gray-800 dark:text-white">{task.title}</h3>
                        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>
                    </div>
                    <Activity className="text-[#FFAB5B]"/>
                    <div className="w-14 h-14">
                      <CircularProgressbar
                        value={calculateProgress(task)}
                        text={`${calculateProgress(task)}%`}
                        styles={buildStyles({
                          textSize: "24px",
                          pathColor: calculateProgress(task) < 50 ? "#e32626" : "#68ac82",
                          textColor: "#333",
                          trailColor: "#ddd",
                        })}
                      />
                    </div>
                    
                  </div>
                  
                </CardContent>
              </Card>
            </button>
          ))}
        </div>

      </div>

    </div>

  )
}

export default TaskDashboard




