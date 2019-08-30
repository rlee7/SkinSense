import "./style.css";

const btn = document.querySelector("button");
const inpt = document.querySelector("input");
console.log(btn);

btn.addEventListener("click", e => {
  inpt.click();
});

btn.addEventListener("dragenter", e => {
  e.stopPropagation();
  e.preventDefault();
  btn.classList.toggle("expanded");
  e.dataTransfer.dropEffect = "copy";
});

btn.addEventListener("dragover", e => {
  e.stopPropagation();
  e.preventDefault();
  let data = e.dataTransfer.getData("text/plain");
  console.log(data);
});

btn.addEventListener("dragleave", e => {
  btn.classList.toggle("expanded");
});

btn.addEventListener("drop", e => {
  btn.classList.toggle("expanded");
  e.stopPropagation();
  e.preventDefault();

  const dt = e.dataTransfer.files;

  console.log(dt);
});



