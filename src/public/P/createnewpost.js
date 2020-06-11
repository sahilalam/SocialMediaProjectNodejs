$(()=>{
    
    $("#nav").load("/Components/navbar.html",()=>
    {
        main();
        $("#searchbutton").click(()=>{
            search();
        })
    });
    $("#content").load("/Components/Content.html",()=>{
        $("#container").append($(`<div id="c">
        <form style="padding:10px;">
        <div class="form-group">
            <label for="formGroupExampleInput">TITLE</label>
            <input style=" background-color:rgba(80, 80, 77, 0.116);"type="text" class="form-control" id="title" placeholder="Enter tite of your post here!">
        </div>
        <div class="form-group">
        <label for="exampleFormControlSelect1">Select #Trend</label>
        <select class="form-control" id="exampleFormControlSelect1">
        <option>social</option>
        <option>tech</option>
        <option>sports</option>
        <option>entertainment</option>
        <option>educational</option>
        <option>fun</option>
        <option>other</option>
        </select>
        </div>
        <div class="form-group">
        <label for="exampleFormControlTextarea1">Type your Post here!</label>
        <textarea style=" background-color:rgba(80, 80, 77, 0.116);" class="form-control" id="body" rows="15"></textarea>
        </div>
        </form>
        <div style="padding:10px;">
        <button type="button" class="btn btn-info" id="done">Post</button>
        <button id="upload_widget" class="cloudinary-button" style="margin:5px;height:50px;">Upload files</button>
      
        </div>
        
        </div>`
        ));
        let uploaddata=null;
        var myWidget = cloudinary.createUploadWidget({
            cloudName: 'dohdwfkhg', 
            uploadPreset: 'kzvtq2sl',
            clientAllowedFormats:['jpg','png','gif','jpeg'],
            cropping:true,
            croppingAspectRatio:1}
            , (error, result) => { 
              if (!error && result && result.event === "success") { 
                uploaddata=result;
                $("#upload_widget").text('Uploaded!!');
                $("#upload_widget").prop('disabled',true);
                console.log(uploaddata.info.secure_url);
              }
            }
          )
        
        $("#upload_widget").click(()=>{
            if(!window.localStorage.user)
            {
                window.alert("Please Login or Signup first!!!");
                return;
            }
            myWidget.open();
        })
        $("#done").click(()=>{
            if(!window.localStorage.user)
            {
                window.alert("Please Login or Signup first!!!");
                return;
            }

            const title=$("#title").val();
            const keyword=$("#exampleFormControlSelect1").val();
            const post=$("#body").val();
            let file_url=null;
            let file_format=null;
            if(uploaddata)
            {
                file_url=uploaddata.info.secure_url;
                file_format=uploaddata.info.format;
            }
            if(title==0 || keyword==0 || body==0)
            {
                window.alert("Please Fill all the fields!!");
            }else
            {
                $.post("/posts/",{
                    id:JSON.parse(window.localStorage.user).id,
                    title:title,
                    keyword:keyword,
                    post:post,
                    file_url:file_url,
                    file_format:file_format
                },(done)=>{
                    console.log(done);
                    location.replace("/P/posts.html");
                })
            }

        })
    })
    
})