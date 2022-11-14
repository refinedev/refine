import React from "react";

import { Alert, AlertTitle, Box } from "@pankod/refine-mui";

import { CreateGuesserConfig } from "@/types";

export const ErrorComponent: CreateGuesserConfig["errorComponent"] = ({
    error,
}) => {
    if (error) {
        return (
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "200px",
                }}
            >
                <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {error ?? ""}
                </Alert>
            </Box>
        );
    }

    return null;
};
