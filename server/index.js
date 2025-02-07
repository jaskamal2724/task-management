import connectDB from "./db/connect.js";
// import app from "./app.js";
import dotenv from "dotenv";

dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 5000;

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server running on port :" , PORT);
    })
})
.catch((error)=>{
    console.log(error);
})

