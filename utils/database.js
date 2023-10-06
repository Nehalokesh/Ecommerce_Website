const mongoose = require("mongoose");

const connectDatabase = async () => {
    try {
        mongoose.set("strictQuery", false);
        const { connection } = await mongoose.connect('mongodb://0.0.0.0:27017/');
        console.log(`MongoDB connected`);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDatabase;