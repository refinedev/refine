import React from "react";

import { Box, CircularProgress } from "@pankod/refine-mui";

import { CreateGuesserConfig } from "@/types";

export const LoadingComponent: CreateGuesserConfig["loadingComponent"] = () => {
    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "300px",
            }}
        >
            <CircularProgress size="large" />
        </Box>
    );
};
