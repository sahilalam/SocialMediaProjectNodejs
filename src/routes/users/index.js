const { updatestatus,checkcurrentpassword,updatepassword,updateemail,updateusername,follow,checkmap,createamap,createanonuser,showuserbyid,showuserbyusername,showuserallusers,newuser,login }=require('../../controllers/users');

const router=require('express').Router();

router.get('/:q',async (req,res)=>{
    let query=req.params.q;
    let user;
    if(isNaN(parseInt(query)))
    {
        user=await showuserbyusername(query);
    }
    else
    {
        user=await showuserbyid(query);
    }
    res.send(user)
})
router.post('/',async (req,res)=>{
    let user=await showuserbyusername(req.body.username);
    if(user)
    {
        res.send(null);
    }
    else
    {
        user=await newuser(req.body.username,req.body.password,req.body.email);
        console.log("user created");
        res.send({
            id:user.id,
            username:user.username
        });
    }
     
})
router.get('/',async (req,res)=>{
    let user=await showuserallusers();
    res.send(user);
})
router.post('/login',async (req,res)=>{
    user=await login(req.body.username,req.body.password);
    if(user)
    {
        res.send({
            id:user.id,
            username:user.username
        });

    }
    else
    {
        res.send(null);
    }

})
router.get('/follow/:currentuser/:userid',async(req,res)=>{
    let map=await checkmap(req.params.currentuser,req.params.userid);
    if(map.length==0)
    {
        res.send("follow");
    }
    else
    {
        res.send("followed");
    }


});

router.post('/follow',async(req,res)=>{
    let data=await follow(req.body.currentuser,req.body.userid);
    res.send(data);
})
router.post('/edit/username',async(req,res)=>{
    let user=await showuserbyusername(req.body.newusername);
    if(user)
    {
        res.send(null);
    }
    {
        let user=await updateusername(req.body.newusername,req.body.id);
        if(user){res.send({
            id:user.id,
            username:user.username})};
    }

})
router.post('/edit/email',async(req,res)=>{
    await updateemail(req.body.newemail,req.body.id);
    res.send("done");
})
router.post('/edit/password',async(req,res)=>{
    await updatepassword(req.body.newpassword,req.body.id);
    res.send("done");
})
router.post('/checkcurrentpassword',async(req,res)=>{
    let user=await checkcurrentpassword(req.body.password,req.body.id);
    res.send(user);
})
router.post('/edit/status',async(req,res)=>{
    await updatestatus(req.body.status,req.body.id);
    res.send("done");
})
module.exports=router