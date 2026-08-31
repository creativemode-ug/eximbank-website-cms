import { type ReactNode, FC } from "react"

type ConditionalRenderProps = {
    condition: boolean;
    children: [ReactNode, ReactNode]; // Exactly two children are required
}

const ConditionalRender: FC<ConditionalRenderProps> = ({ condition, children }) => {
    if (!Array.isArray(children) || children.length !== 2) {
        console.error("ConditionalRender requires exactly two children.");
        return null;
    }

    const [trueChild, falseChild] = children;

    return (
        <>
            {condition ? trueChild : falseChild}
        </>
    );
};

export default ConditionalRender;