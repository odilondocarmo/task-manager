import Sequelize, { STRING } from 'sequelize';
const { Model } = Sequelize;
import { compare, hashSync } from 'bcrypt';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                username: STRING,
                password_hash: STRING,
                role: STRING
            },
            {
                sequelize
            }
        );
    }

    checkPassword(password) {
        return compare(password, this.password_hash);
    }

    static getUser(username) {
        return this.findOne({
            where: { username },
            attributes: {
                exclude: ['password_hash']
            }
        });
    }

    static listUsers() {
        return this.findAll({
            attributes: {
                exclude: ['password_hash']
            }
        });
    }

    static createUser({ username, password_hash, role }) {
        const data = { username, role, password_hash };
        return this.create(data);
    }
}

export default User;
