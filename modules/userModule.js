const mongoose=require("mongoose");


const userSchema=mongoose.Schema({
    name:{
        type:String
    },
    email:{type:String, unique: true ,require},
    password:{type:String,require},
	confrimPassword :{type:String,require}
})

const userModel=mongoose.model("user",userSchema);
module.exports=userModel