import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: "flex",
        alignItems: "center",
        textTransform: "capitalize",
    },
    icon: {
        width: 18,
        height: 18,
        minWidth: 18,
        display: "inline-block",
        borderRadius: 99,
        marginRight: 5,
    },
    text: {
        fontWeight: 400,
    },
};

export default styles;
