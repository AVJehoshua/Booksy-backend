const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./db/db.js");
require("dotenv").config();


const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const basketRouter = require("./routes/basket");
const reviewsRouter = require("./routes/reviews");

app.use(cors());
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/api", usersRouter);
app.use("/books", booksRouter);
app.use("/basket", basketRouter);
app.use("/reviews", reviewsRouter);

const listenForRequests = () => {
    if (require.main === module) {
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log("Now listening on port", port);
        });
    }
};

connectToDatabase().then(() => {
    listenForRequests();
});

module.exports = app;