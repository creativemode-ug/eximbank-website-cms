export interface IPublishForm {
    id: string
    is_published: number
}

export interface ILoginForm {
    email: string
    password: string
}

export interface IStaffForm {
    first_name: string
    last_name: string
    email: string
    role: string
}

export interface IRoleForm {
    name: string
    description: string
}