import http from "http";
import fs from "fs/promises";

const port = 3000;

const server = http.createServer((req, res) => {
  const path = req.url;
  let filename = "";

  if (path === "/") {
    filename = "index.html";
  } else if (path === "/about") {
    filename = "about.html";
  } else if (path === "/contact-me") {
    filename = "contact-me.html";
  } else {
    filename = "404.html";
  }

  const loadHTML = async (filename) => {
    try {
      const data = await fs.readFile(filename, "utf-8");

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(data);
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/plain");
      res.end("Internal Server Error");
    }
  };

  loadHTML(filename);
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
