import { Grid } from "@pankod/refine";

const { useBreakpoint } = Grid;

export const useIsMobile = () => {
    const screens = useBreakpoint();
    const isMobile = !screens.lg || screens.xs;
    return isMobile;
};
