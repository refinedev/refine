import React, { useEffect, useState } from "react";
import {
    useNavigation,
    useTranslate,
    useResourceWithRoute,
    useRouterContext,
} from "@pankod/refine-core";
import { Stack, Button, Tooltip, Typography, Grid } from "@mui/material";
import { Info } from "@mui/icons-material";
import { ResourceErrorRouterParams } from "@pankod/refine-core";

export const ErrorComponent: React.FC = () => {
    const [errorMessage, setErrorMessage] = useState<string>();
    const { push } = useNavigation();
    const translate = useTranslate();
    const actionTypes = ["edit", "create", "show"];

    const { useParams } = useRouterContext();

    const params = useParams<ResourceErrorRouterParams>();
    const resource = useResourceWithRoute();

    useEffect(() => {
        setErrorMessage(
            translate(
                "pages.error.info",
                {
                    action: params.action,
                    resource: params.resource,
                },
                `You may have forgotten to add the "${params.action}" component to "${params.resource}" resource.`,
            ),
        );
        if (params.resource) {
            const resourceFromRoute = resource(params.resource);
            if (
                params.action &&
                actionTypes.includes(params.action) &&
                !resourceFromRoute[params.action]
            ) {
                setErrorMessage(
                    translate(
                        "pages.error.info",
                        {
                            action: params.action,
                            resource: params.resource,
                        },
                        `You may have forgotten to add the "${params.action}" component to "${params.resource}" resource.`,
                    ),
                );
            }
        }
    }, [params]);

    return (
        <Grid justifyContent="center" display="flex" alignItems="center" p={24}>
            <Grid direction="column" display="flex" alignItems="center">
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
