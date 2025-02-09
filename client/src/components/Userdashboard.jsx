import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Plus, CheckCircle, Circle, Timer, MessageSquarePlus } from 'lucide-react';

const TaskDashboard = () => {

  const [tasks, setTasks] = useState([
    { id: 1, title: 'Complete Project Proposal', priority: 'high', status: 'in-progress', progress: 60 },
    { id: 2, title: 'Review Documentation', priority: 'medium', status: 'todo', progress: 0 },
    { id: 3, title: 'Update Dependencies', priority: 'low', status: 'completed', progress: 100 }
  ]);

  const [newTask, setNewTask] = useState({
    title: '',
    priority: 'medium'
  });

  

  const priorityColors = {
    high: 'bg-red-100 text-red-800',
    medium: 'bg-yellow-100 text-yellow-800',
    low: 'bg-green-100 text-green-800'
  };

  const statusIcons = {
    'completed': <CheckCircle className="h-5 w-5 text-green-500" />,
    'in-progress': <Timer className="h-5 w-5 text-yellow-500" />,
    'todo': <Circle className="h-5 w-5 text-gray-500" />
  };

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      setTasks([...tasks, {
        id: tasks.length + 1,
        title: newTask.title,
        priority: newTask.priority,
        status: 'todo',
        progress: 0
      }]);
      setNewTask({ title: '', priority: 'medium' });
    }
  };

  
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Task Dashboard</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add Task
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Task</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  id="task-title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                  placeholder="Enter task title"
                />
              </div>
              <div className="grid gap-2">
                <Label>Priority</Label>
                <RadioGroup
                  value={newTask.priority}
                  onValueChange={(value) => setNewTask({ ...newTask, priority: value })}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="low" />
                    <Label htmlFor="low">Low</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high">High</Label>
                  </div>
                </RadioGroup>
              </div>
              <Button onClick={handleAddTask}>Create Task</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{tasks.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(task => task.status === 'in-progress').length}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {tasks.filter(task => task.status === 'completed').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        {tasks.map(task => (
          <Card key={task.id} className="w-full">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">

                <div className="flex items-center gap-4">
                  {statusIcons[task.status]}
                  <div>
                    <h3 className="font-medium">{task.title}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[task.priority]}`}>
                      {task.priority}
                    </span>
                  </div>
                  
                </div>

                <div className="">
                  <button>
                  <MessageSquarePlus className='text-red-300'/>
                  </button>
                </div>

                <div className="w-32">
                  <div className="h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-blue-600 rounded-full"
                      style={{ width: `${task.progress}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">{task.progress}% complete</span>
                </div>

              </div>

              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TaskDashboard;