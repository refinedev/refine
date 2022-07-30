import React, { useEffect, useState } from "react";
import { ResourceErrorRouterParams } from "@pankod/refine-core";
import { RefineErrorPageProps } from "@pankod/refine-ui-types";
import {
    useNavigation,
    useTranslate,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";
import { Stack, Button, Tooltip, Typography, Grid } from "@mui/material";
import { Info } from "@mui/icons-material";

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
        <Grid
            display="flex"
            justifyContent="center"
            alignItems="center"
            mt={20}
        >
            <Grid
                container
                direction="column"
                display="flex"
                alignItems="center"
            >
                <Typography variant="h1">404</Typography>
                <Stack direction="row" spacing="2">
                    <Typography>
                        {translate(
                            "pages.error.404",
                            "Sorry, the page you visited does not exist.",
                        )}
                    </Typography>

                    {errorMessage && (
                        <Tooltip title={errorMessage}>
                            <Info data-testid="error-component-tooltip" />
                        </Tooltip>
                    )}
                </Stack>
                <Button onClick={() => push("/")}>
                    {translate("pages.error.backHome", "Back Home")}
                </Button>
            </Grid>
        </Grid>
    );
};
