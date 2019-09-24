import "./style.css"

const btn = document.querySelector("button");
const input = document.querySelector("input");

btn.addEventListener("click", () => input.click());
input.addEventListener("change", e => {
  e.preventDefault();

  const formData = (() => {
    const fileList = input.files[0];

    const fd = new FormData();
    fd.append("file", fileList);
    return fd;
  })();

  fetch("/upload", {
    method: "POST",
    body: formData
  })
    .then(res => {
      console.log(res);
    })

}, false);
