import { AppBar, IconButton, Toolbar } from "@pankod/refine-mui";
import { ChevronLeft, MenuRounded } from "@mui/icons-material";

import { useConfig } from "components/layout/context";

export const Header: React.FC = ({ children }) => {
    const { opened, setOpened, collapsed } = useConfig();

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
            color="default"
            elevation={0}
            position="sticky"
            sx={{ width: getWidth(), marginLeft: getMargin() }}
        >
            <Toolbar>
                <IconButton onClick={() => setOpened((prev) => !prev)}>
                    {opened ? <ChevronLeft /> : <MenuRounded />}
                </IconButton>
                {children}
            </Toolbar>
        </AppBar>
    );
};
