const express=require('express');
const cors=require('cors');
const app= express();
const PORT =8000;
let ejs=require('ejs');
const mongoose=require('mongoose')

app.use("/static", express.static('./static/'))
app.set('view engine','ejs');
const uri="mongodb+srv://mridultiwar:mridultiwari@cluster0.ub68a.mongodb.net/SearchBAckend?retryWrites=true&w=majority";
mongoose.connect(uri);

const savageSchema={
    Name:String,
    Description:String,
    Birthday:String,
    Alternative_Name:String,
    Backstory:String,
    Anime_OR_Manga:String,
}


const Savage=mongoose.model('savages',savageSchema)

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/gets',function(req,res,next){
    Savage.find({Name:req.body.Name}, function(err,data){
        res.render('info',{
            Content:data
        })
    })
})

app.post('/posts',function(req,res,next){
    let post =new Savage({
        Name:req.body.Name,
        Description:req.body.Description,
        Birthday:req.body.Birthday,
        Alternative_Name:req.body.Alternative_Name,
        Backstory:req.body.Backstory,
        Anime_OR_Manga:req.body.Anime_OR_Manga,
    })
    post.save(function(err,post){
        console.log('result posted')
    })
    res.redirect('/')
})

app.get('/',(request,response)=>{
response.sendFile(__dirname + '/anime.html')
})


app.listen(PORT, ()=>{
console.log(`server running on port ${PORT}`)
})
