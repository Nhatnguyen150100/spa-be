"use strict";

import serviceService from "../services/serviceService";

const serviceController = {
  createService: async (req, res) => {
    try {
      const rs = await serviceService.createService(req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  updateService: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await serviceService.updateService(id, req.body);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  getAllServices: async (req, res) => {
    try {
      const rs = await serviceService.getAllServices(req.query);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  getServiceDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await serviceService.getServiceDetail(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  deleteService: async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = await serviceService.deleteService(id);
      res.status(200).json({ message });
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
};

export default serviceController;
