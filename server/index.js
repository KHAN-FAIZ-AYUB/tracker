const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
var cors = require('cors');
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== "production"; //true false
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler(); //part of next config
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const notificationRoutes = require("./routes/notificationRoutes");


nextApp.prepare().then(() => {
  const db = mongoose.connect(
    process.env.DB_URI
  );
  const app = express();
  app.use(cors());
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  app.use("/api/user", userRoutes);
  app.use("/api/notification", notificationRoutes);

  app.get("*", (req, res) => {
    return handle(req, res);
  });
  app.listen(PORT, (err) => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});
