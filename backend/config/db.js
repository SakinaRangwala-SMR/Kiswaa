import mongoose from "mongoose";
const mongoUrl = process.env.MONGODB_URL;
const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected");
    } catch(error) {
        console.log("DB error:", error.message);
    }
};
export default connectDb;
 