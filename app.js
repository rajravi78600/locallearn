const express = require('express');
require("./config/db")
const port = process.env.PORT || 4000


const path = require('path')
require("dotenv").config({
    path: path.join(__dirname,'.env')
})


const app = express();
app.use(express.json());

app.use(express.json());



app.use('/',  require("./routes/users"))






app.listen(port,() => {
    console.log(`Port is running at http://localhost:${port}`)
})