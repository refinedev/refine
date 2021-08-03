import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
    container: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textTransform: "uppercase",
        borderRadius: 25,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 12,
        paddingRight: 12,
        whiteSpace: "nowrap",
    },

    text: {
        fontWeight: 400,
        color: "#ffffff",
    },
};

export default styles;
