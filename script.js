// =======================================
// Elite Squash Academy - script.js
// =======================================

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

// ---------- Navbar Effect ----------
const navbar = document.querySelector("header");

window.addEventListener("scroll", () => {

    if (!navbar) return;

    if (window.scrollY > 50) {
        navbar.style.background = "rgba(0,0,0,0.92)";
        navbar.style.boxShadow = "0 10px 25px rgba(0,0,0,.35)";
    } else {
        navbar.style.background = "rgba(0,0,0,.45)";
        navbar.style.boxShadow = "none";
    }

});

// =======================================
// Registration Form
// =======================================

const form = document.getElementById("registrationForm");

if (form) {

form.addEventListener("submit", async function(e){

    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const phone = document.getElementById("phone").value.trim();

    if(name.length < 3){
        alert("Please enter your full name.");
        return;
    }

    if(age === "" || Number(age) < 4 || Number(age) > 80){
        alert("Please enter a valid age.");
        return;
    }

    if(!/^[0-9]{10}$/.test(phone)){
        alert("Please enter a valid 10 digit phone number.");
        return;
    }

    const button = form.querySelector("button");

    button.disabled = true;
    button.innerHTML = "Submitting...";

    try{

        const formData = new FormData();

        formData.append("name", name);
        formData.append("age", age);
        formData.append("phone", phone);

        const response = await fetch(
            "https://script.google.com/macros/s/AKfycbzgR0vS7McEQufNmuwpsiKsyy9qXcwUa_FLgXCEefJ5q2c3vaPcZ6Qs3SFXGT8NTaQ_tw/exec",
            {
                method: "POST",
                body: formData
            }
        );

        if(response.ok){

            showSuccess();

            form.reset();

        }else{

            alert("Submission failed.");

        }

    }
    catch(error){

        console.error(error);

        alert("Unable to connect.");

    }

    button.disabled = false;
    button.innerHTML = "Register Now";

});

}

// =======================================
// Success Popup
// =======================================

function showSuccess(){

const popup=document.createElement("div");

popup.innerHTML=`

<div class="success-overlay">

<div class="success-box">

<h2>🏸 Registration Successful!</h2>

<p>Thank you for registering.</p>

<p>We'll contact you shortly.</p>

<button id="closePopup">

Close

</button>

</div>

</div>

`;

document.body.appendChild(popup);

document.getElementById("closePopup").onclick=function(){

popup.remove();

};

}

// =======================================
// Fade Animation
// =======================================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});

document.querySelectorAll("section,.card,.batch-box").forEach(el=>{

el.classList.add("hidden");

observer.observe(el);

});

// =======================================
// Back To Top Button
// =======================================

const topBtn=document.createElement("button");

topBtn.id="topBtn";

topBtn.innerHTML="↑";

document.body.appendChild(topBtn);

topBtn.onclick=function(){

window.scrollTo({

top:0,

behavior:"smooth"

});

};

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

topBtn.style.display="flex";

}else{

topBtn.style.display="none";

}

});

// =======================================
// Scroll Progress Bar
// =======================================

const progress=document.createElement("div");

progress.id="progressBar";

document.body.appendChild(progress);

window.addEventListener("scroll",()=>{

const total=document.documentElement.scrollHeight-window.innerHeight;

const percent=(window.scrollY/total)*100;

progress.style.width=percent+"%";

});

// =======================================
// Active Navigation
// =======================================

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
