import { createContext, ReactNode } from "react";

export interface IDialog {
    message: string
    theme: "primary" | "success" | "danger" | "warning"
    title: string
    render?: () => ReactNode
}

export interface IDialogState { 
    message: IDialog | null
    confirm: IDialog | null
}

export interface IDialogContext { 
    showMessage: (payload: IDialog) => void;
    showConfirm: (payload: IDialog) => void;
    close: () => void;
}

export const DialogContext = createContext<IDialogContext | null>(null);