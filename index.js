const express=require("express");
const dotenv=require("dotenv");
const db=require("./db/connect");
const cors=require("cors")
const userRouter=require("./router/userRouter")
const productRouter=require("./router/productRouter")






dotenv.config()
const app=express();
app.use(express.json());


// connection
db();
app.use(cors())



//Middleware
app.use("/api",userRouter);
app.use("/api",productRouter);





const port=process.env.PORT||5000;








app.use("/products", productRouter);
app.use("/users", userRouter);
app.listen(port,()=>{
    console.log(`App is Running http://localhost:${port}`);
});

