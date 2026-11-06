import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";

export interface EmptyProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * `<Empty>` is a presentational component you can render when a table, list, or grid has
 * no data to display. It does not detect *why* the data is empty (no records at all, no
 * search results, no results after filtering) - pass the `title`, `description`, and
 * `action` that fit your context.
 *
 * @see {@link https://refine.dev/docs/api-reference/mui/components/empty} for more details.
 */
export const Empty: React.FC<EmptyProps> = ({
  title,
  description,
  action,
  icon,
  className,
  style,
}) => {
  return (
    <Box
      className={className}
      style={style}
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        gap: 1,
        padding: 4,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{ display: "flex", color: "text.disabled", fontSize: 48 }}
      >
        {icon ?? <InboxOutlinedIcon fontSize="inherit" />}
      </Box>
      {title && (
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
      )}
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
      {action && <Box sx={{ marginTop: 1 }}>{action}</Box>}
    </Box>
  );
};
