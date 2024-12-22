import { BaseErrorResponse, BaseSuccessResponse } from "../config/baseReponse";
import onRemoveParams from "../utils/remove-params";

const { default: logger } = require("../config/winston");
const { default: db } = require("../models");

const profileService = {
  updateProfile: (idUser, fullName, gender, phoneNumber) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findByPk(idUser);
        if (!user || Object.keys(user).length === 0) {
          return reject(
            new BaseErrorResponse({
              message: "We couldn't find your username",
            })
          );
        }
        const updateProfile = await db.User.update(
          onRemoveParams({
            fullName,
            gender,
            phoneNumber,
          }),
          {
            where: { id: idUser },
          }
        );
        const userUpdated = await db.User.findByPk(idUser);
        if (updateProfile) {
          return resolve(
            new BaseSuccessResponse({
              data: userUpdated,
              message: "Cập nhật thông tin thành công",
            })
          );
        }
        return reject(
          new BaseErrorResponse({
            message: "Cập nhật thông tin thất bại",
          })
        );
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
  getProfile: (id) => {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await db.User.findByPk(id);
        if (!user || Object.keys(user).length === 0) {
          return reject(
            new BaseErrorResponse({
              message: "We couldn't find your username",
            })
          );
        }
        delete user.password;
        return resolve(
          new BaseSuccessResponse({
            data: user,
            message: "Lấy thông tin thành công",
          })
        );
      } catch (error) {
        logger.error(error.message);
        return reject(
          new BaseErrorResponse({
            message: error.message,
          })
        );
      }
    });
  },
};

export default profileService;
