interface StatusTagType {
    0: string,
    1: string,
    2: string,
    3: string
}
interface Error {
    message: string
    code: number
}

interface User {
    userName: string,
    password: string
}

interface PageType {
    currentPage: number,
    pageSize: number,
    total: number
}

export type { StatusTagType, Error, User, PageType }