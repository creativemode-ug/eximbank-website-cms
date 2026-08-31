import { login } from "@/services/auth_service";
import { ILoginResponse, IWriteResponse, TErrorMessage, TSuccess } from "@/types";
import { ILoginForm } from "@/types/forms";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { authStore } from "@/store/auth";
import { useSnapshot } from "valtio";

import toast from "react-hot-toast";



export function useLogin(
    onSuccess: TSuccess<IWriteResponse<ILoginResponse>>
) {
    const navigate = useNavigate();
    const auth = useSnapshot(authStore);
    
    return useMutation({
        mutationFn: (input: ILoginForm) => login(input),
        onSuccess: (res) => {
            toast.success("login successfull");

            auth.setToken(res.data.token);
            auth.setUser(res.data.user);
            auth.setUserEmail(res.data.user.id);
            
            onSuccess(res);
            navigate("/", { replace: true });
        },
        onError: (error: TErrorMessage) => {
            toast.error(error.response?.data.message ?? "");
        },
    })
}
