"use strict"
//Dark Mode Toggle
let dark=document.getElementById('toggle');
dark.addEventListener('click',function(){
    document.body.classList.toggle('dark-body');
    document.querySelector('h1').classList.toggle('dark-body');
    document.querySelector('.info').classList.toggle('dark-info');
    document.querySelector('.toggle').classList.toggle('dark-button');
})