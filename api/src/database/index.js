import Sequelize from 'sequelize';

import databaseConfig from '../config/database.cjs';
import User from './models/user.js';

const models = [User];

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
