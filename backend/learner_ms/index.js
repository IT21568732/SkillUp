const express = require("express");
const http = require("http");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = express();

const learnerRoutes = require("./routes/learnerRoute");

//const proxyLearner = proxy("http://localhost:3003");