console.log("started");

let plus = document.querySelector(".plus"); 
let list = document.querySelector(".list");
let box = document.querySelector(".box");
let popup = document.querySelector(".popcont"); 
let btn = document.querySelector(".btn button"); // <-- target the button only

plus.addEventListener("click", () => {
   popup.style.display = "flex"; 
});

btn.addEventListener("click", () => {
    let newBox = document.createElement("div");
    newBox.classList.add("box");    
    newBox.innerHTML = box.innerHTML;  
    list.appendChild(newBox);
    popup.style.display = "none";    
});
