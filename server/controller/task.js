import Task from "../model/taskModel.js";
import dotenv from "dotenv"


dotenv.config({
  path:"./.env"
})


const addtask =async(req, res)=>{
    try {
      const {title,priority,subtasks}= req.body
  
      if(!title || !priority || !subtasks){
        res.status(400).json({msg:"all fields are required"})
      }
      const task = await Task.create({
        id:req.user.id,
        title,
        priority,
        subtasks,
      })
  
      if(task){
        console.log("task added")
      }
      return res.status(200).json({msg:"task added"})
  
    } catch (error) {
      console.log("errror in addign task ",error)
    }
  }
  
  const getTask=async (req, res) => {
    try {
      const response = await Task.find({})
  
      if(response){
        res.status(200).json(response)
      }
      else{
        res.status(400).json({msg:"no task found"})
      }
      return
    } 
    catch (error) {
      console.log("error in fetching task ",error)
    }
  }
  
  const addSubtask=async (req, res) => {
    try {
      const {id, title}=req.body
      console.log(title)
  
      const data={
        title:title,
        status:"Not Done"
      }
      const task = await Task.findByIdAndUpdate({_id:id},{$push:{subtasks:data}})
      if(task){
        res.status(200).json({msg:"subtask added successfulyl",task})
      }
      else{
        res.status(400).json({msg:"subtask not added "})
      }
    } 
    catch (error) {
      console.log("error updating subtask ", error)
    }
  }
  
  const updateSubtaskStatus = async (req, res) => {
    try {
      const { taskId, subtaskId } = req.body;
  
      // Find the task and get the current status of the subtask
      const task = await Task.findOne({ _id: taskId, "subtasks._id": subtaskId });
  
      if (!task) {
        return res.status(404).json({ msg: "Task or subtask not found" });
      }
  
      // Find the subtask within the task
      const subtask = task.subtasks.find((sub) => sub._id.toString() === subtaskId);
  
      if (!subtask) {
        return res.status(404).json({ msg: "Subtask not found" });
      }
  
      // Toggle the status dynamically
      const newStatus = subtask.status === "Done" ? "Not Done" : "Done";
  
      // Update the subtask status
      const updatedTask = await Task.findOneAndUpdate(
        { _id: taskId, "subtasks._id": subtaskId },
        { $set: { "subtasks.$.status": newStatus } },
        { new: true }
      );
  
      res.status(200).json({ msg: "Subtask status updated", updatedTask });
    } catch (error) {
      console.error("Error updating subtask:", error);
      res.status(500).json({ msg: "Server error" });
    }
  };
  


export {addtask, getTask ,addSubtask, updateSubtaskStatus};
