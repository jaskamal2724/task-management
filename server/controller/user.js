import User from "../model/userModel.js"
import jwt from "jsonwebtoken";


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

        res.status(201).json({message: "You are LogIn"});       //login
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {});


    } catch (error) {                                           // for any other error
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

export { signup, login, getProfile, updateProfile};