import { CSSProperties } from "react";

const styles: { [key: string]: CSSProperties } = {
    row: {
        borderBottomWidth: 0.5,
        borderBottomStyle: "solid",
        borderBottomColor: "#595959",
        paddingTop: 10,
        paddingBottom: 10,
    },
    userArea: {
        display: "flex",
        alignItems: "center",
    },
    userInfo: {
        display: "flex",
        flexDirection: "column",
        marginLeft: 10,
    },
    userInfo__name: {
        fontSize: 14,
    },
    userInfo__productLength: {
        marginLeft: 5,
        fontSize: 10,
    },
    status: {
        fontSize: 10,
    },
    address: {
        display: "block",
        textAlign: "right",
        fontSize: 12,
    },
};

export default styles;
