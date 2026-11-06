import React from "react";
import { Box, Stack, Title, Text } from "@mantine/core";
import { IconInbox } from "@tabler/icons-react";

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
 * @see {@link https://refine.dev/docs/api-reference/mantine/components/empty} for more details.
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
    <Stack
      className={className}
      style={style}
      align="center"
      spacing="xs"
      py="xl"
    >
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          display: "flex",
          color:
            theme.colorScheme === "dark"
              ? theme.colors.dark[3]
              : theme.colors.gray[5],
        })}
      >
        {icon ?? <IconInbox size={48} stroke={1.5} />}
      </Box>
      {title && (
        <Title order={3} size="h4" align="center">
          {title}
        </Title>
      )}
      {description && (
        <Text size="sm" color="dimmed" align="center">
          {description}
        </Text>
      )}
      {action}
    </Stack>
  );
};
