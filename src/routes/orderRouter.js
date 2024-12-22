"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import orderController from "../controllers/orderController";
const orderRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Order
 *   description: Các endpoint liên quan đến giỏ hàng
 */

/**
 * @swagger
 * /v1/order:
 *   post:
 *     tags: [Order]
 *     summary: Thêm 1 dịch vụ vào trong giỏ hàng
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               serviceId:
 *                 type: string
 *                 example: ""
 *                 description: id của dịch vụ.
 *     responses:
 *       200:
 *         description: Thêm thông tin thành công
 *       400:
 *         description: Thêm thông tin thất bại
 */
orderRouter.post("/", tokenMiddleware.verifyToken, orderController.createOrder);

/**
 * @swagger
 * /v1/order:
 *   get:
 *     tags: [Order]
 *     summary: Lấy chi tiết giỏ hàng
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       400:
 *         description: Lấy thông tin thất bại
 */
orderRouter.get(
  "/",
  tokenMiddleware.verifyToken,
  orderController.getOrdersByUserId
);

/**
 * @swagger
 * /v1/order/{id}:
 *   delete:
 *     tags: [Order]
 *     summary: Xóa dịch vụ trong giỏ hàng
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của orderItem
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
orderRouter.delete(
  "/:id",
  tokenMiddleware.verifyToken,
  orderController.deleteOrder
);

export default orderRouter;
