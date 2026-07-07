const express = require('express')
const playerRouter = require("./controllers/players")

const app = express()

app.use('/api/player', playerRouter)

module.exports = app