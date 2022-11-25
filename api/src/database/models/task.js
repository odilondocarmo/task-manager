import Sequelize, { DATE, STRING } from 'sequelize';
const { Model } = Sequelize;

class Task extends Model {
    static init(sequelize) {
        super.init(
            {
                id_user: STRING,
                summary: STRING(2500),
                performed_at: DATE
            },
            {
                sequelize
            }
        );
    }

    static getTasksByUserId(id_user) {
        return this.findAll({
            where: {
                id_user
            }
        });
    }

    static getTaskById(id) {
        return this.findOne({
            where: {
                id
            }
        });
    }

    static updateTask(id, summary) {
        return this.update(
            { summary },
            {
                where: {
                    id
                }
            }
        );
    }

    static performTask(id) {
        return this.update(
            {
                performed_at: new Date()
            },
            {
                where: {
                    id,
                    performed_at: null
                },
                returning: true
            }
        );
    }

    static deleteTask(id) {
        return this.destroy({
            where: {
                id
            }
        });
    }
}

export default Task;
