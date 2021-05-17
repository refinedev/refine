import { CSSProperties } from "react";

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
import loginBg from "./background.svg";

export const loginCard: CSSProperties = {
    maxWidth: "400px",
    margin: "auto",
};

export const signupSection: CSSProperties = {
    textAlign: "center",
    padding: "10px 0px",
};

export const loginHeader: CSSProperties = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "60px",
};

export const loginBackground: CSSProperties = {
    backgroundColor: "#eff7f7",
    backgroundImage: `url("${loginBg}")`,
};
