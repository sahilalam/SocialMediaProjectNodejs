const {posts,users,likesmapper}=require('../DB/connection');
async function createNewPost(userId,title,body,keyword){
    let post=await posts.create({
        title,
        body,
        userId,
        likes:0,
        keyword:keyword
    })
    return post;
}

async function createamap(userId,postId){
    let map=await likesmapper.create({
        userId,
        postId
    })
    return map;
}
async function checkmap(userId,postId)
{
    let map=await likesmapper.findAll({where:{userId,postId}});
    return map;
}


async function showAllPosts()
{
    const p=await posts.findAll({
        include:[users]
    });
    return p;
}
async function showpostbyuserid(id)
{
    const p=await posts.findAll({where:{userId:id}
    ,include:[users]});
    return p;
}
async function showpostbypostid(id)
{
    const p=await posts.findOne({where:{id},
        include:[users]});
        return p;
}
async function showpostsbykeyword(keyword)
{   
    const p=await posts.findAll({where:{keyword}
        ,include:[users]});
     return p;

}
async function showpostbytitle(title)
{
    const p=await posts.findOne({where:{title}}
        ,{include:[users]});
     return p;

}

async function like(userid,postid)
{
    let cm=await checkmap(userid,postid);
    if(cm.length==0)
    {
        await createamap(userid,postid);
        await posts.increment("likes",{by:1,where:{id:postid}});
    }
    const p=await showpostbypostid(postid);
    return p;
}
async function task(){
    let p=await checkmap(2,1);
    console.log(p);
}

module.exports={
    createNewPost,showAllPosts,showpostbypostid,showpostbytitle,showpostbyuserid,like,showpostsbykeyword,checkmap,createamap

}
