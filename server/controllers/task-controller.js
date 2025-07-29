const Task = require("../models/tasks");

class TaskController {
  async getAllTasks(req, res) {
    try {
      const { userId, page } = req.query;
      const tasks = await Task.find({ userId })
        .limit(5)
        .skip(5 * (page - 1))
        .sort({ date: "desc" });
      res
        .status(200)
        .json({ count: tasks.length, tasks, per_page: 5, page: +page });
    } catch (error) {
      console.log(error);
    }
  }

  async createTask(req, res) {
    try {
      const task = await Task.create(req.body);
      res.status(201).json({ task });
    } catch (error) {
      console.log(error);
    }
  }

  async getTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findOne({ _id: id });
      if (!task) {
        console.log(`No task with id ${id}`);
      }
      res.status(200).json(task);
    } catch (error) {
      console.log(error);
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json(task);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const task = await Task.findByIdAndDelete({ _id: id });

      res.status(200).json(task);
    } catch (error) {
      console.log("🚀 ~ deleteTask ~ error:", error);
    }
  }
}

module.exports = new TaskController();
