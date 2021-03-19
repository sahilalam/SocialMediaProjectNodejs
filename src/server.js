const exp=require('express');
const userroute=require('./routes/users')
const postroute=require('./routes/posts')
const session=require('express-session');
const{db}=require('./DB/connection')
const app=exp();
let PORT=process.env.PORT||1234;
app.use(exp.json());
app.use(exp.urlencoded({extended:true}));
app.use('/users',userroute);
app.use('/posts',postroute);

app.use('/',exp.static(__dirname+"/public"));

db.sync()
.then(()=>{
    app.listen(PORT,()=>
    {
        console.log(`Server started at http://localhost:${PORT}`);
    })

})
.catch((err)=>{
    console.error("DATABASE NOT CONNECTED");
    console.error(err);
})

