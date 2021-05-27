const express = require('express')
const cors = require('cors')
const app = express()
const routeMongo = require("./routes/mongo")
const routeRedis = require("./routes/redis")

const redis = require("./config/configRedis")
require("./config/configMongo")

app.use(cors())
app.use(express.json())

app.use("/mongo", routeMongo)
app.use("/redis", routeRedis(redis))

const appPort = process.env.APP_PORT

app.listen(appPort, () => {
    console.log(`API server listening at http://localhost:${appPort}`)
})