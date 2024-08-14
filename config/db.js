require("dotenv").config()
const mongoose = require("mongoose");

const tempUrl = process.env.mongo_url
const password = process.env.mongo_password
const url = tempUrl.replace("<password>", password)

const connectToDb = async ()=>{
    mongoose.connect(url)
    .then(()=>{
        console.log("DB Connected!");
    })

}

module.exports = connectToDb