import { AppBar, Toolbar } from "@pankod/refine-mui";

import { useConfig } from "components/layout/context";

export const Content: React.FC = ({ children }) => {
    const { collapsed, opened } = useConfig();

    const getWidth = () => {
        if (!opened) return "100%";
        if (collapsed) return `calc(100% - ${64}px)`;
        return `calc(100% - ${256}px)`;
    };

    const getMargin = () => {
        if (!opened) return "0px";
        if (collapsed) return "64px";
        return "256px";
    };

    return (
        <AppBar
            position="static"
            component="main"
            elevation={0}
            sx={{
                backgroundColor: "#E6E8EB",
                width: getWidth(),
                marginLeft: getMargin(),
            }}
        >
            <Toolbar sx={{ overflow: "hidden" }}>{children}</Toolbar>
        </AppBar>
    );
};
