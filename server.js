require("dotenv").config()
const app = require("./app");
const connectToDb = require("./config/db");

connectToDb()

const PORT = process.env.PORT || 5000;

// listening to port
app.listen(PORT, ()=>{console.log("running on port " + PORT)});