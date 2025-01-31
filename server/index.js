import connectDB from "./db/db.js";
import app from "./app.js";
import dotenv from "dotenv"

dotenv.config({
    path:"./.env"
})

const PORT = process.env.PORT || 4000

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server running on port :" , PORT)
    })
})
.catch((error)=>{
    console.log(error)
})

