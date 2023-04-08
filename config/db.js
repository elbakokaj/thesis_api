const mongoose = require("mongoose");
const config = require("config");
const db = config.get("mongoURI");


const connectDb = async () => {
    try {
        await mongoose.connect(db, {

        });
        console.log(`Database connected succesfully!`);
    } catch (error) {
        console.log('error', error)
    }
}
module.exports = connectDb