const {Schema, model} = require('mongoose')

const personSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 70
    }
})

module.exports = model('Person', personSchema)