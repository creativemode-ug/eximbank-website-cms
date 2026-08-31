import { ReactNode, useState } from "react";
import { DialogContext, IDialogState, IDialog } from "./context";
import Dialog from "./index";

const initState: IDialogState = {
    message: null,
    confirm: null
}

export default function DialogProvider({ children }: { children: ReactNode}) {
    const [dialog, setDialog] = useState<IDialogState>(initState);

    const showMessage = (payload: IDialog) => {
        setDialog({ message: payload, confirm: null });
    };

    const showConfirm = (payload: IDialog) => {
        setDialog({ message: null, confirm: payload });
    };

    const close = () => {
        setDialog(initState);
    };

    return (
        <DialogContext.Provider 
            value={{
                showMessage,
                showConfirm,
                close,
            }}
        >
            {children}

            {
                dialog.message && (
                    <Dialog 
                        isOpen={true}
                        theme={dialog.message.theme}
                        title={dialog.message.title}
                        message={dialog.message.message}
                        render={dialog.message.render}
                        onClose={close}
                    />
                )
            }

            { 
                dialog.confirm && (
                <Dialog
                    isOpen={true}
                    theme={dialog.confirm.theme}
                    title={dialog.confirm.title}
                    message={dialog.confirm.message}
                    render={dialog.confirm.render}
                    onClose={() => {}}
                />
            )}
        </DialogContext.Provider>
    )
}