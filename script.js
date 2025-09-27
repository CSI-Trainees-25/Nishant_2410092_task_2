console.log("started");

let plus = document.querySelector(".plus"); 
let list = document.querySelector(".list");
let box = document.querySelector(".box");
let popup = document.querySelector(".popcont"); 
let btn = document.querySelector(".btn button"); 

let nameinput = document.querySelector(".name");
let selectpr1 = document.querySelector("#pr1");
let selectpr2 = document.querySelector("#pr2");
let dateinput = document.querySelector(".date input");

let rightbox = document.querySelector(".bdy");
let leftbox = document.querySelector(".left");

let selected = null;

plus.addEventListener("click", () => {
   popup.style.display = "flex"; 
});
let t=0 ;
btn.addEventListener("click", () => {
    let name = nameinput.value.trim();
    if (!name) {
        alert("Enter task please !!!");
        return;
    }

    let pr1input = selectpr1.value;
    let pr2input = selectpr2.value;
    let dateinp = dateinput.value;

    let item = document.createElement("div");
    item.setAttribute("draggable", "true");
    item.className = "taskitem";

    let pr1Options = selectpr1.innerHTML;
    let pr2Options = selectpr2.innerHTML;
{
    item.innerHTML = `
        <div class="t">Task::: ${name}</div>
        
        <div class="bflex">
            <div>
                <label>Progress::</label>
                <select>${pr1Options}</select>
            </div>
            <div>
                <label>Level::</label>
                <select>${pr2Options}</select>
            </div>
        </div>
         
        <div class="due">
            <label>Due Date:</label>
            <input type="date" value="${dateinp}">
        </div>
    
    `;
    t++ ;
  }

    item.addEventListener("dragstart", (e) => {
        selected = e.target;
    });
  

    list.appendChild(item);

    nameinput.value = "";
    dateinput.value = "";
    selectpr1.selectedIndex = 0;
    selectpr2.selectedIndex = 0;

    popup.style.display = "none"; 
    savedata() ;
});
let timer =false; 
rightbox.addEventListener("dragover", (e) => {
  e.preventDefault();
});
rightbox.addEventListener("drop", (e) => {
  if (selected) {
    rightbox.appendChild(selected);

    if (!selected.querySelector(".stime")) {
        let timebox = document.createElement("div");
          timebox.innerHTML=`<div class="stime">set timer</div>` ;
        selected.appendChild(timebox); 
    }
    savedata() ;
    selected = null;
  }
});

leftbox.addEventListener("dragover", (e) => {
  e.preventDefault();
});
leftbox.addEventListener("drop", (e) => {
  if (selected) {
    leftbox.appendChild(selected);
    let st = selected.querySelector(".stime");
    if (st) st.remove();

    timer = false;
    savedata();
    selected = null;
  }
});



function savedata(){
  let allData = {
    left: leftbox.innerHTML,
    right: rightbox.innerHTML
  };
  localStorage.setItem("data", allData);
}


document.addEventListener("click", (e) => {
  if (e.target.classList.contains("stime")) {
    let minutes = prompt("Enter minutes for timer:");
    if (!minutes || isNaN(minutes)) return;

    let remaining = minutes * 60;
    e.target.textContent = ` ${minutes} min left`;

    let timer = setInterval(() => {
      remaining--;
      let mins = Math.floor(remaining / 60);
      let secs = remaining % 60;
      e.target.textContent = ` ${mins}:${secs.toString().padStart(2, "0")} left`;

      if (remaining <= 0) {
        clearInterval(timer);
        e.target.textContent = " Time's up!";
      }
    }, 1000);
  }
});

let counti=document.querySelector("#noft");
counti.innerHTML=`${l}task`;