import { Languages } from "@/i18n.config"
import { AxiosError } from "axios"

export type TErrorMessage = AxiosError<{ message: string }>

export type TSuccess<T> = (data: T) => void
export type TError = (error: TErrorMessage) => void

export type QueryOptions = {
    page?: number
    per_page?: number
    search?: string
    locale?: Languages
}

export type APIResponse<T> = {
    data: T
}

export type ListResponse<T> = {
    data: T[]
    meta: IMeta
}

export type PublishInput = {
    id: string
    is_published: number
}

export type Timestamp = {
    created_at?: string
    updated_at?: string
}

export type IdName = {
    id: string
    name: string
}

export enum FilterEnum {
    SEARCH = "keyword",
}

// Start Legacy
export interface IWriteResponse<T> {
    data: T
}

export interface IListResponse<T> {
    data: T[]
    meta: IMeta
}
// End Legacy

export interface IMeta {
    current_page: number
    from: null
    last_page: number
    path: string
    per_page: number
    to: null
    total: number
}

export interface IPagination {
    page: number
    per_page: number
}

export interface ILoginResponse {
    token: string
    user: IUser
}

export interface IUser {
    id: string
    first_name: string
    last_name: string
    email: string
    email_verified_at: Date
    role: IRole
    created_at: string
    updated_at: string
}

export interface IStaff {
    id: string
    first_name: string
    last_name: string
    email: string
    role: IRole
    email_verified_at: Date
    created_at: string
    updated_at: string
}

export interface IRole {
    id: string
    name: string
    description: string
    permissions: IPermission[]
}

export interface IPermission {
    id: string
    name: string
    model_type: string
    description: string
    created_at: string
    updated_at: string
}

export interface IContentType {
    name: string
    permissions: IPermission[]
}
