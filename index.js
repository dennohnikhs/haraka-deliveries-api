const express = require("express");
const connection = require("./database/connection");
const appRouter = require("./v1/routes");
const app = express();
app.use(express.json());
app.use(appRouter);
const port = 5000;
app.get("/", (req, res) => {
  res.send("server started");
});
connection;
app.listen(port, () => {
  console.log(`server listening on port ${port}`);
});
