"use strict";
import express from "express";
import authController from "../controllers/auth/authController";
import authMiddleware from "../middleware/authMiddleware";
import passportController from "../controllers/auth/passportController";
const authRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Các endpoint liên quan đến xác thực
 */

/**
 * @swagger
 * /login:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng nhập
 *     description: Cho phép người dùng đăng nhập bằng thông tin tài khoản.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       401:
 *         description: Thông tin đăng nhập không hợp lệ
 */
authRouter.post("/login", authController.login);

authRouter.get("/google", passportController.authenticateByGoogle);
authRouter.get("/google/callback", passportController.authenticateCallback);

/**
 * @swagger
 * /register:
 *   post:
 *     tags: [Auth]
 *     summary: Đăng ký tài khoản
 *     description: Cho phép người dùng đăng ký tài khoản mới.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Đăng ký thành công
 *       400:
 *         description: Thông tin không hợp lệ hoặc người dùng đã tồn tại
 */
authRouter.post(
  "/register",
  authMiddleware.checkUserExist,
  authController.register
);

export default authRouter;
