"use strict";
import express from "express";
import tokenMiddleware from "../middleware/tokenMiddleware";
import categoryController from "../controllers/categoryController";
const categoryRouter = express.Router();

/**
 * @swagger
 * tags:
 *   name: Category
 *   description: Các endpoint liên quan đến loại sản phẩm
 */

/**
 * @swagger
 * /v1/category:
 *   post:
 *     tags: [Category]
 *     summary: Thêm mới loại dịch vụ
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
 *     responses:
 *       200:
 *         description: Thêm thông tin thành công
 *       400:
 *         description: Thêm thông tin thất bại
 */
categoryRouter.post(
  "/",
  tokenMiddleware.verifyTokenAdmin,
  categoryController.createCategory
);

/**
 * @swagger
 * /v1/category/{id}:
 *   put:
 *     tags: [Category]
 *     summary: Cập nhật loại sản phẩm
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
 *     responses:
 *       200:
 *         description: Cập nhật thông tin thành công
 *       400:
 *         description: Cập nhật thông tin thất bại
 */
categoryRouter.put(
  "/:id",
  tokenMiddleware.verifyTokenAdmin,
  categoryController.updateCategory
);

/**
 * @swagger
 * /v1/category/{id}:
 *   get:
 *     tags: [Category]
 *     summary: Lấy loại dịch vụ
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID của loại dịch vụ
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lấy thông tin thành công
 *       400:
 *         description: Lấy thông tin thất bại
 */
categoryRouter.get(
  "/:id",
  tokenMiddleware.verifyToken,
  categoryController.getCategoryDetail
);

/**
 * @swagger
 * /v1/category:
 *   get:
 *     tags: [Category]
 *     summary: Lấy loại toàn bộ loại dịch vụ
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
categoryRouter.get(
  "/",
  tokenMiddleware.verifyToken,
  categoryController.getAllCategories
);

/**
 * @swagger
 * /v1/category/{id}:
 *   delete:
 *     tags: [Category]
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
categoryRouter.delete(
  "/:id",
  tokenMiddleware.verifyTokenAdmin,
  categoryController.deleteCategory
);

export default categoryRouter;
