import mongoose from "mongoose";
export const db_connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URL).then(() => {
            console.log("mongo Connection successful ")
        })
    } catch (error) {
        console.log(error);
    }
}