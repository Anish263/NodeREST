const Sequelize=require('sequelize');
const sequelize=require('../util/database');

const Post=sequelize.define('post',  {
  id:{
    type:Sequelize.INTEGER,
    autoIncrement:true,
    allowNull:false,
    primaryKey:true
 },
 title:Sequelize.STRING,
 image:Sequelize.STRING,
 content:Sequelize.TEXT,
 creator:Sequelize.TEXT
 
});
module.exports=Post;