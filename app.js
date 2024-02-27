const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./db/db.js");
require("dotenv").config();

const app = express();

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/book");

app.use(cors());
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/books", booksRouter);

const listenForRequests = () => {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("Now listening on port", port);
  });
};

connectToDatabase().then(() => {
  listenForRequests();
});
