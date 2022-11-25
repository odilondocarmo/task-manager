import { compare, hashSync } from 'bcrypt';
import { invalidPassword } from '../helpers/error-handler.js';
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
        if(password || password_hash){
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
        this.build(user);
        this.userInstance = user;
        return user;
    }

    async checkPassword(password) {
        if (!this.passwordHash) return invalidPassword();
        const isValid = await compare(password, this.password_hash)
        if(!isValid) return invalidPassword()
    }

    async validate() {
        const schema = new UserSchema();
        await schema.validate(this.data);
    }

    async save() {
        const user = {
            username: this.data.username,
            password_hash: this.data.passwordHash,
            role: this.data.role
        };
        if (!this.id) {
            return UserModel.createUser(user);
        }
        return UserModel.update(user, {
            where: { id: this.data.id }
        });
    }
}

export default User;
