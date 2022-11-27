import Task from '../services/task.js';
import Notify from '../services/notify.js';

class TaskController {
    async create(req, res, next) {
        try {
            const { summary } = req.body;
            const { userId } = req;
            const task = new Task();
            task.build({ summary, userId });
            const response = await task.save();
            return res.json(response);
        } catch (err) {
            return next(err);
        }
    }

    async index(req, res, next) {
        try {
            const { id } = req.params;
            const task = new Task();
            await task.load(id, req.userId, req.userRole);
            return res.json(task.taskInstance);
        } catch (err) {
            return next(err);
        }
    }

    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { summary } = req.body;
            const task = new Task();
            await task.load(id, req.userRole);
            task.summary = summary;
            const response = await task.save();
            return res.json(response);
        } catch (err) {
            return next(err);
        }
    }

    async show(req, res, next) {
        try {
            const task = new Task();
            const tasks = await task.getAllTasks(req.userId, req.userRole);
            return res.json({ tasks });
        } catch (err) {
            return next(err);
        }
    }

    async delete(req, res, next) {
        try {
            const { id } = req.params;
            const task = new Task();
            await task.load(id, req.userId, req.userRole);
            const response = await task.delete(req.userRole);
            return res.json(response);
        } catch (err) {
            return next(err);
        }
    }

    async performTask(req, res, next) {
        try {
            const { id } = req.params;
            const { userId, userRole } = req;
            const task = new Task();
            await task.load(id, userId, userRole);
            task.performedAt = new Date();
            const response = await task.save();
            const notification = new Notify(response);
            await notification.init();
            await notification.send();
            return res.json(response);
        } catch (err) {
            return next(err);
        }
    }
}

export default new TaskController();
