const User = require("../model/user")
const bcrypt= require('bcryptjs');
module.exports={
    createUser:async function({userInput},req){
        const existingUser=await User.findOne({where:{email:userInput.email}});
        if(existingUser){
            const error=new Error("User exists Already");
            throw error;
        }
        const  hashedPw =await bcrypt.hash(userInput.password,12);
        const user = new User({
            email:userInput.email,
            name:userInput.name,
            password:hashedPw
        });
        const createdUser=await user.save();
        return {...createdUser._doc,id:createdUser.id.toString()};
    }
}