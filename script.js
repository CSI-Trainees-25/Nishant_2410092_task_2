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

plus.addEventListener("click", () => {
   popup.style.display = "flex"; 
});

btn.addEventListener("click", () => {
    popup.style.display = "none";    
});

btn.addEventListener("click", () => {
    let name = nameinput.value;
    console.log(name);
        if (!name) {
        alert("Enter task please !!!");
        return;
    }
        let pr1input = selectpr1.value;
    let pr2input = selectpr2.value;
    let dateinp = dateinput.value;


       let item = document.createElement("div");
    item.className = "taskitem";

       let pr1Options = selectpr1.innerHTML;
    let pr2Options = selectpr2.innerHTML;


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
      
        list.appendChild(item);
        
  nameinput.value = "";
    dateinput.value = "";
         selectpr1.selectedIndex = 0;
    selectpr2.selectedIndex = 0;
});