const Redis = require("ioredis")

const redisData = {
    port: process.env.REDIS_PORT,
    host: process.env.REDIS_HOST,
}

const redis = new Redis(redisData)

redis.on('connect', () => {
    console.log("Connected to Redis")
})

redis.on("error", error => {
    console.error("Error connecting to Redis\n", error)
})

module.exports=redis