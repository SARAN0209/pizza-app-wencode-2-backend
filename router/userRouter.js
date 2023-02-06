const express=require("express");
const user=require("../modules/userModule")
const router=express.Router();
const jwt =require("jsonwebtoken");
const bcrypt=require("bcrypt")


const checkpassword = (password, confirmpassword) => {
    return password !== confirmpassword ? false : true;
  };
router.post("/signup",async(req,res)=>{
    try {
        const existuser= await user.findOne({email:req.body.email});
        if(existuser)
           return res.status(400).send({
            message:"Your Already existuser Please Login Here"})

            const isSamePassword = checkpassword(
                req.body.password,
                req.body.confirmpassword
            );
            if(!isSamePassword){
                return res.status(400).send({message:"Password Dosn't Match"});
            }else delete req.body.confirmpassword;
          
          //password hash
           const salt=await bcrypt.genSalt(10);
           req.body.password=await bcrypt.hash(req.body.password,salt)
           
           //save in DB
           const newEmployees = new user({
            name:req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        console.log(newEmployees);
        await newEmployees.save((err,data)=>{
            if(err) {
                return res.status(400).send({
                  message: "Error while adding new employee. Please check the data",
                });
              }
              res.status(201).send({
                employeeId: data._id,
                message: "Employee has been added successfully.",
              });
        })
        }catch (error) {
            res.status(500).send({
              message: "Internal Server Error",
            });
          }
    
})
router.post("/signin",async(req,res)=>{

    try {
        const users=await user.findOne({email:req.body.email})
        console.log(users);
        if(!users){
        return res.send({message:"Your not exist user please signup here"}).status(400);
        }
       
        const isSamePassword=await bcrypt.compare(req.body.password,users.password);
        console.log(isSamePassword);
        if(!isSamePassword){
        return res.send({message:"Please Enter Valid Password"}).status(400);
        }
        
       
   
       
        const token=jwt.sign({users},process.env.SECRET_KEY,{expiresIn: "1hr"})
     
        
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