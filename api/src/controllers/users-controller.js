import User from '../services/user.js';

class UsersController {
    async create(req, res, next) {
        const data = req.body;
        try {
            const user = new User();
            user.build(data);
            await user.save();
            const response = user.getPublicData();
            return res.json(response);
        } catch (err) {
            err.status = 400;
            return next(err);
        }
    }

    async index(req, res) {
        const { username } = req.params;
        try {
            const user = new User();
            user.build({ username });
            await user.load();
            const response = user.getPublicData();
            return res.json(response);
        } catch (err) {
            return next(err);
        }
    }
}

export default new UsersController();
