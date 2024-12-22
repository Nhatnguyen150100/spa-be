"use strict";

import { BaseErrorResponse, BaseSuccessResponse } from "../config/baseReponse";
import logger from "../config/winston";
import db from "../models";

const orderService = {
  createOrder: (userId, serviceId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const created = await db.Order.create({
          userId,
          serviceId,
        });
        if (created) {
          return resolve(
            new BaseSuccessResponse({
              message: "Thêm dịch vụ vào giỏ hàng thành công",
              data: created,
            })
          );
        } else {
          return reject(
            new BaseErrorResponse({
              message: "Thêm dịch vụ vào giỏ hàng thất bại",
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
  getOrdersByUserId: (userId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const orders = await db.Order.findAll({
          where: { userId },
          include: [{ model: db.Service, as: "service" }],
          raw: true,
          nest: true,
        });
        if (orders) {
          return resolve(
            new BaseSuccessResponse({
              message: "Lấy danh sách dịch vụ trong giỏ hàng thành công",
              data: {
                orders,
                totalAmount:
                  orders?.reduce(
                    (total, item) => item.service.price + total,
                    0
                  ) ?? 0,
              },
            })
          );
        } else {
          return reject(
            new BaseErrorResponse({
              message: "Không tìm thấy dịch vụ trong giỏ hàng",
            })
          );
        }
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: "An error occurred while getting orders",
            error,
          })
        );
      }
    });
  },
  deleteOrder: (orderId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const deleted = await db.Order.destroy({ where: { id: orderId } });
        if (deleted) {
          return resolve(
            new BaseSuccessResponse({
              message: "Xóa dịch vụ khỏi giỏ hàng thành công",
            })
          );
        } else {
          return reject(
            new BaseErrorResponse({
              message: "Không tìm thấy dịch vụ để xóa",
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

export default orderService;
