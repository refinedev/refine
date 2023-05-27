import React from "react";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { CreateInferencerConfig } from "../../types";

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
