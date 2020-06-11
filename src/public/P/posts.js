$(()=>{
    $("#nav").load("/Components/navbar.html",()=>
    {
        main();
        $("#searchbutton").click(()=>{
            search();
        })
    });
    const params = new URLSearchParams(location.search);
    let query=params.get('q');
    let url=`/posts`;
    if(!window.localStorage.user)
    {
        userid=0;
    }
    else
    {
        userid=JSON.parse(window.localStorage.user).id;
    }
    if(query)
    {
        url=`/posts/${query}`;
    }
    $("#content").load("/Components/Content.html",()=>{
        $.get(url,(posts)=>{
            if( posts.length==0)
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
            
            for(let post of posts)
            {
                $("#container").prepend($(`
               
                <div class="card " id="c">
                <div class="card-header">
                <h5 class="card-title"><u>${post.user.username}</u>: "${post.title}"</h5>
                </div>
                <div class="card-body" id="image${post.id}">
                <br>
                <span class="card-text"><small class="text-muted" ><u>Likes:</u><b id="nol">${post.likes}</b></small></span>  |  
                <span class="card-text"><small class="text-muted"><u>Keyword:</u> ${post.keyword}</small></span>
                <p class="card-text" id="post">${post.body}</p>
                <button type="button" class="btn btn-light" id="like-${post.id}">Like</button>
                <a class="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample${post.id}" role="button" aria-expanded="false" aria-controls="multiCollapseExample${post.id}">
                Comments
                </a>
                <p>
                <div class="collapse multi-collapse" id="multiCollapseExample${post.id}">
                </div>
                </p>
                </div>
                
               
                </div>
                <br>
                `
                )) 
                if(post.fileformat!=null && post.fileurl!=null)
                {
                    console.log(post.fileurl);
                    if(post.fileformat=="jpg" || post.fileformat=="jpeg" || post.fileformat=="png" || post.fileformat=="gif")
                    {
                        $(`#image${post.id}`).prepend($(`<img src=${post.fileurl} id="pi">`))
                    }

                }
                

                let url2=`/posts/like/${userid}/${post.id}`;
                $.get(url2,(data)=>{
                    if(data.mssg=="liked"){$(`#like-${post.id}`).text("Liked");}
                    else{$(`#like-${post.id}`).text("Like");}
                })
                
                url2="/posts/comments/"+post.id;
                $.get(url2,(data)=>{
                    for(let c of data)
                    {
                        $(`#multiCollapseExample${post.id}`).prepend($(`
                        <span class="card-text"><small class="text-muted" ><b>${c.user.username}:</b></small></span>
                        <span class="card-text"><small class="text-muted" id="cb">${c.body}</small></span><br>
                        `))
                    }
                    $(`#multiCollapseExample${post.id}`).append($(`
                    <br>
                    <form class="form-inline">
                    <div class="form-group mx-sm-3 mb-2">
                        <input type="text" class="form-control" id="input2" placeholder="Add new comment!!">
                    </div>
                    <button type="button" class="btn btn-info mb-2" id="comment-${post.id}">Comment</button>
                    </form>
                    `))
                    $(`#comment-${post.id}`).click(()=>{
                        if(!window.localStorage.user)
                        {
                            window.alert("Login First");
                            return;
                        }
                        const body=$("#input2").val();
                        $.post(`/posts/comments/${post.id}/${userid}`,{comment:$("#input2").val()},(data)=>{
                            console.log(data);
                            location.reload();
                        })
    
                    })
    
                })
                $(`#like-${post.id}`).click(()=>{
                    if(!window.localStorage.user)
                    {
                        window.alert("Login First!!");
                        return;
                    }
                    $.post("/posts/like",{
                        userid:userid,
                        postid:post.id
                    },(data)=>{
                        $("#nol").text(data.likes);
                        $(`#like-${post.id}`).text("Liked");
                    })
                })

            } 

        })
    })
    
})