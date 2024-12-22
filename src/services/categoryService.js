"use strict";

import { Op } from "sequelize";
import {
  BaseErrorResponse,
  BaseResponseList,
  BaseSuccessResponse,
} from "../config/baseReponse";
import logger from "../config/winston";
import db from "../models";
import onRemoveParams from "../utils/remove-params";

const categoryService = {
  createCategory: (name) => {
    return new Promise(async (resolve, reject) => {
      try {
        const newCategory = await db.Category.create({ name });
        return resolve(
          new BaseSuccessResponse({
            data: newCategory,
            message: "Thêm loại dịch vụ thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
  updateCategory: (id, name) => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await db.Category.findByPk(id);
        if (!category) {
          return reject(
            new BaseErrorResponse({
              message: "Không tìm thấy loại dịch vụ",
            })
          );
        }
        await db.Category.update(
          { name },
          {
            where: { id },
          }
        );
        return resolve(
          new BaseSuccessResponse({
            message: "Cập nhật loại dịch vụ thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
  getAllCategories: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { page, limit, nameLike } = data;
        let offset = page && limit ? (page - 1) * limit : undefined;
        let query = {};
        if (nameLike) {
          query = {
            name: {
              [Op.like]: `%${nameLike}%`,
            },
          };
        }
        const option = onRemoveParams(
          {
            where: query,
            limit: Number(limit),
            offset,
            order: [["createdAt", "DESC"]],
            raw: true,
            nest: true,
            distinct: true,
          },
          [0]
        );
        const result = await db.Category.findAndCountAll(option);
        const court = result.rows;
        const totalCount = result.count;
        return resolve(
          new BaseResponseList({
            list: court,
            totalCount,
            message: "Lấy danh sách loại dịch vụ thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
  getCategoryDetail: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await db.Category.findByPk(id);
        if (!category) {
          return reject(
            new BaseErrorResponse({
              message: "Không tìm thấy loại dịch vụ này",
            })
          );
        }
        return resolve(
          new BaseSuccessResponse({
            data: category,
            message: "Lấy chi tiết loại dịch vụ thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
  deleteCategory: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await db.Category.findByPk(id);
        if (!category) {
          return reject(
            new BaseErrorResponse({
              message: "Không tìm thấy loại dịch vụ này",
            })
          );
        }
        await db.Category.destroy({
          where: { id },
        });
        return resolve(
          new BaseSuccessResponse({
            message: "Xóa loại dịch vụ thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
};

export default categoryService;
