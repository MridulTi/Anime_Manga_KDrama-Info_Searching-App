"use strict"
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
 
})
//Event Listener For Enter Keydown
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
//Event Listener for when clicked
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
//function for Gettng basic info
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
        })
        .catch(err=>{`error ${err}`});
}
//function that Gets Anime information
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
//function that Gets KDrama information
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
//function that Gets Manga information
function GetManga(){
    document.querySelector('ul').innerHTML="";
    let search=document.querySelector('input').value;
    let url=`https://api.jikan.moe/v3/search/manga?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            document.querySelector('img').src=data.results[0].image_url;
            document.querySelector('h2').textContent=data.results[0].title;
            document.querySelector('h3').textContent=data.results[0].synopsis;
            document.querySelector('h4').textContent='Rated: '+data.results[0].rated;
            document.getElementById('type').textContent='Type: '+data.results[0].type;
        })
        .catch(err=>{`error ${err}`});
}
//function that Gets Anime Character information
function GetCharacter(){
    document.querySelector('ul').innerHTML="";
    let search=document.querySelector('input').value;
    let url=`https://api.jikan.moe/v3/search/character?q=${search}`;
    fetch(url)
        .then(res => res.json())
        .then(data =>{
            document.querySelector('img').src=data.results[0].image_url;
            document.querySelector('h2').textContent=data.results[0].name;
            document.querySelector('h3').textContent="";
            document.querySelector('h4').textContent=data.results[0].manga[0].name;
            document.getElementById('type').textContent='Type: '+data.results[0].anime[0].type;
        })
        .catch(err=>{`error ${err}`});
}
//function that Gets information from search IMDB and Wikipedia Engine
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

            if(document.querySelectorAll("li").length>=1){
                //console.log('hello');
                let lis=document.querySelectorAll('li');
                let ul= document.querySelector('ul');
                let i=0;
                document.querySelector('ul').innerHTML="";
            }
            let i=0;
            data[1].forEach(object=>{
                let li=document.createElement('li');
                let ul=document.querySelector('ul');
                let a =document.createElement('a');
                a.href=`${data[3][i]}`;
                a.target='_blank';
                a.class="content";
                a.rel='noopener noreferrer';
                a.textContent+=object;
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
            if(document.querySelectorAll("li").length>=1){
                let lis=document.querySelectorAll('li');
                let ul= document.querySelector('ul');
                let i=0;
                document.querySelector('ul').innerHTML="";
            }
            let i=0;
            data.results.forEach(object=>{
                let id=object.id;
                let urrl=`https://imdb-api.com/en/API/Trailer/k_w1v4f9bx/${id}`;
                fetch(urrl)
                    .then(res=>res.json())
                    .then(data=>{

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
                            li.appendChild(a);
                            ul.appendChild(li);
                        }
                        
                    })
            })
        })
            .catch(err=>{`error ${err}`});
}
//Function that postor get API info from the cloud
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
