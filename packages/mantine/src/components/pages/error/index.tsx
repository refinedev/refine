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
import { InfoCircle } from "tabler-icons-react";

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
                marginTop: "-150px",
            }}
        >
            <Title color="dimmed" order={1} sx={{ fontSize: "6rem" }}>
                404
            </Title>
            <Group spacing={4}>
                <Text>
                    {translate(
                        "pages.error.404",
                        "Sorry, the page you visited does not exist.",
                    )}
                </Text>
                {errorMessage && (
                    <Tooltip label={errorMessage}>
                        <ActionIcon>
                            <InfoCircle data-testid="error-component-tooltip" />
                        </ActionIcon>
                    </Tooltip>
                )}
            </Group>
            <Space h="md" />
            <Button onClick={() => push("/")}>
                {translate("pages.error.backHome", "Back Home")}
            </Button>
        </Box>
    );
};
