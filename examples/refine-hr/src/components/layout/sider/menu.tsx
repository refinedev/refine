import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { useLink, useMenu } from "@refinedev/core";

export const Menu = () => {
  const Link = useLink();

  const { menuItems, selectedKey } = useMenu();

  return (
    <nav aria-label="resource list">
      <List
        sx={{
          paddingY: "24px",
        }}
      >
        {menuItems.map((item) => {
          // TODO: why this is deprecated?
          if (!item?.route) return null;

          const isSelected = selectedKey === item.key;

          return (
            <ListItem
              key={item.key}
              disablePadding
              sx={{
                borderRadius: "6px",
                bgcolor: isSelected ? "primary.50" : "transparent",

                "& .MuiListItemButton-root": {
                  borderRadius: "6px",
                },

                "& .Mui-selected": {
                  bgcolor: "unset",
                },

                "&:not(:last-child)": {
                  marginBottom: "8px",
                },
              }}
            >
              <ListItemButton
                component={Link}
                to={item?.route}
                selected={selectedKey === item.key}
              >
                <ListItemIcon
                  sx={{
                    color: isSelected ? "primary.main" : "text.secondary",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    noWrap: true,
                    color: isSelected ? "primary.700" : "text.primary",
                    fontWeight: isSelected ? 600 : 400,
                    fontSize: "14px",
                    lineHeight: "20px",
                  }}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </nav>
  );
};
