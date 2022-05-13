import { Box } from "@pankod/refine-mui";
import { TooltipProps } from "recharts";

export const ChartTooltip: React.FC<TooltipProps<number, string>> = ({
    active,
    payload,
}) => {
    if (active && payload && payload.length) {
        return (
            <Box
                sx={{
                    color: "#fff",
                    fontWeight: 600,
                }}
            >
                ${payload[0].value} $
            </Box>
        );
    }

    return null;
};
