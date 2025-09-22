console.log("started");

let plus = document.querySelector(".plus"); // target correct button
let list = document.querySelector(".list");
let box = document.querySelector(".box");

plus.addEventListener("click", () => {
  let newBox = box.cloneNode(true); 
  list.appendChild(newBox);
});
