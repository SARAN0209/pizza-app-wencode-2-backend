const express=require("express");
const user=require("../modules/userModule")
const router=express.Router();
const jwt =require("jsonwebtoken");
const bcrypt=require("bcrypt")


router.post("/signup",async(req,res)=>{
    try {
        const exuser= await user.findOne({email:req.body.email});
        if(exuser)
           return res.json({
            message:"You are already exist User Please SignIn Here",
            success:false

           }).status(409);
          
          
           const salt=await bcrypt.genSalt(Number(10));
           const hashpassword=await bcrypt.hash(req.body.password,salt)
           
           let newuser = new user({...req.body,password:hashpassword});
           await newuser.save();
          return res.send({message:"user create Successfully"}).status(201)
        
        
    } catch (error) {
        console.log(err);
        res.send({message:"Internal Server Error"}).status(500)
        
    }
    
})
router.post("/signin",async(req,res)=>{
    
    try {
        const users=await user.findOne({email:req.body.email})
        if(!users){
        return res.send({message:"Your not exist user please signup here"}).status(409);
        }
       
        const validpass=await bcrypt.compare(req.body.password,users.password);
        // console.log(validpass);
        if(!validpass){
        return res.send({message:"Please Enter Valid Password"}).status(409);
        }
        
       
   
       
        const token=jwt.sign(users.toObject(),process.env.SECRET_KEY,{expiresIn: "1hr"})
     
        
         res.send({token:token}).status(200);
      
      
        
    } catch (error) {
        res.send({message:`Internal Server Error${error}`}).status(500)
        
    }





})


router.get("/getuser",(req,res,next)=>{
    user.find((err,data)=>{
        console.log(data,err);
        if(err){
            console.log(err);
            
            res.status(404).json({
                message:"data failed"
            })

        }
        else{
            res.send(data).status(201)
        }
    })

})




module.exports=router;