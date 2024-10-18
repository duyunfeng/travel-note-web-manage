import { post } from './config'
import type { User } from '@/types'

const login = (data: User) => {
    return post('/login', data)
}

export { login };