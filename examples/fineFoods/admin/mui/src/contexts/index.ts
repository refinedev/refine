import { createContext } from "react";

export const ColorModeContext = createContext({
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    toggleColorMode: () => {},
    mode: "",
});
