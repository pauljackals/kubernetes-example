const express = require('express');
const Person = require('../models/Person');
const router = express.Router()

router.get("/", async (req, res) => {
    const people = await Person.find()
    return res.json({people})
})

router.post("/", async (req, res) => {
    const name = req.body.name
    const personNew = new Person({name})
    try {
        const person = await personNew.save()
        return res.status(201).json({person})
    } catch (error) {
        console.error(error)
        return res.status(422).json({
            message: "Couldn't create a new person"
        })
    }
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    
    try {
        const person = await Person.findByIdAndDelete(id)
        if(person === null) {
            return res.status(404).json({
                message: "Couldn't find this person"
            })
        } else {
            return res.json({person})
        }
    } catch (error) {
        console.error(error)
        return res.status(422).json({
            message: "Couldn't delete this person"
        })
    }
})

module.exports = router;