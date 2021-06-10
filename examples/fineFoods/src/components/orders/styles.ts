import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
    title: {
        margin: 0,
        padding: 0,
    },

    count: {
        color: "#FA541C",
        fontSize: 56,
        fontWeight: 300,
    },
    countArea: {
        display: "flex",
        alignContent: "flex-end",
        flexWrap: "wrap",
        justifyContent: "space-around",
        alignItems: "baseline",
    },
};

export default styles;
