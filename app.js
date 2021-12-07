const express=require('express');
const path=require('path');
const bodyParser=require('body-parser');
 const {body} =require('express-validator/check');
const sequelize=require('./util/database');
const multer=require('multer');

// const graphqlHttp=require('express-graphql');
// const graphqlSchema=require('./graphql/schema');
// const graphqlResolver=require('./graphql/resolver'); 



const Post =require('./model/post');
const User=require('./model/user');
 const feedRoutes=require('./routes/feed');
 const authRoutes=require('./routes/auth');


const app=express();


const fileStorage=multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'images')
    },
    filename:(req,file,cb)=>{
        cb(null,new Date().toISOString().replace(/:/,'=')+file.originalname);
    }
});
const fileFilter=(req,file,cb)=>{
    if(
        file.mimetype==='image/png',
        file.mimetype==='image/jpg',
        file.mimetype==='image/jpeg'
    ){
        cb(null,true);
    }else{
        cb(null,false);
    }
}


app.use(bodyParser.json());

app.use(
    multer({storage:fileStorage,fileFilter:fileFilter}).single('image')
);


app.use('/images',express.static(path.join(__dirname,'images')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','OPTIONS,GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers','Content-Type,Authorization');
next();

});


 app.use('/feed',feedRoutes);
 app.use('/auth',authRoutes);



Post.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(Post);
sequelize
.sync()
//.sync({force:true})
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
});

// app.use('/graphql',graphqlHttp.graphqlHTTP({
//     schema:graphqlSchema,
//     rootValue:graphqlResolver,
//     graphiql:true
// }));


app.use((error,req,res,next)=>{
console.log(error);
const  status=error.statusCode ||500;
const message=error.message;
const data=error.data;
res.status(status).json({message:message,data:data})
});


app.listen(8080);