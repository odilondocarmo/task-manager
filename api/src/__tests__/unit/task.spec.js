import '../../database'
import Task from '../../services/task.js'
import TaskModel from '../../database/models/task.js'
import UserModel from '../../database/models/user.js'
import User from '../../services/user'
import { taskMock, userMock } from '../mock.json'



describe('Tasks success cases', () => {
    let task = null
    let user = null
    beforeAll(async () => {
        task = new Task()
        user = new User()
        user.build({username: userMock.username, password: userMock.password, role: userMock.role})
        await user.save()
        task.build({summary: taskMock.summary, userId: user.data.id})
    })

    afterAll(async () => {
        await TaskModel.destroy({
            where: {
                summary: taskMock.summary
            }
        })
        await UserModel.destroy({
            where: {
                username: userMock.username
            }
        })
        return
    })

    it('Create a task in database', async () => {
        await task.save()
        expect(task.id).not.toBe(undefined)
    })

    it('Load a task from database', async () => {
        const tsk = await task.load(task.id, user.data.id, 'manager')
        expect(tsk.id).toBe(task.id)
    })

    it('Delete a task from database', async () => {
        const resp = await task.delete('manager')
        expect(resp).not.toBe(null)
    })
})

/* describe('Tasks fail cases', () => {
    let user = null
    beforeAll(() => {
        user = new User()
        user.build({
            username: userMock.username,
            role: userMock.role
        })
    })
}) */