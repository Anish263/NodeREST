const express=require('express');
const {body} =require('express-validator/check');
const isAuth=require('../middleware/is-auth');

const router=express.Router();
const feedcontroller =require('../controller/feed');

router.get('/posts',isAuth,feedcontroller.getPosts);
router.post('/post',isAuth,[
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5})
],feedcontroller.createPost);


router.get('/post/:postId',isAuth,feedcontroller.getPost);
router.put('/post/:postId',isAuth,[
    body('title').trim().isLength({min:5}),
    body('content').trim().isLength({min:5})
],feedcontroller.updatePost);



router.delete('/post/:postId',isAuth,feedcontroller.deletePost);



module.exports=router;