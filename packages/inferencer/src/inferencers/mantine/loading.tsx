import React from "react";

import { LoadingOverlay } from "@mantine/core";

import { CreateInferencerConfig } from "@/types";

export const LoadingComponent: CreateInferencerConfig["loadingComponent"] =
    () => {
        return <LoadingOverlay visible />;
    };
