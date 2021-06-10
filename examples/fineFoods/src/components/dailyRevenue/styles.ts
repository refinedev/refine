import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
    title: {
        margin: 0,
        padding: 0,
    },
    titleArea: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
    },

    count: {
        color: "#FA541C",
        fontSize: 28,
        fontWeight: 300,
    },
};

export default styles;
