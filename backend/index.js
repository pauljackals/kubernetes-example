const express = require('express')
const cors = require('cors')
const app = express()
const routeMongo = require("./routes/mongo")
const routeRedis = require("./routes/redis")

app.use(cors())
app.use(express.json())

app.use("/mongo", routeMongo)
app.use("/redis", routeRedis)

const appPort = process.env.APP_PORT

const redis = require("./config/configRedis")
const mongoose = require("./config/configMongo")

app.listen(appPort, () => {
    console.log(`API server listening at http://localhost:${appPort}`)
})