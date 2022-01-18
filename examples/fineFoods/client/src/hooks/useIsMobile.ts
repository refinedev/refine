import { Grid } from "@pankod/refine-antd";

const { useBreakpoint } = Grid;

export const useIsMobile = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.lg || screens.xs;
    return isMobile;
};
