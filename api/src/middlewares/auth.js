import jwt from 'jsonwebtoken';
import { promisify } from 'util';
import { secret } from '../config/auth.js';
import { invalidInput, invalidRole } from '../helpers/error-handler.js';

export async function isUser(req, res, next) {
    const authhearder = req.headers.authorization;
    if (!authhearder) {
        return next(invalidInput('token is required'));
    }
    const [, token] = authhearder.split(' ');

    try {
        const { id, role } = await promisify(jwt.verify)(token, secret);

        if (!id) return next(invalidInput('Invalid token'));
        req.clientId = id;
        req.clientRole = role;
        return next();
    } catch (err) {
        return next(err);
    }
}

export async function isManager(req, res, next) {
    if (req.clientRole === 'manager') {
        return next();
    }
    return next(invalidRole());
}
