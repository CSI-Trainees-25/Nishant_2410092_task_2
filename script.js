console.log("started");

let plus = document.querySelector(".plus"); 
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

    item.innerHTML = `
        <div class="t">Task::: ${name}</div>
        <div class="bflex">
            <div>
                <label>Progress::</label>
                <select>
                    <option selected>${pr1input}</option>
                </select>
            </div>
            <div>
                <label>Level::</label>
                <select>
                    <option selected>${pr2input}</option>
                </select>
            </div>
        </div>
        <div class="due">
            <label>Due Date:</label>
            <input type="date" value="${dateinp}">
            <span class="del">delete</span>
        </div>
    `;

    item.addEventListener("dragstart", (e) => {
        selected = e.target;
    });

    leftbox.appendChild(item);

    nameinput.value = "";
    dateinput.value = "";

    popup.style.display = "none"; 
    savedata();
});

rightbox.addEventListener("dragover", (e) => {
  e.preventDefault();
});
rightbox.addEventListener("drop", (e) => {
  if (selected) {
    rightbox.appendChild(selected);
    if (!selected.querySelector(".stime")) {
        let timebox = document.createElement("div");
        timebox.innerHTML=`<span class="stime">Set Timer</span>`;
        selected.appendChild(timebox); 
    }
    savedata();
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
    savedata();
    selected = null;
  }
});


let boxy=[leftbox, rightbox];
boxy.forEach(box => {
  box.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
      let t = e.target.closest(".taskitem");
      t.remove();
      savedata();
    }
  });
});

function savedata(){
  localStorage.setItem("leftbox", leftbox.innerHTML);
  localStorage.setItem("rightbox", rightbox.innerHTML);
}

const poptimer = document.querySelector(".poptimer");
const hoursInput = document.querySelector(".hours");
const minutesInput = document.querySelector(".minutes");
const secondsInput = document.querySelector(".seconds");
const [startBtn, closeBtn, resetBtn] = document.querySelectorAll(".b button");

let timerInterval;

rightbox.addEventListener("click", (e) => {
  if (e.target.classList.contains("stime")) {
    poptimer.style.display = "flex";
  }
});

function startTimer() {
  clearInterval(timerInterval);

  let h = hoursInput.value ? Number(hoursInput.value) : 0;
  let m = minutesInput.value ? Number(minutesInput.value) : 0;
  let s = secondsInput.value ? Number(secondsInput.value) : 0;

  let totalSeconds = h * 3600 + m * 60 + s;

  if (totalSeconds <= 0) {
    alert("Please set a valid time!");
    return;
  }

  timerInterval = setInterval(() => {
    if (totalSeconds <= 0) {
      clearInterval(timerInterval);
      alert("Time’s up!");
      return;
    }

    totalSeconds--;

    let hrs = Math.floor(totalSeconds / 3600);
    let mins = Math.floor((totalSeconds % 3600) / 60);
    let secs = totalSeconds % 60;

    hoursInput.value = hrs < 10 ? "0" + hrs : hrs;
    minutesInput.value = mins < 10 ? "0" + mins : mins;
    secondsInput.value = secs < 10 ? "0" + secs : secs;
  }, 1000);
}

startBtn.addEventListener("click", startTimer);

function resetTimer() {
  clearInterval(timerInterval);
  hoursInput.value = "00";
  minutesInput.value = "00";
  secondsInput.value = "00";
}
resetBtn.addEventListener("click", resetTimer);

function closePopup() {
  clearInterval(timerInterval);
  poptimer.style.display = "none";
}
closeBtn.addEventListener("click", closePopup);

window.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("leftbox")) {
    leftbox.innerHTML = localStorage.getItem("leftbox");
  }
  if (localStorage.getItem("rightbox")) {
    rightbox.innerHTML = localStorage.getItem("rightbox");
  }

  document.querySelectorAll(".taskitem").forEach(item => {
    item.addEventListener("dragstart", (e) => {
      selected = e.target;
    });
  });
});

//  localStorage.clear()