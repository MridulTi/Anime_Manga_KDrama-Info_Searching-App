const mongoose = require("mongoose");
// Replace the uri string with your MongoDB deployment's connection string.
const url ='mongodb+srv://mridultiwar:mridultiwari@cluster0.ub68a.mongodb.net/SearchBAckend?retryWrites=true&w=majority';
  //"mongodb+srv://mridultiwar:mridultiwari@https://data.mongodb-api.com/app/data-ezllk/endpoint/data/beta?retryWrites=true&writeConcern=majority";
mongoose.connect(url)
const savageSchema=new mongoose.Schema({
    Name:String,
    Description:String,
    Birthday:String,
    Alternative_Name:String,
    Backstory:String,
    Anime_OR_Manga:String,
})
const Savage=mongoose.model('savages',savageSchema)
const savage=new Savage({
    Name :"Izuku",
    Description: "Izuku 'Deku' Midoriya is the main protagonist of the manga and anime My Hero Academia and is in Class 1-A at U.A. High School.",
    Birthday: "July 15,2010 Cancer",
    Alternative_Name: "Deku",
    Backstory: "In a world where most humans on the planet develop superpowers soon after they're born, a boy named Izuku Midoriya was one of the few who never developed any powers. As a child, Izuku dreamed to become a superhero like his idol, All Might, after he developed his power, or 'Quirk'. As such, he was devastated once he learned that he'd never get a quirk. His lack of a Quirk made him a prime target for bullying, but Izuku still wanted to be a hero, and planned to go to the prestigious U.A. hero academy. Ten months before the entrance exams for U.A. started, Izuku came face to face with All Might after he was saved from a villain by him. Izuku asked All Might if it was possible for someone without a quirk to be a hero, but he responded by telling him that he needed realistic dreams. Soon after, the same villain from before ended up breaking free and attacking one of Izuku classmates. Despite not having a quirk, Izuku still tried to save his classmate. While he didn't stop the villain, he did give All Might enough time to defeat them himself. After this, All Might decided that Izuku had the potential to become a hero, with his help. He decided that he would grant Izuku his own Quirk to help him achieve his dreams. After ten months of training, All Might passed his Quirk, One For All, down to Izuku. Izuku then managed to pass the entrance exam, and officially enrolled in U.A, taking on the Hero name 'Deku",
    Anime_OR_Manga: "Boku No Hero Academia"
})

savage.save().then(result=>{
    console.log('savage Saved');
    mongoose.connection.close();
})