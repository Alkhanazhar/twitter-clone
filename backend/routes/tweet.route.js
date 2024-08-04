import express from 'express';
import { createTweet, deleteTweet, getAllTweets, getFollowingTweets, likeDislikeTweet } from '../controllers/tweet.controller.js';
import { authMiddleware } from '../middlewares/userAuth.middleware.js';
const router = express.Router()

router.route("/create-tweet").post(authMiddleware, createTweet)
router.route("/delete-tweet/:id").delete(authMiddleware, deleteTweet)
router.route("/like-tweet/:id").put(authMiddleware, likeDislikeTweet)
router.route("/get-tweets").get(authMiddleware, getAllTweets)
router.route("/get-following-tweets").get(authMiddleware, getFollowingTweets)

export default router

 