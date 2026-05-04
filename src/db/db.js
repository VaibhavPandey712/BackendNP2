import mongoose from "mongoose"

function connectToDB() {
    mongoose.connect(process.env.MONGO_URL, {

    }).then(() => {
        console.log("Connected to DB");
    }).catch((err) => {
        console.error("Error connecting to MongoDB:", err);
    });
}

export default connectToDB;
