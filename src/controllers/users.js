const {users,followersmapper}=require('../DB/connection');
const{ randomnamegenerator }=require('../utils/username');

async function createanonuser(){
    const user=await users.create({
        username:randomnamegenerator()
    })
    return user;
}
async function updatestatus(status,id){
    await users.update({status:status},{where:{id}});
}
async function checkcurrentpassword(password,id)
{
   let user=await users.findOne({where:{id,password}})
   return user;
}
async function updatepassword(newpassword,id){
    await users.update({password:newpassword},{where:{id:id}});
}
async function updateusername(newusername,id){
    await users.update({username:newusername},{where:{id:id}});
    let user=await showuserbyid(id);
    return user;
}
async function updateemail(newemail,id)
{
    await users.update({email:newemail},{where:{id:id}})
}
async function createamap(currentuser,userId){
    let map=await followersmapper.create({
        userId,
        currentuser
    })
    return map;
}
async function checkmap(currentuser,userId)
{
    let map=await followersmapper.findAll({where:{userId,currentuser}});
    return map;
}
async function newuser(username,password,email){
    const user=await users.create({
        username:username,
        password:password,
        followers:0,
        email:email
    })
    return user;
}
async function login(username,password){
    let user=await users.findOne({where:{username:username,password:password}});
    return user;

}
async function showuserbyid(id)
{
    const user=await users.findOne({where:{id}});
    return user;
}
async function showuserbyusername(username)
{
    const user=await users.findOne({where:{username}});
    return user;
}
async function showuserallusers()
{
    const user=await users.findAll({limit:5,order:[["followers","DESC"]]});
    return user;
    
}
async function follow(currentuser,userId)
{
    let map=await checkmap(currentuser,userId);
    if(map.length==0)
    {
        await users.increment("followers",{by:1,where:{id:userId}});
        await createamap(currentuser,userId);
    }
    
    
    let user=await showuserbyid(userId);
    return user;
}
async function task(){

    let user=await checkcurrentpassword('2123',1);
    console.log(user);

}
module.exports={
    updatestatus,checkcurrentpassword,updatepassword,updateemail,createanonuser,showuserbyid,showuserbyusername,showuserallusers,newuser,login,follow,createamap,checkmap,updateusername
}