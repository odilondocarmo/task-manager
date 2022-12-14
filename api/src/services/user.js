import { compare, hashSync } from 'bcrypt';
import { invalidInput, invalidPassword } from '../helpers/error-handler.js';
import UserModel from '../database/models/user.js';
import UserSchema from '../schemas/user.js';

class User {
    constructor() {
        this.data = {};
        this.data.username = null;
        this.data.password = null;
        this.data.passwordHash = null;
        this.data.role = null;
        this.data.id = null;
    }

    build({ id, username, password, role, password_hash }) {
        this.data.username = username;
        this.data.password = password;
        if (password || password_hash) {
            this.data.passwordHash = password_hash || hashSync(password, 10);
        }
        this.data.role = role;
        this.data.id = id;
    }

    getPublicData() {
        return {
            username: this.data.username,
            role: this.data.role,
            id: this.data.id
        };
    }

    async load() {
        const user = await UserModel.getUser(this.data.username);
        if(!user) {
            return invalidInput('invalid username')
        }
        this.build(user);
        this.userInstance = user;
        return user;
    }

    async checkPassword(password) {
        if (!this.data.passwordHash) return invalidPassword();
        const isValid = await this.userInstance.checkPassword(password)
        if (!isValid) return invalidPassword();
        return isValid
    }

    async save() {
        const user = {
            username: this.data.username,
            password_hash: this.data.passwordHash,
            role: this.data.role
        };
        const schema = new UserSchema();
        await schema.validate(user);
        if (!this.data.id) {
            const userInstance = await UserModel.createUser(user);
            this.data.id = userInstance.id
            this.userInstance = userInstance
            return userInstance
        }
        return UserModel.update(user, {
            where: { id: this.data.id }
        });
    }
}

export default User;
