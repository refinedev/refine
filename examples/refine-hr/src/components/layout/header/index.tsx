import { HandleIcon, RefineLogo } from "@/icons";
import { Box, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { useThemedLayoutContext } from "@refinedev/mui";

export const Header = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("md"));
  const { setMobileSiderOpen } = useThemedLayoutContext();

  if (isDesktop) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        px: "16px",
        height: "64px",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <IconButton
        onClick={() => setMobileSiderOpen(true)}
        sx={{
          backgroundColor: theme.palette.grey[100],
        }}
      >
        <HandleIcon style={{ color: theme.palette.text.secondary }} />
      </IconButton>
      <RefineLogo height="32px" />
      <Box />
    </Box>
  );
};
