"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import userController from "../controllers/userController";
const userRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Các endpoint liên quan đến quản lý người dùng
 */

/**
 * @swagger
 * /v1/user/{id}:
 *   get:
 *     tags: [User]
 *     summary: Lấy chi tiết thông tin người dùng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       400:
 *         description: Lấy thông tin thất bại
 */
userRouter.get(
  "/:id",
  tokenMiddleware.verifyTokenAdmin,
  userController.getUserById
);

/**
 * @swagger
 * /v1/user:
 *   get:
 *     tags: [User]
 *     summary: Lấy danh sách người dùng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         description: Số trang để phân trang kết quả. Mặc định là 1.
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         description: Số lượng danh mục trả về trên mỗi trang. Mặc định là 10.
 *         schema:
 *           type: integer
 *           default: 10
 *       - name: nameLike
 *         in: query
 *         required: false
 *         description: Tìm kiếm danh mục theo tên. Chỉ trả về các danh mục có tên chứa chuỗi này.
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       400:
 *         description: Lấy thông tin thất bại
 */
userRouter.get(
  "/",
  tokenMiddleware.verifyTokenAdmin,
  userController.getAllUsers
);

/**
 * @swagger
 * /v1/user/{id}:
 *   delete:
 *     tags: [User]
 *     summary: Xóa user thông qua userId
 *     description: Xóa một danh mục dựa trên ID được cung cấp.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của user cần xóa.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Xóa danh mục thành công.
 *       401:
 *         description: Không hợp lệ, token không hợp lệ hoặc không có quyền truy cập.
 *       404:
 *         description: Không tìm thấy danh mục với ID được cung cấp.
 *       500:
 *         description: Lỗi server nội bộ.
 */
userRouter.delete(
  "/:id",
  tokenMiddleware.verifyTokenAdmin,
  userController.deleteUser
);

export default userRouter;
