//Global variables
require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(express.static(__dirname + '/public'));



//Server
app.listen(port, () => {
    console.log(`server listening in port ${port}`);
})