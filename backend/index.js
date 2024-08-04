import express from 'express';
import dotenv from "dotenv";
import { db_connect } from './lib/db.js';
import userRoute from "./routes/user.routes.js"
import tweetRoutes from "./routes/tweet.route.js"
import cors from "cors"
dotenv.config()
db_connect()
const app = express();
const PORT = process.env.PORT || 8088

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Add the allowed methods here
    credentials: true, // Include cookies in requests if necessary
}))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())


app.get("/", (req, res) => {
    console.log("response")
    res.send("Hello world")
})

app.use(userRoute)
app.use(tweetRoutes)

app.listen(PORT, () => {
    console.log('listening on port ' + PORT);
})
