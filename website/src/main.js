import "./style.css";

const btn = document.querySelector("button");
const input = document.querySelector("input");
console.log(btn);

btn.addEventListener("click", () => input.click());

input.addEventListener("change", () => {
  const fileList = document.querySelector("input").files[0];
  console.log(fileList);
}, false);
