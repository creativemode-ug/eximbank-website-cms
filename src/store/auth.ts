import { proxy } from "valtio"
import { IUser } from "@/types/index"
import { setFromStorage, getFromStorage, STORAGE_KEYS, deleteFromStorage } from "@/utils"

export interface IAuthStore {
    user: IUser | null
    getUserEmail: () => string | null
    setUser: (user: IUser) => void
    getToken: () => string | null
    getPermissions: () => string[]
    setUserEmail: (email: string) => void
    setToken: (token: string) => void
    logout: () => void
}

export const authStore = proxy<IAuthStore>({
    user: null,

    getUserEmail(): string | null {
        const data = getFromStorage(STORAGE_KEYS.USER);

        if(data && typeof data === "string") return data
        return null
    },

    getToken(): string | null {
        const data = getFromStorage(STORAGE_KEYS.TOKEN);

        if(data && typeof data === "string") return data
        return null
    },

    getPermissions(): string[] {
        if(authStore.user) {
            return authStore.user.role.permissions?.map((el) => (el.name)) ?? []
        }
        return []
    },

    setUser(user: IUser) {
        authStore.user = user;
    },

    setUserEmail(email: string) {
        setFromStorage(STORAGE_KEYS.USER, email)
    },

    setToken(token: string) {
        setFromStorage(STORAGE_KEYS.TOKEN, token)
    },

    logout() {
        deleteFromStorage(STORAGE_KEYS.TOKEN);
        deleteFromStorage(STORAGE_KEYS.USER);

        authStore.user = null;
    }
});