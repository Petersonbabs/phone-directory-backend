require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const errorHandler = require("./error/errorHandler");

const app = express()

// ROUTERS
const authRouter = require("./routes/user.route");
const contactRouter = require("./routes/contacts.route");

// MIDDLEWARES
const corsOptions = {
    origin: 'https://phonedir.vercel.app', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    allowedHeaders: ['Content-Type', 'Authorization'], 
  };
  
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"))

// ENDPOINTS
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/contacts', contactRouter)
app.get("/api/v1", (req, res) => { res.send("welcome to Phone directory api version 1") })



app.all("*", (req, res) => {
    res.json(`${req.method} ${req.originalUrl} is not an endpoint on this server`)
})

app.use("*", errorHandler)


module.exports = app