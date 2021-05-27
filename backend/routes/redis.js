const express = require('express')
const { v4: uuid } = require('uuid');
const router = express.Router()

const peopleKey = "people"
const peopleOrderKey = "peopleorder"
const routerWithRedis = redis => {

    router.get("/", async (req, res) => {
        const peopleRaw = await redis.hgetall(peopleKey)
        const peopleOrder = await redis.lrange(peopleOrderKey, 0, -1)
        const people = peopleOrder.map(id => ({
            id,
            name: peopleRaw[id]
        }))
        return res.json({people})
    })

    router.post("/", async (req, res) => {
        const name = req.body.name
        if(!name || name.length > 70) {
            return res.status(422).json({
                message: "Couldn't create a new person"
            })

        } else {
            const id = uuid()
            const result = await redis.hset(peopleKey, id, name)
            await redis.rpush(peopleOrderKey, id)
            return res.status(201).json({result})
        }
    })

    router.delete("/:id", async(req, res) => {
        const id = req.params.id

        const result = await redis.hdel(peopleKey, id)

        if(result) {
            await redis.lrem(peopleOrderKey, 1, id)
            return res.json({result})
        } else {
            return res.status(404).json({
                message: "Couldn't find this person"
            })
        }
    })

    return router
}

module.exports = redis => routerWithRedis(redis)