import mongoose from "mongoose"

const connectDB = async()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}/task-management`)
        console.log("MONGODB connected successfully " , connectionInstance.connection.host)
    } 
    catch (error) {
        console.log("Error connecting mongodb ",error)
    }
}

export default connectDB