require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./error/errorHandler");

const app = express()

// ROUTERS
const AuthRouter = require('./routes/user.route')

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))

// ENDPOINTS
app.get("/api/v1", (req, res) => { res.send("welcome to Phone directory api version 1") })



app.all("*", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server`)
})

app.use("*", errorHandler)


module.exports = app