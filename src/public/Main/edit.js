$(()=>{
    $("#nav").load("/Components/navbar.html",()=>{
        main();
        $("#searchbutton").click(()=>{
            search();
        })
    });
    $("#content").load("/Components/Content.html",()=>{
        let url=`/users/${JSON.parse(window.localStorage.user).id}`;
        $.get(url,(user)=>{
            $("#container").append($(`
               
            <div class="card " id="c">
            <div class="card-header">
            <h5 class="card-title"><u>Username</u>: "${user.username}"</h5>
            </div>
            <div class="card-body">
            <span class="card-text"><small class="text-muted" ><u>Followers:</u> <b id="nof">${user.followers}</b></small></span>  |  
            <span class="card-text"><small class="text-muted"><u>E-Mail:</u> ${user.email}</small></span>
            <p class="card-text" id="post">STATUS: ${user.status}</p>
            <p>
            
            <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
                Show All Posts
            </a>
            <button type="button" class="btn btn-light" id="edit">Edit Profile</button>
            </p>
            <div class="collapse" id="collapseExample">
            <div class="card card-body" id="cardbody">
            </div>
            </div>
            </div>
            </div>
            <br>
            `
            ))
            $("#edit").click(()=>{
                editprofile();
            })
            url=`/posts/p/${JSON.parse(window.localStorage.user).id}`;
            $.get(url,(posts)=>{
                for(p of posts)
                {
                    
                    $("#cardbody").append($(`
                    <div class="card " id="c">
                    <div class="card-header">
                    <h5 class="card-title">Title: ${p.title}</h5>
                    </div>
                    <div class="card-body">
                    <p class="card-text">${(p.body).slice(0,10)}...</p>
                    <a href="/P/singlepost.html?q1=${p.id}&q2=${JSON.parse(window.localStorage.user).id}">
                    <button type="button" class="btn btn-light" id="like">Show More</button>
                    </a>
                    <button type="button" class="btn btn-light" id="delete">Delete</button>
                    </div>
                    </div>
                    <br>
        
                    `));
                }
                
            })
        })
        
    });
})
let editprofile=function(){
    $("#content").load("/Components/editprofile.html",()=>{
        $("#changeusername").click(()=>{
            $.post('/users/edit/username',{newusername:$("#inlineFormInputName1").val(),id:JSON.parse(window.localStorage.user).id},(data)=>{
                if(data)
                {
                    window.localStorage.user=JSON.stringify(data);
                    $("#1").text(JSON.parse(window.localStorage.user).username);
                    location.href='/';
                }
                else
                {
                    window.alert("Username not available!!")
                }

            })
        });

        $("#changestatus").click(()=>{
            $.post('/users/edit/status',{
                status:$("#inlineFormInputName2").val(),
                id:JSON.parse(window.localStorage.user).id
            },(data)=>{
                if(data=='done')
                {
                    location.href='/';
                }
            })
        });

        $("#changeemail").click(()=>{
            $.post('/users/edit/email',{newemail:$("#inlineFormInputName3").val(),id:JSON.parse(window.localStorage.user).id},(data)=>{
                if(data=="done")
                {
                    location.href='/';
                }
            })
        });

        $("#changepassword").click(()=>{
            let currentpassword=$('#inlineFormInputName6').val();
            let pass1=$("#inlineFormInputName4").val();
            let pass2=$("#inlineFormInputName5").val();
            $.post('/users/checkcurrentpassword',{password:currentpassword,id:JSON.parse(window.localStorage.user).id},(data)=>{
                if(!data)
                {
                    window.alert("Wrong Current password!!");
                }
                else
                {
                    if(pass1!=pass2)
                    {
                        window.alert("Password didn't matched!!")
                    }
                    else
                    {
                        $.post('/users/edit/password',{newpassword:pass1,id:JSON.parse(window.localStorage.user).id},(data)=>{
                            if(data=="done")
                            {
                                location.href='/';
                            }
                        })
                    }
    
                }

            })

        });
    });

}