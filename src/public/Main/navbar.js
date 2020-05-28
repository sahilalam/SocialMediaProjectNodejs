let signup=function(){
    const pass1=$("#exampleInputPassword1").val();
    const pass2=$("#exampleInputPassword2").val();
    const username=$("#exampleInputEmail1").val();
    const email=$("#exampleInputEmail2").val();
    if(pass1!=pass2)
    {
        window.alert("Password didnt matched!! try again!!");
        
    }
    else if(pass1==0|| pass2==0 || username==0 || email==0){
        window.alert("Please fill all the fields!!");
    }
    else
    {
        if(email.indexOf('@')==-1)
        {
            window.alert("Please enter a valid E-mail!!")
        }
        else
        {  $.post('/users',{
                username:username,
                password:pass1,
                email:email
            },(data)=>{
                if(data)
                {
                    success(data);
                }
                else
                {
                    window.alert("Username Already taken!!!")
                }
            
            });

        }
    }
    


}
let logout=function(){
window.localStorage.clear();
window.location.replace("/");
}

let  login=function(){
$.post('/users/login',{
    username:$("#exampleInputEmail1").val(),
    password:$("#exampleInputPassword1").val()
},(data)=>{
    if(data)
    {
        success(data);
    }
    else
    {
        window.alert("INVALID USERNAME OR PASSWORD!!!");
    }
});
}
let success=function(data){
    window.localStorage.user=JSON.stringify(data);
        $(".button").hide();
        $("#3").hide();
        $("#1").show(); 
        $("#4").show();

        
        
        $("#content").load("/Components/successful.html",()=>{
            $("#succ").prepend($(`<h3>WELCOME ${data.username}</h3>`));
        })
        
        $("#1").text(JSON.parse(window.localStorage.user).username);
        setTimeout(()=>{
            window.location.replace("/");
        },3000)

}
let main=function(){
    if(window.localStorage.user)
    {
        $(".button").hide();
        $("#3").hide();
        $("#1").show(); 
        $("#4").show();
        $("#1").text(JSON.parse(window.localStorage.user).username);
        $("#4").click(()=>{
           logout();
        })
        $("#1").click(()=>{
            location.href='/Main/showprofile.html'
        })

    }
    else
    {
       
        $(".button").show();
        $("#3").show();
        $("#4").hide();
        $("#1").hide();


        $("#2").click(()=>{
            $("#content").load("/Components/form2.html",()=>{
                $("#fp").text("Sign Up");
                $("#submit").click(()=>{  
                    signup();
                })

            })

        })
        $("#3").click(()=>{
            $("#content").load("/Components/form.html",()=>{
                $("#fp").text("Login");
                $("#submit").click(()=>{
                    login();
                })

            })

        })
    }
}
let search=function(){
    let s=$("#searchinput").val();
    let currentuser=0;
    if(window.localStorage.user)
    {
        currentuser=JSON.parse(window.localStorage.user).id;
    }
    if(s[0]=='@')
    {
        window.location=`/U/singleuser.html?q1=${currentuser}&q2=${s.slice(1)}`
    }
    else if(s[0]=='#')
    {
        window.location=`/P/posts.html?q=${s.slice(1)}`;

    }
    else
    {
        window.alert("Please use '@' or '#' before your query!!('@' for username and '#' for topic ) ")
    }
}


