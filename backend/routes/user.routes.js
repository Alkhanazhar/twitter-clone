import express from 'express';
import { bookmark, follow, login, logout, otherUsers, profile, register, unFollow } from '../controllers/user.controller.js';
import { authMiddleware } from '../middlewares/userAuth.middleware.js';

const router = express.Router()

router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile").get(authMiddleware, profile)
router.route("/bookmarks/:id").put(authMiddleware, bookmark)
router.route("/other-users").get(authMiddleware, otherUsers)
router.route("/follows/:id").get(authMiddleware, follow)
router.route("/unfollows/:id").get(authMiddleware, unFollow)

export default router

