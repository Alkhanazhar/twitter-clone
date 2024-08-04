import { TweetModel } from "../models/tweet.model.js"
import { UserModel } from "../models/user.model.js"

export const createTweet = async (req, res) => {
    try {
        const { description } = req.body
        const id = req.user
        if (!description || !id) {
            return res.status(404).json({
                message: "Invalid description", success: false
            })
        }
        const userDetails = await UserModel.findById(id)
        await TweetModel.create({ description, userId: id, userDetails: userDetails })
        return res.status(200).json({
            message: "Created",
            success: true
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const deleteTweet = async (req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(404).json({
                message: "Invalid tweet", success: false
            })
        }
        await TweetModel.findByIdAndDelete(id)
        return res.status(200).json({
            message: "Deleted successfull",
            success: true
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const likeDislikeTweet = async (req, res) => {
    try {
        const loggedInUserId = req.user
        const tweetId = req.params.id
        const tweet = await TweetModel.findById(tweetId)
        if (tweet.likes.includes(loggedInUserId)) {
            await TweetModel.findByIdAndUpdate(tweetId, { $pull: { likes: loggedInUserId } })
            return res.status(201).json({ success: true, message: "dislike" })
        }
        else {
            await TweetModel.findByIdAndUpdate(tweetId, { $push: { likes: loggedInUserId } })
            return res.status(201).json({ success: true, message: "like" })

        }
    } catch (error) {
        console.log(error.message)
    }
}


export const getAllTweets = async (req, res) => {
    try {
        const userId = req.user
        const userIdData = await UserModel.findById(userId)
        const loggedInUserTweets = await TweetModel.find({ userId: userId })
        const followingTweets = await Promise.all(userIdData.following.map((otherUserId) => {
            return TweetModel.find({ userId: otherUserId })
        }))

        res.status(200).json({
            tweets: loggedInUserTweets.concat(followingTweets),
            message: 'Following Tweets',
            success: true,
        })
    } catch (error) {
        console.log(error.message)
    }
}


export const getFollowingTweets = async (req, res) => {
    try {
        const userId = req.user
        const userIdData = await UserModel.findById(userId)

        const followingTweets = await Promise.all(userIdData.following.map((otherUserId) => {
            return TweetModel.find({ userId: otherUserId })
        }))

        res.status(200).json({
            tweets: [].concat(followingTweets),
            message: 'Following Tweets',
            success: true,
        })
    } catch (error) {
        console.log(error.message)
    }
}

