const express=require('express');
const cors=require('cors');
const app= express();
const PORT =8000;
let ejs=require('ejs');
const mongoose=require('mongoose')
//const{MongoClient}=require('mongodb');
//let people=[]
//mongodb+srv://mridultiwar:mridultiwari@cluster0.ub68a.mongodb.net/Search BAckend?retryWrites=true&w=majority
//app.use(cors)
app.use("/static", express.static('./static/'))
let savage=[
    {		
        	id:2,
        	content:{
        		"Name":"Katsuki Bakugo",
        		"Description": "Izuku 'Deku' Midoriya is the main protagonist of the manga and anime My Hero Academia and is in Class 1-A at U.A. High School.",
            	"Birthday": "July 15,2010(Cancer)",
            	"Alternative_Name": "Kacchan",
            	"Backstory": "In a world where most humans on the planet develop superpowers soon after they're born, a boy named Izuku Midoriya was one of the few who never developed any powers. As a child, Izuku dreamed to become a superhero like his idol, All Might, after he developed his power, or 'Quirk'. As such, he was devastated once he learned that he'd never get a quirk. His lack of a Quirk made him a prime target for bullying, but Izuku still wanted to be a hero, and planned to go to the prestigious U.A. hero academy. Ten months before the entrance exams for U.A. started, Izuku came face to face with All Might after he was saved from a villain by him. Izuku asked All Might if it was possible for someone without a quirk to be a hero, but he responded by telling him that he needed realistic dreams. Soon after, the same villain from before ended up breaking free and attacking one of Izuku classmates. Despite not having a quirk, Izuku still tried to save his classmate. While he didn't stop the villain, he did give All Might enough time to defeat them himself. After this, All Might decided that Izuku had the potential to become a hero, with his help. He decided that he would grant Izuku his own Quirk to help him achieve his dreams. After ten months of training, All Might passed his Quirk, One For All, down to Izuku. Izuku then managed to pass the entrance exam, and officially enrolled in U.A, taking on the Hero name 'Deku",
            	"Anime/Manga": "Boku No Hero Academia"
        	}
            
    },
]
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
// const client=new MongoClient(uri)
// MongoClient.connect(uri);
//let content=document.getElementById('addedinfo');
// app.get('/view',function(req,res){
// 	db.serialize(()=>{
// 		db.run()
// 	})
// });

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
//app.get('/info',function(req,res){
    //main()
  //  res.render('info.ejs',{info:"name"})
//})
async function main(){
        try{
            await client.connect();
            await findOnebyName(client,"Ochaco Uraraka");
        // await createListing(client,{
        //  name:"Ochaco Uraraka",
        //  AlternateName: "Uravity"
        // });//content);

        }catch(err){
            console.error(err);
        }finally{
            await client.close();
        }

    async function findOnebyName(client,nameofListing){
        const result=await client.db("SearchBAckend").collection("savage").findOne({name: nameofListing});
        if(result){
            
            console.log(result);
        }else{
            console.log(`No listing found with the name: ${nameofListing}`);
        }

    }


    async function createListing(client,newlisting){
        const result= await client.db("SearchBAckend").collection("savages").insertOne(newlisting );
        console.log(`New listing created at id: ${result.insertedId}`)
    }
0
    async function listDatabases(client){
        const databaseslist= await client.db().admin().listDatabases();
        console.log("Databases: ");
        databaseslist.databases.forEach(db=>{
        console.log(`-${db.name}`);
        })
    }
    //let items=JSON.parse(file);
}
    


// // sav.save().then(result=>{
// //     console.log('sav Saved');
// mongoose.connection.close();
// // })
app.get('/',(request,response)=>{
response.sendFile(__dirname + '/anime.html')
})
// app.get('/info',(request,response)=>{
//     console.log(db.collection('savage').find().toArray());
//  	then(data=>{
//         response.render('info.ejs',{info:data})
//     })
//  	.catch(error=>console.error(error));
// })
	// const id=request.params.id;
	// console.log(id);
	// const savages=savage.find(savage=>savage.id==id);
	// console.log(savages);
	// response.json(savages);
//app.use(express.json())
// app.post('/addInfo',(request,response,next)=>{
// 	const body=request.body;
// 	const savage=new Savage({
// 		content:{
// 			body.content
// 		}
// 	})
// 	savage.save().then(savedNote=>{
// 			response.json(savedNote)
// 		})
// 		.catch(err=> next(err))
// })
// app.get('/',(request,response)=>{
// 	//response.sendFile(__dirname + '/animecharacter.yaml')
// 	let file=request.open('GET', 'animecharacter.json');
// 	let items=JSON.parse(file);
// 	console.log(items);
// 			// var output = "<ul>";
// 			// for(var key in items){
// 			// 	output += "<li>" + items[key].bio + "</li>";
// 			// }
// 			// output += "</ul>";
// 			// document.getElementById("update").innerHTML = output;
		
// 	});
	//request.send();

app.listen(PORT, ()=>{
console.log(`server running on port ${PORT}`)
})
