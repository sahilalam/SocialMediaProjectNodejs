
$(()=>{
    $("#nav").load("/Components/navbar.html",()=>{
        main();
        $("#searchbutton").click(()=>{
            search();
        })
    });
    $("#content").load("/Components/Content.html",()=>{
        $.get('/users',(users)=>{
            let i=1;
            let currentuser=0;
            if(window.localStorage.user){currentuser=JSON.parse(window.localStorage.user).id}
            for(let user of users)
            {
                let id="c3";
                let tag="Lunar";
                if(i==1){id="c1";tag="Interstellar";}
                else if(i==2){id="c2";tag="Galactic";}

                
                $("#container").append($(`
               
                <div class="card " id=${id}>
                <div class="card-header">
                <h5 class="card-title">${user.username}</h5>
                </div>
                <div class="card-body">
                <p class="card-text"><b>TAG: ${tag}</b></p>
                <p class="card-text">Followers: ${user.followers}</p>
                <a href="/U/singleuser.html?q1=${currentuser}&q2=${user.id}">
                <button type="button" class="btn btn-info">Show More</button>
                </a>
                </div>
                </div>
                <br>

                `
                ))
               
                
                i++;
            }   
        })
        $("#content").prepend($(`<h1 style="width:100vw;">Popular Users</h1>`));
    })  
})
