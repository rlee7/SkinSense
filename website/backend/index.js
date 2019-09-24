import fs from "fs";
import http from "http";
import dotenv from "dotenv";

dotenv.config();

const server = http.createServer();

server.on("request", (req, res) => {
  const { url } = req;
  
  const d = new Date();
  const dateString = `${d.getFullYear()}/${d.getMonth()}/${d.getDate()} ${d.getUTCHours()}:${d.getUTCMinutes()}:${d.getUTCSeconds()} (UTC)`
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
  else if(url === "/api/process") {
    console.log("crap");
    res.setHeader("Content-Type", "text/plain");
    res.write("back", "utf8");
    res.end(" for more", "utf8");
  }
});

server.on("listening", () => "start");

const port = process.env.PORT || 3000;
server.listen(port, "0.0.0.0", 511);
