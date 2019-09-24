import "./style.css";

const btn = document.querySelector("button");
const input = document.querySelector("input");

btn.addEventListener("click", () => input.click());
input.addEventListener("click", () => {
  const fileList = document.querySelector("input").files[0];
  console.log(fileList);

  window.fetch("/api/process", {
    method: "GET"
  }, )
    .then(res => {
      console.log("test");
    })
}, false);
