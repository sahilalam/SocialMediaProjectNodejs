$(()=>{
    $("#nav").load("/Components/navbar.html",()=>{
        main();
        $("#searchbutton").click(()=>{
            search();
        })
    });
    $("#content").load("/Components/Content.html",()=>{
        const params = new URLSearchParams(location.search);
        const currentuser=params.get('q1');
        const userid=params.get('q2');
        if(isNaN(parseInt(userid)))
        {
            searchbyname(userid,currentuser)
        }
        else
        {
            searchbyid(userid,currentuser);
        }



    });
})
let searchbyid=function(userid,currentuser)
{
    let url=`/users/${userid}`;
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
        <button type="button" class="btn btn-light" id="follow">Follow</button>
        <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Show All Posts
        </a>
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
        $("#follow").click(()=>{
            if(currentuser==0)
            {
                window.alert("Login First!!");
                return;
            }
            $.post(`/users/follow`,{
                currentuser:currentuser,
                userid:userid
            },(data)=>{
                $("#nof").text(data.followers);
                $("#follow").text("Followed");
    
            })
        })

    })
    $.get(`/users/follow/${currentuser}/${userid}`,(data)=>{
        if(data=="followed")
        {
            $("#follow").text("Followed");
        }

    })

    url=`/posts/p/${userid}`;
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
            <a href="/P/singlepost.html?q1=${p.id}&q2=${currentuser}">
            <button type="button" class="btn btn-light" id="like">Show More</button>
            </a>
            </div>
            </div>
            <br>

            `));
        }
        
    })
   
}
let searchbyname=function(userid,currentuser)
{
    let url=`/users/${userid}`;
    $.get(url,(user)=>{
        if(!user)
        {
            $("#container").prepend($(`

                <div class="card " id="c" style="text-align:center;">
                <div class="card-header">
                <h5 class="card-title">Sorry!! No results Found!!</h5>
                <img src="/Components/sad.gif" width="100px" height="100px">
                </div>
                
                </div>
                `));
            return;
        }
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
        <button type="button" class="btn btn-light" id="follow">Follow</button>
        <a class="btn btn-primary" data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
            Show All Posts
        </a>
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
        userid=user.id;
        $("#follow").click(()=>{
            if(currentuser==0)
            {
                window.alert("Login First!!");
                return;
            }
            $.post(`/users/follow`,{
                currentuser:currentuser,
                userid:userid
            },(data)=>{
                $("#nof").text(data.followers);
                $("#follow").text("Followed");
    
            })
        })
        $.get(`/users/follow/${currentuser}/${userid}`,(data)=>{
            if(data=="followed")
            {
                $("#follow").text("Followed");
            }
    
        })
    
        url=`/posts/p/${userid}`;
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
                <a href="/P/singlepost.html?q1=${p.id}&q2=${currentuser}">
                <button type="button" class="btn btn-light" id="like">Show More</button>
                </a>
                </div>
                </div>
                <br>
    
                `));
            }
            
        })

    })
}