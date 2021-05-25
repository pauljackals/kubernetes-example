const express = require('express')
const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const appPort = process.env.APP_PORT

const redis = require("./config/configRedis")
const mongoose = require("./config/configMongo")

app.listen(appPort, () => {
    console.log(`API server listening at http://localhost:${appPort}`)
})