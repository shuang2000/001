var mongoose=require('mongoose');
//链接数据库
mongoose.connect('mongodb://localhost/runoob',{ useMongoClient: true });

const db=mongoose.connection;

db.once('error',()=>console.log('链接数据库失败'));
db.once('open',()=>console.log('链接数据库成功'))
//创建模型==================================
const categorySchema=mongoose.Schema({
    title:String,
    mark:String,
    num:Number
})
//登陆的账号
const user1=mongoose.Schema({
    name:String,
    pass:String,
})
//登陆的账号
const user=mongoose.Schema({
    name:String,
    pass:String,
})
//电影：名字 作者 上传人 上传时间 文件（图片或者视频） 观看人数 收藏人数 描述
const movies=mongoose.Schema({
    name:String,
    author:String,
    upauthor:String,
    time:Date,
    file:String,
    watch:Number,
    collect:Number,
    des:String,
    number:Number
})
//电视剧：名字 作者 上传人 上传时间 文件（图片或者视频） 观看人数 收藏人数 描述
const tev=mongoose.Schema({
    name:String,
    author:String,
    upauthor:String,
    time:Date,
    file:String,
    watch:Number,
    collect:Number,
    des:String
})
//动漫：名字 作者 上传人 上传时间 文件（图片或者视频） 观看人数 收藏人数 描述
const comic=mongoose.Schema({
    name:String,
    author:String,
    upauthor:String,
    time:Date,
    file:String,
    watch:Number,
    collect:Number,
    des:String
})
//生活：名字 上传人 上传时间 文件（图片或者视频） 观看人数 收藏人数 描述
const life=mongoose.Schema({
    name:String,
    upauthor:String,
    time:Date,
    file:String,
    watch:Number,
    collect:Number,
    des:String
})
//新闻：名字 上传人 上传时间 文件（图片或者视频） 观看人数 收藏人数 描述
const news=mongoose.Schema({
    name:String,
    upauthor:String,
    time:Date,
    file:String,
    watch:Number,
    collect:Number,
    des:String
})
//创建对象
const Models={
    category:mongoose.model('category',categorySchema,'category'),
    user:mongoose.model('user',user,'user'),
    movies:mongoose.model('movies',movies,'movies'),
    tev:mongoose.model('tev',tev,'tev'),
    comic:mongoose.model('comic',comic,'comic'),
    life:mongoose.model('life',life,'life'),
    news:mongoose.model('news',news,'news'),
}
module.exports=Models;