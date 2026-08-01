// =========================
// Elite Squash Academy
// script.js
// =========================

// ---------- Smooth Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});

// ---------- Navbar Shadow ----------
const navbar = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (window.scrollY > 40) {

        navbar.style.background = "rgba(10,10,10,.92)";
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,.4)";

    } else {

        navbar.style.background = "rgba(10,10,10,.45)";
        navbar.style.boxShadow = "none";

    }

});

// ---------- Registration Form ----------

const form = document.getElementById("registrationForm");

if(form){

form.addEventListener("submit", async function(e){

e.preventDefault();

const name=document.getElementById("name").value.trim();
const age=document.getElementById("age").value.trim();
const phone=document.getElementById("phone").value.trim();

if(name.length<3){
alert("Please enter your full name.");
return;
}

if(age<4 || age>80){
alert("Please enter a valid age.");
return;
}

if(!/^[0-9]{10}$/.test(phone)){
alert("Enter a valid 10 digit phone number.");
return;
}

const button=form.querySelector("button");

button.disabled=true;
button.innerHTML="Submitting...";

const data={
name:name,
age:age,
phone:phone
};

try{

const response=await fetch("https://script.google.com/macros/s/AKfycbzgR0vS7McEQufNmuwpsiKsyy9qXcwUa_FLgXCEefJ5q2c3vaPcZ6Qs3SFXGT8NTaQ_tw/exec",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify(data)

});

if(response.ok){

showSuccess();

form.reset();

}else{

alert("Submission failed.");

}

}catch(error){

console.log(error);

alert("Unable to connect.");

}

button.disabled=false;

button.innerHTML="Register Now";

});

}

// ---------- Success Popup ----------

function showSuccess(){

let popup=document.createElement("div");

popup.innerHTML=`

<div class="success-overlay">

<div class="success-box">

<h2>🏸 Registration Successful</h2>

<p>

Thank you for registering with

<strong>Elite Squash Academy</strong>

</p>

<p>

We'll contact you shortly.

</p>

<button id="closePopup">

Close

</button>

</div>

</div>

`;

document.body.appendChild(popup);

document.getElementById("closePopup").onclick=()=>{

popup.remove();

};

}

// ---------- Fade In Animation ----------

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:.15
});

document.querySelectorAll("section,.card,.batch-box").forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});

// ---------- Back To Top ----------

const topBtn=document.createElement("button");

topBtn.innerHTML="↑";

topBtn.id="topBtn";

document.body.appendChild(topBtn);

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

window.addEventListener("scroll",()=>{

topBtn.style.display=window.scrollY>400?"flex":"none";

});

// ---------- Progress Bar ----------

const progress=document.createElement("div");

progress.id="progressBar";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const total=document.documentElement.scrollHeight-window.innerHeight;

const progressWidth=(window.scrollY/total)*100;

progress.style.width=progressWidth+"%";

});

// ---------- Active Nav ----------

const sections=document.querySelectorAll("section");

const navLinks=document.querySelectorAll(".nav-links a");

window.addEventListener("scroll",()=>{

let current="";

sections.forEach(section=>{

const top=section.offsetTop-120;

if(window.scrollY>=top){

current=section.getAttribute("id");

}

});

navLinks.forEach(link=>{

link.classList.remove("active");

if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});

});
