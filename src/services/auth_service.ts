import http from "@/http"
import { ILoginResponse, IWriteResponse } from "@/types"
import { ILoginForm } from "@/types/forms"

export async function login(input: ILoginForm) {
    const response = await http.post<IWriteResponse<ILoginResponse>>(
        "/auth/login",
        input,
    )
    console.log(response.data)
    return response.data
}
