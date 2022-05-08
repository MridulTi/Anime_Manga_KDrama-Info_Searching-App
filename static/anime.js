"use strict"
//const {MongoClient}=require('mongodb');
let enter=document.getElementById('enter');
let ent=document.getElementById('ent');
enter.addEventListener("click" , getF);
let sel=document.getElementById('selection');

//Dark Mode Toggle
let dark=document.getElementById('toggle');
dark.addEventListener('click',function(){
    document.body.classList.toggle('dark-body');
    document.querySelector('h1').classList.toggle('dark-body');
    document.querySelector('.ent').classList.toggle('dark-srch');
    document.querySelector('.info').classList.toggle('dark-info');
    document.querySelector('.selection').classList.toggle('dark-button');
    document.querySelector('.toggle').classList.toggle('dark-button');
    document.querySelector('.enter').classList.toggle('dark-button');
    document.querySelector('.site').classList.toggle('dark-button');
    //document.querySelector('a href').classList.toggle('dark-link');

    //document.getElementById('info').classList.toggle('dark-body');
})
document.addEventListener('keydown',function(event){
    if(event.keyCode==13){
            if(sel.value==1){
                getAnime();
            }else if(sel.value==2){
                GetManga();
            }else if(sel.value==3){
                getKdrama();
            }
            else if(sel.value==4){
                //GetCharacter();
                File();
            }
            else if(sel.value==5){
                getGoogle();
            }

    }
});
ent.addEventListener("click" ,function(){
    if(sel.value==1){
        getAnime();
    }else if(sel.value==2){
        GetManga();
    }else if(sel.value==3){
        getKdrama();
    }
    else if(sel.value==4){
        //GetCharacter();
        File()
    }
    else if(sel.value==5){
        getGoogle();
    }
    else if(sel.value==6){
        getTweets();
    }

});
function getF(){
    document.querySelector('ul').innerHTML="";
    let url='https://animechan.vercel.app/api/random';
    fetch(url)
        .then(response => response.json())
        .then(data =>{
            document.querySelector('h2').textContent=data.anime;
            document.querySelector('h3').textContent=data.quote;
            document.querySelector('h4').textContent='~By '+data.character;
            document.querySelector('img').src="";
            //console.log(data);
        })
        .catch(err=>{`error ${err}`});
}
function getAnime(){
    document.querySelector('ul').innerHTML="";
    let search=document.querySelector('input').value;
    let url=`https://api.jikan.moe/v3/search/anime?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            console.log(data.results[0]);
            document.querySelector('img').src=data.results[0].image_url;
            document.querySelector('h2').textContent=data.results[0].title;
            document.querySelector('h3').textContent=data.results[0].synopsis;
            document.querySelector('h4').textContent='Rated: '+data.results[0].rated;
            document.getElementById('type').textContent='Type: '+data.results[0].type;
        })
        .catch(err=>{`error ${err}`});
}
function getKdrama(){
    document.querySelector('ul').innerHTML="";
    let search=document.querySelector('input').value;
    let url=`https://imdb-api.com/API/AdvancedSearch/k_w1v4f9bx?title=${search}&countries=kr&languages=ko`;
    fetch(url)
        .then(res => res.json())
        .then(data =>{

            console.log(data.results);
            document.querySelector('img').src=data.results[0].image;
            document.querySelector('h2').textContent=data.results[0].title;
            document.querySelector('h3').textContent=data.results[0].plot;
            document.querySelector('h4').textContent='Star-Cast : '+data.results[0].stars;
            document.getElementById('type').textContent='Genres : '+data.results[0].genres;
        })
        .catch(err=>{`error ${err}`});
}
function GetManga(){
    document.querySelector('ul').innerHTML="";
    let search=document.querySelector('input').value;
    let url=`https://api.jikan.moe/v3/search/manga?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            //console.log(data.results);
            document.querySelector('img').src=data.results[0].image_url;
            document.querySelector('h2').textContent=data.results[0].title;
            document.querySelector('h3').textContent=data.results[0].synopsis;
            document.querySelector('h4').textContent='Rated: '+data.results[0].rated;
            document.getElementById('type').textContent='Type: '+data.results[0].type;
        })
        .catch(err=>{`error ${err}`});
}
function GetCharacter(){
    document.querySelector('ul').innerHTML="";
    let search=document.querySelector('input').value;
    let url=`https://api.jikan.moe/v3/search/character?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            //console.log(data.results);
            document.querySelector('img').src=data.results[0].image_url;
            document.querySelector('h2').textContent=data.results[0].name;
            // document.querySelector('h2').textContent=data.results[0].alternative_name;
            document.querySelector('h3').textContent="";
            document.querySelector('h4').textContent=data.results[0].manga[0].name;
            document.getElementById('type').textContent='Type: '+data.results[0].anime[0].type;
        })
        .catch(err=>{`error ${err}`});
}
function getGoogle(){
    document.querySelector('img').src='';
    document.querySelector('h2').textContent='';
    document.querySelector('h3').textContent='';
    document.querySelector('h4').textContent='';
    document.getElementById('type').textContent='';
    let srch=document.querySelector('input').value;
    document.getElementById('choose').innerHTML=`
    <select id="site" class="site">
        <option value=0>IMdb</option>
        <option value=1>Wikipedia</option>
    </select>
    <button id="check">Check</button>`
    document.getElementById('check').addEventListener('click',function(){
        let selle=document.getElementById('site');
        if(selle.value==0){
            getImdb();
        }else if(selle.value==1){
            getwiki();
        }
    })
}
function getwiki(){
    let srch=document.querySelector('input').value;

    var url = "https://en.wikipedia.org/w/api.php"; 

    var params = {
        action: "opensearch",
        search: srch,
        limit: "10",
        namespace: "0",
        format: "json"
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key){url += "&" + key + "=" + params[key];});

    fetch(url)
        .then(response=>response.json())
        .then(data=>{
            // console.log(document.querySelectorAll("li").length);
            //console.log(document.querySelector('ul'));
            if(document.querySelectorAll("li").length>=1){
                //console.log('hello');
                let lis=document.querySelectorAll('li');
                let ul= document.querySelector('ul');
                // console.log(lis.length);
                let i=0;
                // while(lis.length>0){
                    // console.log(ul);
                    // ul.removeChild(lis[i]);
                    // i++;
                // }
                document.querySelector('ul').innerHTML="";
                //console.log(ul==undefined);
            }
            //console.log(data);
            let i=0;
            // console.log(data);
            data[1].forEach(object=>{
                // console.log(object);
                let li=document.createElement('li');
                let ul=document.querySelector('ul');
                let a =document.createElement('a');
                a.href=`${data[3][i]}`;
                a.target='_blank';
                a.class="content";
                a.rel='noopener noreferrer';
                a.textContent+=object;
                //console.log(li);
                li.appendChild(a);
                ul.appendChild(li);
                i++;
            })
            

        })
        .catch(error=> {`error ${error}`});
}
function getImdb(){
    let search=document.querySelector('input').value;
    let url=`https://imdb-api.com/API/AdvancedSearch/k_w1v4f9bx?title=${search}&title_type=video`;
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            //console.log(data);
            if(document.querySelectorAll("li").length>=1){
                //console.log('hello');
                let lis=document.querySelectorAll('li');
                let ul= document.querySelector('ul');
                // console.log(lis.length);
                let i=0;
                // while(lis.length>0){
                    // console.log(ul);
                    // ul.removeChild(lis[i]);
                    // i++;
                // }
                document.querySelector('ul').innerHTML="";
                //console.log(ul==undefined);
            }
            //console.log('hello');
            let i=0;
            // console.log(data);
            data.results.forEach(object=>{
                let id=object.id;
                let urrl=`https://imdb-api.com/en/API/Trailer/k_w1v4f9bx/${id}`;
                fetch(urrl)
                    .then(res=>res.json())
                    .then(data=>{
                        //console.log(data)
                        if(data.link){
                            console.log(data);
                            let li=document.createElement('li');
                            let ul=document.querySelector('ul');
                            let a =document.createElement('a');
                            a.href=`${data.link}`;
                            a.target='_blank';
                            a.class="content";

                            a.rel='noopener noreferrer';
                            a.textContent+=data.fullTitle;
                            // console.log(li);
                            li.appendChild(a);
                            ul.appendChild(li);
                        }
                        
                    })
            })
        })
            .catch(err=>{`error ${err}`});
}
function File(){
    document.getElementById('main').textContent="";
    document.querySelector('img').src='';
    document.querySelector('h2').textContent='';
    document.querySelector('h3').textContent='';
    document.querySelector('h4').textContent='';
    document.getElementById('type').textContent='';
    document.getElementById('choose').innerHTML=`
    <select id="site" class="site">
        <option value=0>Get Info</option>
        <option value=1>Add Info</option>
    </select>
    <button id="check">Check</button>`
    document.getElementById('check').addEventListener('click',function(){
        let selle=document.getElementById('site');
        if(selle.value==0){
            getFile();
        }else if(selle.value==1){
            postFile();
        }
    })
}
function getFile(){
    document.getElementById('addInfo').innerHTML=`
        <form action="/gets" method="POST">
            <input type="text" name="Name" placeholder="Enter Name"/>
            <button class="enter">Submit</button>
        </form>`
}
function postFile(){
    document.getElementById('addInfo').innerHTML=`
        <form action="/posts" method="POST">
            <input type="text" name="Name" placeholder="Name"/>
            <input type="text" name="Description" placeholder="Description"/>
            <input type="text" name="Birthday" placeholder="Birthday"/>
            <input type="text" name="Alternative_Name" placeholder="Alternative Name"/>
            <input type="text" name="Backstory" placeholder="BackStory"/>
            <input type="text" name="Anime_OR_Manga" placeholder="Anime or Manga Name"/>
            <button class="enter">Submit</button>
        </form>`
}
/*function getTweets(){
    let tweet=document.getElementById('tweet');
    tweet.innerHTML=`<select id=sele>
                        <option value=1>Funimation</option>
                        <option value=2>CrunchyRoll</option>
                        <option value=3>Hulu</option>
                    </select>
                    <button id="check">Check</button>`
    let check=document.getElementById('check');
    check.addEventListener('click',function(){
        let sele=document.getElementById('sele');
        if(sele.value==1){
            getFunimation();
        }else if(sele.value==2){
            getCrunchyroll();
        }else if(sele.value==3){
            getHulu();
        }
    });
    
    
}
function getFunimation(){
    console.log('Funimation');
    const url='https://api.twitter.com/2/users/17444764/tweets';
    //const url='https://api.twitter.com/2/users/:177444764/tweets?tweet.fields=created_at&expansions=author_id&user.fields=created_at&max_results=5';
    fetch(url,{
        methid:'GET',
        headers:{'Authorization':'Bearer AAAAAAAAAAAAAAAAAAAAAMY3bwEAAAAAaFbZcdaM088ZROLI%2B%2BtauIY8wuM%3D6jcqFTa0tTAGP2ndRFgLpIzMpPAcVII5zsMa7CMm5Xa3OEcnM0'}
    })

        .then(res =>res.json())
        .then(data =>{
            console.log(data);
             //document.querySelector('img').src=data.results[0].image_url;
            // document.querySelector('h2').textContent=data.character.srch.Description;
            // document.querySelector('h2').textContent='Backstory'+data.character.srch.BAckstory;
            // document.querySelector('h3').textContent='Birthday'+data.character,srch.Birthday;
            // document.querySelector('h4').textContent='Anime/Manga'+data.character.srch.Anime/Manga;
            // document.getElementById('type').textContent='Alternative_Name: '+Alternative_Name;
        })
        .catch(err=>{`error ${err}`})
}
function getCrunchyroll(){
    console.log('CrunchyRoll');
    const url='https://api.twitter.com/2/users/28023330/tweets" -H "Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAMY3bwEAAAAAaFbZcdaM088ZROLI%2B%2BtauIY8wuM%3D6jcqFTa0tTAGP2ndRFgLpIzMpPAcVII5zsMa7CMm5Xa3OEcnM0';
    fetch(url)
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
             //document.querySelector('img').src=data.results[0].image_url;
            // document.querySelector('h2').textContent=data.character.srch.Description;
            // document.querySelector('h2').textContent='Backstory'+data.character.srch.BAckstory;
            // document.querySelector('h3').textContent='Birthday'+data.character,srch.Birthday;
            // document.querySelector('h4').textContent='Anime/Manga'+data.character.srch.Anime/Manga;
            // document.getElementById('type').textContent='Alternative_Name: '+Alternative_Name;
        })
        .catch(err=>{`error ${err}`})

}
function getHulu(){
    console.log('Hulu');
    const url='https://api.twitter.com/2/users/15033883/tweets" -H "Authorization: Bearer AAAAAAAAAAAAAAAAAAAAAMY3bwEAAAAAaFbZcdaM088ZROLI%2B%2BtauIY8wuM%3D6jcqFTa0tTAGP2ndRFgLpIzMpPAcVII5zsMa7CMm5Xa3OEcnM0';
    fetch(url)
        .then(res =>res.json())
        .then(data =>{
            console.log(data);
             //document.querySelector('img').src=data.results[0].image_url;
            // document.querySelector('h2').textContent=data.character.srch.Description;
            // document.querySelector('h2').textContent='Backstory'+data.character.srch.BAckstory;
            // document.querySelector('h3').textContent='Birthday'+data.character,srch.Birthday;
            // document.querySelector('h4').textContent='Anime/Manga'+data.character.srch.Anime/Manga;
            // document.getElementById('type').textContent='Alternative_Name: '+Alternative_Name;
        })
        .catch(err=>{`error ${err}`})

}*/