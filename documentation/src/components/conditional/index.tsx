import React from "react";

type Props = {
    if: boolean;
    children?: () => JSX.Element;
};

export const Conditional = ({
    if: condition,
    children,
}: Props): JSX.Element => {
    const [show, setShow] = React.useState(condition);

    React.useEffect(() => {
        if (!show && condition) {
            setShow(true);
        }
    }, [condition]);

    const memoized = React.useMemo(() => {
        if (!show) {
            return null;
        }
        if (typeof children === "function") {
            return children();
        }
        return null;
    }, [show]);

    if (typeof children !== "undefined" && typeof children !== "function") {
        throw new Error("Conditional component requires a function as a child");
    }

    return memoized;
};
