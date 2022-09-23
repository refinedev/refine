type Props = {
    if: boolean;
    children?: () => JSX.Element;
};

export const Conditional = ({
    if: condition,
    children,
}: Props): JSX.Element => {
    if (typeof children !== "undefined" && typeof children !== "function") {
        throw new Error("Conditional component requires a function as a child");
    }

    return condition ? children?.() : null;
};
