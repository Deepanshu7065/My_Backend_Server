console.log("hello my server")
require('dotenv').config()

const express = require("express")
const req = require("express/lib/request")
const app = express()

const port = 3000

app.get('/', (req, res) => {
    res.send("hello world")
})

app.get('/about', (req, res) => {
    res.send("hello about")
})

app.get('/login', (req, res) => {
    res.send('<h1>Please Login AT</h1>')
})


app.listen(process.env.PORT, () => {
    console.log(`Example app listening on port ${port}`)
})