"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import serviceController from "../controllers/serviceController";
const serviceRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Service
 *   description: Các endpoint liên quan đến dịch vụ
 */

/**
 * @swagger
 * /v1/service:
 *   post:
 *     tags: [Service]
 *     summary: Thêm mới dịch vụ
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "tên dịch vụ"
 *               description:
 *                 type: string
 *                 example: "mô tả dịch vụ"
 *               price:
 *                 type: number
 *                 example: 1000000
 *               listCategoryId:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: []
 *                 description: Danh sách ID của các loại dịch vụ.
 *     responses:
 *       200:
 *         description: Thêm thông tin thành công
 *       400:
 *         description: Thêm thông tin thất bại
 */
serviceRouter.post(
  "/",
  tokenMiddleware.verifyTokenAdmin,
  serviceController.createService
);

/**
 * @swagger
 * /v1/service/{id}:
 *   put:
 *     tags: [Service]
 *     summary: Cập nhật dịch vụ
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của danh mục cần cập nhật.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "tên dịch vụ cập nhật"
 *               description:
 *                 type: string
 *                 example: "mô tả dịch vụ cập nhật"
 *               price:
 *                 type: number
 *                 example: 1000000
 *               listCategoryId:
 *                 type: array
 *                 example: []
 *                 items:
 *                   type: string
 *                 description: Danh sách ID của các loại dịch vụ cập nhật.
 *     responses:
 *       200:
 *         description: Cập nhật thông tin thành công
 *       400:
 *         description: Cập nhật thông tin thất bại
 */
serviceRouter.put(
  "/:id",
  tokenMiddleware.verifyTokenAdmin,
  serviceController.updateService
);

/**
 * @swagger
 * /v1/service/{id}:
 *   get:
 *     tags: [Service]
 *     summary: Lấy loại dịch vụ
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của dịch vụ
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       400:
 *         description: Lấy thông tin thất bại
 */
serviceRouter.get(
  "/:id",
  tokenMiddleware.verifyToken,
  serviceController.getServiceDetail
);

/**
 * @swagger
 * /v1/service:
 *   get:
 *     tags: [Service]
 *     summary: Lấy loại toàn bộ dịch vụ
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
 *       500:
 *         description: Lỗi server nội bộ.
 */
serviceRouter.get(
  "/",
  tokenMiddleware.verifyToken,
  serviceController.getAllServices
);

/**
 * @swagger
 * /v1/service/{id}:
 *   delete:
 *     tags: [Service]
 *     summary: Xóa danh mục theo ID
 *     description: Xóa một danh mục dựa trên ID được cung cấp.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của danh mục cần xóa.
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
serviceRouter.delete(
  "/:id",
  tokenMiddleware.verifyTokenAdmin,
  serviceController.deleteService
);

export default serviceRouter;
