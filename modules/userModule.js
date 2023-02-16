<<<<<<< HEAD
const mongoose=require("mongoose");


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String, 
        unique: true ,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
	confrimpassword :{
        type:String,
        trim:true
    }
})

const userModel=mongoose.model("user",userSchema);
=======
const mongoose=require("mongoose");


const userSchema= new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    },
    email:{
        type:String, 
        unique: true ,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    },
	confrimpassword :{
        type:String,
        trim:true
    }
})

const userModel=mongoose.model("user",userSchema);
>>>>>>> a9cc4a0404d88cf9db47fb1890480118199e8210
module.exports=userModel