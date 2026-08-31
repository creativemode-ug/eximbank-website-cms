import { DialogContext } from "./context";
import { useContext } from "react";


export default function useDialog() {
    const dialog = useContext(DialogContext);
    
    if(dialog === null) {
        throw new Error("Implementation error, dialog provider required as a parent node")
    }
    return dialog
}