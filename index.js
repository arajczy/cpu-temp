const fs = require("fs");
const { hostname } = require("os");
const port = process.env.PORT || 3000;

const server = require("http")
  .createServer((req, res) => {
    fs.readFile("/sys/class/thermal/thermal_zone0/temp", "UTF-8", (err, text) => {
      const cpu = { device: hostname(), temp: `${Math.round(Number(text) / 100) / 10}°C` };
      res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
      res.end(JSON.stringify(cpu));
    });
  })
  .listen(port, () => console.log(`Server running on port ${port}`));
