import fs from "fs";
import http from "http";
import dotenv from "dotenv";
import Busboy from "busboy";
import axios from "axios";
import fetch from "node-fetch";
import { Buffer } from "safe-buffer";

// setup
dotenv.config();

// utility fns
let getDateString = d => `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()} (UTC)`;

// server
const server = http.createServer();

server.on("request", (req, res) => {
  const { url } = req;
  
  const dateString = getDateString(new Date()); 
  console.log(`request for ${url} at ${dateString} by ${req.connection.remoteAddress}`);

  if(url === "/" || url === "/index.html") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    fs.createReadStream("public/index.html", "utf8").pipe(res);
  }
  else if(url === "/style.css") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css");
    fs.createReadStream("public/style.css", "utf8").pipe(res);
  }
  else if(url === "/main.js") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/javascript");
    fs.createReadStream("public/main.js", "utf8").pipe(res);
  }
  else if(url === "/upload") {
    const busboy = new Busboy({ headers: req.headers });

    busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
      const dateString2 = getDateString(new Date());
      console.log(`upload of ${filename} with ${encoding} as ${mimetype} at ${dateString2} by ${req.connection.remoteAddress}`)
      
      file.pipe(fs.createWriteStream("./image.jpg"));
    });

    busboy.on("finish", () => {
      res.statusCode = 303;
      res.setHeader("Connection", "close");
      res.setHeader("Location", "/");
      res.end();


      process.nextTick(() => {
        const f = fs.readFileSync("./image.jpg", "utf8");
        const img = Buffer.from(f).toString("base64");
        const d = {
          requests: [ 
            {
              image: {
                content: img,
              },
              features: [
                {
                  type: "LABEL_DETECTION",
                  maxResults: 10
                }
              ]
            }
          ]
        };

        // axios.post(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.KEY}`, d, {
        //   "Content-Type": "application/json"
        // })
        //   .then(res => {
        //     console.log("send image");
        //   })
        //   .catch(err => {
        //     // console.log(err);      console.log(f);
        //     console.log("ERROR")
        //     fs.writeFileSync("file", err, "utf8");
        //   });

        fetch(`https://vision.googleapis.com/v1/images:annotate?key=${process.env.KEY}`, {
          method: "POST",
          body: d,
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(res => {
            console.log(res);
          })
      });
    });
    
    req.pipe(busboy);
  }
  else {
    console.log(`${url} NOT SATISFIED`);
  }
});

server.on("listening", () => "start");

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", 511);
