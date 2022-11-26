import Task from '../services/task.js';

class TaskController {
    async create(req, res, next) {
        try {
            const { summary } = req
            const task = new Task()
            task.build({summary})
            const response = await task.save()
            return res.json(response)
        }catch(err){
            return next(err)
        }
    }

    async index(req, res, next) {
        try {

        }catch(err){
            return next(err)
        }
    }

    async update(req, res, next) {
        try {

        }catch(err){
            return next(err)
        }
    }

    async show(req, res, next) {
        try {

        }catch(err){
            return next(err)
        }
    }

    async delete(req, res, next) {
        try {

        }catch(err){
            return next(err)
        }
    }
}

export default new TaskController();
