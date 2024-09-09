import React, { useEffect, useState } from "react";
import type { RefineErrorPageProps } from "@refinedev/ui-types";
import {
  useNavigation,
  useTranslate,
  useGo,
  useResource,
  useRouterType,
} from "@refinedev/core";
import {
  Box,
  Title,
  Text,
  Group,
  Tooltip,
  ActionIcon,
  Button,
  Space,
} from "@mantine/core";
import { IconInfoCircle } from "@tabler/icons-react";
import { useColorScheme } from "@mantine/hooks";

export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
  const [errorMessage, setErrorMessage] = useState<string>();
  const translate = useTranslate();
  const { push } = useNavigation();
  const go = useGo();
  const routerType = useRouterType();

  const colorScheme = useColorScheme();

  const { resource, action } = useResource();

  useEffect(() => {
    if (resource && action) {
      setErrorMessage(
        translate(
          "pages.error.info",
          {
            action,
            resource: resource?.name,
          },
          `You may have forgotten to add the "${action}" component to "${resource?.name}" resource.`,
        ),
      );
    }
  }, [resource, action]);

  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        boxSizing: "border-box",
        minHeight: "calc(100vh - 150px)",
      }}
    >
      <Title
        style={(theme) => ({
          textAlign: "center",
          fontWeight: 900,
          fontSize: 220,
          lineHeight: 1,
          color:
            colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2],
          /* [theme.fn.smallerThan("sm")]: {
                        fontSize: 120,
                    }, */
        })}
      >
        404
      </Title>
      <Group gap={4} justify="center">
        <Text color="dimmed" size="lg" ta="center" maw={500}>
          {translate(
            "pages.error.404",
            "Sorry, the page you visited does not exist.",
          )}
        </Text>
        {errorMessage && (
          <Tooltip openDelay={0} label={errorMessage}>
            <ActionIcon data-testid="error-component-tooltip">
              <IconInfoCircle />
            </ActionIcon>
          </Tooltip>
        )}
      </Group>
      <Space h="md" />
      <Button
        variant="subtle"
        size="md"
        onClick={() => {
          if (routerType === "legacy") {
            push("/");
          } else {
            go({ to: "/" });
          }
        }}
      >
        {translate("pages.error.backHome", "Back Home")}
      </Button>
    </Box>
  );
};
