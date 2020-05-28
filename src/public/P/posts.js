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
            let currentuser=0;
            if(window.localStorage.user)
            {
                currentuser=JSON.parse(window.localStorage.user).id;
            }
            for(let post of posts)
            {
                $("#container").prepend($(`
               
                <div class="card " id="c">
                <div class="card-header">
                <h5 class="card-title"><u>${post.user.username}</u>: "${post.title}"</h5>
                </div>
                <div class="card-body">
                <span class="card-text"><small class="text-muted" ><u>Likes:</u> ${post.likes}</small></span>  |  
                <span class="card-text"><small class="text-muted"><u>Keyword:</u> ${post.keyword}</small></span>
                <p class="card-text" id="post">${post.body}</p>
                <a href="/P/singlepost.html?q1=${post.id}&q2=${currentuser}">
                <button type="button" class="btn btn-light">Show More</button>
                </a>
                </div>
               
                </div>
                <br>
                `
                ))      
            } 

        })
    })
    
})