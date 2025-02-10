import connectDB from "./db/connect.js";
import app from "./middleware/app.js";
import router from "./router/userRoutes.js";

const PORT = process.env.PORT || 5000;



app.use('/api/users', router);

connectDB()
.then(()=>{
    app.listen(PORT,()=>{
        console.log("server running on port :" , PORT);
    })
})
.catch((error)=>{
    console.log(error);
});

