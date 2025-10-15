const mongoose = require("mongoose");

const connectDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Our Mongodb Connected");
    }
    catch(error){
        console.log("Error in Connecting the MogoDB", error);
    }
}

module.exports = connectDB;