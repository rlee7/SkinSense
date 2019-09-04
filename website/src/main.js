import "./style.css";

const btn = document.getElementById("drop");
const tryItBtn = document.getElementById("try-it");
const input = document.querySelector("input");
console.log(btn);

btn.addEventListener("click", e => {
  input.click();
});
input.addEventListener("change", () => {
  const fileList = document.querySelector("input").files[0];
  console.log(fileList);
}, false);

btn.addEventListener("dragenter", e => {
  e.stopPropagation();
  e.preventDefault();
  document.getElementById("drop").classList.toggle("expanded");
});

btn.addEventListener("dragover", e => {
  e.stopPropagation();
  e.preventDefault();
});


btn.addEventListener("drop", e => {
  btn.classList.toggle("expanded");
  e.stopPropagation();
  e.preventDefault();

  let dt = e.dataTransfer.files[0];
  let fr = new FileReader()
  dt = fr.readAsText(dt);
  console.log(dt);
});

btn.addEventListener("dragleave", e => {
  btn.classList.toggle("expanded");
});


let tryItBtnFn = () => {
  tryItBtn.removeEventListener("click", tryItBtnFn);
  document.getElementById("example").classList.add("hide");
  
  setTimeout(() => {
    document.getElementById("upload").classList.add("show");
  }, 100)
}
tryItBtn.addEventListener("click", tryItBtnFn);
