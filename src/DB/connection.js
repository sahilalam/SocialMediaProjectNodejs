const Sequelize=require('sequelize');


const db=new Sequelize({
    dialect:'mysql',
    database:'socialmediadb',
    username:'socialmediauser',
    password:'Sa9958607056',
});
const users=db.define('users',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    username:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false
    },
    password:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:false
    },
    followers:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,  
    },
    email:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false,
    },
    status:{
        type:Sequelize.DataTypes.STRING(200),
        allowNull:true
    }
});
const posts=db.define('posts',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false
    },
    body:{
        type:Sequelize.DataTypes.TEXT,
        allowNull:false
    },
    likes:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false
    },
    keyword:{
        type:Sequelize.DataTypes.STRING(100),
        allowNull:false
    }

});
const comments=db.define('comments',{
    id:{
        type:Sequelize.DataTypes.INTEGER,
        autoIncrement:true,
        allowNull:false,
        unique:true,
        primaryKey:true
    },
    title:{
        type:Sequelize.DataTypes.STRING(140),
        allowNull:false
    },
    body:{
        type:Sequelize.DataTypes.TEXT('tiny'),
        allowNull:false
    }

});
const likesmapper=db.define('likesmapper',{

    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    }
});
const followersmapper=db.define('followersmapper',{

    id:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    currentuser:{
        type:Sequelize.DataTypes.INTEGER,
        allowNull:false,

    }
});



   users.hasMany(posts);
   posts.belongsTo(users);

   users.hasMany(comments);
   comments.belongsTo(users);

   posts.hasMany(comments);
   comments.belongsTo(posts);

   users.hasMany(likesmapper);
   likesmapper.belongsTo(users);

   posts.hasMany(likesmapper);
   likesmapper.belongsTo(posts);

   users.hasMany(followersmapper);
   followersmapper.belongsTo(users);




module.exports={
    db,users,comments,posts,likesmapper,followersmapper
}