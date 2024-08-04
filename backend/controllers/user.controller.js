import { UserModel } from "../models/user.model.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body
        if (!name || !username || !password || !email) {
            return res.status(404).send({ message: "Fill all the required fields", success: false })
        }
        const isEmailExist = await UserModel.findOne({ email: email })
        if (isEmailExist) {
            return res.status(404).send({ message: "Email already exists", success: false })
        }
        const hashPassword = await bcryptjs.hash(password, 12)
        await UserModel.create({
            name, email, password: hashPassword, username
        })
        return res.status(200).send({ message: "user created", success: true })
    } catch (error) {
        res.status(500).send({ message: "Error creating user", success: false })
        console.error(error.message)
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!password || !email) {
            return res.status(404).send({ message: "Fill all the required fields", success: false })
        }
        const isEmailExist = await UserModel.findOne({ email: email })
        if (!isEmailExist) {
            return res.status(404).send({ message: "Email not exist", success: false })
        }

        const compare = await bcryptjs.compare(password, isEmailExist.password)
        if (!compare) {
            return res.status(404).send({ message: "Password not matched", success: false })
        }
        const token = jwt.sign({ id: isEmailExist._id }, process.env.TOKEN_SECRET, { expiresIn: "1d" })
        return res.status(200).cookie("token", token, { httpOnly: true, expiresIn: "1d", message: "token" }).json({
            message: "Welcome back " + isEmailExist.name,
            success: true,
            user: isEmailExist
        })

    } catch (error) {
        res.status(500).send({ message: "Error while login", success: false })
        console.error(error.message)
    }
}
export const logout = async (req, res) => {
    try {
        res.cookie("token", "", { expiresIn: new Date(Date.now()) }).json({
            success: true,
            message: "User logged out successfully"
        })
    } catch (error) {
        console.log(error.message)
    }
}


export const profile = async (req, res) => {
    try {
        const id = req.user
        const user = await UserModel.findById(id).select("-password")
        res.status(200).json(user)
    } catch (error) {
        console.log(error.message)
    }
}

export const otherUsers = async (req, res) => {
    try {
        const id = req.user
        const users = await UserModel.find({ _id: { $ne: id } })
        res.status(200).json(users)
    } catch (error) {
        console.log(error.message)
    }
}

export const follow = async (req, res) => {
    try {
        const loggedInUserId = req.user
        const { id } = req.params
        const loggedInUser = await UserModel.findById(loggedInUserId)
        const user = await UserModel.findById(id)
        if (!user.followers.includes(loggedInUserId)) {
            await user.updateOne({ $push: { followers: loggedInUserId } })
            await loggedInUser.updateOne({ $push: { following: id } })
        }
        else {
            return res.status(400).json({
                message: "user already followed to " + user.name
            })
        }
        return res.status(200).json({
            message: loggedInUser.name + "user followed to " + user.name
        })

    } catch (error) {
        console.log(error.message)
    }
}

export const unFollow = async (req, res) => {
    try {
        const loggedInUserId = req.user
        const { id } = req.params
        const loggedInUser = await UserModel.findById(loggedInUserId)
        const user = await UserModel.findById(id)
        if (loggedInUser.following.includes(id)) {
            await user.updateOne({ $pull: { followers: loggedInUserId } })
            await loggedInUser.updateOne({ $pull: { following: id } })
        }
        else {
            return res.status(400).json({
                message: "not followed yet "
            })
        }
        return res.status(200).json({
            message: loggedInUser.name + "user unfollowed to " + user.name + " successfully"
        })

    } catch (error) {
        console.log(error.message)
    }
}


export const bookmark = async (req, res) => {
    try {
        const loggedInUserId = req.user
        console.log(loggedInUserId)
        const tweetId = req.params.id
        const user = await UserModel.findById(loggedInUserId)
        if (user.bookmarks.includes(tweetId)) {
            await UserModel.findByIdAndUpdate(loggedInUserId, { $pull: { bookmarks: tweetId } })
            return res.status(201).json({ success: true, message: "bookmark removed" })
        } else {
            await UserModel.findByIdAndUpdate(loggedInUserId, { $push: { bookmarks: tweetId } })
            return res.status(201).json({ success: true, message: "bookmark added" })
        }

    } catch (error) {
        console.log(error.message)
    }
}
