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

const userService = {
  getAllUsers: (data) => {
    return new Promise(async (resolve, reject) => {
      try {
        const { page, limit, nameLike } = data;
        let offset = page && limit ? (page - 1) * limit : undefined;
        let query = {
          role: "USER",
        };
        if (nameLike) {
          query = {
            ...query,
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
        const result = await db.User.findAndCountAll(option);
        const court = result.rows;
        const totalCount = result.count;
        return resolve(
          new BaseResponseList({
            list: court,
            totalCount,
            message: "Lấy danh sách người dùng thành công",
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
  getUserById: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findByPk(id);
        if (!user) {
          return reject(
            new BaseErrorResponse({
              message: "Người dùng không tồn tại",
            })
          );
        }
        return resolve(
          new BaseSuccessResponse({
            data: user,
            message: "Lấy thông tin người dùng thành công",
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
  deleteUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findByPk(userId);
        if (!user) {
          return reject(
            new BaseErrorResponse({
              message: "Người dùng không tồn tại",
            })
          );
        }
        await db.User.destroy({
          where: {
            id: userId,
          },
        });
        return resolve(
          new BaseSuccessResponse({
            message: "Xóa người dùng thành công",
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

export default userService;
