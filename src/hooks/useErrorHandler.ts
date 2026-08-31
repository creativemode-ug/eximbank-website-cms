import { AxiosError } from "axios";
import { useSnapshot } from "valtio";
import { useNavigate } from "react-router-dom";
import { authStore } from "@/store/auth";

import useDialog from "@/components/Dialog/useDialog";



export default function() {
    const store = useSnapshot(authStore);
    const navigate = useNavigate();
    const { showMessage, close } = useDialog();

    const redirectLogin = () => navigate("/auth/login")


    const handleError = (error: AxiosError) => {
        const status = error.response?.status;

        switch (status) {
            case 401:
                showMessage({
                    title: "Session Expired",
                    message: "Session has expired. You will be logged out shortly.",
                    theme: "warning",
                });
                setTimeout(() => {
                    store.logout();
                    close(); 
                    redirectLogin();
                }, 4000);
                break;
            case 500:
                showMessage({
                    title: "Technical Issue",
                    message: "Oops! Something went wrong on our end. Please try again later.",
                    theme: "warning",
                });
                setTimeout(() => {close()}, 4000)
                break;
            case 502:
            case 504:
                showMessage({
                    title: "Technical Malfunction",
                    message: "We're experiencing some technical difficulties. Please try again later.",
                    theme: "warning",
                });
                setTimeout(() => {
                    store.logout();
                    close(); 
                    redirectLogin();
                }, 4000)
                break;
            case 503:
                showMessage({
                    title: "Service Unavailable",
                    message: "We're sorry, but the service is currently unavailable. Please try again later.",
                    theme: "warning",
                });
                setTimeout(() => {
                    store.logout();
                    close(); 
                    redirectLogin();
                }, 4000)
                break;
            default:
                break;
        }
    }

    return {
        handleError
    }
}