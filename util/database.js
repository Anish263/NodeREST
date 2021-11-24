const Sequelize=require('sequelize');
const sequelize=new Sequelize('mydb1','root','root',{
    dialect:'mysql',
    host:'localhost'
});
module.exports=sequelize;