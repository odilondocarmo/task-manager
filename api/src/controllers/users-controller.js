import User from '../services/user.js';

class UsersController {
    async create(req, res, next) {
        const data = req.body;
        try {
            const user = new User();
            user.build(data);
            await user.validate();
            await user.save();
            return res.json(user.getPublicData());
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
            return res.json(user.getPublicData());
        } catch (err) {
            return next(err);
        }
    }
}

export default new UsersController();
