import { Box, Divider, Drawer, useMediaQuery, useTheme } from "@mui/material";
import { RefineLogo } from "@/icons";
import { UserSelect } from "./user-select";
import { Menu } from "./menu";
import { useThemedLayoutContext } from "@refinedev/mui";

export const Sider = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { mobileSiderOpen, setMobileSiderOpen } = useThemedLayoutContext();

  if (isMobile) {
    return (
      <Drawer
        anchor="left"
        open={mobileSiderOpen}
        onClose={() => setMobileSiderOpen(false)}
        ModalProps={{
          keepMounted: true,
          sx: {
            "& .MuiModal-backdrop": {
              backgroundColor: theme.palette.grey[900],
              opacity: "0.8 !important",
            },
          },
        }}
      >
        <SiderContent />
      </Drawer>
    );
  }

  return <SiderContent />;
};

const SiderContent = () => {
  return (
    <Box
      sx={{
        px: "24px",
        pt: "24px",
        width: "240px",
        height: "100dvh",
        borderRight: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Box
        sx={{
          height: "40px",
        }}
      >
        <RefineLogo />
      </Box>
      <Box
        sx={{
          py: "24px",
        }}
      >
        <Divider />
        <UserSelect />
        <Divider />
        <Menu />
      </Box>
    </Box>
  );
};
