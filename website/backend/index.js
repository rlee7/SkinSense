import fs from "fs";
import http from "http";
import dotenv from "dotenv";
import Busboy from "busboy";
import axios from "axios";

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
  else if(url === "/bundle.css") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/css");
    fs.createReadStream("public/bundle.css", "utf8").pipe(res);
  }
  else if(url === "/bundle.js") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/javascript");
    fs.createReadStream("public/bundle.js", "utf8").pipe(res);
  }
  else if(url === "/bundle.js.map") {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/octet-stream");
    fs.createReadStream("public/bundle.js.map", "utf8").pipe(res);
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

      axios.post("https://vision.googleapis.com/v1/images:annotate", {
        requests: [
          {
            image: {
              content: fs.readFileSync("./image.jpg"),
            },
            features: [
              {
                type: "LABEL_DETECTION",
                maxResults: 10
              }
            ]
          }
        ]
      })
        .then(res => {
          console.log("send image");
        })
        .catch(err => {
          console.log(err);
        });
    });
    
    req.pipe(busboy);
  }
  else if(url === "/api/process") {
    res.setHeader("Content-Type", "text/plain");
    res.write("back", "utf8");
    res.end(" for more", "utf8");
  }
  else {
    console.log("NOT SATISFIED");
  }
});

server.on("listening", () => "start");

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", 511);
