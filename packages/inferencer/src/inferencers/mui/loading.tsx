import React from "react";

import { Box, CircularProgress } from "@mui/material";

import { CreateInferencerConfig } from "@/types";

export const LoadingComponent: CreateInferencerConfig["loadingComponent"] =
    () => {
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
