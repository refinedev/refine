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

    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            minH="100vh"
            mt={{ base: "0", md: "-150px" }}
        >
            <Heading fontWeight={900} fontSize="220" color="gray.600">
                404
            </Heading>
            <Box display="flex" alignItems="center" justifyContent="center">
                <Text color="gray.600" fontSize="xl">
                    {translate(
                        "pages.error.404",
                        "Sorry, the page you visited does not exist.",
                    )}
                </Text>
                {errorMessage && (
                    <Tooltip openDelay={0} label={errorMessage}>
                        <IconButton
                            aria-label="info"
                            color="gray.600"
                            data-testid="error-component-tooltip"
                        >
                            <IconInfoCircle />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <Button mt={6} colorScheme="green" onClick={() => push("/")}>
                {translate("pages.error.backHome", "Back Home")}
            </Button>
        </Box>
    );
};
