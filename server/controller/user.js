import User from "../model/userModel.js"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import Task from "../model/TaskModel.js";

dotenv.config({
  path:"./.env"
})

//SignUp Function
const signup = async (req, res) => {
    const {username, email, password} = req.body;                               //taking inputs from body
    
    if (!username || !email || !password) {                                     //Checking if the inputs are empty
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {

        const existingUsername = await User.findOne({username});                //cheking if username already there
        if (existingUsername) {
            return res.status(400).json({message: "Username already exist"}); 
        }

        const existingEmail = await User.findOne({email});                      //cheking if email already there
        if (existingEmail) {
            return res.status(400).json({message: "Email already exist"}); 
        } 
        const user = new User({username,email,password});                       //creating new record
        await user.save();
        return res.status(201).json({message: "You are SignUp"});               //signup


    } catch (error) {                                                           //for other errors
        return res.status(500).json({message: "There is error in creating user"});
    }
}

//Login Function
const login = async (req, res) => {
    const {email, password} = req.body;                         // taking inputs from body

    if (!email || !password) {                                  // Checking if the inputs are empty
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
                                                          
        const user = await User.findOne({email});               // finding given email in databse
        if (!user) {
            return res.status(400).json({message: "No user found. go to SignUp page."}); 
        }
        
        const isMatch = await user.comparePassword(password);   //matching credentials
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"}); 
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.status(201).json({message: "You are LogIn",token});       //login
        console.log("you are logged in")
        return 

    } 
    catch (error) {                                           // for any other error
        console.log(error);
        return res.status(500).json({message: "There is error in login"});
    }
}

//Get Profile Function
const getProfile = async (req, res) => {
    try {
      // Find user by ID (from JWT payload)
      const user = await User.findById(req.user.id).select('-password'); // Exclude password
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching profile' });
      console.log(error);
    }
};

//Update Profile Function
const updateProfile = async (req, res) => {
    const { username, password } = req.body;
  
    // Check if at least one field is provided
    if (!username && !password) {
      return res.status(400).json({ message: 'At least one field (username or password) is required' });
    }
  
    try {
      // Find user by ID (from JWT payload)
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Check if the new username already exists
      if (username) {
        const existingUser = await User.findOne({ username });
        if (existingUser && existingUser._id.toString() !== req.user.id) {
          return res.status(400).json({ message: 'Username already exists' });
        }
        user.username = username;
      }
  
      // Update password if provided
      if (password) {
        user.password = password; // The pre-save hook will hash the password
      }
  
      // Save the updated user
      await user.save();
  
      // Return success response
      res.json({ message: 'Profile updated successfully', user });
    } catch (error) {
      res.status(500).json({ message: 'Error updating profile' });
    }
};

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



export { signup, login, getProfile, updateProfile, addtask, getTask ,addSubtask, updateSubtaskStatus};