import Sequelize from 'sequelize';

import databaseConfig from '../config/database.cjs';
import User from './models/user.js';
import Task from './models/task.js';

const models = [User, Task];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map((model) => model.init && model.init(this.connection));
    }
}

export default new Database();
