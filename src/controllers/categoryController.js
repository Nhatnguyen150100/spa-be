"use strict";

import categoryService from "../services/categoryService";

const categoryController = {
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      const rs = await categoryService.createCategory(name);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  updateCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const rs = await categoryService.updateCategory(id, name);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  getAllCategories: async (req, res) => {
    try {
      const rs = await categoryService.getAllCategories(req.query);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  getCategoryDetail: async (req, res) => {
    try {
      const { id } = req.params;
      const rs = await categoryService.getCategoryDetail(id);
      res.status(rs.status).json(rs);
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { id } = req.params;
      const { message } = await categoryService.deleteCategory(id);
      res.status(200).json({ message });
    } catch (error) {
      res.status(error.status).json(error);
    }
  },
};

export default categoryController;
