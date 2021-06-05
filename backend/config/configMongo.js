const mongoose = require('mongoose')

const mongoData = {
    host: process.env.MONGO_HOST,
    port: process.env.MONGO_PORT,
    database: process.env.MONGO_DB
}

mongoose.connect(`mongodb://${mongoData.host}:${mongoData.port}/${mongoData.database}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
        serverSelectionTimeoutMS: 300000

    }).then(() => {
        console.log("Connected to MongoDB")

    }).catch(error => {
        console.error('Error connecting to MongoDB\n', error)
    })

mongoose.connection.on("error", error => {
    console.error("Error connecting to MongoDB\n", error)
})

mongoose.connection.on("disconnected", () => {
    console.log("MongoDB disconnected")
})

mongoose.connection.on("reconnected", () => {
    console.log("Reconnected to MongoDB")
})

module.exports=mongoose