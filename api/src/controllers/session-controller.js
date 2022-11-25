import Session from '../services/session.js';
import User from '../services/user.js';

class SessionController {
    async store(req, res, next) {
        const { username, password } = req.body;
        try {
            const session = new Session(username, password);
            const user = new User();
            user.build({ username });
            await user.load();
            await user.checkPassword(password);
            const publicUserData = user.getPublicData();
            const token = session.generateToken(publicUserData);
            return res.json({
                token
            });
        } catch (err) {
            return next(err);
        }
    }
}

export default new SessionController();
