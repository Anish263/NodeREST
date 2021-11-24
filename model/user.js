const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const User=sequelize.define('user',{

    email:
    {
        type:Sequelize.STRING,
        required:true
    } ,
    password:
    {
        type:Sequelize.STRING,
        required:true
    } ,
    name:{
        type:Sequelize.STRING,
        required:true
    },
    status:{
        type:Sequelize.STRING,
        default:"I am New!!"
    }
})
module.exports=User;