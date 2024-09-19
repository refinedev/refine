import { Box, Typography, Avatar, Button } from "@mui/material";
import type { ReactNode } from "react";

type Props = {
  date: string;
  avatarURL: string;
  title: string;
  descriptionIcon?: ReactNode;
  description: string;
  onClick?: () => void;
  showTimeSince?: boolean;
};

export const RequestsListItem = ({
  date,
  avatarURL,
  title,
  descriptionIcon,
  description,
  onClick,
  showTimeSince,
}: Props) => {
  return (
    <Box
      sx={(theme) => ({
        height: "auto",
        [theme.breakpoints.up("md")]: {
          height: "80px",
        },
      })}
    >
      {showTimeSince && (
        <Box
          sx={{
            marginBottom: "8px",
          }}
        >
          <Typography variant="caption" color="textSecondary">
            {date}
          </Typography>
        </Box>
      )}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Avatar
          src={avatarURL}
          alt={title}
          sx={{ width: "48px", height: "48px" }}
        />
        <Box
          sx={(theme) => ({
            height: "auto",
            [theme.breakpoints.up("md")]: {
              height: "48px",
            },
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
            gap: "4px",
            marginLeft: "16px",
          })}
        >
          <Box>
            <Typography variant="body2" fontWeight={500} lineHeight="24px">
              {title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {descriptionIcon}
              <Typography variant="caption" color="textSecondary">
                {description}
              </Typography>
            </Box>
          </Box>

          {onClick && (
            <Button
              size="small"
              color="inherit"
              onClick={onClick}
              sx={{
                alignSelf: "flex-start",
                flexShrink: 0,
                marginLeft: "auto",
              }}
            >
              View Request
            </Button>
          )}
        </Box>
      </Box>
    </Box>
  );
};
