import '../../database'
import User from '../../services/user.js'
import UserModel from '../../database/models/user.js'
import {userMock} from '../mock.json'


describe('Users success cases', () => {
    let user = null
    beforeAll(() => {
        user = new User()
    })

    afterAll(async () => {
        await UserModel.destroy({
            where: {
                username: userMock.username
            }
        })
        return
    })

    it('Build User with success', () => {
        user.build({
            username: userMock.username,
            password:  userMock.password,
            role: userMock.role
        })
        expect(user.data.username).toBe(userMock.username)
        expect(user.data.password).toBe(userMock.password)
        expect(user.data.role).toBe(userMock.role)
    })

    it('Should retrieve only public data', () => {
        const data = user.getPublicData()
        expect(data).toEqual({
            username: userMock.username,
            id:  undefined,
            role: userMock.role
        })
    })

    it('Save user in database', async () => {
        await UserModel.destroy({
            where: {
                username: userMock.username
            }
        })
        await user.save()
        expect(user.data.id).not.toBe(undefined)
    })

    it('Passowrd matches with password hash', async () => {
        const isValid = await user.checkPassword(userMock.password)
        expect(isValid).toBeTruthy()
    })

    it('Load user',async () => {
        const usr = await user.load()
        expect(usr.username).toBe(userMock.username)
    })

    it('Update user', async () => {
        user.data.role = 'developer'
        const update = await user.save()
        expect(update).toEqual([ 1 ])
    })
})

describe('Users fail cases', () => {
    let user = null
    beforeAll(() => {
        user = new User()
        user.build({
            username: userMock.username,
            role: userMock.role
        })
    })

    it('Fail to save user with missing password parameter', async () => {
        await UserModel.destroy({
            where: {
                username: userMock.username
            }
        })
        try {
            await user.save()
        }catch(err){
            expect(err.path).toBe('password_hash')
        }
    })

    it('Fail to load user', async () => {
        try {
            user.data.username = `${userMock}2`
            await user.load()
        }catch(err){
            expect(err.message).toBe('invalid username')
        }
    })
})