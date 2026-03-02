const Task = require("../models/tasks");

class TaskController {
  async getAllTasks(req, res) {
    try {
      const userId = req.userId;
      const page = Math.max(1, Number(req.query.page) || 1);

      const tasks = await Task.find({ userId })
        .limit(5)
        .skip(5 * (page - 1))
        .sort({ date: "desc" });

      res.status(200).json({ count: tasks.length, tasks, per_page: 5, page });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to get tasks" });
    }
  }

  async createTask(req, res) {
    try {
      const userId = req.userId;
      const { title, description, date, isCompleted, isImportant } = req.body;

      const task = await Task.create({
        title,
        description,
        date,
        isCompleted,
        isImportant,
        userId,
      });

      res.status(201).json({ task });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to create task" });
    }
  }

  async getTask(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const task = await Task.findOne({ _id: id, userId });

      if (!task) {
        return res.status(404).json({ error: `No task with id ${id}` });
      }

      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to get task" });
    }
  }

  async updateTask(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const { title, description, date, isCompleted, isImportant } = req.body;

      const allowedUpdates = {
        title,
        description,
        date,
        isCompleted,
        isImportant,
      };

      const updateData = Object.fromEntries(
        Object.entries(allowedUpdates).filter(([, value]) => value !== undefined)
      );

      const task = await Task.findOneAndUpdate({ _id: id, userId }, updateData, {
        new: true,
        runValidators: true,
      });

      if (!task) {
        return res.status(404).json({ error: `No task with id ${id}` });
      }

      res.status(200).json(task);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Failed to update task" });
    }
  }

  async deleteTask(req, res) {
    try {
      const { id } = req.params;
      const userId = req.userId;
      const task = await Task.findOneAndDelete({ _id: id, userId });

      if (!task) {
        return res.status(404).json({ error: `No task with id ${id}` });
      }

      res.status(200).json(task);
    } catch (error) {
      console.log("🚀 ~ deleteTask ~ error:", error);
      res.status(500).json({ error: "Failed to delete task" });
    }
  }
}

module.exports = new TaskController();
