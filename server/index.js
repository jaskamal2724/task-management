import connectDB from "./db/connect.js";
import app from "./middleware/app.js";
import dotenv from "dotenv";
import signup from "./controller/auth.js";
// dotenv.config({
//     path:"./.env"
// });
const PORT = process.env.PORT || 5000;


app.post('/api/signup', signup);



connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server running on port :" , PORT);
    })
})
.catch((error)=>{
    console.log(error);
});

