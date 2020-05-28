const{checkmap,createamap,createNewPost,showAllPosts,showpostbypostid,showpostbytitle,showpostbyuserid,like,showpostsbykeyword}=require("../../controllers/posts");
const {createnewcomment,showallcomments}=require("../../controllers/comments");
const router=require('express').Router();
router.get("/",async(req,res)=>{
    let posts=await showAllPosts();
    res.send(posts);
})
router.get("/:id",async(req,res)=>{
    let post;
    if(isNaN(parseInt(req.params.id)))
    {
        post=await showpostsbykeyword(req.params.id);
    }
    else
    {
        post=await showpostbypostid(req.params.id);
    }
   
    res.send(post);
})
router.get("/p/:id",async(req,res)=>{
    let post=await showpostbyuserid(req.params.id);
    res.send(post);
})
router.get("/comments/:id",async(req,res)=>{
    let comm=await showallcomments(req.params.id);
    res.send(comm);
})
router.post("/comments/:postid/:userid",async(req,res)=>{
    await createnewcomment(req.params.userid,req.params.postid,req.body.comment);
    res.send("done");
})
router.post("/",async(req,res)=>{
    await createNewPost(req.body.id,req.body.title,req.body.post,req.body.keyword);
    res.send("done");
})
router.post("/like",async(req,res)=>{
    let data=await like(req.body.userid,req.body.postid);
    res.send(data);
})
router.get("/like/:userid/:postid",async(req,res)=>{
    let data=await checkmap(req.params.userid,req.params.postid);
    let mssg;
    if(data.length==0){ mssg="like"}
    else{mssg="liked"}
    res.send({mssg});

})

module.exports=router