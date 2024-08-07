import { Box, type BoxProps, Typography } from "@mui/material";
import type { PropsWithChildren, ReactNode } from "react";

type Props = PropsWithChildren<{
  title?: string;
  icon?: ReactNode;
  sx?: BoxProps["sx"];
}>;

export const Frame = ({ children, icon, title, sx }: Props) => {
  return (
    <Box
      sx={{
        border: (theme) => `1px solid ${theme.palette.divider}`,
        borderRadius: "12px",
        padding: "24px",
        height: "100%",
        ...sx,
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "24px",
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: "16px",
            lineHeight: "24px",
            fontWeight: 500,
          }}
        >
          {title}
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "grey.500",
          }}
        >
          {icon}
        </Box>
      </Box>
      {children}
    </Box>
  );
};
