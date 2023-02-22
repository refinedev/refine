import React from "react";

import { Alert, AlertTitle, Box } from "@mui/material";

import { CreateInferencerConfig } from "@/types";

export const ErrorComponent: CreateInferencerConfig["errorComponent"] = ({
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
                    <div dangerouslySetInnerHTML={{ __html: error ?? "" }} />
                </Alert>
            </Box>
        );
    }

    return null;
};
