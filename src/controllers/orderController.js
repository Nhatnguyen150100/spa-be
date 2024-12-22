"use strict";

import orderService from "../services/orderService";

const orderController = {
  createOrder: async (req, res) => {
    try {
      const { id } = req.user;
      const { serviceId } = req.body;
      const rs = await orderService.createOrder(id, serviceId);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  getOrdersByUserId: async (req, res) => {
    try {
      const { id } = req.user;
      const rs = await orderService.getOrdersByUserId(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  deleteOrder: async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = await orderService.deleteOrder(id);
      res.status(200).json({ message });
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
};

export default orderController;
