import { Box, Divider, Typography } from "@mui/material";
import { useResource } from "@refinedev/core";

type Props = {
  title?: string;
  rightSlot?: React.ReactNode;
};

export const PageHeader = ({ title, rightSlot }: Props) => {
  const { resource } = useResource();

  const prefferedTitle = title || resource?.meta?.label || "";

  return (
    <Box
      sx={{
        paddingBottom: "24px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          height: "40px",
        }}
      >
        <Typography
          variant="h2"
          fontSize="18px"
          fontWeight="600"
          lineHeight="32px"
        >
          {prefferedTitle}
        </Typography>
        {rightSlot}
      </Box>
    </Box>
  );
};
