const express=require('express');
const {body} =require('express-validator/check');
const User=require('../model/user');
const router=express.Router();
const authController =require('../controller/auth');
router.put('/signup',[
    body('email').isEmail()
    .withMessage('please enter a valid email')
    .custom((value, {req}) => { 
    return User.findOne({where:{email:value} })
      .then(userDoc=>{
        if(userDoc){
            return Promise.reject('email is forbidden ');      }
    });
    })
    .normalizeEmail(),
    body('password').trim().isLength({min:5}),
    body('name').trim().isLength({min:5})
],authController.getsignup);

router.post('/login',authController.login);
module.exports=router;