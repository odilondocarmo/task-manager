import jwt from 'jsonwebtoken';
import { invalidInput } from '../helpers/error-handler.js';
import { secret, expiresIn } from '../config/auth.js';

class Session {
    constructor(username, password) {
        if (!username || !password) {
            return invalidInput();
        }
        this.request = {
            username,
            password
        };
    }

    generateToken({ id, role }) {
        const token = jwt.sign({ id, role }, secret, {
            expiresIn
        });
        return token;
    }
}

export default Session;
