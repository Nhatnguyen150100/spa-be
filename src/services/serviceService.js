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
import groupAndMerge from "../utils/group-item";

const serviceService = {
  createService: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, description, price, listCategoryId } = data;
        const created = await db.Service.create({
          name,
          description,
          price,
        });
        await db.CategoryService.bulkCreate(
          listCategoryId.map((_item) => ({
            serviceId: created.id,
            categoryId: _item,
          }))
        );
        if (created) {
          return resolve(
            new BaseSuccessResponse({
              message: "Tạo dịch vụ thành công",
              data: created,
            })
          );
        } else {
          return reject(
            new BaseErrorResponse({
              message: "Tạo dịch vụ thất bại",
            })
          );
        }
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: "An error occurred while creating service",
            error,
          })
        );
      }
    });
  },
  updateService: (serviceId, data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { name, description, price, listCategoryId } = data;
        const isService = await db.Service.findByPk(serviceId);
        if (!isService) {
          return reject(
            new BaseErrorResponse({
              message: "Dịch vụ không tồn tại",
            })
          );
        }
        const updatedData = onRemoveParams({
          name,
          description,
          price,
        });
        const updated = await db.Service.update(updatedData, {
          where: { id: serviceId },
        });
        if (listCategoryId.length > 0) {
          await db.CategoryService.destroy({
            where: {
              serviceId,
            },
          });
          await db.CategoryService.bulkCreate(
            listCategoryId.map((_item) => ({
              serviceId,
              categoryId: _item,
            }))
          );
        }
        if (updated) {
          return resolve(
            new BaseSuccessResponse({
              message: "Cập nhật dịch vụ thành công",
            })
          );
        } else {
          return reject(
            new BaseErrorResponse({
              message: "Cập nhật dịch vụ thất bại",
            })
          );
        }
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: "An error occurred while updating service",
            error,
          })
        );
      }
    });
  },
  getServiceDetail: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const service = await db.Service.findAll({
          include: [
            {
              model: db.CategoryService,
              as: "categoryServices",
              required: false,
              include: [
                {
                  model: db.Category,
                  as: "category",
                },
              ],
            },
          ],
          raw: true,
          nest: true,
          where: { id },
        });
        const groupedResults = groupAndMerge(service, "id", "categoryServices");
        if (groupedResults) {
          return resolve(
            new BaseSuccessResponse({
              message: "Lấy chi tiết dịch vụ thành công",
              data: groupedResults,
            })
          );
        } else {
          return reject(
            new BaseErrorResponse({
              message: "Dịch vụ không tồn tại",
            })
          );
        }
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: "An error occurred while getting service detail",
            error,
          })
        );
      }
    });
  },
  getAllServices: (data) => {
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
        const result = await db.Service.findAndCountAll({
          include: [
            {
              model: db.CategoryService,
              as: "categoryServices",
              required: false,
              order: [["order", "ASC"]],
              include: [
                {
                  model: db.Category,
                  as: "category",
                },
              ],
            },
          ],
          ...option,
        });
        const groupedResults = groupAndMerge(
          result.rows,
          "id",
          "categoryServices"
        );
        const list = groupedResults;
        const totalCount = result.count;
        return resolve(
          new BaseResponseList({
            list,
            totalCount,
            message: "Lấy danh sách dịch vụ thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: "An error occurred while deleting service",
            error,
          })
        );
      }
    });
  },
  deleteService: (serviceId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const isService = await db.Service.findByPk(serviceId);
        if (!isService) {
          return reject(
            new BaseErrorResponse({
              message: "Dịch vụ không tồn tại",
            })
          );
        }
        const deleted = await db.Service.destroy({ where: { id: serviceId } });
        if (deleted) {
          return resolve(
            new BaseSuccessResponse({
              message: "Xóa dịch vụ thành công",
            })
          );
        } else {
          return reject(
            new BaseErrorResponse({
              message: "Xóa dịch vụ thất bại",
            })
          );
        }
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: "An error occurred while deleting service",
            error,
          })
        );
      }
    });
  },
};

export default serviceService;
