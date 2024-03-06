const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./db/db.js");
require("dotenv").config();

const app = express();

const usersRouter = require("./routes/users");
const booksRouter = require("./routes/books");
const basketRouter = require("./routes/basket");
const reviewsRouter = require("./routes/reviews");
const orderRoutes = require("./routes/order");
const stripeRoutes = require("./routes/stripe");

app.use(cors());
app.use(bodyParser.json());

app.use("/users", usersRouter);
app.use("/api", usersRouter);
app.use("/books", booksRouter);
app.use("/basket", basketRouter);
app.use("/reviews", reviewsRouter);
app.use("/order", orderRoutes);
app.use("/stripe", stripeRoutes);

const listenForRequests = () => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log("Now listening on port", port);
    });
};

connectToDatabase().then(() => {
    listenForRequests();
});
