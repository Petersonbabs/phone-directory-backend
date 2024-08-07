require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./error/errorHandler");




const app = express()

// MIDDLEWARES
app.use(cors());
app.use(express.json());
app.use(morgan("dev"))
app.use(express.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use("*", cloudinaryConfig)



// ENDPOINTS
app.get("/api/v1", (req, res) => { res.send("welcome to jobjunction api version 1") })



app.all("*", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server`)
})

app.use("*", errorHandler)


module.exports = app