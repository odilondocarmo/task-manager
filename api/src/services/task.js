import TaskModel from '../database/models/task.js';
import { invalidInput, invalidRole } from '../helpers/error-handler.js';

class Task {
    constructor() {
        this.summary = null;
        this.id = null;
        this.performedAt = null;
    }

    build({ summary, id, performedAt, userId }) {
        this.summary = summary;
        this.id = id;
        this.performedAt = performedAt;
        this.userId = userId
    }

    async load(id, userId, role) {
        const task = await TaskModel.getTaskById(id);
        if (!task) {
            return invalidInput('Task not found');
        }
        if (userId !== task.id_user && role !== 'manager') {
            return invalidRole();
        }
        this.taskInstance = task;
        this.summary = task.summary;
        this.id = id;
        this.performedAt = task.performed_at;
        this.userId = task.id_user;
        return task;
    }

    delete(role) {
        if (role !== 'manager') {
            return invalidRole();
        }
        return TaskModel.deleteTask(this.id);
    }

    async save() {
        const data = {
            summary: this.summary,
            performed_at: this.performedAt,
            id_user: this.userId
        };
        let task = null;
        if (!this.id) {
            task = await TaskModel.create(data);
        } else {
            task = await TaskModel.update(data, {
                where: {
                    id: this.id
                },
                returning: true
            });
        }
        this.build(task);
        return task;
    }

    async getAllTasks(userId, userRole) {
        const option = {};
        if (userRole !== 'manager') {
            option.where = {
                id: userId
            };
        }
        const tasks = await TaskModel.findAll(option);
        return tasks;
    }
}

export default Task;
