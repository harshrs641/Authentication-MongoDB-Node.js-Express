const mongoose = require("mongoose")
const dBConfig = require("./dbconfig")

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(dBConfig.databaseUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log(`MongDB Connected: ${connection.connection.host}`);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}

module.exports = connectDB