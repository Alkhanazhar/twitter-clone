import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
export const authMiddleware = async (req, res, next) => {
    try {
        const token = req.headers.cookie.split("token=")[1]
        console.log(req.cookies)
        console.log(token)

        if (!token) {
            return res.status(401).json({ status: false, message: "User not Authorized" })
        }
        const decode = jwt.verify(token, process.env.TOKEN_SECRET)
        req.user = decode.id
        next()

    } catch (error) {
        console.log(error.message)
    }
}