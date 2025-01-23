import mongoose from "mongoose";
import { DB_Name } from "../Constants.js"


const connectDB = async () => {
    try {
        const res = await mongoose.connect(process.env.MONGO_URL, {
            dbName: DB_Name
        })
        return res
    } catch (error) {
        console.log(error.message)
        process.exit(1);
    }
}

export default connectDB