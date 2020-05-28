const {users,posts,comments}=require("../DB/connection");
async function createnewcomment(userId,postId,body){
    let c=await comments.create({
        userId,
        postId,
        title:"",
        body
    })
    return c;
}
async function showallcomments(postId){
    let c=comments.findAll({where:{postId},include:[users,posts]});
    return c;

}

module.exports={
    createnewcomment,showallcomments
}
