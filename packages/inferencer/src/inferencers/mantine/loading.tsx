import React from "react";

import { LoadingOverlay } from "@pankod/refine-mantine";

import { CreateInferencerConfig } from "@/types";

export const LoadingComponent: CreateInferencerConfig["loadingComponent"] =
    () => {
        return <LoadingOverlay visible />;
    };
