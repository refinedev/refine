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
    Heading,
    Text,
    Tooltip,
    IconButton,
    Button,
    useColorModeValue,
    Stack,
} from "@chakra-ui/react";
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

    const color = useColorModeValue("gray.500", "gray.400");

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            sx={{
                "@media (min-height: 755px)": {
                    marginTop: "-150px",
                },
            }}
        >
            <Heading fontWeight={900} fontSize={[120, 160, 220]} color={color}>
                404
            </Heading>
            <Stack
                direction={["column", "row"]}
                alignItems="center"
                spacing={2}
            >
                <Text color={color} fontSize="xl" align="center">
                    {translate(
                        "pages.error.404",
                        "Sorry, the page you visited does not exist.",
                    )}
                </Text>
                {errorMessage && (
                    <Tooltip openDelay={0} label={errorMessage}>
                        <IconButton
                            aria-label="info"
                            color={color}
                            data-testid="error-component-tooltip"
                        >
                            <IconInfoCircle />
                        </IconButton>
                    </Tooltip>
                )}
            </Stack>
            <Button mt={6} variant="outline" onClick={() => push("/")}>
                {translate("pages.error.backHome", "Back Home")}
            </Button>
        </Box>
    );
};
