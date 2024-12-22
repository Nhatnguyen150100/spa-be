"use strict";

import userService from "../services/userService";

const userController = {
  getUserById: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await userService.getUserById(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const rs = await userService.getAllUsers(req.query);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = await userService.deleteUser(id);
      res.status(200).json({ message });
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
};

export default userController;
