import TaskModel from '../database/models/task.js';
import { invalidInput } from '../helpers/error-handler';

class Task {
    constructor() {
        this.summary = null;
        this.id = null;
        this.performedAt = null;
    }

    build({ summary, id, performedAt }) {
        this.summary = summary;
        this.id = id;
        this.performedAt = performedAt;
    }

    async load() {
        const { id } = this;
        const task = await TaskModel.getTaskById(id);
        if (!task) {
            return invalidInput('Task not found');
        }
        this.taskInstance = task;
        this.summary = task.summary;
        this.id = id;
        this.performedAt = task.performed_at;
        return task;
    }

    delete() {
        return TaskModel.deleteTask(this.id);
    }

    async save() {
        const data = {
            summary: this.summary,
            performed_at: this.performedAt
        };
        let task = null
        if (!this.id) {
            task = await TaskModel.create(data);
            
        }else {
            task = await TaskModel.update(data, {
                where: {
                    id: this.id
                },
                returning: true
            });
        }
        this.build(task)
        return task
    }
}

export default Task;
