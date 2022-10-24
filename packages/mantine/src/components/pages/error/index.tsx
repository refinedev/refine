import React, { useEffect, useState } from "react";
import { ResourceErrorRouterParams } from "@pankod/refine-core";
import { RefineErrorPageProps } from "@pankod/refine-ui-types";
import {
    useNavigation,
    useTranslate,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";
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
import { IconInfoCircle } from "@tabler/icons";

export const ErrorComponent: React.FC<RefineErrorPageProps> = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const { push } = useNavigation();
    const translate = useTranslate();
    const actionTypes = ["edit", "create", "show"];

    const { useParams } = useRouterContext();

    const params = useParams<ResourceErrorRouterParams>();
    const resource = useResourceWithRoute();

    useEffect(() => {
        const action = params.action ?? "list";
        const resourceName = params.resource;
        setErrorMessage(
            translate(
                "pages.error.info",
                {
                    action,
                    resource: resourceName,
                },
                `You may have forgotten to add the "${action}" component to "${resourceName}" resource.`,
            ),
        );
        if (resourceName) {
            const resourceFromRoute = resource(resourceName);
            if (
                action &&
                actionTypes.includes(action) &&
                !resourceFromRoute[action]
            ) {
                setErrorMessage(
                    translate(
                        "pages.error.info",
                        {
                            action,
                            resource: resourceName,
                        },
                        `You may have forgotten to add the "${action}" component to "${resourceName}" resource.`,
                    ),
                );
            }
        }
    }, [params]);

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                minHeight: "100vh",
                "@media (min-height: 755px)": {
                    marginTop: "-150px",
                },
            }}
        >
            <Title
                sx={(theme) => ({
                    textAlign: "center",
                    fontWeight: 900,
                    fontSize: 220,
                    lineHeight: 1,
                    color:
                        theme.colorScheme === "dark"
                            ? theme.colors.dark[4]
                            : theme.colors.gray[2],

                    [theme.fn.smallerThan("sm")]: {
                        fontSize: 120,
                    },
                })}
            >
                404
            </Title>
            <Group spacing={4} align="center" sx={{ justifyContent: "center" }}>
                <Text
                    color="dimmed"
                    size="lg"
                    align="center"
                    sx={{ maxWidth: 500 }}
                >
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
            <Button variant="subtle" size="md" onClick={() => push("/")}>
                {translate("pages.error.backHome", "Back Home")}
            </Button>
        </Box>
    );
};
