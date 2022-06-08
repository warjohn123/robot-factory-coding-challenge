// server.js
const jsonServer = require("json-server");
const jsonfile = require("jsonfile");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

// Add custom routes before JSON Server router
server.post("/robots/:id/extinguish", (req, res) => {
  const { body } = req;
  console.log("body test", body);
  jsonfile.readFile("db.json", function (err, obj) {
    let fileObj = obj;
    let { robots } = fileObj;

    let robotIndex = robots.findIndex((robot) => robot.id === body.id);
    if (robotIndex !== -1) robots[robotIndex].statuses = body.statuses;

    fileObj.robots = robots;

    jsonfile.writeFile("db.json", fileObj, function (err) {
      if (err) throw err;

      console.log("body", body);
      res.json(fileObj.robots);
    });
  });
});

server.post("/robots/recycle", (req, res) => {
  const { body } = req;
  const { recycleRobots } = body;

  if (recycleRobots.length) {
    jsonfile.readFile("db.json", function (err, obj) {
      let fileObj = obj;
      let { robots } = fileObj;
      console.log("shipment robots", recycleRobots);
      robots = robots.filter((robot) => {
        if (!recycleRobots.includes(robot.id)) {
          return robot;
        }
      });

      fileObj.robots = robots;

      // Write the modified obj to the file
      jsonfile.writeFile("db.json", fileObj, function (err) {
        if (err) throw err;

        console.log("body", body);
        res.json(fileObj.robots);
      });
    });
  }
});

server.put("/shipments/create", (req, res) => {
  const { body } = req;
  const { shipmentRobots } = body;

  if (shipmentRobots.length) {
    jsonfile.readFile("db.json", function (err, obj) {
      let fileObj = obj;
      let { robots } = fileObj;
      console.log("shipment robots", shipmentRobots);
      robots = robots.filter((robot) => {
        if (!shipmentRobots.includes(robot.id)) {
          return robot;
        }
      });

      fileObj.robots = robots;

      // Write the modified obj to the file
      jsonfile.writeFile("db.json", fileObj, function (err) {
        if (err) throw err;

        console.log("body", body);
        res.json(fileObj.robots);
      });
    });
  }
});
server.use((req, res, next) => {
  // Continue to JSON Server router
  next();
});

server.use(router);
server.listen(3001, () => {
  console.log("JSON Server is running");
});
