import { Box, Avatar, Typography } from "@pankod/refine-mui";

type CourierInfoBoxProps = {
    text: string;
    icon: React.ReactNode;
    value?: string;
};

export const CourierInfoBox: React.FC<CourierInfoBoxProps> = ({
    text,
    icon,
    value,
}) => {
    return (
        <Box
            display="flex"
            alignItems="center"
            sx={{
                minWidth: "200px",
                borderRadius: "8px",
                color: "white",
                padding: "10px 12px",
                backgroundColor: "primary.main",
            }}
        >
            <Avatar
                sx={{
                    bgcolor: "transparent",
                    color: "white",
                    marginRight: "10px",
                }}
            >
                {icon}
            </Avatar>
            <Box>
                <Typography variant="body1" fontWeight={700}>
                    {text}
                </Typography>
                <Typography>{value}</Typography>
            </Box>
        </Box>
    );
};
