import User from "../model/user.js";


//SignUp Function
const signup = async (req, res) => {
    const {username, email, password} = req.body; 
    
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }


    try {

        const existingUsername = await User.findOne({username});
        if (existingUsername) {
            return res.status(400).json({message: "Username already exist"}); 
        }

        const existingEmail = await User.findOne({email});
        if (existingEmail) {
            return res.status(400).json({message: "Email already exist"}); 
        } 
        const user = new User({username,email,password});
        await user.save();
        return res.status(201).json({message: "You are SignUp"});


    } catch (error) {
        return res.status(500).json({message: "There is error in creating user"});
    }
}


export default signup;