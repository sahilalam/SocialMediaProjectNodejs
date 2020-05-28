$(()=>{
    $("#nav").load("/Components/navbar.html",()=>
    {
        main();
        $("#searchbutton").click(()=>{
            search();
        })
    });
    $("#content").load("/Components/Content.html",()=>{
        const params = new URLSearchParams(location.search);
        const postid=params.get('q1');
        const userid=params.get('q2');
        let url="/posts/"+postid;
        $.get(url,(post)=>{
            $("#container").append($(`
               
            <div class="card " id="c">
            <div class="card-header">
            <h5 class="card-title"><u>${post.user.username}</u>: "${post.title}"</h5>
            </div>
            <div class="card-body">
            <span class="card-text"><small class="text-muted" ><u>Likes:</u> <b id="nol">${post.likes}</b></small></span>  |  
            <span class="card-text"><small class="text-muted"><u>Keyword:</u> ${post.keyword}</small></span>
            <p class="card-text" id="post">${post.body}</p>
            <p>
            <button type="button" class="btn btn-light" id="like">Like</button>
            <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Comments
            </button>
            </p>
            
            
            <div class="collapse" id="collapseExample">
            </div>
            </div>
            </div>
            <br>
            `
            ))
            url=`/posts/like/${userid}/${postid}`;
            $.get(url,(data)=>{
                if(data.mssg=="liked"){$("#like").text("Liked");}
                else{$("#like").text("Like");}
            })
            
            url="/posts/comments/"+postid;
            $.get(url,(data)=>{
                for(let c of data)
                {
                    $("#collapseExample").prepend($(`
                    <span class="card-text"><small class="text-muted" ><b>${c.user.username}:</b></small></span>
                    <span class="card-text"><small class="text-muted" id="cb">${c.body}</small></span><br>
                    `))
                }
                $("#collapseExample").append($(`
                <br>
                <form class="form-inline">
                <div class="form-group mx-sm-3 mb-2">
                    <input type="text" class="form-control" id="input2" placeholder="Add new comment!!">
                </div>
                <button type="button" class="btn btn-info mb-2" id="bds">Comment</button>
                </form>
                `))
                $("#bds").click(()=>{
                    if(!window.localStorage.user)
                    {
                        window.alert("Login First");
                        return;
                    }
                    const body=$("#input2").val();
                    $.post(`/posts/comments/${postid}/${JSON.parse(window.localStorage.user).id}`,{comment:$("#input2").val()},(data)=>{
                        console.log(data);
                        location.reload();
                    })

                })

            })
            $("#like").click(()=>{
                if(userid==0)
                {
                    window.alert("Login First!!");
                    return;
                }
                $.post("/posts/like",{
                    userid:userid,
                    postid:postid
                },(data)=>{
                    $("#nol").text(data.likes);
                    $("#like").text("Liked");
                })
            })
          

        })
        
    })
})