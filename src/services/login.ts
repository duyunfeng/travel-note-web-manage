import { get, post } from './config'
import type { User } from './type'

const login = (data: User) => {
    return post('/login', data)
}

const getUser = (data: any) => {
    return get('/login/getUser', data)
}

export { login, getUser };