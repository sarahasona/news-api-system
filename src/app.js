//npm init -y 
//npm i express
const express = require('express')
const app = express();
//set port 
const port = process.env.PORT || 3000;
//path
const path = require('path');
//define public path
const publicPath = path.join(__dirname,'../public');
app.use(express.static(publicPath))
//npm i hbs
const hbs = require('hbs');
//define view engine ==> hbs
app.set('view engine', 'hbs');
//define path of views 
const viewsPath = path.join(__dirname,'../templates/views')
app.set('views',viewsPath);
//define path of partial
const partialViewPath = path.join(__dirname,'../templates/partialviews');
hbs.registerPartials(partialViewPath);
const newsData = require('./tools/news')
app.get('/',(req,res)=>{
    newsData('',(error,data)=>{
        if(error){
            return res.render('index',{error})
        }
        // console.log(data)
        res.render('index',{data})
    })    
})
app.get('/news',(req,res)=>{
    if(!req.query.author){
        return res.render({
          error:'plz provide author'
        })
    }
    newsData(req.query.author,(error,data)=>{
        if(error){
            return res.send({error})
        }
        // console.log(data)
        res.send({data})
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'News Api',
        author:'Brandon Peterson Founder at Capitol Call'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        title:'error 404',
        msg:'error page do not exist'
    })
})
app.listen(port,()=>{
    console.log(`app listinig at port ${port}`)
})