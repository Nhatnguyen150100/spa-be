"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import profileController from "../controllers/profileController";
const profileRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Profile
 *   description: Các endpoint liên quan cập nhật thông tin người dùng
 */

/**
 * @swagger
 * /v1/profile/{id}:
 *   put:
 *     tags: [Profile]
 *     summary: Cập nhật thông tin người dùng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của user.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 example: "full name user"
 *               gender:
 *                 type: string
 *                 example: "male"
 *               phoneNumber:
 *                 type: string
 *                 example: "+841234965745"
 *     responses:
 *       200:
 *         description: Cập nhật thông tin thành công
 *       400:
 *         description: Cập nhật thông tin thất bại
 */
profileRouter.put(
  "/:id",
  tokenMiddleware.verifyToken,
  profileController.updateProfile
);

/**
 * @swagger
 * /v1/profile/{id}:
 *   get:
 *     tags: [Profile]
 *     summary: Lấy thông tin người dùng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng cần lấy thông tin hồ sơ.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Cập nhật thông tin thành công
 *       400:
 *         description: Cập nhật thông tin thất bại
 */
profileRouter.get(
  "/:id",
  tokenMiddleware.verifyToken,
  profileController.getProfile
);

export default profileRouter;
