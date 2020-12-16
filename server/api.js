//获取到对象
var models=require('./db.js');
//使用node用的是express
var express=require('express');
//用的是路由中间件
var router=express.Router();
// const util = require("util");
// 引入处理路径的模块
// const path = require('path');
const fs = require('fs');
var multer  = require('multer');
var upload=multer({dest:'upload/'});

const ObjectID = require('mongodb').ObjectID;

//登录
router.post('/api/user/login',(req,res)=>{
     let admin=req.body.admin;
     let pass=req.body.pass;
     console.log(req)
    models.user.find({name:admin,pass:pass},(err,data)=>{
       if(err){
           res.send(err)
       }else{
           res.send(data)
           
       }
    })
})
//获取每个数据的详情
router.post('/api/data/detail',(req,res)=>{
    let id=req.body.id;
    let cate=req.body.cate;
    
    //获取电影的详情
    models[cate].find({"_id":ObjectID(id)},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
//查看次数
router.post('/api/data/detail/watch',(req,res)=>{
    let id=req.body.id;
    let cate=req.body.cate;
    let watch=req.body.watch;
    console.log(watch)
    //添加查看的次数
    models[cate].find({"_id":ObjectID(id)}).update({watch:watch},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
//收藏文章
router.post('/api/data/collect',(req,res)=>{
    let id=req.body.id;
    let cate=req.body.cate;
    let collectMark=req.body.collectMark;
    models[cate].update({"_id":ObjectID(id)},{$inc:{"collect":collectMark}},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
   
})
//获取详情
router.post('/api/model/detail',(req,res)=>{
    let id=req.body.id;
    let cate=req.body.cate;
    models[cate].find({"_id":ObjectID(id)},function(err,data){
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    }) 
   
})
//获取每个模块的列表信息
router.post('/api/model/query',(req,res)=>{
    let offset=parseInt(req.body.offset);
    let limit=parseInt(req.body.limit);
    let name=req.body.name;
    let model=req.body.model;
    let sort=req.body.sort;
    let obj={};
    obj[sort]=-1;
    if(name==''||name=="all"){
        models[model].find().sort(obj).skip(offset).limit(limit).find((err,data)=>{
            if(err){
                res.send(err)
            }else{
                models[model].count((err,result)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send({
                            body:{
                                rows:data,
                                size:limit,
                                total:result
                            }
                        })
                    }
                })
            }
        }) 
    }else{
        models[model].find({name:name}).skip(offset).limit(limit).find((err,data)=>{
            if(err){
                res.send(err)
            }else{
                models[model].count((err,result)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send({
                            body:{
                                rows:data,
                                size:limit,
                                total:result
                            }
                        })
                    }
                })
            }
        }) 
    }
    
})
//删除每个模块中的某个数据
router.post('/api/model/delete',(req,res)=>{
    let idArr=req.body.idArr;
    let model=req.body.model;
    for(var i=0;i<idArr.length;i++){
        models[model].remove({"_id":ObjectID(idArr[i])},function(err,data){
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        }) 
    }
   
})
//==================================
//导航
router.get('/api/category/showlist',(req,res)=>{
    models.category.find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
//=================================
/*电影name:String,author:String,upauthor:String,time:Date,file:String,watch:Number,collect:Number des*/
//添加
router.post('/api/movies/add',(req,res)=>{
    let data=new models.movies({
        name:req.body.name,
        author:req.body.author,
        upauthor:req.body.upauthor,
        time:new Date(),
        des:req.body.des,
        file:req.body.file,
        number:req.body.number,
        collect:req.body.collect,
        watch:req.body.watch
    })
    data.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
//文件上传
router.post('/api/movies/files/upload', upload.single('fabricImage'), function (req, res, next) {
    var file = req.file;
    //以下代码得到文件后缀
    name = file.originalname;
    nameArray = name.split('');
    var nameMime = [];
    l = nameArray.pop();
    nameMime.unshift(l);
    while (nameArray.length != 0 && l != '.') {
        l = nameArray.pop();
        nameMime.unshift(l);
    }
    //Mime是文件的后缀
    Mime = nameMime.join('');
    //重命名文件 加上文件后缀
    //fs.renameSync('./upload/' + file.filename, './upload/' + file.filename + Mime);
    fs.renameSync('./upload/' + file.filename, '../static/upload/' + file.filename + Mime);
    var path='/static/upload/' + file.filename + Mime; 
    res.send(path);
})
//获取电影数据
router.post('/api/movies/query',(req,res)=>{
    let offset=parseInt(req.body.offset);
    let limit=parseInt(req.body.limit);
    let name=req.body.name;
    if(name==''||name=="all"){
        models.movies.find().skip(offset).limit(limit).find((err,data)=>{
            if(err){
                res.send(err)
            }else{
                console.log(data)
                models.movies.count((err,result)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send({
                            body:{
                                rows:data,
                                size:limit,
                                total:result
                            }
                        })
                    }
                })
            }
        }) 
    }else{
        models.movies.find({name:name}).skip(offset).limit(limit).find((err,data)=>{
            if(err){
                res.send(err)
            }else{
                models.movies.count((err,result)=>{
                    if(err){
                        res.send(err)
                    }else{
                        res.send({
                            body:{
                                rows:data,
                                size:limit,
                                total:result
                            }
                        })
                    }
                })
            }
        }) 
    }
    
})
//删除信息
router.post('/api/movies/delete',(req,res)=>{
    var idArr=req.body.idArr;
    console.log(idArr)
    for(var i=0;i<idArr.length;i++){
        models.movies.remove({"_id":ObjectID(idArr[i])},function(err,data){
            if(err){
                res.send(err)
            }else{
                res.send(data)
            }
        }) 
    }
   
})
//==========================================
/*电视剧name:String,author:String,upauthor:String,time:Date,file:String,watch:Number,collect:Number des*/
router.post('/api/tev/add',(req,res)=>{
    console.log(req)
    let data=new models.tev({
        name:req.body.name,
        author:req.body.author,
        upauthor:req.body.upauthor,
        time:new Date(),
        des:req.body.des,
        file:req.body.file,
    })
    data.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
//文件上传
router.post('/api/tev/files/upload', upload.single('fabricImage'), function (req, res, next) {

    var file = req.file;
    //以下代码得到文件后缀
    name = file.originalname;
    nameArray = name.split('');
    var nameMime = [];
    l = nameArray.pop();
    nameMime.unshift(l);
    while (nameArray.length != 0 && l != '.') {
        l = nameArray.pop();
        nameMime.unshift(l);
    }
    //Mime是文件的后缀
    Mime = nameMime.join('');
    //重命名文件 加上文件后缀
    //fs.renameSync('./upload/' + file.filename, './upload/' + file.filename + Mime);
    fs.renameSync('./upload/' + file.filename, '../static/upload/' + file.filename + Mime);
    var path='/static/upload/' + file.filename + Mime
    res.send(path);
})
//获取电影数据
router.get('/api/tev/query',(req,res)=>{
    var offset=parseInt(req.query.offset);
    var limit=parseInt(req.query.limit);
    models.tev.find().skip(offset).limit(limit).find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            models.tev.count((err,result)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({
                        body:{
                            rows:data,
                            size:limit,
                            total:result
                        }
                    })
                }
            })
        }
    })   
})
//=================================================
/*动漫name:String,author:String,upauthor:String,time:Date,file:String,watch:Number,collect:Number des*/
router.post('/api/comic/add',(req,res)=>{
    let data=new models.comic({
        name:req.body.name,
        author:req.body.author,
        upauthor:req.body.upauthor,
        time:new Date(),
        des:req.body.des,
        file:req.body.file,
    })
    console.log(req)
    data.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
//文件上传
router.post('/api/comic/files/upload', upload.single('fabricImage'), function (req, res, next) {

    var file = req.file;
    //以下代码得到文件后缀
    name = file.originalname;
    nameArray = name.split('');
    var nameMime = [];
    l = nameArray.pop();
    nameMime.unshift(l);
    while (nameArray.length != 0 && l != '.') {
        l = nameArray.pop();
        nameMime.unshift(l);
    }
    //Mime是文件的后缀
    Mime = nameMime.join('');
    //重命名文件 加上文件后缀
    //fs.renameSync('./upload/' + file.filename, './upload/' + file.filename + Mime);
    fs.renameSync('./upload/' + file.filename, '../static/upload/' + file.filename + Mime);
    var path='/static/upload/' + file.filename + Mime
    res.send(path);
})
//获取电影数据
router.get('/api/comic/query',(req,res)=>{
    var offset=parseInt(req.query.offset);
    var limit=parseInt(req.query.limit);
    models.comic.find().skip(offset).limit(limit).find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            models.tev.count((err,result)=>{
                if(err){
                    res.send(err)
                }else{
                    console.log(data)
                    res.send({
                        body:{
                            rows:data,
                            size:limit,
                            total:result
                        }
                    })
                }
            })
        }
    })   
})
//=============================================
/*生活name:String,upauthor:String,time:Date,file:String,watch:Number,collect:Number des*/
router.post('/api/life/add',(req,res)=>{
    let data=new models.life({
        name:req.body.name,
        upauthor:req.body.upauthor,
        time:new Date(),
        des:req.body.des,
        file:req.body.file,
    })
    data.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
//文件上传
router.post('/api/life/files/upload', upload.single('fabricImage'), function (req, res, next) {
    var file = req.file;
    //以下代码得到文件后缀
    name = file.originalname;
    nameArray = name.split('');
    var nameMime = [];
    l = nameArray.pop();
    nameMime.unshift(l);
    while (nameArray.length != 0 && l != '.') {
        l = nameArray.pop();
        nameMime.unshift(l);
    }
    //Mime是文件的后缀
    Mime = nameMime.join('');
    //重命名文件 加上文件后缀
    //fs.renameSync('./upload/' + file.filename, './upload/' + file.filename + Mime);
    fs.renameSync('./upload/' + file.filename, '../static/upload/' + file.filename + Mime);
    var path='/static/upload/' + file.filename + Mime
    res.send(path);
})
//获取电影数据
router.get('/api/life/query',(req,res)=>{
    var offset=parseInt(req.query.offset);
    var limit=parseInt(req.query.limit);
    models.life.find().skip(offset).limit(limit).find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            models.tev.count((err,result)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({
                        body:{
                            rows:data,
                            size:limit,
                            total:result
                        }
                    })
                }
            })
        }
    })   
})
//======================================================
/*新闻 name:String,upauthor:String,time:Date,file:String,watch:Number,collect:Number des*/
router.post('/api/news/add',(req,res)=>{
    let data=new models.news({
        name:req.body.name,
        upauthor:req.body.upauthor,
        time:new Date(),
        des:req.body.des,
        file:req.body.file,
    })
    data.save((err,data)=>{
        if(err){
            res.send(err)
        }else{
            res.send(data)
        }
    })
})
//文件上传
router.post('/api/news/files/upload', upload.single('fabricImage'), function (req, res, next) {
    var file = req.file;
    //以下代码得到文件后缀
    name = file.originalname;
    nameArray = name.split('');
    var nameMime = [];
    l = nameArray.pop();
    nameMime.unshift(l);
    while (nameArray.length != 0 && l != '.') {
        l = nameArray.pop();
        nameMime.unshift(l);
    }
    //Mime是文件的后缀
    Mime = nameMime.join('');
    //重命名文件 加上文件后缀
    //fs.renameSync('./upload/' + file.filename, './upload/' + file.filename + Mime);
    fs.renameSync('./upload/' + file.filename, '../static/upload/' + file.filename + Mime);
    var path='/static/upload/' + file.filename + Mime
    res.send(path);
})
//获取电影数据
router.get('/api/news/query',(req,res)=>{
    var offset=parseInt(req.query.offset);
    var limit=parseInt(req.query.limit);
    models.news.find().skip(offset).limit(limit).find((err,data)=>{
        if(err){
            res.send(err)
        }else{
            models.tev.count((err,result)=>{
                if(err){
                    res.send(err)
                }else{
                    res.send({
                        body:{
                            rows:data,
                            size:limit,
                            total:result
                        }
                    })
                }
            })
        }
    })   
})
module.exports=router;