import React from "react";
import {
  Box,
  VStack,
  Heading,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
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
 */
export const Empty: React.FC<EmptyProps> = ({
  title,
  description,
  action,
  icon,
  className,
  style,
}) => {
  const color = useColorModeValue("gray.400", "gray.500");

  return (
    <VStack
      className={className}
      style={style}
      spacing={2}
      py={10}
      textAlign="center"
    >
      <Box aria-hidden="true" color={color}>
        {icon ?? <IconInbox size={48} stroke={1.5} />}
      </Box>
      {title && (
        <Heading as="h3" size="md">
          {title}
        </Heading>
      )}
      {description && (
        <Text fontSize="sm" color={color}>
          {description}
        </Text>
      )}
      {action}
    </VStack>
  );
};
