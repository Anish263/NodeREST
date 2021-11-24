const {validationResult}=require('express-validator/check');
const Post=require('../model/post');
const fs=require('fs');
const path=require('path');

exports.getPosts=(req,res,next)=>{
    Post.findAll()
    .then(posts=>{
        res.status(200).json({message:'Fetched posts succesfully',posts:posts})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
   
};
exports.createPost=(req,res,next)=>{
    
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        const error=new Error("validation failed");
        error.statusCode=422;
        throw error;
        }
    if(!req.file){
        const error =new Error('No image Provided.');
        error.statusCode=422;
        throw error;
    }
    const image =req.file.path;
    const title=req.body.title;
    const content=req.body.content;
    const post=new Post({
        title:title,
        content:content,
        image:image,
        creator:req.userId,
        userId:req.userId
    });
    post.save()
    .then(result=>{
        res.status(201).json({
            message:"post created Sucessfully",
            post:result
        });
    
    })
    .catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    });
   }

   exports.getPost=(req,res,next)=>{
    const postId=req.params.postId;
    console.log(postId);
    Post.findByPk(postId)
    .then(post=>{
                    if(!post){
                    const error=new Error("could not find Post");
                    throw(error);
                    }

    res.status(200).json({post:post,message:"post Fetched"})
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
   }
   exports.updatePost=(req,res,next)=>{
       const postId=req.params.postId;
       const errors=validationResult(req);
        if(!errors.isEmpty()){
        const error=new Error("validation failed");
        error.statusCode=422;
        throw error;
        }
       const title=req.body.title;
       const content=req.body.content;
       let image=req.body.image;
       if(req.file){
           image=req.file.path;

       }
       if(!image){
           const error=new Error('NO File Picked');
           error.statusCode=422;
           throw error;
     
        }

        Post.findByPk(postId)
        .then(post=>{
            if(!post){
                const error=new Error("could not find Post");
                throw(error);
                }
            if(image!==post.image){
                clearImage(post.image);
            }
                post.title=title;
                post.content=content;
                post.image=image;
                return post.save();
        })
        .then(result=>{
            res.status(200).json({message:"Post Updated",post:result})
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
   };

exports.deletePost=(req,res,next)=>{
    const postId=req.params.postId;
    console.log("helloo>>>",postId);
    Post.findByPk(postId)
    .then(post=>{
        if(!post){
            const error=new Error("could not find Post");
            throw(error);
            }
    clearImage(post.image);
    return post.destroy();
    }).then(result=>{
        res.status(200).json({message:'Deleted'});
    }).catch(err=>{
        if(!err.statusCode){
            err.statusCode=500;
        }
        next(err);
    })
}


   const clearImage=filePath=>{
       filePath=path.join(__dirname,'..',filePath);
       fs.unlink(filePath,err=>console.log(err));
   }