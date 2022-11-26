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
        req.userId = id;
        req.userRole = role;
        return next();
    } catch (err) {
        return next(err);
    }
}

export async function isManager(req, res, next) {
    try{
        if (req.userRole === 'manager') {
            return next();
        }
        invalidRole()
    }catch(err){
        return next(err);
    }
    
}
