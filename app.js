const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { connectToDatabase } = require("./db/db.js");

require("dotenv").config()

const app = express();

connectToDatabase()