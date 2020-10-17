const express = require('express')
const app = express(); // instance of express
const { db } = require('./db/index')

const port = 3000

app.get("/", (req, res) => {
    res.send('Hello World')
})

db()

app.listen(port, () => {
    console.log("Server runs at port: ", port)
}) // run app on port