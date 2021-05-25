const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Redis = require("ioredis")

app.use(cors())
app.use(express.json())

const mongoData = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DB
}
const redisData = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
}
const appPort = process.env.APP_PORT

const redis = new Redis(redisData)

mongoose
    .connect(`mongodb://${mongoData.host}:${mongoData.port}/${mongoData.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    })
    .then(() => {
        console.log("Connected to MongoDB")
    })
    .catch(error => console.error('Error connecting to MongoDB', error))

redis.on('connect', () => {
    console.log("Connected to Redis")
})

app.listen(appPort, () => {
    console.log(`API server listening at http://localhost:${appPort}`)
})